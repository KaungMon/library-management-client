import axios from "axios";

export const getCategoryLists = () => {
  const config = useRuntimeConfig();
  const fetchCategories = (categories) => {
    axios
      .get(`${config.public.apiBaseUrl}/category/lists`)
      .then((response) => {
        response.data.categories.forEach((category) => {
          categories.push({
            name: category.category_name,
            value: category.id,
          });
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return { fetchCategories };
};
