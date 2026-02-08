"use client";

import React from "react";
import { Target } from "lucide-react";
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
} from "@/components/ui/chart";
import { PolarAngleAxis, RadialBar, RadialBarChart } from "recharts";
import type { ChartConfig } from "@/components/ui/chart";

interface OverallScoreCardProps {
  score: number;
  strengths: string;
  improvements: string;
}

const chartConfig = {
  score: {
    label: "Score",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export function OverallScoreCard({ score }: OverallScoreCardProps) {
  const chartData = [{ name: "score", value: score, fill: "var(--color-score)" }];
  
  const getRating = (value: number) => {
    if (value >= 90) return { text: "Excellent", color: "text-green-500" };
    if (value >= 80) return { text: "Very Good", color: "text-green-400" };
    if (value >= 70) return { text: "Good", color: "text-sky-500" };
    if (value >= 60) return { text: "Fair", color: "text-yellow-500" };
    return { text: "Needs Improvement", color: "text-red-500" };
  };

  const rating = getRating(score);

  return (
    <Card className="flex flex-col">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Target className="text-primary" />
          Overall Candidate Score
        </CardTitle>
        <CardDescription>
          A holistic score based on STAR analysis and demonstrated competencies.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center flex-1 text-center">
        <ChartContainer
          config={chartConfig}
          className="w-full aspect-square max-h-[250px]"
        >
          <RadialBarChart
            data={chartData}
            startAngle={90}
            endAngle={-270}
            innerRadius="70%"
            outerRadius="100%"
            barSize={20}
          >
            <PolarAngleAxis
              type="number"
              domain={[0, 100]}
              dataKey="value"
              tick={false}
            />
            <RadialBar
              dataKey="value"
              background={{ fill: "hsl(var(--muted))" }}
              cornerRadius={10}
            />
             <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
          </RadialBarChart>
        </ChartContainer>
         <div className="flex flex-col items-center mt-[-150px] mb-[60px]">
            <span className="text-6xl font-bold tracking-tighter text-foreground">
              {score}
            </span>
            <span className={`text-lg font-semibold ${rating.color}`}>
              {rating.text}
            </span>
          </div>
      </CardContent>
    </Card>
  );
}
