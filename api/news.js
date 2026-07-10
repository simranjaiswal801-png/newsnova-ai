export default async function handler(req, res) {
  try {
    const response = await fetch(
      `https://gnews.io/api/v4/top-headlines?lang=en&country=in&max=24&apikey=${process.env.GNEWS_API_KEY}`,
    );

    const data = await response.json();

    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({
      error: "Failed to fetch news",
    });
  }
}
