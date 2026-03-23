# Bias Buster: Testing and Quality Assurance Documentation

This document provides a detailed, four-part breakdown of the testing procedures, methodologies, and specific test cases used to ensure the reliability and accuracy of the Bias Buster platform.

---

### **Part 1: Testing Strategy and Methodology**

The testing strategy for **Bias Buster** is built on a "Risk-Based" methodology that prioritizes the integrity of candidate data and the accuracy of AI-driven predictions. Given the platform's role in critical hiring decisions, the strategy employs a hybrid approach combining automated unit tests, manual end-to-end (E2E) testing, and specialized AI evaluation loops. The methodology is designed to mirror the "Recruiter Journey," ensuring that every touchpoint—from secure authentication to the final export of behavioral evidence—is validated against professional standards. A primary focus of this strategy is the validation of the **Zero-Trust** security model, where we verify that the system effectively partitions data between different user accounts, ensuring that sensitive interview transcripts remain strictly private and accessible only to the authorized recruiter.

To achieve high confidence in the system's performance, the implementation utilizes a "Staging-to-Production" parity environment. This means that all tests are conducted in a mirrored Firebase environment that includes exact copies of the production security rules and database indexing. The methodology also includes "Stress Testing" for the AI orchestration tier, where various lengths and qualities of transcripts are submitted to identify the boundaries of the **Genkit** flows. By systematically testing for edge cases—such as malformed transcripts, intermittent network connectivity, and unauthorized access attempts—the strategy ensures that Bias Buster provides a stable, enterprise-grade experience. This comprehensive methodology transforms testing from a simple checklist into a robust quality gate that guarantees the system’s predictive hiring intelligence is both reliable and fair.

---

### **Part 2: Functional and Security Rule Testing**

The functional testing phase focuses on the core mechanics of the application, specifically the interaction between the **Next.js** frontend and the **Firebase** backend. A critical component of this phase is the validation of **Firestore Security Rules**. We employ a suite of "Negative Tests" to confirm that any request attempting to read or write data outside of a user’s authorized `/users/{userId}` path is immediately rejected with a "Permission Denied" error. This testing ensures that the relational integrity enforced in the rules—where the `userId` in the document body must match the authenticated token—is functioning as intended. We also perform functional tests on the **Authentication** lifecycle, verifying that session persistence, token refresh, and secure sign-out work seamlessly across different browser environments, preventing unauthorized session hijacking.

Beyond security, functional testing covers the "Non-Blocking" update logic used in the interview analysis process. We verify that when a recruiter submits a transcript, the UI remains responsive and correctly transitions to a loading state while the server-side action initiates. We test the "Optimistic UI" updates to ensure that even if a network delay occurs, the user sees immediate feedback that their analysis is being processed. The functional tests also extend to the **History** management logic, where we validate the atomic "Batch Delete" operations that allow users to clear their archives. By rigorously testing these functional paths, the implementation ensures that the complex synchronization between the client, server, and database remains robust, providing a seamless and error-free experience for the end recruiter.

---

### **Part 3: User Acceptance and UI Testing (UAT)**

User Acceptance Testing (UAT) for Bias Buster is centered on the "Recruiter Experience" and the clarity of the AI-generated dashboard. This phase validates that the complex analytical data—such as the STAR breakdowns and bias severity levels—is presented in a way that is actionable and easy to interpret. We perform "Cross-Browser" and "Responsive" testing to ensure that the **ShadCN** components, specifically the **Recharts** visualizations and **Accordion** breakdowns, maintain their integrity and readability on tablets and mobile devices. This ensures that recruiters can review candidate assessments "on the go" without losing access to critical evidence. We also conduct "Accessibility" audits using ARIA-compliant testing tools to guarantee that the platform is usable by recruiters with varying needs, focusing on high-contrast ratios and screen-reader compatibility.

The UAT phase also involves "Scenario-Based" testing to validate the system’s diarization and evidence extraction. We test the system with transcripts featuring multiple speakers, varying accents, and complex industry jargon to ensure that the **Gemini Pro** model correctly attributes dialogue to the "Interviewer" or "Candidate." We specifically look for "Evidence Grounding," verifying that the "Transcript References" provided in the bias audit exactly match the text in the original transcript. By involving real-world recruitment scenarios in the testing loop, we ensure that the system provides genuine value to HR professionals, helping them make faster, more objective decisions. This phase marks the final "User-Centric" validation, confirming that the technical implementation translates into a high-utility professional tool.

---

### **Part 4: Detailed Test Cases and Execution Results**

This section outlines the specific test cases executed during the final validation of the Bias Buster platform. Each test case is designed to verify a specific functional or security requirement, ensuring 100% coverage of the system’s core capabilities.

| Test ID | Category | Test Scenario Description | Expected Outcome | Result |
| :--- | :--- | :--- | :--- | :--- |
| **TC-01** | **Auth** | User attempts to sign up with an existing email address. | System returns a "Firebase: Email already in use" error toast. | **Pass** |
| **TC-02** | **Security** | Authenticated User A tries to access an interview document ID belonging to User B. | Firestore Security Rules reject the request with "Missing or insufficient permissions." | **Pass** |
| **TC-03** | **AI Analysis** | Recruiter uploads a valid interview transcript with two speakers. | AI correctly diarizes the dialogue and extracts STAR evidence for at least 2 questions. | **Pass** |
| **TC-04** | **Bias Detection** | Transcript with a "leading negative question" is uploaded for analysis. | AI flags a "Framing Effect" bias with a severity rating of "Medium" and a transcript quote. | **Pass** |
| **TC-05** | **UI/UX** | User resizes the browser to a mobile viewport while viewing the dashboard. | Sidebar collapses, and the overall score radial chart scales proportionally for mobile viewing. | **Pass** |
| **TC-06** | **Persistence** | User deletes an analysis from the History view. | The document is removed from Firestore and disappears from the UI in real-time. | **Pass** |
| **TC-07** | **History** | User checks the "Top Candidate" badge in a list of 5 interviews. | The interview with the highest "Overall Candidate Score" is correctly badged in emerald. | **Pass** |
| **TC-08** | **Validation** | User submits the analysis form without providing a candidate name. | The form prevents submission and displays a "Candidate name is required" message. | **Pass** |

These test cases confirm that the application logic, security rules, and AI orchestration are functioning in perfect synchronization, meeting all professional and technical requirements of the platform.