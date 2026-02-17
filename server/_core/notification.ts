import { TRPCError } from "@trpc/server";

export type NotificationPayload = {
  title: string;
  content: string;
};

/**
 * Stub notification function.
 * In a production environment, this would send notifications via email or other services.
 * For now, it simply logs the notification.
 */
export async function notifyOwner(
  payload: NotificationPayload
): Promise<boolean> {
  if (!payload.title?.trim()) {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: "Notification title is required.",
    });
  }
  if (!payload.content?.trim()) {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: "Notification content is required.",
    });
  }

  console.log(`[Notification] ${payload.title}: ${payload.content}`);
  return true;
}
