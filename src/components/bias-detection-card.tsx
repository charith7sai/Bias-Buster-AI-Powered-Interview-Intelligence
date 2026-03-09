"use client";

import {
  AlertTriangle,
  ShieldCheck,
  ShieldAlert,
  Info,
} from "lucide-react";
import type { DetectInterviewerBiasOutput } from "@/app/actions";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";

interface BiasDetectionCardProps {
  biasDetection: DetectInterviewerBiasOutput;
}

const severityMap = {
  Low: {
    icon: ShieldCheck,
    color: "bg-emerald-500",
    text: "Low",
    className: "border-emerald-500/30 text-emerald-700 dark:text-emerald-400 bg-emerald-50/50 dark:bg-emerald-950/10",
  },
  Medium: {
    icon: ShieldAlert,
    color: "bg-amber-500",
    text: "Medium",
    className: "border-amber-500/30 text-amber-700 dark:text-amber-400 bg-amber-50/50 dark:bg-amber-950/10",
  },
  High: {
    icon: AlertTriangle,
    color: "bg-destructive",
    text: "High",
    className: "border-destructive/30 text-destructive dark:text-destructive bg-destructive/5",
  },
};

export function BiasDetectionCard({ biasDetection }: BiasDetectionCardProps) {
  const hasBias = biasDetection.biases && biasDetection.biases.length > 0;

  return (
    <Card className="transition-all duration-300 hover:shadow-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-primary/10">
            <AlertTriangle className="w-5 h-5 text-primary" />
          </div>
          Interviewer Bias Detection
        </CardTitle>
        <CardDescription>
          AI-driven analysis of potential bias patterns in interview dynamics.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="p-4 rounded-xl bg-accent/30 border border-border/50">
          <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-2">Overall Assessment</h3>
          <p className="text-foreground leading-relaxed font-medium">{biasDetection.overallAssessment}</p>
        </div>
        
        {hasBias ? (
          <Accordion type="single" collapsible className="w-full">
            {biasDetection.biases.map((bias, index) => {
              const severityInfo =
                severityMap[bias.severity as keyof typeof severityMap] || severityMap.Low;
              return (
                <AccordionItem value={`item-${index}`} key={index} className="border-none mb-3 last:mb-0">
                  <AccordionTrigger className="p-4 rounded-xl border border-border/50 hover:bg-accent/50 hover:no-underline transition-all [&[data-state=open]]:rounded-b-none [&[data-state=open]]:border-b-0">
                    <div className="flex items-center gap-4 flex-1">
                      <div className={cn("p-2 rounded-full", severityInfo.className)}>
                        <severityInfo.icon className="w-4 h-4" />
                      </div>
                      <span className="font-bold text-base">{bias.biasType}</span>
                      <Badge variant="outline" className={cn("ml-auto mr-4 px-3", severityInfo.className)}>
                        {severityInfo.text} severity
                      </Badge>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="p-6 rounded-b-xl border border-t-0 border-border/50 bg-accent/10 space-y-4">
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-2">Analysis</h4>
                      <p className="text-sm leading-relaxed">{bias.description}</p>
                    </div>
                    {bias.example && (
                      <div className="p-4 rounded-lg bg-card border border-border/40 shadow-sm italic text-muted-foreground">
                        <span className="text-primary not-italic font-bold block text-[10px] uppercase tracking-widest mb-2">Transcript Reference:</span>
                        "{bias.example}"
                      </div>
                    )}
                  </AccordionContent>
                </AccordionItem>
              );
            })}
          </Accordion>
        ) : (
          <div className="flex flex-col items-center p-12 text-center bg-emerald-50/30 dark:bg-emerald-950/5 rounded-2xl border border-emerald-100/50 dark:border-emerald-900/20 justify-center">
            <div className="p-4 rounded-full bg-emerald-100/50 dark:bg-emerald-900/30 text-emerald-600 mb-4 animate-in zoom-in duration-500">
              <ShieldCheck className="w-10 h-10" />
            </div>
            <h4 className="text-xl font-bold text-emerald-700 dark:text-emerald-400 mb-2">No Bias Detected</h4>
            <p className="text-emerald-600/70 dark:text-emerald-500/60 max-w-sm">
              The AI found no indicators of common cognitive biases in this interview transcript.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
