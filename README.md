# Bias Buster: AI-Powered Interview Intelligence

Bias Buster is a professional talent acquisition platform designed to transform raw interview dialogue into structured, actionable intelligence. It leverages Generative AI to perform diarization, STAR evidence extraction, and unconscious bias auditing.

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- Firebase Account

### Installation
1. Clone the repository
2. Install dependencies: `npm install`
3. Set up your Firebase environment variables in a `.env` file.
4. Run the development server: `npm run dev`

## 📤 Pushing to GitHub (The Fix)

If you are seeing errors like `[rejected] main -> main (non-fast-forward)`, it's because GitHub has files (like a default README) that your local computer doesn't have yet. 

**Option A: The Quickest Fix (Overwrites GitHub)**
If this is a brand new repository and you don't care about the placeholder files GitHub created, use this command to force your local code up:
```bash
git push -u origin main --force
```

**Option B: The "Correct" Way (Merges GitHub files)**
If you want to keep files from both places, run these three commands in order:
1. `git config pull.rebase false`
2. `git pull origin main --allow-unrelated-histories`
3. `git push -u origin main`

## 🛠️ Tech Stack
- **Framework:** Next.js 15 (App Router)
- **AI Orchestration:** Genkit
- **LLM:** Gemini 1.5 Pro
- **Database:** Cloud Firestore
- **Auth:** Firebase Authentication
- **Styling:** Tailwind CSS + ShadCN UI
