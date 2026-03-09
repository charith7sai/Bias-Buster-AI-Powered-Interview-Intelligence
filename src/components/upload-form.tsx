"use client";

import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { FileUp, Loader2, CheckCircle2, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const formSchema = z.object({
  candidateName: z.string().min(1, "Candidate name is required."),
  file: z.any().optional(),
});

type UploadFormProps = {
  isPending: boolean;
  onSubmit: (data: { candidateName: string }) => void;
};

export function UploadForm({ isPending, onSubmit }: UploadFormProps) {
  const [dragActive, setDragActive] = useState(false);
  const [fileName, setFileName] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      candidateName: "",
    },
  });

  const handleFileChange = (files: FileList | null) => {
    if (files && files.length > 0) {
      setFileName(files[0].name);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileChange(e.dataTransfer.files);
    }
  };

  const clearFile = (e: React.MouseEvent) => {
    e.stopPropagation();
    setFileName("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };
  
  return (
    <Card className="sticky top-24 transition-all duration-300 hover:shadow-md animate-in fade-in slide-in-from-left-4">
      <CardHeader>
        <CardTitle>Start New Analysis</CardTitle>
        <CardDescription>
          Upload an audio or video file to begin. The AI will diarize and analyze for behavioral insights.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
             <FormField
              control={form.control}
              name="candidateName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Candidate Name</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="e.g., Jane Doe" 
                      className="transition-all focus:ring-2 focus:ring-primary/20"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div
              className={cn(
                "group relative flex flex-col items-center justify-center w-full p-8 border-2 border-dashed rounded-xl cursor-pointer transition-all duration-300 overflow-hidden",
                dragActive 
                  ? "border-primary bg-primary/5 scale-[1.02] shadow-inner" 
                  : "border-muted-foreground/20 hover:border-primary/50 hover:bg-accent/50",
                fileName ? "bg-emerald-50/50 border-emerald-200 dark:bg-emerald-950/10 dark:border-emerald-900/30" : ""
              )}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
            >
              {fileName ? (
                <div className="flex flex-col items-center text-center animate-in zoom-in-95 duration-300">
                  <div className="p-3 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 mb-2">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <p className="text-sm font-medium text-emerald-700 dark:text-emerald-400 max-w-full truncate px-4">
                    {fileName}
                  </p>
                  <button 
                    onClick={clearFile}
                    className="mt-2 text-xs text-muted-foreground hover:text-destructive flex items-center gap-1 transition-colors"
                  >
                    <X className="w-3 h-3" /> Remove file
                  </button>
                </div>
              ) : (
                <>
                  <div className="p-3 rounded-full bg-primary/5 group-hover:bg-primary/10 transition-colors mb-2">
                    <FileUp className="w-8 h-8 text-primary/60 group-hover:text-primary" />
                  </div>
                  <p className="text-sm font-medium text-center text-muted-foreground group-hover:text-foreground transition-colors">
                    Drag & drop or click to upload
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground/60">
                    Audio or Video (Max 50MB)
                  </p>
                </>
              )}
              
              <Input
                ref={fileInputRef}
                id="file-upload"
                type="file"
                className="hidden"
                accept="audio/*,video/*"
                onChange={(e) => handleFileChange(e.target.files)}
              />
            </div>

            <Button 
              type="submit" 
              className="w-full transition-all active:scale-95 h-11" 
              disabled={isPending || !fileName || !form.getValues("candidateName")}
            >
              {isPending ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Processing...
                </>
              ) : (
                "Analyze Interview"
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
