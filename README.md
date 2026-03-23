# Bias Buster: AI-Powered Interview Intelligence

Bias Buster is a sophisticated, data-driven application designed to enhance the objectivity and effectiveness of the hiring process. By leveraging Generative AI, the platform analyzes interview transcripts to identify behavioral evidence and mitigate unconscious bias.

## 🚀 Key Features

- **Automated STAR Analysis**: Automatically extracts the Situation, Task, Action, and Result from candidate responses to evaluate behavioral competencies.
- **Cognitive Bias Detection**: Identifies and flags potential biases such as the framing effect, affinity bias, and the halo effect with severity ratings.
- **Holistic Scoring Engine**: Generates a weighted 0-100 competency score based on objective performance signals.
- **Real-Time Diarization**: Formats raw transcripts into clean, speaker-identified dialogue for easy review.
- **Historical Benchmarking**: Saves all analyses to a secure cloud archive for long-term candidate comparison and auditability.

## 🛠 Tech Stack

- **Frontend**: Next.js 15 (App Router), React 19, Tailwind CSS.
- **UI Components**: ShadCN UI (Radix UI).
- **Backend-as-a-Service**: Firebase (Firestore, Authentication, App Hosting).
- **AI Orchestration**: Genkit with Google Gemini Pro.

## 📦 Getting Started

1. **Install Dependencies**: `npm install`
2. **Run Development Server**: `npm run dev`
3. **Build for Production**: `npm run build`

## 📤 THE ULTIMATE FIX: Pushing to GitHub

If you see an error like `[rejected] main -> main (non-fast-forward)` or `fatal: Need to specify how to reconcile divergent branches`, run these EXACT commands in order:

1. **Set Merge Strategy**:
   Tell Git to merge the histories instead of rebasing.
   ```bash
   git config pull.rebase false
   ```

2. **Sync with Remote (Merge)**:
   This fetches the remote files (like the README GitHub created) and merges them into your local project.
   ```bash
   git pull origin main --allow-unrelated-histories
   ```
   *Note: If a text editor (Vim) opens, type `:wq` and press Enter to save the merge message.*

3. **Push to Main**:
   Now that your local project has the remote's history, you can push successfully.
   ```bash
   git push -u origin main
   ```

## 🔒 Security

All data is secured using **Firebase Security Rules**, ensuring that interview data and transcripts are strictly private and accessible only to the authenticated recruiter who initiated the analysis.
