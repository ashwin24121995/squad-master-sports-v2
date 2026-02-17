// ─── OAuth Stub ────────────────────────────────────────────────────────────
// The original Manus OAuth flow has been removed.
// Authentication is now handled via custom email/password auth in routers.ts.
// This file is kept as a stub for structural compatibility.

import type { Express } from "express";

export function registerOAuthRoutes(_app: Express): void {
  // No OAuth routes — custom auth is handled via tRPC procedures
}
