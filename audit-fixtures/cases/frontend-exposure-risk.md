# Frontend Exposure Risk

Finding ID: `TL-DEMO-006`

Scenario:

- A handcrafted bundle snapshot contains client-visible operational metadata that would deserve review in a real application.
- The values are fake and do not unlock any backend functionality.

Demo value:

- Useful for talking through why environment prefixes, bundle contents, and public diagnostics still matter.

Safe-by-design notes:

- Data is synthetic and stored outside the runtime bundle pipeline.
- No secrets are embedded in shipped code.
