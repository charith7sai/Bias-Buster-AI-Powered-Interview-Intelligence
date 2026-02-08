import { config } from 'dotenv';
config();

import '@/ai/flows/generate-candidate-score.ts';
import '@/ai/flows/generate-star-analysis.ts';
import '@/ai/flows/detect-interviewer-bias.ts';
import '@/ai/flows/summarize-strengths-weaknesses.ts';