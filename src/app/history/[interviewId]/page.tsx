
"use client";

import React, { useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { doc } from 'firebase/firestore';
import { Loader2, AlertTriangle } from 'lucide-react';

import { useUser, useFirestore, useDoc, useMemoFirebase } from '@/firebase';
import { AnalysisDashboard } from '@/components/analysis-dashboard';
import type { AnalysisResult } from '@/app/actions';

export default function InterviewDetailsPage() {
  const { user, isUserLoading } = useUser();
  const router = useRouter();
  const firestore = useFirestore();
  const params = useParams();
  const interviewId = params.interviewId as string;

  const interviewDocRef = useMemoFirebase(() => {
    if (!user || !firestore || !interviewId) return null;
    return doc(firestore, 'users', user.uid, 'interviews', interviewId);
  }, [user, firestore, interviewId]);

  const { data: analysis, isLoading, error } = useDoc<AnalysisResult>(interviewDocRef);

  useEffect(() => {
    if (!isUserLoading && !user) {
      router.push('/login');
    }
  }, [user, isUserLoading, router]);

  if (isLoading || isUserLoading) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-4rem)]">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
    return (
       <div className="flex flex-col items-center justify-center h-[400px] text-center border-2 border-dashed rounded-lg bg-card/50 m-8">
          <AlertTriangle className="w-16 h-16 mb-4 text-destructive" />
          <h2 className="text-2xl font-semibold tracking-tight font-headline">
            Error Loading Analysis
          </h2>
          <p className="mt-2 text-muted-foreground">
            There was a problem fetching the analysis details. Please try again later.
          </p>
        </div>
    );
  }

  if (!analysis) {
    return (
       <div className="flex flex-col items-center justify-center h-[400px] text-center border-2 border-dashed rounded-lg bg-card/50 m-8">
          <AlertTriangle className="w-16 h-16 mb-4 text-muted-foreground" />
          <h2 className="text-2xl font-semibold tracking-tight font-headline">
            Analysis Not Found
          </h2>
          <p className="mt-2 text-muted-foreground">
            The requested analysis could not be found.
          </p>
        </div>
    );
  }


  return (
    <div className="flex-1 w-full max-w-screen-xl px-4 py-8 mx-auto md:px-6">
      <AnalysisDashboard analysis={analysis} />
    </div>
  );
}
