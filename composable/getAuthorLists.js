import axios from "axios";
export const getAuthorLists = () => {
  const config = useRuntimeConfig();
  const fetchAuthors = (authors) => {
    axios
      .get(`${config.public.apiBaseUrl}/author/lists`)
      .then((response) => {
        response.data.authors.forEach((author) => {
          authors.push({
            name: author.author_name,
            value: author.id,
          });
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return { fetchAuthors };
};
