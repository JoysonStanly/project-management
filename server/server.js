import express from 'express'
import "dotenv/config";
import cors from "cors";
import { clerkMiddleware } from '@clerk/express'
import { inngest, functions } from './inngest/index.js';
import { serve } from "inngest/express";

const app = express()

app.use(express.json());
app.use(cors());

// ✅ Skip Clerk for Inngest
app.use((req, res, next) => {
  if (req.path.startsWith("/api/inngest")) {
    return next();
  }
  return clerkMiddleware()(req, res, next);
});

app.get("/", (req,res) => res.send("server is live"));

// ✅ Inngest route
app.use("/api/inngest", serve({ client: inngest, functions }));

const PORT = process.env.PORT || 5000 

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));