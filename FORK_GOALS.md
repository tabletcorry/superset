# Fork Goals

This file documents **fork-specific goals and behavioral changes** that differ from upstream.
It is intended as a living changelog of local fork intent: add new goals as they are implemented,
and keep older goals for historical context.

## Goal 1: Local-Only Desktop Mode

This fork adds a **local-only mode** for the Superset desktop app, so you can manage worktrees locally without Neon/Clerk or the hosted API.

### What it does
- Bypasses desktop sign-in/auth (treats the user as signed in).
- Skips remote version checks.
- Disables remote-only UI (Tasks view and Sign Out).
- Avoids remote API calls for user/task data.

### How to enable
Set the environment variable before building/running the desktop app:

```
SUPERSET_LOCAL_ONLY=1
```

(You can also use `true`.)

### Scope
- Desktop app only.
- Web/admin/api/marketing apps are unchanged and still require Neon/Clerk if you run them.

### Limitations
- Tasks + remote sync are disabled in local-only mode.
- User/org data shown in the desktop UI is a local stub.
