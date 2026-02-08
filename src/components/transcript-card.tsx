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
  const formattedTranscript = transcript
    .split("\n")
    .map((line, index) => {
      if (line.startsWith("Interviewer:")) {
        return (
          <p key={index} className="mb-2">
            <span className="font-semibold text-primary">Interviewer:</span>
            {line.substring(12)}
          </p>
        );
      }
      if (line.startsWith("Candidate:")) {
        return (
          <p key={index} className="mb-2">
            <span className="font-semibold text-accent-foreground">Candidate:</span>
            {line.substring(10)}
          </p>
        );
      }
      return (
        <p key={index} className="mb-2">
          {line}
        </p>
      );
    });

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ScrollText className="text-primary" />
          Interview Transcript
        </CardTitle>
        <CardDescription>
          The full, diarized transcript of the interview.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-72 w-full rounded-md border p-4 bg-muted/30">
          <div className="text-sm">{formattedTranscript}</div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
