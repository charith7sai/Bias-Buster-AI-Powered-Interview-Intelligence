# Bias Buster: Implementation Documentation

This document provides a detailed, five-part breakdown of the technical implementation of the Bias Buster platform, ranging from the foundational stack to the accuracy metrics used to evaluate the AI's predictive performance.

---

### **Part 1: System Environment and Stack**

The **Bias Buster** implementation is grounded in a modern, full-stack JavaScript environment centered on **Next.js 15** and **React 19**. This environment was chosen to leverage the latest advancements in web performance, specifically the **App Router** architecture, which allows for a clean separation between Client Components and Server Components. The application is hosted on **Firebase App Hosting**, a managed service that automatically handles the deployment of the Next.js server, ensuring that server-side logic remains scalable and globally available. The development environment utilizes **TypeScript** throughout to enforce strict type-safety, which is critical when handling the complex JSON schemas returned by the AI intelligence tier.

On the presentation side, the stack is optimized for rapid UI development and accessibility. **Tailwind CSS** provides a utility-first styling engine that ensures the application is fully responsive across mobile and desktop devices. The UI components are derived from **ShadCN UI**, providing a set of high-quality, Radix-based primitives that handle complex interactions like modals, charts (via **Recharts**), and accessible forms. This presentation layer is tightly integrated with the **Firebase Client SDK**, which provides the real-time bridge to the cloud. By utilizing React’s `useTransition` and `useState` hooks, the implementation ensures that the user experience remains fluid, even during the multi-second processing windows required for deep AI analysis of interview transcripts.

---

### **Part 2: Core Application Logic (The "Code")**

The "Code" implementation is centered on the seamless transformation of raw input into structured predictive intelligence. The primary entry point is the **Server Action** which serves as the bridge between the recruiter’s file upload and the Generative AI engine. Below is the core logic for the analysis request and the subsequent persistence to Firestore.

```typescript
// src/app/actions.ts - Core AI Orchestration
export async function analyzeInterview(candidateName: string): Promise<AnalysisResult> {
  // 1. Invoke Genkit Flow to process the transcript
  const { data, error } = await analyzeInterviewFlow({ candidateName });
  
  // 2. Return structured JSON matching the UI requirements
  return {
    candidateName,
    transcript: data.transcript,
    starAnalysis: data.starAnalysis,
    biasDetection: data.biasDetection,
    candidateScore: data.candidateScore
  };
}

// src/app/analysis/page.tsx - Persistence Logic
const saveAnalysis = async (analysisData: AnalysisResult) => {
  if (!user || !firestore) return;

  const interviewsCol = collection(firestore, 'users', user.uid, 'interviews');
  const docData = {
    ...analysisData,
    userId: user.uid,
    createdAt: serverTimestamp(),
  };

  // Non-blocking write to Firestore
  addDoc(interviewsCol, docData).catch(error => {
    errorEmitter.emit('permission-error', new FirestorePermissionError({
      path: interviewsCol.path,
      operation: 'create',
      requestResourceData: docData,
    }));
  });
};
```

This logic ensures that the heavy computation is offloaded to the server while the client handles the immediate state updates and secure data persistence.

---

### **Part 3: Generative AI Orchestration (Genkit & Gemini)**

The intelligence tier of the implementation is orchestrated by **Genkit**, a developer-centric framework for building AI-powered applications. The core logic resides in specialized **Genkit Flows** that manage the interaction with the **Gemini Pro LLM**. Each flow is designed to perform a specific cognitive task: diarization, evidence extraction, or bias auditing. The implementation uses Handlebars templating for prompt management. This allows the system to inject the raw interview transcript into a structured "System Prompt" that instructs the LLM to act as a neutral, expert recruiter trained in behavioral interviewing techniques.

The implementation places a heavy emphasis on **Structured Output**. By using Zod to define schemas for every AI interaction, the system forces the LLM to return data in a consistent JSON format. For the STAR analysis, the schema requires the model to identify five specific fields for every question: the Question itself, the Situation, Task, Action, and Result. If the LLM’s response deviates from this structure, Genkit handles the validation error, ensuring that the application logic never receives malformed data.

---

### **Part 4: Database and Security Configuration**

The data implementation of Bias Buster utilizes **Cloud Firestore** in a strictly partitioned hierarchical structure. Every piece of data is stored under a top-level `/users/{userId}` document. Within each user document, a subcollection named `interviews` holds the individual analysis records. This structure, `/users/{userId}/interviews/{interviewId}`, is designed for maximum security and query efficiency. Because Firestore is a NoSQL database, the implementation can store the entire complex analysis result as a single document, allowing for a complete report fetch with one request.

Security is enforced at the database level through **Firestore Security Rules**, which implement a "Deny by Default" policy. The core of the security implementation is the `isOwner(userId)` helper function. This function validates that the `request.auth.uid` of the incoming request perfectly matches the `{userId}` parameter in the document path. This ensures that no recruiter can ever read, update, or delete an interview analysis belonging to another user. For creation operations, the rules further validate the "relational integrity" of the data, ensuring that the `userId` field within the document body matches the authenticated user's ID.

---

### **Part 5: Evaluation and Accuracy Metrics**

To ensure the reliability of the Bias Buster system, the implementation includes a framework for **Evaluation and Accuracy Metrics**. Accuracy is measured by comparing AI output against "Golden Transcripts" pre-analyzed by human experts. The system is evaluated on three primary metrics:

1.  **Extraction Accuracy (F1 Score)**: Measures the precision and recall of the STAR component extraction. The current target is **>85%**, ensuring that the SITUATION, TASK, ACTION, and RESULT categories are factually grounded and correctly identified.
2.  **Bias Detection Recall**: Measures the system’s sensitivity to subtle cognitive biases. This is evaluated by injecting known biased questions into test transcripts; the system targets a **90% recall rate** for high-severity biases like the Framing Effect.
3.  **Scoring Consistency (Variance)**: Measures the stability of the 0-100 overall score. By running the same transcript multiple times, the system targets a **variance of less than ±3 points**, ensuring that the AI provides an objective and stable prediction rather than a random assessment.

These metrics are part of a continuous evaluation loop, where prompt refinements are tested against these benchmarks to ensure the system remains a high-precision tool for unbiased hiring.
