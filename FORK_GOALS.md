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

## Goal 2: Disable Auto-Updates in Local-Only Mode

When running the desktop app in local-only mode, the **auto-update/ShipIt system is disabled** so the app does not attempt update checks or installations.

### What it does
- Skips wiring the auto-updater in the main process.
- Prevents update checks or installs from running when local-only is enabled.
- Removes update entry points (like “Check for Updates…”) in local-only mode.

### How to enable
Set the environment variable before building/running the desktop app:

```
SUPERSET_LOCAL_ONLY=1
```

(You can also use `true`.)

### Scope
- Desktop app only.
