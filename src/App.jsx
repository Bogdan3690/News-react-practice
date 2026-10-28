import { Component } from "react";
import { fetchArticles } from "./services/api";
import { DotLoader } from "react-spinners";
// import ContentLoader, { Facebook } from 'react-content-loader'
import "./App.css";


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
      const articles = await fetchArticles();

      this.setState({
        articles: articles,
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
        {isLoading &&
         <div>
          <DotLoader cssOverride={{display: "block", width: "42px",  margin: "0 auto" }} color="#36d7b7" size={42} speedMultiplier={0.75} />
         <p>Loading...</p>
         </div>}
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
