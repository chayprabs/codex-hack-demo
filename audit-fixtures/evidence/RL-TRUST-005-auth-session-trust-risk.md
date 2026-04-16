# RL-TRUST-005 Evidence

Title: Persona switch mirrors a legacy trust-by-email session shortcut

Observed clue:

```ts
if (session.email?.endsWith("@trusted-partner.example")) {
  return { role: "admin" };
}
```

Why this matters:

- Temporary shortcuts around session trust are easy to forget and hard to unwind later.
- Client-visible persona flows make this kind of regression easy to narrate.

Safe note:

That logic exists only in a disabled snippet. The live sign-in flow never creates a real session.
