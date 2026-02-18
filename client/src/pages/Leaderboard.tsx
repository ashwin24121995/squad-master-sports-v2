import { motion } from "framer-motion";
import { Link } from "wouter";
import { Trophy, Medal, Crown, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import PageLayout from "@/components/layout/PageLayout";
import AuthGuard from "@/components/AuthGuard";
import { leaderboard } from "@/data/staticData";

function getRankDisplay(rank: number) {
  if (rank === 1) return { icon: Crown, color: "text-amber-500", bg: "bg-amber-50", ring: "ring-amber-200" };
  if (rank === 2) return { icon: Medal, color: "text-gray-400", bg: "bg-gray-50", ring: "ring-gray-200" };
  if (rank === 3) return { icon: Medal, color: "text-amber-700", bg: "bg-amber-50/50", ring: "ring-amber-100" };
  return { icon: null, color: "text-muted-foreground", bg: "", ring: "" };
}

export default function Leaderboard() {
  return (
    <AuthGuard title="Sign In to View Leaderboard" description="Sign in to see the global rankings and track your position among other players.">
    <PageLayout>
      <section className="gradient-hero text-white py-12 lg:py-16">
        <div className="container text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-3xl md:text-4xl font-bold mb-3" style={{ fontFamily: "var(--font-heading)" }}>Global Leaderboard</h1>
            <p className="text-white/70 max-w-xl mx-auto">See how you stack up against the best cricket players on the platform.</p>
          </motion.div>
        </div>
      </section>

      <section className="py-10 lg:py-16">
        <div className="container max-w-4xl">
          {/* Top 3 Podium */}
          <div className="grid grid-cols-3 gap-4 mb-10">
            {[leaderboard[1], leaderboard[0], leaderboard[2]].map((entry, i) => {
              if (!entry) return null;
              const order = [2, 1, 3][i];
              const height = order === 1 ? "h-32" : order === 2 ? "h-24" : "h-20";
              const rankInfo = getRankDisplay(entry.rank);
              return (
                <motion.div key={entry.rank} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.15 }} className="text-center">
                  <div className={`w-14 h-14 md:w-16 md:h-16 rounded-full gradient-primary mx-auto mb-2 flex items-center justify-center text-white font-bold text-lg ring-4 ${rankInfo.ring}`}>
                    {entry.name[0]}
                  </div>
                  <div className="text-sm font-semibold truncate px-1">{entry.name}</div>
                  <div className="text-xs text-muted-foreground mb-2">{entry.totalPoints.toLocaleString()} pts</div>
                  <div className={`${height} rounded-t-xl gradient-primary flex items-end justify-center pb-3`}>
                    <span className="text-white font-bold text-2xl">#{entry.rank}</span>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Full Leaderboard Table */}
          <Card className="border-border/50 overflow-hidden">
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border/50 bg-muted/30">
                      <th className="text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider py-3 px-4 w-16">Rank</th>
                      <th className="text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider py-3 px-4">Player</th>
                      <th className="text-center text-xs font-semibold text-muted-foreground uppercase tracking-wider py-3 px-4">Matches</th>
                      <th className="text-center text-xs font-semibold text-muted-foreground uppercase tracking-wider py-3 px-4">Wins</th>
                      <th className="text-right text-xs font-semibold text-muted-foreground uppercase tracking-wider py-3 px-4">Points</th>
                    </tr>
                  </thead>
                  <tbody>
                    {leaderboard.map((entry, i) => {
                      const rankInfo = getRankDisplay(entry.rank);
                      return (
                        <motion.tr
                          key={entry.rank}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.03 }}
                          className={`border-b border-border/30 hover:bg-muted/20 transition-colors ${entry.rank <= 3 ? rankInfo.bg : ""}`}
                        >
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-1">
                              {rankInfo.icon ? (
                                <rankInfo.icon className={`w-5 h-5 ${rankInfo.color}`} />
                              ) : (
                                <span className="text-sm font-medium text-muted-foreground w-5 text-center">{entry.rank}</span>
                              )}
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-full gradient-primary flex items-center justify-center text-white text-xs font-bold shrink-0">
                                {entry.name[0]}
                              </div>
                              <span className="text-sm font-medium">{entry.name}</span>
                            </div>
                          </td>
                          <td className="py-3 px-4 text-center text-sm text-muted-foreground">{entry.matchesPlayed}</td>
                          <td className="py-3 px-4 text-center text-sm text-muted-foreground">{entry.contestsWon}</td>
                          <td className="py-3 px-4 text-right">
                            <span className="text-sm font-semibold text-primary">{entry.totalPoints.toLocaleString()}</span>
                          </td>
                        </motion.tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Internal Links for SEO */}
          <div className="mt-8 text-center">
            <p className="text-muted-foreground mb-4">Want to climb the leaderboard? Join contests and build winning teams!</p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link href="/contests">
                <Button variant="outline" size="sm">Join Contests</Button>
              </Link>
              <Link href="/dashboard">
                <Button variant="outline" size="sm">View Dashboard</Button>
              </Link>
              <Link href="/how-to-play">
                <Button variant="outline" size="sm">How to Play</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
    </AuthGuard>
  );
}
