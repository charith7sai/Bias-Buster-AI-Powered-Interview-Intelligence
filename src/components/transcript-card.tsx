"use client";

import { ScrollText, User, MessageSquare } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

interface TranscriptCardProps {
  transcript: string;
}

export function TranscriptCard({ transcript }: TranscriptCardProps) {
  // Parsing the transcript into structured blocks
  const lines = (transcript || "").split("\n").filter(line => line.trim() !== "");
  
  const formattedTranscript = lines.map((line, index) => {
    const trimmedLine = line.trim();
    const isInterviewer = trimmedLine.toLowerCase().startsWith("interviewer:");
    const isCandidate = trimmedLine.toLowerCase().startsWith("candidate:");

    if (isInterviewer) {
      return (
        <div key={index} className="group mb-6 animate-in fade-in slide-in-from-left-2 duration-300">
          <div className="flex items-center gap-2 mb-2">
            <div className="flex items-center justify-center w-6 h-6 rounded-full bg-primary/20 text-primary">
              <MessageSquare className="w-3.5 h-3.5" />
            </div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-primary">
              Interviewer
            </span>
          </div>
          <div className="pl-8">
            <p className="text-foreground leading-relaxed text-sm md:text-base font-medium opacity-90">
              {trimmedLine.replace(/^Interviewer:\s*/i, "")}
            </p>
          </div>
        </div>
      );
    }
    
    if (isCandidate) {
      return (
        <div key={index} className="group mb-6 animate-in fade-in slide-in-from-right-2 duration-300">
          <div className="flex items-center gap-2 mb-2">
            <div className="flex items-center justify-center w-6 h-6 rounded-full bg-accent/20 text-accent">
              <User className="w-3.5 h-3.5" />
            </div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-accent">
              Candidate
            </span>
          </div>
          <div className="pl-8">
            <p className="text-foreground leading-relaxed text-sm md:text-base font-medium">
              {trimmedLine.replace(/^Candidate:\s*/i, "")}
            </p>
          </div>
        </div>
      );
    }

    // Fallback for lines that don't start with a known speaker
    return (
      <div key={index} className="pl-8 mb-4">
        <p className="text-muted-foreground leading-relaxed text-sm italic">
          {trimmedLine}
        </p>
      </div>
    );
  });

  return (
    <Card className="transition-all duration-300 border-primary/10 bg-card/40 backdrop-blur-sm overflow-hidden">
      <CardHeader className="border-b border-white/5 pb-4">
        <CardTitle className="flex items-center gap-3 text-xl">
          <div className="p-2 rounded-xl bg-primary/10 shadow-inner">
            <ScrollText className="w-6 h-6 text-primary" />
          </div>
          Interview Transcript
        </CardTitle>
        <CardDescription className="text-muted-foreground/80">
          Full dialogue from the recorded session with automated speaker diarization.
        </CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-[500px] w-full p-6 md:p-8">
          <div className="max-w-3xl mx-auto space-y-2">
            {formattedTranscript.length > 0 ? (
              formattedTranscript
            ) : (
              <div className="flex flex-col items-center justify-center h-full py-20 text-muted-foreground">
                <MessageSquare className="w-12 h-12 mb-4 opacity-20" />
                <p>No transcript data available for this session.</p>
              </div>
            )}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
