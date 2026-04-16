export const DEMO_AUDIT_SEED = "trustlayer-demo-seed-v1";
export const DEFAULT_DEMO_REPO_URL =
  "https://github.com/your-org/relaylane-trustlayer-demo";

export function isCustomDemoRepoUrlConfigured(): boolean {
  return Boolean(process.env.DEMO_REPO_URL?.trim());
}

export function getDemoRepoUrl(): string {
  return process.env.DEMO_REPO_URL?.trim() || DEFAULT_DEMO_REPO_URL;
}
