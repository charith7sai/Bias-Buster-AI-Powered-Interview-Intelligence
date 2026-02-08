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
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface StarAnalysisCardProps {
  starAnalysis: StarAnalysisOutput;
}

const chartConfig = {
  score: {
    label: "STAR Score",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

export function StarAnalysisCard({ starAnalysis }: StarAnalysisCardProps) {
  const { starScores, starBreakdowns } = starAnalysis;
  const chartData = Object.entries(starScores).map(
    ([question, score], index) => ({
      name: `Q${index + 1}`,
      question: question,
      score: score,
      fill: "var(--color-score)",
    })
  );

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
            <TabsTrigger value="breakdown">STAR Breakdown</TabsTrigger>
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
                          <span className="font-bold">
                            {item.payload.question}
                          </span>
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
          <TabsContent
            value="breakdown"
            className="pt-4 text-sm text-muted-foreground"
          >
            <Accordion type="single" collapsible className="w-full">
              {starBreakdowns.map((breakdown, index) => (
                <AccordionItem value={`item-${index}`} key={index}>
                  <AccordionTrigger className="text-left hover:no-underline">
                    <span className="font-semibold text-foreground">
                      {breakdown.question}
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="space-y-3 pt-2">
                    <div className="space-y-1">
                      <p className="font-semibold text-foreground">Situation:</p>
                      <p>{breakdown.situation}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="font-semibold text-foreground">Task:</p>
                      <p>{breakdown.task}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="font-semibold text-foreground">Action:</p>
                      <p>{breakdown.action}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="font-semibold text-foreground">Result:</p>
                      <p>{breakdown.result}</p>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
