import axios from "axios";

axios.defaults.baseURL = "http://hn.algolia.com/api/v1";

export const fetchArticles = async () => {
       const resp = await axios.get("/search");
       return resp.data.hits
}