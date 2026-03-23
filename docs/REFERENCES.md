# Project References: Bias Buster AI-Powered Interview Intelligence

This document provides a list of the primary technical and academic resources used to inform the design, implementation, and evaluation of the Bias Buster platform.

---

### **Technical Frameworks & Documentation**

1.  **Next.js 15 Documentation**  
    *Vercel (2024)*. "App Router Architecture and React Server Components."  
    *URL:* https://nextjs.org/docs  
    *Significance:* Provided the foundation for the application's multi-tier architecture and server-side AI orchestration.

2.  **React 19 Reference Guide**  
    *Meta Open Source (2024)*. "Actions, useTransition, and the New Rendering Lifecycle."  
    *URL:* https://react.dev/reference/react  
    *Significance:* Guided the implementation of the fluid, responsive UI and asynchronous state management.

3.  **Firebase Client SDK & Security Rules**  
    *Google Cloud (2024)*. "Firestore Data Modeling and Path-Based Authorization."  
    *URL:* https://firebase.google.com/docs/firestore  
    *Significance:* Informed the zero-trust security model and the hierarchical data structure for user isolation.

4.  **Google Genkit Framework Guide**  
    *Google AI (2024)*. "Orchestrating AI Flows with Zod-Based Structured Output."  
    *URL:* https://firebase.google.com/docs/genkit  
    *Significance:* The primary framework used for managing LLM interactions and ensuring consistent JSON output.

5.  **Gemini 1.5 Pro Model Technical Paper**  
    *Google DeepMind (2024)*. "Capabilities and Reasoning in Long-Context Multimodal Models."  
    *URL:* https://ai.google.dev/gemini-api/docs/models/gemini  
    *Significance:* Validated the model's ability to perform deep semantic analysis and diarization of interview transcripts.

6.  **ShadCN UI & Radix Primitives**  
    *Shadcn (2024)*. "Accessible Component Design for Modern Web Applications."  
    *URL:* https://ui.shadcn.com/  
    *Significance:* Provided the accessible UI primitives used to build the candidate scorecards and dashboard.

---

### **HR Science & Behavioral Theory**

7.  **The STAR Method for Behavioral Interviewing**  
    *Society for Human Resource Management (SHRM)*. "Using the Situation-Task-Action-Result Framework for Candidate Evaluation."  
    *Significance:* The foundational behavioral framework used by the AI to classify candidate responses.

8.  **Mitigating Unconscious Bias in Recruitment**  
    *Harvard University (2023)*. "Identifying and Reducing Implicit Bias in the Hiring Process."  
    *Significance:* Informed the specific bias categories (Halo Effect, Affinity Bias) that the system's audit engine is trained to detect.

9.  **The Impact of AI on Talent Acquisition**  
    *Gartner (2023)*. "Predictive Analytics and Objectivity in Modern Hiring."  
    *Significance:* Provided the industry context for the move toward data-driven, auditable recruitment processes.

10. **Standard for Human-AI Collaboration in Decision Making**  
    *IEEE (2022)*. "Ethical Guidelines for AI-Assisted Professional Assessments."  
    *Significance:* Influenced the design of the "Evidence Grounding" feature, ensuring all AI claims include transcript references.
