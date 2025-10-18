import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calculator as CalcIcon, Info, TrendingUp } from "lucide-react";
import { toast } from "sonner";

const Calculator = () => {
  const [precision, setPrecision] = useState("");
  const [recall, setRecall] = useState("");
  const [f1Score, setF1Score] = useState<number | null>(null);

  const calculateF1 = () => {
    const p = parseFloat(precision);
    const r = parseFloat(recall);
    
    if (isNaN(p) || isNaN(r) || p < 0 || p > 1 || r < 0 || r > 1) {
      toast.error("Please enter valid precision and recall values between 0 and 1");
      return;
    }
    
    if (p + r === 0) {
      setF1Score(0);
      toast.warning("F1 score is 0 (precision + recall = 0)");
      return;
    }
    
    const f1 = (2 * p * r) / (p + r);
    setF1Score(f1);
    toast.success("F1 score calculated successfully!");
  };

  const informationAccretion = [
    { term: "GO:0003674", name: "molecular_function", ia: 0.0, ontology: "MF" },
    { term: "GO:0008150", name: "biological_process", ia: 0.0, ontology: "BP" },
    { term: "GO:0005575", name: "cellular_component", ia: 0.0, ontology: "CC" },
    { term: "GO:0003824", name: "catalytic activity", ia: 1.2, ontology: "MF" },
    { term: "GO:0009987", name: "cellular process", ia: 0.8, ontology: "BP" },
    { term: "GO:0044464", name: "cell part", ia: 0.5, ontology: "CC" },
    { term: "GO:0016740", name: "transferase activity", ia: 2.1, ontology: "MF" },
    { term: "GO:0006810", name: "transport", ia: 1.9, ontology: "BP" },
    { term: "GO:0005634", name: "nucleus", ia: 1.7, ontology: "CC" },
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
          Evaluation Metrics Calculator
        </h1>
        <p className="text-muted-foreground">
          Calculate F1 scores and explore information accretion weights
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CalcIcon className="w-5 h-5 text-primary" />
              F1 Score Calculator
            </CardTitle>
            <CardDescription>
              Calculate the harmonic mean of precision and recall
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Precision</label>
              <Input
                type="number"
                step="0.001"
                min="0"
                max="1"
                value={precision}
                onChange={(e) => setPrecision(e.target.value)}
                placeholder="0.850"
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Recall</label>
              <Input
                type="number"
                step="0.001"
                min="0"
                max="1"
                value={recall}
                onChange={(e) => setRecall(e.target.value)}
                placeholder="0.820"
              />
            </div>
            
            <Button onClick={calculateF1} className="w-full gap-2">
              <CalcIcon className="w-4 h-4" />
              Calculate F1 Score
            </Button>
            
            {f1Score !== null && (
              <div className="mt-4 p-6 bg-gradient-card rounded-lg border-2 border-primary">
                <div className="text-sm text-muted-foreground mb-1">F1 Score</div>
                <div className="text-4xl font-bold text-primary">{f1Score.toFixed(4)}</div>
                <div className="mt-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Precision:</span>
                    <span className="font-medium">{parseFloat(precision).toFixed(4)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Recall:</span>
                    <span className="font-medium">{parseFloat(recall).toFixed(4)}</span>
                  </div>
                </div>
              </div>
            )}
            
            <div className="mt-4 p-4 bg-muted/50 rounded-lg">
              <div className="flex items-start gap-2">
                <Info className="w-4 h-4 text-primary mt-0.5" />
                <div className="text-sm">
                  <div className="font-medium mb-1">Formula:</div>
                  <code className="text-xs">F1 = 2 × (Precision × Recall) / (Precision + Recall)</code>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-accent" />
              Evaluation Overview
            </CardTitle>
            <CardDescription>
              Understanding the CAFA evaluation metrics
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="p-3 bg-gradient-subtle rounded-lg border border-border">
                <div className="font-semibold mb-1">Weighted Precision & Recall</div>
                <p className="text-sm text-muted-foreground">
                  Metrics are weighted by information accretion (ia) to account for GO hierarchy
                </p>
              </div>
              
              <div className="p-3 bg-gradient-subtle rounded-lg border border-border">
                <div className="font-semibold mb-1">Maximum F1-Measure</div>
                <p className="text-sm text-muted-foreground">
                  The best F1 score across all possible score thresholds for each subontology
                </p>
              </div>
              
              <div className="p-3 bg-gradient-subtle rounded-lg border border-border">
                <div className="font-semibold mb-1">Final Score</div>
                <p className="text-sm text-muted-foreground">
                  Arithmetic mean of maximum F1 scores for MF, BP, and CC subontologies
                </p>
              </div>
              
              <div className="p-3 bg-gradient-subtle rounded-lg border border-border">
                <div className="font-semibold mb-1">Knowledge Categories</div>
                <p className="text-sm text-muted-foreground">
                  Evaluated across no-knowledge, limited-knowledge, and partial-knowledge targets
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="shadow-md">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Info className="w-5 h-5 text-secondary" />
            Information Accretion (ia) Sample Weights
          </CardTitle>
          <CardDescription>
            Example GO term weights used in evaluation (lower ia = more general terms)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left p-3 font-semibold">GO Term</th>
                  <th className="text-left p-3 font-semibold">Name</th>
                  <th className="text-left p-3 font-semibold">Ontology</th>
                  <th className="text-right p-3 font-semibold">IA Weight</th>
                </tr>
              </thead>
              <tbody>
                {informationAccretion.map((item, idx) => (
                  <tr
                    key={item.term}
                    className={`border-b border-border hover:bg-muted/50 transition-colors ${idx < 3 ? "bg-muted/30" : ""}`}
                  >
                    <td className="p-3 font-mono text-sm">{item.term}</td>
                    <td className="p-3">{item.name}</td>
                    <td className="p-3">
                      <Badge className={`${goOntologyColors[item.ontology as keyof typeof goOntologyColors]} text-white`}>
                        {item.ontology}
                      </Badge>
                    </td>
                    <td className="p-3 text-right font-mono">{item.ia.toFixed(1)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-sm text-muted-foreground mt-4">
            Root terms (MF, BP, CC) have ia=0 as they appear in all annotations. Deeper, more specific terms have higher ia values.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Calculator;
