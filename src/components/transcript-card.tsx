"use client";

import { ScrollText } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

interface TranscriptCardProps {
  transcript: string;
}

export function TranscriptCard({ transcript }: TranscriptCardProps) {
  const formattedTranscript = (transcript || "")
    .split("\n")
    .map((line, index) => {
      const trimmedLine = line.trim();
      if (!trimmedLine) return <div key={index} className="h-4" />;

      if (trimmedLine.startsWith("Interviewer:")) {
        return (
          <div key={index} className="mb-4">
            <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-primary/20 text-primary mb-1">
              Interviewer
            </span>
            <p className="text-foreground leading-relaxed">
              {trimmedLine.replace(/^Interviewer:\s*/, "")}
            </p>
          </div>
        );
      }
      
      if (trimmedLine.startsWith("Candidate:")) {
        return (
          <div key={index} className="mb-4">
            <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-accent/20 text-accent mb-1">
              Candidate
            </span>
            <p className="text-foreground leading-relaxed">
              {trimmedLine.replace(/^Candidate:\s*/, "")}
            </p>
          </div>
        );
      }

      return (
        <p key={index} className="mb-4 text-muted-foreground leading-relaxed">
          {trimmedLine}
        </p>
      );
    });

  return (
    <Card className="transition-all duration-300 hover:shadow-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-primary/10">
            <ScrollText className="w-5 h-5 text-primary" />
          </div>
          Interview Transcript
        </CardTitle>
        <CardDescription>
          The full, diarized transcript of the interview conversation.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px] w-full rounded-xl border bg-accent/5 p-6">
          <div className="text-sm space-y-2">{formattedTranscript}</div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
