import { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:5000/api/restaurants";

function useData() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        setLoading(true);
        const res = await axios.get(API_URL);
        const cards = res.data?.data?.cards || [];
    console.log(res.data?.data?.cards )

        const restaurantCard = cards.find(
          (item) => item?.card?.card?.gridElements?.infoWithStyle?.restaurants,
        );

        const restaurantList =
          restaurantCard?.card?.card?.gridElements?.infoWithStyle
            ?.restaurants || [];

        setData(restaurantList);
      } catch (error) {
        setErr(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurants();
  }, []);

  return {
    data,
    loading,
    err,
  };
}

export default useData;
