import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Calendar, Users, FileCheck, TrendingUp, Award, Clock } from "lucide-react";

const Dashboard = () => {
  const stats = [
    { label: "Registered Teams", value: "342", icon: Users, color: "text-primary" },
    { label: "Submissions", value: "1,247", icon: FileCheck, color: "text-accent" },
    { label: "Test Proteins", value: "8,456", icon: TrendingUp, color: "text-secondary" },
    { label: "Days Remaining", value: "45", icon: Clock, color: "text-go-bp" },
  ];

  const phases = [
    { name: "Training Phase", progress: 100, status: "completed" },
    { name: "Submission Phase", progress: 65, status: "active" },
    { name: "Curation Phase", progress: 0, status: "upcoming" },
    { name: "Evaluation Phase", progress: 0, status: "upcoming" },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2 bg-gradient-hero bg-clip-text text-transparent">
          Competition Dashboard
        </h1>
        <p className="text-muted-foreground">
          Track your progress and stay updated with the latest competition metrics
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.label} className="bg-gradient-card shadow-md hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.label}
                </CardTitle>
                <Icon className={`w-5 h-5 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{stat.value}</div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-primary" />
              Competition Timeline
            </CardTitle>
            <CardDescription>Current phase and upcoming milestones</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {phases.map((phase) => (
              <div key={phase.name} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-medium">{phase.name}</span>
                  <Badge
                    variant={
                      phase.status === "completed" 
                        ? "default" 
                        : phase.status === "active" 
                        ? "secondary" 
                        : "outline"
                    }
                  >
                    {phase.status}
                  </Badge>
                </div>
                <Progress value={phase.progress} className="h-2" />
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="w-5 h-5 text-accent" />
              Latest Leaderboard
            </CardTitle>
            <CardDescription>Top performing teams (sample data)</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { rank: 1, team: "DeepProtein AI", score: 0.8456 },
                { rank: 2, team: "BioML Solutions", score: 0.8234 },
                { rank: 3, team: "ProteinNet", score: 0.8102 },
                { rank: 4, team: "FunctionPred", score: 0.7998 },
                { rank: 5, team: "GOAnnotator", score: 0.7876 },
              ].map((entry) => (
                <div
                  key={entry.rank}
                  className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                        entry.rank === 1
                          ? "bg-gradient-hero text-white"
                          : entry.rank === 2
                          ? "bg-secondary text-secondary-foreground"
                          : entry.rank === 3
                          ? "bg-accent text-accent-foreground"
                          : "bg-muted text-foreground"
                      }`}
                    >
                      {entry.rank}
                    </div>
                    <span className="font-medium">{entry.team}</span>
                  </div>
                  <span className="font-mono text-sm">{entry.score.toFixed(4)}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="shadow-md">
        <CardHeader>
          <CardTitle>Important Deadlines</CardTitle>
          <CardDescription>Mark your calendar for these critical dates</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-lg bg-gradient-subtle border border-border">
              <div className="text-sm text-muted-foreground mb-1">Submission Deadline</div>
              <div className="text-xl font-bold">March 15, 2026</div>
            </div>
            <div className="p-4 rounded-lg bg-gradient-subtle border border-border">
              <div className="text-sm text-muted-foreground mb-1">Curation Ends</div>
              <div className="text-xl font-bold">June 30, 2026</div>
            </div>
            <div className="p-4 rounded-lg bg-gradient-subtle border border-border">
              <div className="text-sm text-muted-foreground mb-1">Final Results</div>
              <div className="text-xl font-bold">July 31, 2026</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
