import fetch from "node-fetch";


const apiKey = "AIzaSyCGGn3FpoIG9t6B-56snBkwsS7QhjvKft4";
const cx = "2388dc76762804b77";

async function googleSearch(query) {
  const url = `https://www.googleapis.com/customsearch/v1?key=${apiKey}&cx=${cx}&q=${encodeURIComponent(query)}`;

  const res = await fetch(url);
  const data = await res.json();

  if (!data.items) {
    console.log("No results found.");
    return;
  }

  // Pick only useful info
  const results = data.items.map(item => ({
    title: item.title,
    link: item.link,
    snippet: item.snippet
  }));

  console.log(results);
}

// Test it
googleSearch("chatgpt");
