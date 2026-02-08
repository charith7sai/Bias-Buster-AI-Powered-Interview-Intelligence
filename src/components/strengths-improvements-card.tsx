"use client";

import { ThumbsUp, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

interface StrengthsImprovementsCardProps {
  strengths: string;
  improvements: string;
}

export function StrengthsImprovementsCard({
  strengths,
  improvements,
}: StrengthsImprovementsCardProps) {
  const formatPoints = (text: string) => {
    return text
      .split('\n')
      .map(line => line.trim().replace(/^-|^\*/, '').trim())
      .filter(line => line.length > 0);
  };

  const strengthPoints = formatPoints(strengths);
  const improvementPoints = formatPoints(improvements);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ThumbsUp className="text-primary" />
          Key Takeaways
        </CardTitle>
      </CardHeader>
      <CardContent className="grid gap-6 md:grid-cols-2">
        <div className="space-y-3">
          <h3 className="flex items-center text-lg font-semibold text-green-600 dark:text-green-400">
            <ThumbsUp className="w-5 h-5 mr-2" />
            Strengths
          </h3>
          <ul className="space-y-2 list-disc list-inside text-muted-foreground">
            {strengthPoints.map((point, index) => (
              <li key={`strength-${index}`}>{point}</li>
            ))}
          </ul>
        </div>
        <div className="relative">
          <Separator orientation="vertical" className="absolute left-0 hidden h-full md:block -ml-3" />
          <Separator className="block md:hidden" />
        </div>
        <div className="space-y-3">
          <h3 className="flex items-center text-lg font-semibold text-yellow-600 dark:text-yellow-400">
            <TrendingUp className="w-5 h-5 mr-2" />
            Areas for Improvement
          </h3>
          <ul className="space-y-2 list-disc list-inside text-muted-foreground">
            {improvementPoints.map((point, index) => (
              <li key={`improvement-${index}`}>{point}</li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
