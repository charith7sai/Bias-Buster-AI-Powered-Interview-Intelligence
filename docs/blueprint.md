# **App Name**: InterviewIQ - Offline Analyzer

## Core Features:

- Audio/Video Input: Accepts full interview audio or video recordings for analysis.
- Local Speech-to-Text: Converts speech to text using local open-source models (e.g., Whisper) without requiring an API key.
- Speaker Diarization: Performs speaker diarization to distinguish between interviewer and candidate (e.g., using Pyannote).
- STAR Analysis: Analyzes candidate responses based on the STAR (Situation, Task, Action, Result) framework using a local LLM tool to assist reasoning about incorporation of info in output.
- Candidate Scoring: Generates STAR scores and an overall candidate rating based on the analysis.
- Bias Detection: Detects interviewer bias, including leading questions, speaking time imbalance, interruptions, and sentiment/tone bias, leveraging sentiment analysis libraries and local LLM.
- Strengths/Weaknesses: Provides a summary of candidate strengths and suggestions for improvement.

## Style Guidelines:

- Primary color: Deep blue (#3F51B5) for professionalism and trust.
- Background color: Light gray (#EEEEEE) for a clean, neutral interface.
- Accent color: Soft green (#8BC34A) to highlight positive insights and suggestions.
- Body and headline font: 'Inter' for a modern and readable sans-serif experience.
- Use material design icons to represent different metrics and suggestions.
- Use a clear, structured layout with sections for input, analysis, scoring, and bias detection.
- Subtle animations to indicate processing and highlight key findings.