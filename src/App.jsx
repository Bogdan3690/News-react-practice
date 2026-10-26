import { Component } from "react";
import axios from "axios";
import "./App.css";

axios.defaults.baseURL = "http://hn.algolia.com/api/v1";

class App extends Component {
  state = {
    articles: [],
    isLoading: false,
    error: null,
  };

  async componentDidMount() {
    this.setState({
      isLoading: true,
    });
    try {
      const resp = await axios.get("/search");

      this.setState({
        articles: resp.data.hits,
      });
    } catch (error) {
      this.setState({
        error: error.message,
      });
    } finally {
      this.setState({
        isLoading: false,
      });
    }
  }

  render() {
    const { articles, isLoading, error } = this.state;
    return (
      <div>
        {error && <p>Oops something went wrong: {error}</p>}
        {isLoading && <p>Loading...</p>}
        {articles.length > 0 ? (
          <ul>
            {articles.map((article) => (
              <li key={article.objectID}>
                <a href={article.url} target="_blank" rel="noopener noreferrer">
                  {article.title}
                </a>
              </li>
            ))}
          </ul>
        ) : (
          <p>No articles</p>
        )}
      </div>
    );
  }
}

export default App;
