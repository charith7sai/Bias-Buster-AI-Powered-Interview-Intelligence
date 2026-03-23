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

## 📤 Pushing to GitHub (Fixing the Rejection Error)

If you see an error like `[rejected] main -> main (non-fast-forward)`, run these commands in order to sync your local project with the GitHub repository:

1. **Initialize Git (if not already done)**:
   ```bash
   git init
   ```
2. **Add and Commit your work**:
   ```bash
   git add .
   ```
3. **Commit**:
   ```bash
   git commit -m "Initial commit: Bias Buster implementation"
   ```
4. **Connect to your Remote Repository**:
   ```bash
   git remote add origin https://github.com/charith7sai/Bias-Buster-AI-Powered-Interview-Intelligence/tree/main
   ```
5. **THE FIX: Sync with Remote**:
   This merges the remote README/files with your local files:
   ```bash
   git pull origin main --allow-unrelated-histories
   ```
6. **Push to Main**:
   ```bash
   git push -u origin main
   ```

*Note: If the `pull` opens a text editor (like Vim), just type `:wq` and press Enter to save the merge message.*

## 🔒 Security

All data is secured using **Firebase Security Rules**, ensuring that interview data and transcripts are strictly private and accessible only to the authenticated recruiter who initiated the analysis.
