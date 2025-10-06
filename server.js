import express from "express";
import cors from "cors";
import fetch from "node-fetch"; // add this

const app = express();
const PORT = 5000;

app.use(cors());

const apiKey = "AIzaSyCGGn3FpoIG9t6B-56snBkwsS7QhjvKft4";   // put your real API key
const cx = "2388dc76762804b77";     // put your real CX

// Google Search Route
app.get("/search", async (req, res) => {
  const query = req.query.q;

  if (!query) {
    return res.status(400).json({ error: "Missing search query ?q=" });
  }

  try {
    const url = `https://www.googleapis.com/customsearch/v1?key=${apiKey}&cx=${cx}&q=${encodeURIComponent(query)}`;

    const response = await fetch(url);
    const data = await response.json();

    if (!data.items) {
      console.error("Google API error:", data);
      return res.json({ results: [] });
    }

    const results = data.items.map((item) => ({
      title: item.title,
      link: item.link,
      snippet: item.snippet,
    }));

    res.json({ results });
  } catch (error) {
    console.error("Backend error:", error);
    res.status(500).json({ error: "Failed to fetch search results" });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
