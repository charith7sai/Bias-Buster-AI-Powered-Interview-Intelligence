"use client";

import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { FileUp, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Form,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const formSchema = z.object({
  file: z.any().optional(),
});

type UploadFormProps = {
  isPending: boolean;
  onSubmit: (data: FormData) => void;
};

export function UploadForm({ isPending, onSubmit }: UploadFormProps) {
  const [dragActive, setDragActive] = useState(false);
  const [fileName, setFileName] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
    },
  });

  const handleFileChange = (files: FileList | null) => {
    if (files && files.length > 0) {
      setFileName(files[0].name);
      form.setValue("file", files[0]);
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

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    const formData = new FormData();
    if (values.file) {
      formData.append("file", values.file);
    }
    onSubmit(formData);
  };
  
  return (
    <Card className="sticky top-24">
      <CardHeader>
        <CardTitle>Interview Details</CardTitle>
        <CardDescription>
          Provide the interview details to begin analysis. The system runs fully offline.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            <div
              className={cn(
                "relative flex flex-col items-center justify-center w-full p-6 border-2 border-dashed rounded-lg cursor-pointer hover:border-primary transition-colors",
                dragActive ? "border-primary bg-primary/10" : "border-border"
              )}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
            >
              <FileUp className="w-10 h-10 text-muted-foreground" />
              <p className="mt-2 text-sm text-center text-muted-foreground">
                {fileName ? fileName : "Drag & drop audio/video file or click to select"}
              </p>
              <Input
                ref={fileInputRef}
                id="file-upload"
                type="file"
                className="hidden"
                accept="audio/*,video/*,audio/ogg,application/ogg"
                onChange={(e) => handleFileChange(e.target.files)}
              />
            </div>

            <Button type="submit" className="w-full" disabled={isPending}>
              {isPending && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
              {isPending ? "Analyzing..." : "Analyze Interview"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
