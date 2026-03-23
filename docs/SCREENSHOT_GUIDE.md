# Bias Buster: Screenshot & Visual Journey Guide

This document provides the professional ordering and descriptive narrative for the screenshots captured during the Bias Buster evaluation process. The sequence follows the "Recruiter Journey," starting from secure entry to final predictive output.

---

### **1. Secure Authentication Portal**
**Description:** The **Secure Authentication Portal** serves as the primary gateway to the Bias Buster platform, embodying a design philosophy rooted in professional security and modern aesthetics. Upon arriving at this screen, recruiters are met with a high-contrast, distraction-free interface that prioritizes clarity and ease of access. The visual language utilizes a dark, sophisticated palette with subtle glowing accents, reinforcing the application's identity as a high-tech, AI-driven tool. A signature element of this portal is the animated wave background, which provides a sense of fluidity and "active processing," mirroring the sophisticated neural computations that occur once the user enters the application.

From a user experience perspective, the portal is engineered for maximum friction-reduction. The login and signup forms are built using **ShadCN UI** primitives, ensuring that every input field and button is not only visually polished but also fully accessible and responsive across all device types. Real-time form validation, powered by **React Hook Form** and **Zod**, provides immediate feedback to the user, preventing errors before they reach the server. This attention to detail in the interface ensures that the recruiter’s journey starts with a sense of reliability and confidence, which is critical when dealing with sensitive HR and candidate data.

Behind the scenes, the portal is tightly integrated with **Firebase Authentication**, providing enterprise-grade security for the entire platform. This integration allows for robust session management and secure identity verification, protecting the private analysis history of every recruiter. The portal supports both traditional email/password credentials and anonymous entry, ensuring flexibility while maintaining a strict link between the user's unique identity and their stored Firestore documents. By centralizing the authentication logic at the entry point, the system guarantees that no subsequent action—whether it’s uploading a transcript or viewing a past scorecard—can be performed without a verified, secure session.

The impact of this first impression cannot be overstated for a platform dedicated to eliminating bias. By providing a clean, professional, and highly secure entry point, Bias Buster signals to the recruiter that their data is protected and that the analysis they are about to perform is grounded in objective, high-precision technology. This screenshot captures more than just a login form; it represents the "Secure Perimeter" of the application, establishing the trust necessary for recruiters to rely on AI-driven predictions for their most important hiring decisions.

### **2. AI Analysis Command Center (The Upload Form)**
**Description:** The "Command Center" is the recruiter's primary workspace. This screenshot shows the interactive upload form where the user enters the candidate's name and selects the interview recording or transcript. The UI utilizes a drag-and-drop zone with visual feedback (emerald highlights) once a file is successfully staged. It demonstrates the simplicity of the "Input" phase in our end-to-end classification procedure.

### **3. Intelligent Processing Engine (Skeleton State)**
**Description:** This visual represents the "Processing" phase of the application. While the Genkit flows are orchestrating the Gemini Pro LLM in the background, the frontend renders high-fidelity "Skeleton" loading states. This prevents user frustration during complex AI computation and signals that the system is currently performing diarization and behavioral extraction.

### **4. Holistic Candidate Scorecard (Overview)**
**Description:** The first result screen presented to the recruiter. This screenshot features the **Radial Bar Chart**, which provides an immediate, 0-100 holistic competency score. The color-coded rating (e.g., "Excellent" in Emerald) provides an at-a-glance prediction of candidate quality, synthesized from all identified performance signals in the transcript.

### **5. Behavioral Evidence Mapping (STAR Framework)**
**Description:** This critical screenshot shows the **STAR Analysis** component. It visualizes the transition from raw text to structured evidence. The "Scores" tab shows a bar chart of performance across different questions, while the "Breakdown" tab (often shown as an accordion) displays the AI's classification of the candidate's Situation, Task, Action, and Result for every behavioral answer.

### **6. Objectivity Audit & Bias Detection**
**Description:** This visual highlights the platform’s unique "Bias Buster" capability. It shows the **Bias Detection Card**, which flags potential cognitive shortcuts taken by the interviewer. Each bias is categorized by severity (Low, Medium, High) and includes a "Transcript Reference," proving that the AI's audit is grounded in the actual dialogue of the session.

### **7. Centralized Interview History & Benchmarking**
**Description:** The final screenshot in the journey shows the **Analysis History** view. This is a centralized archive of every interview processed by the recruiter. It displays candidate cards with their overall scores and dates, including a "Top Candidate" badge for the highest-performing individual in the archive. This view demonstrates the platform's long-term utility for candidate benchmarking and auditability.
