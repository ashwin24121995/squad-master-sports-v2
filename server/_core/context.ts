import type { CreateExpressContextOptions } from "@trpc/server/adapters/express";
import { jwtVerify } from "jose";
import { COOKIE_NAME } from "@shared/const";
import { getUserById } from "../fileStore";

const JWT_SECRET_KEY = new TextEncoder().encode(
  process.env.JWT_SECRET || "squad-master-sports-secret-key-2026"
);

export interface ContextUser {
  id: number;
  email: string;
  name: string;
  role: "user" | "admin";
  createdAt: string;
  updatedAt: string;
  lastSignedIn: string;
}

export type TrpcContext = {
  req: CreateExpressContextOptions["req"];
  res: CreateExpressContextOptions["res"];
  user: ContextUser | null;
};

function parseCookies(cookieHeader: string): Record<string, string> {
  const cookies: Record<string, string> = {};
  cookieHeader.split(";").forEach((pair) => {
    const [key, ...rest] = pair.trim().split("=");
    if (key) {
      cookies[key.trim()] = decodeURIComponent(rest.join("=").trim());
    }
  });
  return cookies;
}

export async function createContext(
  opts: CreateExpressContextOptions
): Promise<TrpcContext> {
  let user: ContextUser | null = null;

  try {
    const cookieHeader = opts.req.headers.cookie || "";
    const cookies = parseCookies(cookieHeader);
    const token = cookies[COOKIE_NAME];

    if (token) {
      const { payload } = await jwtVerify(token, JWT_SECRET_KEY);
      const userId = payload.userId as number;

      if (userId) {
        const storedUser = getUserById(userId);
        if (storedUser) {
          user = {
            id: storedUser.id,
            email: storedUser.email,
            name: storedUser.name,
            role: storedUser.role,
            createdAt: storedUser.createdAt,
            updatedAt: storedUser.updatedAt,
            lastSignedIn: storedUser.lastSignedIn,
          };
        }
      }
    }
  } catch (err) {
    // Invalid or expired token — user stays null
    user = null;
  }

  return {
    req: opts.req,
    res: opts.res,
    user,
  };
}
