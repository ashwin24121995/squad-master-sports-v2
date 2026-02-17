import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Lock, Trophy, ArrowRight, Loader2 } from "lucide-react";
import { Link } from "wouter";
import PageLayout from "@/components/layout/PageLayout";
import { ReactNode } from "react";

interface AuthGuardProps {
  children: ReactNode;
  title?: string;
  description?: string;
}

export default function AuthGuard({
  children,
  title = "Sign In to Continue",
  description = "Create a free account or sign in to access this feature. It only takes a few seconds.",
}: AuthGuardProps) {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <PageLayout>
        <div className="min-h-[60vh] flex items-center justify-center">
          <div className="text-center">
            <Loader2 className="w-8 h-8 animate-spin text-primary mx-auto mb-4" />
            <p className="text-muted-foreground text-sm">Loading...</p>
          </div>
        </div>
      </PageLayout>
    );
  }

  if (!isAuthenticated) {
    return (
      <PageLayout>
        <div className="min-h-[70vh] flex items-center justify-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-md w-full text-center"
          >
            {/* Icon */}
            <div className="w-20 h-20 rounded-2xl gradient-primary flex items-center justify-center mx-auto mb-6 shadow-lg">
              <Lock className="w-10 h-10 text-white" />
            </div>

            {/* Title */}
            <h1
              className="text-2xl md:text-3xl font-bold mb-3"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              {title}
            </h1>

            {/* Description */}
            <p className="text-muted-foreground mb-8 leading-relaxed">
              {description}
            </p>

            {/* Benefits */}
            <div className="bg-muted/30 rounded-xl p-5 mb-8 text-left space-y-3">
              {[
                "Browse upcoming cricket matches",
                "Build your team with 100-credit budget",
                "Join free contests and compete",
                "Track your performance on leaderboards",
              ].map((benefit, i) => (
                <motion.div
                  key={benefit}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <div className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
                    <Trophy className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-sm text-muted-foreground">{benefit}</span>
                </motion.div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/login">
                <Button
                  size="lg"
                  className="w-full sm:w-auto rounded-full gradient-primary border-0 text-white shadow-md hover:shadow-lg transition-shadow"
                >
                  Sign In <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <Link href="/register">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto rounded-full"
                >
                  Create Account
                </Button>
              </Link>
            </div>

            <p className="text-xs text-muted-foreground mt-6">
              100% free — no payment required, ever.
            </p>
          </motion.div>
        </div>
      </PageLayout>
    );
  }

  return <>{children}</>;
}
