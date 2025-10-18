import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { Dna, Trophy, FileText, Calculator, BookOpen, FlaskConical, ArrowRight, CheckCircle, AlertTriangle, Info } from "lucide-react";

const Index = () => {
  const features = [
    {
      icon: Trophy,
      title: "Competition Dashboard",
      description: "Track metrics, timelines, and leaderboard standings in real-time",
      link: "/dashboard",
      color: "text-primary",
    },
    {
      icon: FileText,
      title: "Submission Builder",
      description: "Create, validate, and format your prediction files with ease",
      link: "/submission",
      color: "text-accent",
    },
    {
      icon: FlaskConical,
      title: "Protein Explorer",
      description: "Browse protein sequences, structures, and functional annotations",
      link: "/explorer",
      color: "text-secondary",
    },
    {
      icon: Calculator,
      title: "Metrics Calculator",
      description: "Calculate F1 scores and understand evaluation metrics",
      link: "/calculator",
      color: "text-go-bp",
    },
    {
      icon: BookOpen,
      title: "Learning Resources",
      description: "Access tutorials, papers, databases, and tools",
      link: "/resources",
      color: "text-go-mf",
    },
  ];

  const highlights = [
    {
      icon: CheckCircle,
      title: "142,000+ Proteins",
      description: "in the test superset",
    },
    {
      icon: AlertTriangle,
      title: "3 Subontologies",
      description: "MF, BP, and CC evaluated",
    },
    {
      icon: Info,
      title: "Weighted F1-Measure",
      description: "using information accretion",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <div className="inline-block mb-6">
            <div className="w-20 h-20 mx-auto rounded-2xl bg-gradient-hero flex items-center justify-center shadow-glow">
              <Dna className="w-12 h-12 text-white" />
            </div>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-hero bg-clip-text text-transparent">
            CAFA Protein Function
            <br />
            Prediction Platform
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Complete toolkit for the Critical Assessment of Functional Annotation competition.
            Build, validate, and analyze protein function predictions with advanced tools and resources.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link to="/dashboard">
              <Button size="lg" className="gap-2 shadow-lg">
                View Dashboard
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <Link to="/submission">
              <Button size="lg" variant="outline" className="gap-2">
                <FileText className="w-4 h-4" />
                Create Submission
              </Button>
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {highlights.map((highlight, idx) => {
            const Icon = highlight.icon;
            return (
              <Card key={idx} className="bg-card shadow-md border-2 border-border">
                <CardContent className="pt-6 text-center">
                  <Icon className="w-12 h-12 mx-auto mb-4 text-primary" />
                  <div className="text-2xl font-bold mb-1">{highlight.title}</div>
                  <p className="text-muted-foreground">{highlight.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="mb-8">
          <h2 className="text-3xl font-bold text-center mb-8">Platform Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <Link key={idx} to={feature.link}>
                  <Card className="h-full bg-gradient-card shadow-md hover:shadow-glow transition-all duration-300 hover:-translate-y-1 cursor-pointer">
                    <CardHeader>
                      <Icon className={`w-10 h-10 mb-3 ${feature.color}`} />
                      <CardTitle className="text-xl">{feature.title}</CardTitle>
                      <CardDescription className="text-base">
                        {feature.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button variant="ghost" className="gap-2 p-0 h-auto font-medium">
                        Explore
                        <ArrowRight className="w-4 h-4" />
                      </Button>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>

        <Card className="shadow-lg bg-gradient-hero text-white border-0">
          <CardContent className="p-8 md:p-12">
            <div className="max-w-3xl">
              <h3 className="text-3xl font-bold mb-4">About CAFA</h3>
              <p className="text-white/90 mb-6 leading-relaxed">
                The Critical Assessment of Functional Annotation (CAFA) is a community-driven experiment
                designed to provide a large-scale assessment of computational methods dedicated to predicting
                protein function. Participants predict Gene Ontology (GO) terms across three subontologies:
                Molecular Function (MF), Biological Process (BP), and Cellular Component (CC).
              </p>
              <div className="flex flex-wrap gap-3">
                <Badge className="bg-white/20 text-white hover:bg-white/30 px-4 py-2 text-sm">
                  Prospective Competition
                </Badge>
                <Badge className="bg-white/20 text-white hover:bg-white/30 px-4 py-2 text-sm">
                  Future Test Data
                </Badge>
                <Badge className="bg-white/20 text-white hover:bg-white/30 px-4 py-2 text-sm">
                  Experimental Validation
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;
