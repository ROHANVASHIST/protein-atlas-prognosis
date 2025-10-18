import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Upload, FileCheck, AlertCircle, Download, Code } from "lucide-react";

const Submission = () => {
  const [submissionText, setSubmissionText] = useState("");
  const [validationResults, setValidationResults] = useState<any>(null);

  const validateSubmission = () => {
    const lines = submissionText.trim().split("\n");
    const errors: string[] = [];
    const warnings: string[] = [];
    let goTermCount = 0;
    let textCount = 0;
    
    lines.forEach((line, idx) => {
      const parts = line.split("\t");
      
      if (parts.length < 3) {
        errors.push(`Line ${idx + 1}: Invalid format - needs at least 3 tab-separated fields`);
        return;
      }
      
      const [proteinId, termOrText, score] = parts;
      
      if (!proteinId.match(/^[A-Z0-9]+$/)) {
        warnings.push(`Line ${idx + 1}: Protein ID "${proteinId}" may be invalid`);
      }
      
      if (termOrText === "Text") {
        textCount++;
      } else if (termOrText.startsWith("GO:")) {
        goTermCount++;
        if (!termOrText.match(/^GO:\d{7}$/)) {
          errors.push(`Line ${idx + 1}: Invalid GO term format "${termOrText}"`);
        }
      } else {
        errors.push(`Line ${idx + 1}: Second field must be GO term or "Text"`);
      }
      
      const scoreNum = parseFloat(score);
      if (isNaN(scoreNum) || scoreNum <= 0 || scoreNum > 1) {
        errors.push(`Line ${idx + 1}: Score must be between 0 and 1`);
      }
    });
    
    setValidationResults({
      totalLines: lines.length,
      goTerms: goTermCount,
      textPredictions: textCount,
      errors,
      warnings,
      isValid: errors.length === 0,
    });
    
    if (errors.length === 0) {
      toast.success("Validation passed! Your submission format is correct.");
    } else {
      toast.error(`Found ${errors.length} error(s) in your submission.`);
    }
  };

  const downloadExample = () => {
    const example = `P9WHI7\tGO:0009274\t0.931
P9WHI7\tGO:0071944\t0.540
P9WHI7\tGO:0005575\t0.324
P9WHI7\tText\t0.123\tP9WHI7 is involved in homologous recombinational repair
P04637\tGO:1990837\t0.230
P04637\tGO:0031625\t0.989
P04637\tGO:0043565\t0.640
P04637\tText\t0.234\tMultifunctional transcription factor that induces cell cycle arrest`;
    
    const blob = new Blob([example], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "example_submission.tsv";
    a.click();
    URL.revokeObjectURL(url);
    toast.success("Example file downloaded!");
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2 bg-gradient-hero bg-clip-text text-transparent">
          Submission Builder
        </h1>
        <p className="text-muted-foreground">
          Create, validate, and prepare your competition submission file
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Code className="w-5 h-5 text-primary" />
              Format Requirements
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <div className="flex items-start gap-2">
              <div className="w-2 h-2 rounded-full bg-primary mt-2"></div>
              <span>Tab-separated values (TSV format)</span>
            </div>
            <div className="flex items-start gap-2">
              <div className="w-2 h-2 rounded-full bg-primary mt-2"></div>
              <span>Protein ID, GO term/Text, Score (0-1)</span>
            </div>
            <div className="flex items-start gap-2">
              <div className="w-2 h-2 rounded-full bg-primary mt-2"></div>
              <span>Max 1500 terms per protein (MF+BP+CC)</span>
            </div>
            <div className="flex items-start gap-2">
              <div className="w-2 h-2 rounded-full bg-primary mt-2"></div>
              <span>Score: up to 3 significant figures</span>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-md">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <FileCheck className="w-5 h-5 text-accent" />
              GO Term Format
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <div className="p-2 bg-muted rounded">
              <code>P9WHI7 GO:0009274 0.931</code>
            </div>
            <div className="space-y-1">
              <Badge className="bg-go-mf text-white">MF</Badge>
              <Badge className="bg-go-bp text-white ml-2">BP</Badge>
              <Badge className="bg-go-cc text-white ml-2">CC</Badge>
              <p className="text-muted-foreground mt-2">
                All three subontologies combined
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-md">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-secondary" />
              Text Predictions
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <div className="p-2 bg-muted rounded text-xs">
              <code>P04637 Text 0.234 Multifunctional...</code>
            </div>
            <div className="space-y-1">
              <p className="text-muted-foreground">
                Optional free text description (max 3000 chars per protein)
              </p>
              <p className="text-muted-foreground text-xs">
                Up to 5 lines per protein with different confidence levels
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="shadow-md mb-6">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Submission Editor</CardTitle>
              <CardDescription>Paste or type your submission data below</CardDescription>
            </div>
            <Button variant="outline" onClick={downloadExample} className="gap-2">
              <Download className="w-4 h-4" />
              Example File
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Textarea
            value={submissionText}
            onChange={(e) => setSubmissionText(e.target.value)}
            placeholder="P9WHI7	GO:0009274	0.931
P9WHI7	GO:0071944	0.540
P04637	GO:1990837	0.230
P04637	Text	0.234	Multifunctional transcription factor..."
            className="font-mono text-sm min-h-[300px]"
          />
          <div className="mt-4 flex gap-3">
            <Button onClick={validateSubmission} className="gap-2">
              <Upload className="w-4 h-4" />
              Validate Submission
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                setSubmissionText("");
                setValidationResults(null);
              }}
            >
              Clear
            </Button>
          </div>
        </CardContent>
      </Card>

      {validationResults && (
        <Card className={validationResults.isValid ? "border-accent" : "border-destructive"}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {validationResults.isValid ? (
                <FileCheck className="w-5 h-5 text-accent" />
              ) : (
                <AlertCircle className="w-5 h-5 text-destructive" />
              )}
              Validation Results
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
              <div className="p-3 bg-muted rounded">
                <div className="text-sm text-muted-foreground">Total Lines</div>
                <div className="text-2xl font-bold">{validationResults.totalLines}</div>
              </div>
              <div className="p-3 bg-muted rounded">
                <div className="text-sm text-muted-foreground">GO Terms</div>
                <div className="text-2xl font-bold">{validationResults.goTerms}</div>
              </div>
              <div className="p-3 bg-muted rounded">
                <div className="text-sm text-muted-foreground">Text Predictions</div>
                <div className="text-2xl font-bold">{validationResults.textPredictions}</div>
              </div>
              <div className="p-3 bg-muted rounded">
                <div className="text-sm text-muted-foreground">Errors</div>
                <div className={`text-2xl font-bold ${validationResults.errors.length > 0 ? "text-destructive" : "text-accent"}`}>
                  {validationResults.errors.length}
                </div>
              </div>
            </div>

            {validationResults.errors.length > 0 && (
              <div className="mb-4">
                <h4 className="font-semibold text-destructive mb-2">Errors:</h4>
                <div className="space-y-1">
                  {validationResults.errors.map((error: string, idx: number) => (
                    <div key={idx} className="text-sm bg-destructive/10 text-destructive p-2 rounded">
                      {error}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {validationResults.warnings.length > 0 && (
              <div>
                <h4 className="font-semibold text-secondary mb-2">Warnings:</h4>
                <div className="space-y-1">
                  {validationResults.warnings.map((warning: string, idx: number) => (
                    <div key={idx} className="text-sm bg-secondary/10 text-secondary p-2 rounded">
                      {warning}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Submission;
