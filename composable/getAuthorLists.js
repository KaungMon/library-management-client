import axios from "axios";
export const getAuthorLists = () => {
  const config = useRuntimeConfig();
  const fetchAuthors = (authors) => {
    axios
      .get(`${config.public.apiBaseUrl}/author/lists`)
      .then((response) => {
        response.data.authors.forEach((author) => {
          authors.push({
            author_name: author.author_name,
            id: author.id,
          });
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return { fetchAuthors };
};
