import { promises as fs } from "node:fs";
import path from "node:path";

const root = process.cwd();
const errors = [];
const notes = [];

function abs(...parts) {
  return path.join(root, ...parts);
}

async function readText(relativePath) {
  return fs.readFile(abs(relativePath), "utf8");
}

async function readJson(relativePath) {
  return JSON.parse(await readText(relativePath));
}

async function fileExists(relativePath) {
  try {
    await fs.access(abs(relativePath));
    return true;
  } catch {
    return false;
  }
}

function pushError(message) {
  errors.push(message);
}

function expect(condition, message) {
  if (!condition) {
    pushError(message);
  }
}

function compareSets(actualValues, expectedValues, label) {
  const actual = [...new Set(actualValues)].sort();
  const expected = [...new Set(expectedValues)].sort();

  if (actual.length !== expected.length) {
    pushError(`${label} length mismatch: expected ${expected.length}, got ${actual.length}.`);
    return;
  }

  for (let index = 0; index < expected.length; index += 1) {
    if (actual[index] !== expected[index]) {
      pushError(
        `${label} mismatch: expected [${expected.join(", ")}], got [${actual.join(", ")}].`,
      );
      return;
    }
  }
}

async function getFilesRecursive(relativeDir, filter) {
  const output = [];

  async function walk(currentRelativeDir) {
    const entries = await fs.readdir(abs(currentRelativeDir), { withFileTypes: true });

    for (const entry of entries) {
      const nextRelativePath = path.posix.join(
        currentRelativeDir.replaceAll("\\", "/"),
        entry.name,
      );

      if (entry.isDirectory()) {
        await walk(nextRelativePath);
        continue;
      }

      if (!filter || filter(nextRelativePath)) {
        output.push(nextRelativePath);
      }
    }
  }

  await walk(relativeDir);
  return output.sort();
}

async function scanForForbiddenPatterns() {
  const forbiddenPatterns = [
    /AKIA[0-9A-Z]{16}/,
    /sk_live_[0-9A-Za-z]+/,
    /ghp_[0-9A-Za-z]+/,
    /xoxb-[0-9A-Za-z-]+/,
    /-----BEGIN [A-Z ]+PRIVATE KEY-----/,
    /postgres:\/\/[^/\s]+/i,
    /mongodb\+srv:\/\/[^/\s]+/i,
  ];
  const searchRoots = ["app", "components", "docs", "lib", "README.md", ".env.example"];

  for (const searchRoot of searchRoots) {
    const stat = await fs.stat(abs(searchRoot));
    const files = stat.isDirectory()
      ? await getFilesRecursive(searchRoot)
      : [searchRoot];

    for (const file of files) {
      const content = await readText(file);

      for (const pattern of forbiddenPatterns) {
        if (pattern.test(content)) {
          pushError(`Forbidden secret-like pattern matched in ${file}: ${pattern}`);
        }
      }
    }
  }
}

