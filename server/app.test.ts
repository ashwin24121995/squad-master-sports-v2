import { describe, expect, it } from "vitest";
import { appRouter } from "./routers";
import { COOKIE_NAME } from "../shared/const";
import type { TrpcContext } from "./_core/context";

type CookieCall = {
  name: string;
  value?: string;
  options: Record<string, unknown>;
};

function createPublicContext(): TrpcContext {
  return {
    user: null,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {
      cookie: () => {},
      clearCookie: () => {},
    } as TrpcContext["res"],
  };
}

function createAuthContext(overrides?: Partial<NonNullable<TrpcContext["user"]>>): TrpcContext {
  const user = {
    id: 1,
    email: "test@example.com",
    name: "Test User",
    role: "user" as const,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    lastSignedIn: new Date().toISOString(),
    ...overrides,
  };

  return {
    user,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {
      cookie: () => {},
      clearCookie: () => {},
    } as TrpcContext["res"],
  };
}

describe("auth.me", () => {
  it("returns null for unauthenticated users", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);
    const result = await caller.auth.me();
    expect(result).toBeNull();
  });

  it("returns user data for authenticated users", async () => {
    const ctx = createAuthContext();
    const caller = appRouter.createCaller(ctx);
    const result = await caller.auth.me();
    expect(result).not.toBeNull();
    expect(result?.name).toBe("Test User");
    expect(result?.email).toBe("test@example.com");
    expect(result?.role).toBe("user");
  });
});

describe("auth.logout", () => {
  it("clears the session cookie and reports success", async () => {
    const clearedCookies: CookieCall[] = [];
    const ctx: TrpcContext = {
      ...createAuthContext(),
      res: {
        cookie: () => {},
        clearCookie: (name: string, options: Record<string, unknown>) => {
          clearedCookies.push({ name, options });
        },
      } as TrpcContext["res"],
    };
    const caller = appRouter.createCaller(ctx);
    const result = await caller.auth.logout();
    expect(result).toEqual({ success: true });
    expect(clearedCookies).toHaveLength(1);
    expect(clearedCookies[0]?.name).toBe(COOKIE_NAME);
  });
});

describe("teams routes", () => {
  it("teams.create requires authentication", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);
    try {
      await caller.teams.create({
        matchId: 1,
        name: "My Team",
        captainId: 1,
        viceCaptainId: 2,
        playerIds: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
        totalCredits: 95,
      });
      expect.unreachable("Should have thrown for unauthenticated user");
    } catch (e: any) {
      expect(e.code).toBe("UNAUTHORIZED");
    }
  });

  it("teams.create validates captain != vice-captain", async () => {
    const ctx = createAuthContext();
    const caller = appRouter.createCaller(ctx);
    try {
      await caller.teams.create({
        matchId: 1,
        name: "My Team",
        captainId: 1,
        viceCaptainId: 1,
        playerIds: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
        totalCredits: 95,
      });
      expect.unreachable("Should have thrown for same captain/vc");
    } catch (e: any) {
      expect(e.message).toContain("Captain and Vice-Captain must be different");
    }
  });

  it("teams.create validates exactly 11 players", async () => {
    const ctx = createAuthContext();
    const caller = appRouter.createCaller(ctx);
    try {
      await caller.teams.create({
        matchId: 1,
        name: "My Team",
        captainId: 1,
        viceCaptainId: 2,
        playerIds: [1, 2, 3],
        totalCredits: 30,
      });
      expect.unreachable("Should have thrown for wrong player count");
    } catch (e: any) {
      expect(e).toBeDefined();
    }
  });

  it("teams.create validates totalCredits max 100", async () => {
    const ctx = createAuthContext();
    const caller = appRouter.createCaller(ctx);
    try {
      await caller.teams.create({
        matchId: 1,
        name: "My Team",
        captainId: 1,
        viceCaptainId: 2,
        playerIds: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
        totalCredits: 150,
      });
      expect.unreachable("Should have thrown for credits > 100");
    } catch (e: any) {
      expect(e).toBeDefined();
    }
  });

  it("teams.myTeams requires authentication", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);
    try {
      await caller.teams.myTeams();
      expect.unreachable("Should have thrown");
    } catch (e: any) {
      expect(e.code).toBe("UNAUTHORIZED");
    }
  });
});

