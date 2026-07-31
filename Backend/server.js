import express from 'express';
import axios from 'axios';
import cors from 'cors';
import "dotenv/config";  
const app = express();

app.use(cors());

app.get('/api/restaurants', async(req,res) => {
try {

    const response = await axios.get(
      `https://www.swiggy.com/dapi/restaurants/list/v5?lat=28.4595&lng=77.0266&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING`,
      {
        headers: {
          "User-Agent":
            "Mozilla/5.0",
        },
      }
    );

    res.json(response.data);
  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: "Failed",
    });
  }});

 const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
