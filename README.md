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

## 📤 Pushing to GitHub (Step-by-Step)

If you are uploading this project for the first time, follow these instructions to avoid common errors.

### **Option A: The Fresh Start (Recommended)**
If you just created an empty repository on GitHub, run these commands in order:

1. `git init`
2. `git add .`
3. `git commit -m "Initial commit"`
4. `git remote add origin https://github.com/charith7sai/Bias-Buster-AI-Powered-Interview-Intelligence.git`
5. `git branch -M main`
6. `git push -u origin main --force` 

*Note: The `--force` flag is used here because GitHub often creates a default README/License that conflicts with your local files. This command overwrites the GitHub placeholder with your actual code.*

### **Option B: Merging with existing GitHub files**
If you want to keep files that are already on GitHub (like a README you edited online):

1. `git config pull.rebase false`
2. `git pull origin main --allow-unrelated-histories`
3. `git add .`
4. `git commit -m "Merge GitHub changes"`
5. `git push -u origin main`

## 🛠️ Tech Stack
- **Framework:** Next.js 15 (App Router)
- **AI Orchestration:** Genkit
- **LLM:** Gemini 1.5 Pro
- **Database:** Cloud Firestore
- **Auth:** Firebase Authentication
- **Styling:** Tailwind CSS + ShadCN UI
