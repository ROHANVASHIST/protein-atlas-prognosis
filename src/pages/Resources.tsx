import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { BookOpen, FileText, Video, ExternalLink, Database, Code2 } from "lucide-react";

const Resources = () => {
  const tutorials = [
    {
      title: "Getting Started with CAFA",
      description: "Introduction to the competition format and goals",
      type: "Tutorial",
      difficulty: "Beginner",
    },
    {
      title: "Understanding GO Ontologies",
      description: "Deep dive into Molecular Function, Biological Process, and Cellular Component",
      type: "Guide",
      difficulty: "Intermediate",
    },
    {
      title: "Evaluation Metrics Explained",
      description: "How weighted F1-measures and information accretion work",
      type: "Tutorial",
      difficulty: "Advanced",
    },
    {
      title: "Submission File Format",
      description: "Step-by-step guide to formatting your predictions",
      type: "Guide",
      difficulty: "Beginner",
    },
  ];

  const papers = [
    {
      title: "An expanded evaluation of protein function prediction methods shows an improvement in accuracy",
      authors: "Jiang Y, et al.",
      journal: "Genome Biology (2016)",
      citation: "17(1): 184",
    },
    {
      title: "The functional landscape of the human phosphoproteome",
      authors: "Ochoa D, et al.",
      journal: "Nature Biotechnology (2020)",
      citation: "38: 365-373",
    },
    {
      title: "Computational approaches for protein function prediction",
      authors: "Radivojac P, et al.",
      journal: "Nature Methods (2013)",
      citation: "10: 221-227",
    },
  ];

  const databases = [
    {
      name: "UniProtKB",
      description: "Comprehensive protein sequence and annotation database",
      url: "https://www.uniprot.org",
      type: "Primary",
    },
    {
      name: "Gene Ontology",
      description: "The official Gene Ontology resource and database",
      url: "http://geneontology.org",
      type: "Ontology",
    },
    {
      name: "PDB",
      description: "Protein Data Bank - 3D structural data",
      url: "https://www.rcsb.org",
      type: "Structure",
    },
    {
      name: "InterPro",
      description: "Protein families, domains and functional sites",
      url: "https://www.ebi.ac.uk/interpro",
      type: "Domains",
    },
  ];

  const tools = [
    {
      name: "BLAST",
      description: "Basic Local Alignment Search Tool for sequence similarity",
      language: "Web/CLI",
    },
    {
      name: "DeepGOPlus",
      description: "Deep learning based GO term prediction",
      language: "Python",
    },
    {
      name: "NetGO",
      description: "Network-based Gene Ontology annotation",
      language: "Python",
    },
    {
      name: "CAFA Toolkit",
      description: "Official evaluation scripts and utilities",
      language: "Python",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2 bg-gradient-hero bg-clip-text text-transparent">
          Learning Resources
        </h1>
        <p className="text-muted-foreground">
          Tutorials, papers, databases, and tools for protein function prediction
        </p>
      </div>

      <Tabs defaultValue="tutorials" className="space-y-6">
        <TabsList className="grid grid-cols-2 md:grid-cols-4 w-full">
          <TabsTrigger value="tutorials" className="gap-2">
            <BookOpen className="w-4 h-4" />
            Tutorials
          </TabsTrigger>
          <TabsTrigger value="papers" className="gap-2">
            <FileText className="w-4 h-4" />
            Papers
          </TabsTrigger>
          <TabsTrigger value="databases" className="gap-2">
            <Database className="w-4 h-4" />
            Databases
          </TabsTrigger>
          <TabsTrigger value="tools" className="gap-2">
            <Code2 className="w-4 h-4" />
            Tools
          </TabsTrigger>
        </TabsList>

        <TabsContent value="tutorials" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {tutorials.map((tutorial, idx) => (
              <Card key={idx} className="shadow-md hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg mb-2">{tutorial.title}</CardTitle>
                      <CardDescription>{tutorial.description}</CardDescription>
                    </div>
                    <ExternalLink className="w-4 h-4 text-muted-foreground" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-2">
                    <Badge variant="outline">{tutorial.type}</Badge>
                    <Badge
                      className={
                        tutorial.difficulty === "Beginner"
                          ? "bg-accent text-white"
                          : tutorial.difficulty === "Intermediate"
                          ? "bg-secondary text-white"
                          : "bg-destructive text-white"
                      }
                    >
                      {tutorial.difficulty}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="papers" className="space-y-4">
          {papers.map((paper, idx) => (
            <Card key={idx} className="shadow-md hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <CardTitle className="text-lg flex items-start justify-between">
                  <span className="flex-1">{paper.title}</span>
                  <ExternalLink className="w-4 h-4 text-muted-foreground ml-2" />
                </CardTitle>
                <CardDescription>
                  {paper.authors}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2 text-sm">
                  <FileText className="w-4 h-4 text-primary" />
                  <span className="font-medium">{paper.journal}</span>
                  <span className="text-muted-foreground">{paper.citation}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="databases" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {databases.map((db, idx) => (
              <Card key={idx} className="shadow-md hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Database className="w-5 h-5 text-primary" />
                        {db.name}
                      </CardTitle>
                      <CardDescription className="mt-2">{db.description}</CardDescription>
                    </div>
                    <ExternalLink className="w-4 h-4 text-muted-foreground" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <Badge variant="outline">{db.type}</Badge>
                    <code className="text-xs text-muted-foreground">{db.url}</code>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="tools" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {tools.map((tool, idx) => (
              <Card key={idx} className="shadow-md hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Code2 className="w-5 h-5 text-accent" />
                        {tool.name}
                      </CardTitle>
                      <CardDescription className="mt-2">{tool.description}</CardDescription>
                    </div>
                    <ExternalLink className="w-4 h-4 text-muted-foreground" />
                  </div>
                </CardHeader>
                <CardContent>
                  <Badge className="bg-secondary text-white">{tool.language}</Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      <Card className="shadow-md mt-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Video className="w-5 h-5 text-primary" />
            Video Tutorials
          </CardTitle>
          <CardDescription>
            Watch comprehensive video guides on protein function prediction
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="aspect-video bg-gradient-subtle rounded-lg flex items-center justify-center border border-border">
              <div className="text-center">
                <Video className="w-12 h-12 text-muted-foreground mx-auto mb-2" />
                <p className="text-sm font-medium">CAFA Overview</p>
                <p className="text-xs text-muted-foreground">15 min</p>
              </div>
            </div>
            <div className="aspect-video bg-gradient-subtle rounded-lg flex items-center justify-center border border-border">
              <div className="text-center">
                <Video className="w-12 h-12 text-muted-foreground mx-auto mb-2" />
                <p className="text-sm font-medium">GO Ontologies</p>
                <p className="text-xs text-muted-foreground">22 min</p>
              </div>
            </div>
            <div className="aspect-video bg-gradient-subtle rounded-lg flex items-center justify-center border border-border">
              <div className="text-center">
                <Video className="w-12 h-12 text-muted-foreground mx-auto mb-2" />
                <p className="text-sm font-medium">ML Approaches</p>
                <p className="text-xs text-muted-foreground">35 min</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Resources;
