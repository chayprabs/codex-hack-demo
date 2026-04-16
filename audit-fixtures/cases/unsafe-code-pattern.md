# Unsafe Code Pattern

Finding ID: `TL-DEMO-004`

Scenario:

- A raw filter builder snippet illustrates what unsafe interpolation might look like in a real data layer.
- The live app uses static arrays and does not execute string-built queries.

Demo value:

- Good for showcasing pattern-based detection in a repo with no database dependency.

Safe-by-design notes:

- The snippet is stored with a `.disabled` extension.
- There is no runnable sink behind the example.
