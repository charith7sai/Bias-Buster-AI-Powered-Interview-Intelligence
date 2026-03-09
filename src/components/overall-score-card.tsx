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
    if (value >= 90) return { text: "Excellent", color: "text-emerald-500", glow: "shadow-emerald-500/20" };
    if (value >= 80) return { text: "Very Good", color: "text-emerald-400", glow: "shadow-emerald-400/20" };
    if (value >= 70) return { text: "Good", color: "text-sky-500", glow: "shadow-sky-500/20" };
    if (value >= 60) return { text: "Fair", color: "text-amber-500", glow: "shadow-amber-500/20" };
    return { text: "Needs Improvement", color: "text-destructive", glow: "shadow-destructive/20" };
  };

  const rating = getRating(score);

  return (
    <Card className="flex flex-col h-full transition-all duration-300 hover:shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-primary/10">
            <Target className="w-5 h-5 text-primary" />
          </div>
          Overall Candidate Score
        </CardTitle>
        <CardDescription>
          A holistic competency score calculated from performance signals.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center flex-1 pb-8">
        <div className="relative w-full aspect-square max-h-[280px]">
          <ChartContainer
            config={chartConfig}
            className="w-full h-full"
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
                animationDuration={1500}
                animationEasing="ease-out"
              />
            </RadialBarChart>
          </ChartContainer>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-7xl font-bold tracking-tighter text-foreground tabular-nums animate-in zoom-in duration-1000">
              {score}
            </span>
            <span className={`text-lg font-bold tracking-tight ${rating.color} animate-in fade-in slide-in-from-top-2 duration-1000 delay-300`}>
              {rating.text}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
