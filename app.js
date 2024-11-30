const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000;

// Set up EJS as the view engine
app.set('view engine', 'ejs');

// Root route to fetch and display news articles
app.get('/', async (req, res) => {
  try {
    const response = await axios.get('https://real-time-news-data.p.rapidapi.com/topic-news-by-section', {
      params: {
        topic: 'TECHNOLOGY',
        section: 'CAQiW0NCQVNQZ29JTDIwdk1EZGpNWFlTQW1WdUdnSlZVeUlQQ0FRYUN3b0pMMjB2TURKdFpqRnVLaGtLRndvVFIwRkVSMFZVWDFORlExUkpUMDVmVGtGTlJTQUJLQUEqKggAKiYICiIgQ0JBU0Vnb0lMMjB2TURkak1YWVNBbVZ1R2dKVlV5Z0FQAVAB',
        limit: '5', // Limit for example
        country: 'US',
        lang: 'en'
      },
      headers: {
        'x-rapidapi-key': 'your-rapidapi-key',  // Replace with your actual RapidAPI key
        'x-rapidapi-host': 'real-time-news-data.p.rapidapi.com'
      }
    });

    const articles = response.data.articles || []; // Retrieve articles from API response
    res.render('index', { articles }); // Pass articles to the template
  } catch (error) {
    console.error("Error fetching articles:", error);
    res.render('index', { articles: [] }); // Render empty articles on error
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
