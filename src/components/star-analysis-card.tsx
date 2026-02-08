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
  ChartBarLabel,
  ChartBarChart,
} from "@/components/ui/chart";
import type { ChartConfig } from "@/components/ui/chart";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";


interface StarAnalysisCardProps {
  starScores: StarAnalysisOutput["starScores"];
}

const chartConfig = {
  score: {
    label: "STAR Score",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

export function StarAnalysisCard({ starScores }: StarAnalysisCardProps) {
  const chartData = Object.entries(starScores).map(([question, score], index) => ({
    name: `Q${index + 1}`,
    question: question,
    score: score,
    fill: "var(--color-score)",
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Star className="text-primary" />
          STAR Analysis
        </CardTitle>
        <CardDescription>
          Performance on behavioral questions based on the STAR framework.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="scores" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="scores">Scores</TabsTrigger>
            <TabsTrigger value="explanation">What is STAR?</TabsTrigger>
          </TabsList>
          <TabsContent value="scores" className="pt-4">
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
          </TabsContent>
          <TabsContent value="explanation" className="pt-4 text-sm text-muted-foreground">
             <div className="space-y-3">
               <p>The STAR method is a structured technique for answering behavioral interview questions by providing a concise, concrete story of a past experience.</p>
               <ul className="space-y-2 pl-4">
                 <li>
                   <strong className="font-semibold text-foreground">S - Situation:</strong> Set the scene and provide the context of the event or situation you were in.
                 </li>
                 <li>
                   <strong className="font-semibold text-foreground">T - Task:</strong> Describe what your responsibility or goal was in that situation.
                 </li>
                 <li>
                   <strong className="font-semibold text-foreground">A - Action:</strong> Detail the specific steps and actions you personally took to address the task.
                 </li>
                 <li>
                   <strong className="font-semibold text-foreground">R - Result:</strong> Explain the outcome of your actions. What was accomplished? Use numbers or data to quantify your success if possible.
                 </li>
               </ul>
             </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
