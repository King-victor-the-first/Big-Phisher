import { config } from 'dotenv';
config();

import '@/ai/flows/explain-suspicious-url.ts';
import '@/ai/flows/analyze-url-message.ts';
import '@/ai/tools/get-website-summary-tool.ts';