async function main() {
  const manifest = await readJson("audit-fixtures/manifest.json");
  const coverage = await readJson("audit-fixtures/coverage.json");
  const repoMap = await readJson("audit-fixtures/repo-map.json");
  const replayIndex = await readJson("audit-fixtures/replay/replay-index.json");
  const evidenceBundle = await readJson("audit-fixtures/evidence-bundle.json");
  const safeToMerge = await readJson("audit-fixtures/safe-to-merge.json");
  const scoreCoverage = await readJson("audit-fixtures/score-coverage.json");
  const scoreBeforeAfter = await readJson("audit-fixtures/score-before-after.json");
  const repoFingerprint = await readJson("audit-fixtures/repo-fingerprint.json");
  const readme = await readText("README.md");
  const envExample = await readText(".env.example");

  expect(manifest.demo_safe === true, "Manifest must declare demo_safe: true.");
  expect(manifest.findings.length === 7, "Manifest must contain exactly 7 seeded findings.");

  const manifestIds = manifest.findings.map((finding) => finding.id);
  const manifestCategories = manifest.findings.map((finding) => finding.category);
  compareSets(manifestCategories, coverage.supported, "Supported coverage categories");

  const findingFiles = await getFilesRecursive(
    "audit-fixtures/findings",
    (file) => file.endsWith(".json"),
  );
  expect(
    findingFiles.length === manifest.findings.length,
    `Finding package count should match manifest (${manifest.findings.length}).`,
  );

  const findingFileMap = new Map();

  for (const file of findingFiles) {
    const finding = await readJson(file);
    findingFileMap.set(finding.id, { file, finding });
  }

  for (const manifestFinding of manifest.findings) {
    const findingPackage = findingFileMap.get(manifestFinding.id);
    expect(Boolean(findingPackage), `Missing finding package for ${manifestFinding.id}.`);

    if (findingPackage) {
      expect(
        findingPackage.finding.title === manifestFinding.title,
        `Finding title mismatch for ${manifestFinding.id}.`,
      );
      expect(
        findingPackage.finding.severity === manifestFinding.severity,
        `Finding severity mismatch for ${manifestFinding.id}.`,
      );
      expect(
        findingPackage.finding.category === manifestFinding.category,
        `Finding category mismatch for ${manifestFinding.id}.`,
      );
    }

    const artifactPaths = [
      manifestFinding.evidence_file,
      manifestFinding.patch_file,
      manifestFinding.replay_file,
      ...manifestFinding.file_paths,
    ];

    for (const artifactPath of artifactPaths) {
      expect(await fileExists(artifactPath), `Missing artifact referenced by ${manifestFinding.id}: ${artifactPath}`);
    }
  }

  compareSets(
    evidenceBundle.findings.map((finding) => finding.id),
    manifestIds,
    "Evidence bundle finding IDs",
  );

  const verifiedCount = evidenceBundle.findings.filter(
    (finding) => finding.verification_status === "verified",
  ).length;
  const partialCount = evidenceBundle.findings.filter(
    (finding) => finding.verification_status === "partial",
  ).length;
  const manualCount = evidenceBundle.findings.filter(
    (finding) => finding.verification_status === "manual review only",
  ).length;

  expect(
    verifiedCount === evidenceBundle.verification_status.verified_findings_count,
    "Evidence bundle verified findings count mismatch.",
  );
  expect(
    partialCount === evidenceBundle.verification_status.partial_verification_count,
    "Evidence bundle partial verification count mismatch.",
  );
  expect(
    manualCount === evidenceBundle.verification_status.manual_review_count,
    "Evidence bundle manual review count mismatch.",
  );

  expect(
    scoreBeforeAfter.before.score === scoreCoverage.trust_score.before &&
      scoreBeforeAfter.before.score === evidenceBundle.trust_score.before,
    "Before score mismatch across score artifacts.",
  );
  expect(
    scoreBeforeAfter.after.score === scoreCoverage.trust_score.after &&
      scoreBeforeAfter.after.score === evidenceBundle.trust_score.current,
    "After/current score mismatch across score artifacts.",
  );
  expect(
    scoreBeforeAfter.delta === scoreCoverage.trust_score.delta &&
      scoreBeforeAfter.delta === evidenceBundle.trust_score.delta,
    "Score delta mismatch across score artifacts.",
  );
  expect(
    scoreBeforeAfter.after.label === evidenceBundle.trust_score.label,
    "TrustScore label mismatch between score-before-after and evidence bundle.",
  );

  expect(
    coverage.supported.length === scoreCoverage.supported_area_count,
    "Supported area count mismatch between coverage and score-coverage.",
  );

  compareSets(
    coverage.unsupported,
    evidenceBundle.support_status.unsupported,
    "Unsupported area list between coverage and evidence bundle",
  );
  compareSets(
    coverage.unsupported,
    scoreCoverage.unsupported_areas,
    "Unsupported area list between coverage and score-coverage",
  );
  compareSets(
    coverage.unsupported,
    safeToMerge.unsupported_areas,
    "Unsupported area list between coverage and safe-to-merge",
  );

  const replayEntries = replayIndex.entries;
  expect(
    replayEntries.some((entry) => entry.id === "TS-DEMO-001"),
    "Replay index must include TS-DEMO-001.",
  );

  for (const findingId of manifestIds) {
    expect(
      replayEntries.some((entry) => entry.finding_ids.includes(findingId)),
      `Replay index does not cover ${findingId}.`,
    );
  }

  const traceFiles = await getFilesRecursive("audit-fixtures/traces", (file) =>
    file.endsWith(".json"),
  );
  expect(traceFiles.length === 5, "Expected 5 specialist trace files.");

  for (const traceFile of traceFiles) {
    const trace = await readJson(traceFile);
    const traceFindingIds = trace.candidate_detected?.finding_ids ?? [];

    for (const findingId of traceFindingIds) {
      expect(manifestIds.includes(findingId), `Trace ${trace.id} references unknown finding ${findingId}.`);
    }

    for (const inspectedPath of trace.files_inspected ?? []) {
      expect(await fileExists(inspectedPath), `Trace ${trace.id} references missing inspected path ${inspectedPath}.`);
    }

    for (const evidencePath of trace.evidence_collected ?? []) {
      expect(await fileExists(evidencePath), `Trace ${trace.id} references missing evidence path ${evidencePath}.`);
    }
  }

  const pageFiles = await getFilesRecursive("app", (file) =>
    file.endsWith("/page.tsx") || file.endsWith("\\page.tsx"),
  );
  const apiRouteFiles = await getFilesRecursive("app/api", (file) =>
    file.endsWith("/route.ts") || file.endsWith("\\route.ts"),
  );

  expect(repoFingerprint.route_count === pageFiles.length, "Repo fingerprint route_count is outdated.");
  expect(
    repoFingerprint.api_route_count === apiRouteFiles.length,
    "Repo fingerprint api_route_count is outdated.",
  );
  expect(
    repoFingerprint.scenario_count === manifest.findings.length,
    "Repo fingerprint scenario_count mismatch.",
  );

  expect(
    repoMap.resources.some((resource) =>
      resource.likely_paths.includes("app/api/demo-audit/route.ts"),
    ),
    "Repo map should include the demo audit kickoff runtime.",
  );

  const requiredReadmeSections = [
    "## Why This Repo Is Great For TrustLayer Demos",
    "## What The Audit Is Expected To Find",
    "## How The Demo Stays Safe",
    "## How To Run Locally",
  ];

  for (const section of requiredReadmeSections) {
    expect(readme.includes(section), `README is missing section: ${section}`);
  }

  const requiredEnvVars = [
    "NEXT_PUBLIC_APP_NAME",
    "DEMO_REPO_URL",
    "DEMO_SESSION_MODE",
    "DEMO_WEBHOOK_SIGNATURE",
    "DEMO_ADMIN_SERVICE_ALIAS",
    "DEMO_EXPORT_KEY_REFERENCE",
    "DEMO_ALLOWED_ORIGINS",
    "TRUSTLAYER_DEMO_MODE",
    "TRUSTLAYER_AUDIT_MANIFEST",
  ];

  for (const envVar of requiredEnvVars) {
    expect(envExample.includes(`${envVar}=`), `.env.example is missing ${envVar}.`);
  }

  await scanForForbiddenPatterns();

  if (errors.length > 0) {
    console.error("Demo verification failed:");
    for (const error of errors) {
      console.error(`- ${error}`);
    }
    process.exitCode = 1;
    return;
  }

  notes.push(`Verified ${manifest.findings.length} seeded findings.`);
  notes.push(`Verified ${traceFiles.length} specialist traces.`);
  notes.push(`Verified ${pageFiles.length} page routes and ${apiRouteFiles.length} API routes.`);

  console.log("Demo verification passed.");
  for (const note of notes) {
    console.log(`- ${note}`);
  }
}

await main();
