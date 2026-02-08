"use client";

import { Star } from "lucide-react";
import type { StarAnalysisOutput } from "@/app/actions";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartXAxis,
  ChartYAxis,
  ChartBar,
  ChartBarChart,
  ChartBarLabel,
} from "@/components/ui/chart";
import type { ChartConfig } from "@/components/ui/chart";

interface StarAnalysisCardProps {
  starScores: StarAnalysisOutput["starScores"];
}

const chartConfig = {
  score: {
    label: "STAR Score",
    color: "hsl(var(--accent))",
  },
} satisfies ChartConfig;

export function StarAnalysisCard({ starScores }: StarAnalysisCardProps) {
  const chartData = Object.entries(starScores).map(([question, score], index) => ({
    name: `Q${index + 1}`,
    question: question,
    score: score,
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Star className="text-primary" />
          STAR Analysis Scores
        </CardTitle>
        <CardDescription>
          Candidate's performance on behavioral questions based on the STAR framework.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="w-full h-[250px]">
          <ChartBarChart data={chartData} accessibilityLayer>
            <ChartXAxis
              dataKey="name"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            />
            <ChartYAxis domain={[0, 5]} tickCount={6} />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  formatter={(value, name, item) => (
                    <div className="flex flex-col gap-1">
                      <span className="font-bold">{item.payload.question}</span>
                      <span>Score: {value}/5</span>
                    </div>
                  )}
                />
              }
            />
            <ChartBar dataKey="score" radius={8}>
              <ChartBarLabel />
            </ChartBar>
          </ChartBarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
