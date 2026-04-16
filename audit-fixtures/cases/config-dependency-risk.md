# Config Or Dependency Risk

Finding ID: `TL-DEMO-005`

Scenario:

- The evidence pack includes a dependency snapshot and a note about permissive configuration patterns.
- The working repository is pinned to patched framework versions and keeps runtime config minimal.

Demo value:

- Lets TrustLayer surface upgrade drift or review-needed config patterns from static evidence.

Safe-by-design notes:

- The risk is documentary, not active.
- Any risky version references exist only in the evidence snapshot.
