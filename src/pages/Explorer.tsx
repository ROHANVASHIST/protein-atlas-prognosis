import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Dna, Info } from "lucide-react";

const Explorer = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const sampleProteins = [
    {
      id: "P9WHI7",
      name: "RecA protein",
      organism: "Mycobacterium tuberculosis",
      length: 352,
      goTerms: [
        { id: "GO:0009274", name: "peptidoglycan-based cell wall", ontology: "CC" },
        { id: "GO:0071944", name: "cell periphery", ontology: "CC" },
        { id: "GO:0005575", name: "cellular component", ontology: "CC" },
      ],
    },
    {
      id: "P04637",
      name: "Cellular tumor antigen p53",
      organism: "Homo sapiens",
      length: 393,
      goTerms: [
        { id: "GO:1990837", name: "sequence-specific double-stranded DNA binding", ontology: "MF" },
        { id: "GO:0031625", name: "ubiquitin protein ligase binding", ontology: "MF" },
        { id: "GO:0043565", name: "sequence-specific DNA binding", ontology: "MF" },
      ],
    },
  ];

  const goOntologyColors = {
    MF: "bg-go-mf",
    BP: "bg-go-bp",
    CC: "bg-go-cc",
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2 bg-gradient-hero bg-clip-text text-transparent">
          Protein Function Explorer
        </h1>
        <p className="text-muted-foreground">
          Browse and analyze protein sequences and their functional annotations
        </p>
      </div>

      <Card className="shadow-md mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="w-5 h-5 text-primary" />
            Search Proteins
          </CardTitle>
          <CardDescription>Search by protein ID, name, or organism</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-3">
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Enter protein ID (e.g., P04637) or name..."
              className="flex-1"
            />
            <Button className="gap-2">
              <Search className="w-4 h-4" />
              Search
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 gap-6">
        {sampleProteins.map((protein) => (
          <Card key={protein.id} className="shadow-md hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Dna className="w-5 h-5 text-primary" />
                    {protein.id} - {protein.name}
                  </CardTitle>
                  <CardDescription className="mt-1">
                    {protein.organism} • {protein.length} amino acids
                  </CardDescription>
                </div>
                <Button variant="outline" size="sm" className="gap-2">
                  <Info className="w-4 h-4" />
                  Details
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="sequence" className="w-full">
                <TabsList>
                  <TabsTrigger value="sequence">Sequence</TabsTrigger>
                  <TabsTrigger value="annotations">GO Annotations</TabsTrigger>
                  <TabsTrigger value="structure">Structure Info</TabsTrigger>
                </TabsList>
                
                <TabsContent value="sequence" className="space-y-3">
                  <div className="bg-muted p-4 rounded-lg">
                    <div className="font-mono text-xs break-all leading-relaxed">
                      MTEYKLVVVGAGGVGKSALTIQLIQNHFVDEYDPTIEDSYRKQVVIDGETCLLDILDTAGQEEYSAMRDQYMRTGEGFLCVFAINNTKSFEDIHHYREQIKRVKDSEDVPMVLVGNKCDLPSRTVDTKQAQDLARSYGIPFIETSAKTRQGVDDAFYTLVREIRQYRLKKISKEEKTPGCVKIKKCIIM
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">
                      Sample sequence (first 200 residues shown)
                    </p>
                  </div>
                </TabsContent>
                
                <TabsContent value="annotations" className="space-y-3">
                  <div className="space-y-2">
                    {protein.goTerms.map((term) => (
                      <div
                        key={term.id}
                        className="flex items-center justify-between p-3 bg-muted rounded-lg hover:bg-muted/80 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <Badge className={`${goOntologyColors[term.ontology as keyof typeof goOntologyColors]} text-white`}>
                            {term.ontology}
                          </Badge>
                          <div>
                            <div className="font-medium">{term.name}</div>
                            <div className="text-sm text-muted-foreground">{term.id}</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="structure" className="space-y-3">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="p-3 bg-muted rounded">
                      <div className="text-sm text-muted-foreground">Molecular Weight</div>
                      <div className="text-lg font-bold">43.7 kDa</div>
                    </div>
                    <div className="p-3 bg-muted rounded">
                      <div className="text-sm text-muted-foreground">Isoelectric Point</div>
                      <div className="text-lg font-bold">6.33</div>
                    </div>
                    <div className="p-3 bg-muted rounded">
                      <div className="text-sm text-muted-foreground">Domains</div>
                      <div className="text-lg font-bold">4</div>
                    </div>
                    <div className="p-3 bg-muted rounded">
                      <div className="text-sm text-muted-foreground">Alpha Helices</div>
                      <div className="text-lg font-bold">28%</div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Explorer;
