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

interface BiasDetectionCardProps {
  biasDetection: DetectInterviewerBiasOutput;
}

const severityMap = {
  Low: {
    icon: ShieldCheck,
    color: "bg-green-500",
    text: "Low",
    className: "border-green-500/50 text-green-700 dark:text-green-400",
  },
  Medium: {
    icon: ShieldAlert,
    color: "bg-yellow-500",
    text: "Medium",
    className: "border-yellow-500/50 text-yellow-700 dark:text-yellow-400",
  },
  High: {
    icon: AlertTriangle,
    color: "bg-red-500",
    text: "High",
    className: "border-red-500/50 text-red-700 dark:text-red-400",
  },
};

export function BiasDetectionCard({ biasDetection }: BiasDetectionCardProps) {
  const hasBias = biasDetection.biases && biasDetection.biases.length > 0;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <AlertTriangle className="text-primary" />
          Interviewer Bias Detection
        </CardTitle>
        <CardDescription>
          Analysis of potential interviewer bias based on the transcript.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h3 className="font-semibold">Overall Assessment</h3>
          <p className="text-muted-foreground">{biasDetection.overallAssessment}</p>
        </div>
        {hasBias ? (
          <Accordion type="single" collapsible className="w-full">
            {biasDetection.biases.map((bias, index) => {
              const severityInfo =
                severityMap[bias.severity as keyof typeof severityMap] || severityMap.Low;
              return (
                <AccordionItem value={`item-${index}`} key={index}>
                  <AccordionTrigger>
                    <div className="flex items-center gap-3">
                      <severityInfo.icon
                        className={`w-5 h-5 ${severityInfo.className.split(' ').at(-1)}`}
                      />
                      <span className="font-medium">{bias.biasType}</span>
                      <Badge variant="outline" className={severityInfo.className}>
                        {severityInfo.text}
                      </Badge>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="space-y-2">
                    <p>{bias.description}</p>
                    {bias.example && (
                      <blockquote className="pl-4 italic border-l-2 text-muted-foreground">
                        "{bias.example}"
                      </blockquote>
                    )}
                  </AccordionContent>
                </AccordionItem>
              );
            })}
          </Accordion>
        ) : (
          <div className="flex items-center p-4 text-center bg-secondary rounded-lg justify-center">
            <Info className="w-5 h-5 mr-3 text-muted-foreground" />
            <p className="text-muted-foreground">
              No specific biases were automatically detected.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
