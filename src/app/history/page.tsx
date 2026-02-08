
"use client";

import React, { useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Loader2, Trophy, BarChart, Calendar, ChevronRight } from 'lucide-react';
import { collection, query, orderBy } from 'firebase/firestore';
import { format } from 'date-fns';

import { useUser, useFirestore, useCollection, useMemoFirebase } from '@/firebase';
import type { AnalysisResult } from '@/app/actions';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';

type InterviewHistoryItem = AnalysisResult & {
  id: string;
  createdAt: { seconds: number, nanoseconds: number };
}

export default function HistoryPage() {
  const { user, isUserLoading } = useUser();
  const router = useRouter();
  const firestore = useFirestore();

  const interviewsQuery = useMemoFirebase(() => {
    if (!user || !firestore) return null;
    return query(
      collection(firestore, `users/${user.uid}/interviews`),
      orderBy('createdAt', 'desc')
    );
  }, [user, firestore]);

  const { data: interviews, isLoading } = useCollection<InterviewHistoryItem>(interviewsQuery);

  const topCandidate = useMemo(() => {
    if (!interviews || interviews.length === 0) return null;
    return interviews.reduce((prev, current) => 
      (prev.candidateScore.overallScore > current.candidateScore.overallScore) ? prev : current
    );
  }, [interviews]);

  useEffect(() => {
    if (!isUserLoading && !user) {
      router.push('/login');
    }
  }, [user, isUserLoading, router]);

  if (isUserLoading || !user) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-4rem)]">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="flex-1 w-full max-w-screen-xl px-4 py-8 mx-auto md:px-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Analysis History</h1>
        <p className="text-muted-foreground">Review your past interview analyses and compare candidates.</p>
      </div>
      
      {isLoading && (
        <div className="space-y-4">
          <Skeleton className="h-24 w-full" />
          <Skeleton className="h-24 w-full" />
          <Skeleton className="h-24 w-full" />
        </div>
      )}

      {!isLoading && interviews && interviews.length > 0 && (
        <div className="space-y-4">
          {interviews.map(interview => (
            <Link href={`/history/${interview.id}`} key={interview.id} className="block">
              <Card className="hover:border-primary transition-colors">
                <CardContent className="p-4 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                     <div className="p-3 rounded-full bg-primary/10">
                        <BarChart className="w-6 h-6 text-primary" />
                      </div>
                    <div>
                      <h3 className="font-semibold text-lg">{interview.candidateName}</h3>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          <span>{format(new Date(interview.createdAt.seconds * 1000), 'PPP')}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Trophy className="w-4 h-4" />
                          <span>Score: {interview.candidateScore.overallScore}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='flex items-center gap-4'>
                    {topCandidate?.id === interview.id && (
                       <Badge>Top Candidate</Badge>
                    )}
                    <ChevronRight className="w-5 h-5 text-muted-foreground" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}

       {!isLoading && (!interviews || interviews.length === 0) && (
        <div className="flex flex-col items-center justify-center h-[400px] text-center border-2 border-dashed rounded-lg bg-card/50">
          <BarChart className="w-16 h-16 mb-4 text-muted-foreground" />
          <h2 className="text-2xl font-semibold tracking-tight font-headline">
            No Analyses Yet
          </h2>
          <p className="mt-2 text-muted-foreground">
            Your saved interview analyses will appear here.
          </p>
        </div>
      )}
    </div>
  );
}
