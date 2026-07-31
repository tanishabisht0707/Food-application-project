export function FilterData(data, search, category) {
  return data.filter((restaurant) => {
    const matchesSearch =
      !search ||
      restaurant.info.name
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      restaurant.info.cuisines?.some((cuisine) =>
        cuisine.toLowerCase().includes(search.toLowerCase())
      );

    const matchesCategory =
      category === "All" ||
      restaurant.info.cuisines?.some(
        (cuisine) =>
          cuisine.toLowerCase() === category.toLowerCase()
      );

    return matchesSearch && matchesCategory;
  });
}