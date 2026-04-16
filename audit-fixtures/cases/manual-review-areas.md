# Unsupported Or Manual Review Areas

Finding ID: `TL-DEMO-007`

Scenario:

- The repo models an AI-assisted support workflow and escalation notes.
- That area is represented as a manual review case because nuanced prompt handoffs and policy semantics often need human judgment.

Demo value:

- Shows that the audit story can include reviewer-owned areas, not only automated detectors.

Safe-by-design notes:

- The app does not call an LLM or external support system.
- The workflow is descriptive and local-only.
