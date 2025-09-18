import { setupWorker } from "msw";
import { handlers } from "./Handlers"; // nhớ đúng tên file Handlers.ts

export const worker = setupWorker(...handlers);
