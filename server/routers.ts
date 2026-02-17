import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, protectedProcedure, router } from "./_core/trpc";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import bcrypt from "bcryptjs";
import { SignJWT } from "jose";
import {
  getUserByEmail,
  getUserById,
  createUser,
  updateUserSignIn,
  getTeamsByUser,
  createTeam,
  getContestEntries,
  getContestEntriesByUser,
  getContestEntriesByContest,
  createContestEntry,
  createContactMessage,
  getContactMessages,
} from "./fileStore";

const JWT_SECRET_KEY = new TextEncoder().encode(
  process.env.JWT_SECRET || "squad-master-sports-secret-key-2026"
);

// ─── Admin procedure ────────────────────────────────────────────────────────
const adminProcedure = protectedProcedure.use(({ ctx, next }) => {
  if (ctx.user?.role !== "admin") {
    throw new TRPCError({ code: "FORBIDDEN", message: "Admin access required" });
  }
  return next({ ctx });
});

export const appRouter = router({
  system: systemRouter,

  // ─── Auth ───────────────────────────────────────────────────────────────────
  auth: router({
    me: publicProcedure.query((opts) => opts.ctx.user),

    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return { success: true } as const;
    }),

    register: publicProcedure
      .input(
        z.object({
          name: z.string().min(2, "Name must be at least 2 characters"),
          email: z.string().email("Invalid email address"),
          password: z.string().min(6, "Password must be at least 6 characters"),
        })
      )
      .mutation(async ({ input, ctx }) => {
        // Check if user already exists
        const existing = getUserByEmail(input.email);
        if (existing) {
          throw new TRPCError({ code: "CONFLICT", message: "An account with this email already exists" });
        }

        // Hash password
        const passwordHash = await bcrypt.hash(input.password, 10);

        // Create user
        const user = createUser({
          email: input.email,
          name: input.name,
          passwordHash,
          role: "user",
        });

        // Generate JWT
        const token = await new SignJWT({ userId: user.id, email: user.email, role: user.role })
          .setProtectedHeader({ alg: "HS256" })
          .setExpirationTime("7d")
          .sign(JWT_SECRET_KEY);

        // Set cookie
        const cookieOptions = getSessionCookieOptions(ctx.req);
        ctx.res.cookie(COOKIE_NAME, token, { ...cookieOptions, maxAge: 7 * 24 * 60 * 60 * 1000 });

        return {
          success: true,
          user: { id: user.id, name: user.name, email: user.email, role: user.role },
        };
      }),

    login: publicProcedure
      .input(
        z.object({
          email: z.string().email("Invalid email address"),
          password: z.string().min(1, "Password is required"),
        })
      )
      .mutation(async ({ input, ctx }) => {
        const user = getUserByEmail(input.email);
        if (!user) {
          throw new TRPCError({ code: "UNAUTHORIZED", message: "Invalid email or password" });
        }

        const valid = await bcrypt.compare(input.password, user.passwordHash);
        if (!valid) {
          throw new TRPCError({ code: "UNAUTHORIZED", message: "Invalid email or password" });
        }

        // Update last sign in
        updateUserSignIn(user.id);

        // Generate JWT
        const token = await new SignJWT({ userId: user.id, email: user.email, role: user.role })
          .setProtectedHeader({ alg: "HS256" })
          .setExpirationTime("7d")
          .sign(JWT_SECRET_KEY);

        // Set cookie
        const cookieOptions = getSessionCookieOptions(ctx.req);
        ctx.res.cookie(COOKIE_NAME, token, { ...cookieOptions, maxAge: 7 * 24 * 60 * 60 * 1000 });

        return {
          success: true,
          user: { id: user.id, name: user.name, email: user.email, role: user.role },
        };
      }),
  }),

  // ─── Teams ──────────────────────────────────────────────────────────────────
  teams: router({
    create: protectedProcedure
      .input(
        z.object({
          matchId: z.number(),
          name: z.string().min(1),
          captainId: z.number(),
          viceCaptainId: z.number(),
          playerIds: z.array(z.number()).length(11, "Must select exactly 11 players"),
          totalCredits: z.number().max(100, "Total credits cannot exceed 100"),
        })
      )
      .mutation(({ input, ctx }) => {
        if (input.captainId === input.viceCaptainId) {
          throw new TRPCError({ code: "BAD_REQUEST", message: "Captain and Vice-Captain must be different players" });
        }
        const team = createTeam({
          userId: ctx.user!.id,
          matchId: input.matchId,
          name: input.name,
          captainId: input.captainId,
          viceCaptainId: input.viceCaptainId,
          playerIds: input.playerIds,
          totalCredits: input.totalCredits,
        });
        return team;
      }),

    myTeams: protectedProcedure.query(({ ctx }) => {
      return getTeamsByUser(ctx.user!.id);
    }),
  }),

  // ─── Contests ─────────────────────────────────────────────────────────────
  contests: router({
    list: publicProcedure.query(() => {
      // Return static contest data — no DB needed
      return [];
    }),

    join: protectedProcedure
      .input(z.object({ contestId: z.number(), teamId: z.number() }))
      .mutation(({ input, ctx }) => {
        // Check if already joined
        const existing = getContestEntriesByContest(input.contestId).find(
          (e) => e.userId === ctx.user!.id
        );
        if (existing) {
          throw new TRPCError({ code: "CONFLICT", message: "You have already joined this contest" });
        }
        const entry = createContestEntry({
          contestId: input.contestId,
          userId: ctx.user!.id,
          teamId: input.teamId,
        });
        return entry;
      }),
  }),

  // ─── Contact ──────────────────────────────────────────────────────────────
  contact: router({
    submit: publicProcedure
      .input(
        z.object({
          name: z.string().min(1, "Name is required"),
          email: z.string().email("Invalid email"),
          subject: z.string().optional().default(""),
          message: z.string().min(1, "Message is required"),
        })
      )
      .mutation(({ input }) => {
        const msg = createContactMessage({
          name: input.name,
          email: input.email,
          subject: input.subject,
          message: input.message,
        });
        return { success: true, id: msg.id };
      }),
  }),

  // ─── Leaderboard ──────────────────────────────────────────────────────────
  leaderboard: router({
    global: publicProcedure
      .input(z.object({ limit: z.number().min(1).max(100).optional().default(15) }))
      .query(({ input }) => {
        // Return empty — frontend uses static data
        return [];
      }),
  }),

  // ─── Dashboard ────────────────────────────────────────────────────────────
  dashboard: router({
    stats: protectedProcedure.query(({ ctx }) => {
      const teams = getTeamsByUser(ctx.user!.id);
      const entries = getContestEntriesByUser(ctx.user!.id);
      return {
        teamsCreated: teams.length,
        contestsJoined: entries.length,
        totalPoints: teams.reduce((sum, t) => sum + t.totalPoints, 0),
        matchesPlayed: new Set(teams.map((t) => t.matchId)).size,
      };
    }),

    profile: protectedProcedure.query(({ ctx }) => {
      const user = getUserById(ctx.user!.id);
      if (!user) {
        throw new TRPCError({ code: "NOT_FOUND", message: "User not found" });
      }
      return {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        totalPoints: user.totalPoints,
        matchesPlayed: user.matchesPlayed,
        contestsWon: user.contestsWon,
        createdAt: user.createdAt,
      };
    }),
  }),

  // ─── Admin ────────────────────────────────────────────────────────────────
  admin: router({
    seedData: adminProcedure.mutation(() => {
      return { success: true, message: "Static data is used — no seeding needed" };
    }),

    messages: adminProcedure.query(() => {
      return getContactMessages();
    }),
  }),
});

export type AppRouter = typeof appRouter;
