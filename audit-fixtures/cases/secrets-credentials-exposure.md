# Secrets Or Credentials Exposure

Finding ID: `TL-DEMO-001`

Scenario:

- A support export packet preserved a fake credential-shaped value in a JSON snapshot.
- The value is redacted and prefixed for demo use only.
- No runtime code reads this file or accepts the value.

Why it exists:

- It gives TrustLayer a deterministic place to flag credential-shaped material.
- It shows how evidence archives and environment examples can be correlated.

Safe-by-design notes:

- Tokens are fake, non-routable, and never issued by any service.
- The app runtime does not consume this snapshot.
- `.env.example` contains placeholder values only.
