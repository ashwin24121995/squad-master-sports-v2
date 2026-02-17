export const ENV = {
  cookieSecret: process.env.JWT_SECRET || "squad-master-sports-secret-key-2026",
  isProduction: process.env.NODE_ENV === "production",
  port: process.env.PORT || "3000",
  // Legacy framework fields — kept for compatibility with _core files
  forgeApiUrl: process.env.BUILT_IN_FORGE_API_URL ?? "",
  forgeApiKey: process.env.BUILT_IN_FORGE_API_KEY ?? "",
};
