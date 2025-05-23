import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { GoogleSearch } from "google-search-results-nodejs";
import puppeteer from "puppeteer";

dotenv.config();

const app = express();
app.use(cors());

const search = new GoogleSearch(process.env.SERPAPI_KEY);

app.get("/api/social-search", async (req, res) => {
  const name = req.query.q;
  if (!name)
    return res.status(400).json({ error: "Parâmetro ?q= obrigatório" });

  const query = `("${name}") (site:facebook.com OR site:instagram.com OR site:linkedin.com/in OR site:youtube.com OR site:tiktok.com OR site:twitter.com OR site:threads.net OR site:pinterest.com)`;

  const params = {
    engine: "google",
    q: query,
    num: 20,
  };

  try {
    search.json(params, (data) => {
      const results = [];
      for (const result of data.organic_results || []) {
        const link = result.link;
        const title = result.title;
        if (
          link.includes("instagram.com") ||
          link.includes("facebook.com") ||
          link.includes("linkedin.com/in") ||
          link.includes("youtube.com") ||
          link.includes("tiktok.com") ||
          link.includes("twitter.com") ||
          link.includes("threads.net") ||
          link.includes("pinterest.com")
        ) {
          results.push({ title, link });
        }
      }

      res.json(results);
    });
  } catch (error) {
    console.error("Erro na SerpAPI:", error);
    res.status(500).json({ error: "Erro ao buscar dados OSINT na SerpAPI." });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(
    `✅ Backend OSINT via SerpAPI rodando em http://localhost:${PORT}`
  );
});
