"use client";

import React, { useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Loader2, Trophy, BarChart, Calendar, ChevronRight, Trash2, BrainCircuit } from 'lucide-react';
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
    <div className="flex-1 w-full max-w-screen-xl px-4 py-12 mx-auto md:px-6 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-10">
        <div>
          <h1 className="text-4xl font-bold tracking-tight mb-2">Analysis History</h1>
          <p className="text-muted-foreground text-lg">Review and compare candidates from past interview sessions.</p>
        </div>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="outline" size="lg" className="hover:bg-destructive/5 hover:text-destructive transition-colors" disabled={isLoading || !interviews || interviews.length === 0}>
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
          <Skeleton className="h-32 w-full rounded-xl" />
          <Skeleton className="h-32 w-full rounded-xl" />
          <Skeleton className="h-32 w-full rounded-xl" />
        </div>
      )}

      {!isLoading && interviews && interviews.length > 0 && (
        <div className="grid gap-4">
          {interviews.map((interview, index) => (
            <Link 
              href={`/history/${interview.id}`} 
              key={interview.id} 
              className="block group animate-in fade-in slide-in-from-bottom-4 duration-500"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <Card className="transition-all duration-300 group-hover:border-primary group-hover:shadow-md active:scale-[0.995]">
                <CardContent className="flex items-center justify-between p-6">
                  <div className="flex items-center gap-6">
                     <div className="hidden sm:flex p-4 rounded-2xl bg-primary/5 text-primary group-hover:bg-primary/10 transition-colors">
                        <BrainCircuit className="w-8 h-8" />
                      </div>
                    <div>
                      <h3 className="text-xl font-bold mb-1 group-hover:text-primary transition-colors">{interview.candidateName}</h3>
                      <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2 font-medium">
                          <Calendar className="w-4 h-4 text-muted-foreground/60" />
                          <span>{format(new Date(interview.createdAt.seconds * 1000), 'PPP')}</span>
                        </div>
                        <div className="flex items-center gap-2 font-medium">
                          <Trophy className="w-4 h-4 text-amber-500/80" />
                          <span className="text-foreground">Score: {interview.candidateScore.overallScore}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='flex items-center gap-6'>
                    {topCandidate?.id === interview.id && (
                       <Badge className="bg-emerald-500 hover:bg-emerald-600 text-white shadow-sm border-none px-3 py-1">
                        Top Candidate
                       </Badge>
                    )}
                    <div className="p-2 rounded-full group-hover:bg-primary/10 group-hover:text-primary transition-all">
                      <ChevronRight className="w-6 h-6" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}

       {!isLoading && (!interviews || interviews.length === 0) && (
        <div className="flex flex-col items-center justify-center min-h-[400px] text-center p-12 border-2 border-dashed rounded-2xl bg-card/50 animate-in zoom-in-95 duration-700">
          <div className="p-6 rounded-full bg-muted/30 mb-6">
            <BarChart className="w-16 h-16 text-muted-foreground/40" />
          </div>
          <h2 className="text-3xl font-bold tracking-tight mb-3">
            No Analyses Found
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto text-lg mb-8">
            Start your first interview analysis to build your candidate history.
          </p>
          <Button asChild size="lg" className="px-8 transition-transform hover:scale-105 active:scale-95">
            <Link href="/analysis">Analyze New Interview</Link>
          </Button>
        </div>
      )}
    </div>
  );
}