describe("contests routes", () => {
  it("contests.list works as public procedure", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);
    const result = await caller.contests.list();
    expect(Array.isArray(result)).toBe(true);
  });

  it("contests.join requires authentication", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);
    try {
      await caller.contests.join({ contestId: 1, teamId: 1 });
      expect.unreachable("Should have thrown");
    } catch (e: any) {
      expect(e.code).toBe("UNAUTHORIZED");
    }
  });
});

describe("contact routes", () => {
  it("contact.submit creates a message successfully", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);
    const result = await caller.contact.submit({
      name: "Test User",
      email: "test@example.com",
      subject: "Test Subject",
      message: "This is a test message",
    });
    expect(result.success).toBe(true);
    expect(result.id).toBeGreaterThan(0);
  });

  it("contact.submit validates email format", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);
    try {
      await caller.contact.submit({
        name: "Test",
        email: "not-an-email",
        message: "Hello",
      });
      expect.unreachable("Should have thrown for invalid email");
    } catch (e: any) {
      expect(e).toBeDefined();
    }
  });

  it("contact.submit validates required fields", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);
    try {
      // @ts-expect-error - testing missing fields
      await caller.contact.submit({ name: "Test" });
      expect.unreachable("Should have thrown for missing fields");
    } catch (e: any) {
      expect(e).toBeDefined();
    }
  });
});

describe("leaderboard routes", () => {
  it("leaderboard.global returns an array", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);
    const result = await caller.leaderboard.global({ limit: 10 });
    expect(Array.isArray(result)).toBe(true);
  });

  it("leaderboard.global validates limit range", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);
    try {
      await caller.leaderboard.global({ limit: 200 });
      expect.unreachable("Should have thrown for limit > 100");
    } catch (e: any) {
      expect(e).toBeDefined();
    }
  });
});

describe("dashboard routes", () => {
  it("dashboard.stats requires authentication", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);
    try {
      await caller.dashboard.stats();
      expect.unreachable("Should have thrown");
    } catch (e: any) {
      expect(e.code).toBe("UNAUTHORIZED");
    }
  });

  it("dashboard.stats returns data for authenticated users", async () => {
    const ctx = createAuthContext();
    const caller = appRouter.createCaller(ctx);
    const result = await caller.dashboard.stats();
    expect(result).toHaveProperty("teamsCreated");
    expect(result).toHaveProperty("contestsJoined");
    expect(result).toHaveProperty("totalPoints");
    expect(result).toHaveProperty("matchesPlayed");
  });

  it("dashboard.profile requires authentication", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);
    try {
      await caller.dashboard.profile();
      expect.unreachable("Should have thrown");
    } catch (e: any) {
      expect(e.code).toBe("UNAUTHORIZED");
    }
  });
});

describe("admin routes", () => {
  it("admin.seedData requires admin role", async () => {
    const ctx = createAuthContext({ role: "user" });
    const caller = appRouter.createCaller(ctx);
    try {
      await caller.admin.seedData();
      expect.unreachable("Should have thrown for non-admin");
    } catch (e: any) {
      expect(e.code).toBe("FORBIDDEN");
    }
  });

  it("admin.seedData rejects unauthenticated users", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);
    try {
      await caller.admin.seedData();
      expect.unreachable("Should have thrown");
    } catch (e: any) {
      expect(["UNAUTHORIZED", "FORBIDDEN"]).toContain(e.code);
    }
  });

  it("admin.messages requires admin role", async () => {
    const ctx = createAuthContext({ role: "user" });
    const caller = appRouter.createCaller(ctx);
    try {
      await caller.admin.messages();
      expect.unreachable("Should have thrown for non-admin");
    } catch (e: any) {
      expect(e.code).toBe("FORBIDDEN");
    }
  });

  it("admin.messages returns array for admin users", async () => {
    const ctx = createAuthContext({ role: "admin" });
    const caller = appRouter.createCaller(ctx);
    const result = await caller.admin.messages();
    expect(Array.isArray(result)).toBe(true);
  });
});
