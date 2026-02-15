
"use client";

import React, { useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Loader2, Trophy, BarChart, Calendar, ChevronRight, Trash2 } from 'lucide-react';
import { collection, query, orderBy, getDocs, writeBatch } from 'firebase/firestore';
import { format } from 'date-fns';

import { useUser, useFirestore, useCollection, useMemoFirebase } from '@/firebase';
import type { AnalysisResult } from '@/app/actions';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button, buttonVariants } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

type InterviewHistoryItem = AnalysisResult & {
  id: string;
  createdAt: { seconds: number, nanoseconds: number };
}

export default function HistoryPage() {
  const { user, isUserLoading } = useUser();
  const router = useRouter();
  const firestore = useFirestore();
  const { toast } = useToast();

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
      router.push('/');
    }
  }, [user, isUserLoading, router]);

  const handleClearHistory = async () => {
    if (!interviewsQuery || !firestore) return;

    try {
      const querySnapshot = await getDocs(interviewsQuery);
      if (querySnapshot.empty) {
        toast({
          description: "History is already empty.",
        });
        return;
      }

      const batch = writeBatch(firestore);
      querySnapshot.forEach((doc) => {
        batch.delete(doc.ref);
      });
      await batch.commit();

      toast({
        title: "History Cleared",
        description: "Your analysis history has been successfully deleted.",
      });
    } catch (error) {
      console.error("Error clearing history:", error);
      toast({
        variant: "destructive",
        title: "Deletion Failed",
        description: "Could not clear history. Please try again.",
      });
    }
  };

  if (isUserLoading || !user) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-4rem)]">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="flex-1 w-full max-w-screen-xl px-4 py-8 mx-auto md:px-6">
      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Analysis History</h1>
          <p className="text-muted-foreground">Review your past interview analyses and compare candidates.</p>
        </div>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="outline" disabled={isLoading || !interviews || interviews.length === 0}>
              <Trash2 className="mr-2 h-4 w-4" />
              Clear History
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your entire analysis history.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={handleClearHistory}
                className={buttonVariants({ variant: "destructive" })}
              >
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
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
              <Card className="transition-colors hover:border-primary">
                <CardContent className="flex items-center justify-between p-4">
                  <div className="flex items-center gap-4">
                     <div className="p-3 rounded-full bg-primary/10">
                        <BarChart className="w-6 h-6 text-primary" />
                      </div>
                    <div>
                      <h3 className="text-lg font-semibold">{interview.candidateName}</h3>
                      <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
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
