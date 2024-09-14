import React, { useState, useEffect } from 'react';
import axios from 'axios';

const NewsFeed = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [country, setCountry] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchNews();
  }, [search, category, country, page]);

  const fetchNews = async () => {
    setLoading(true);
    try {
      const response = await axios.get('https://accowale3.onrender.com/api/news', {
        params: {
          search: search || 'latest',
          category,
          country,
          page
        }
      });
      setArticles(response.data.articles);
      setTotalPages(response.data.totalPages || 10); // Adjust according to your backend
      setLoading(false);
    } catch (error) {
      console.error('Error fetching news', error);
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const handleCountryChange = (e) => {
    setCountry(e.target.value);
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="news-feed">
      {/* Search Bar */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search news..."
          value={search}
          onChange={handleSearch}
        />
      </div>

      {/* Filters */}
      <div className="filters">
        <select value={category} onChange={handleCategoryChange}>
          <option value="">All Categories</option>
          <option value="business">Business</option>
          <option value="entertainment">Entertainment</option>
          <option value="general">General</option>
          <option value="health">Health</option>
          <option value="science">Science</option>
          <option value="sports">Sports</option>
          <option value="technology">Technology</option>
        </select>

        <select value={country} onChange={handleCountryChange}>
          <option value="">All Countries</option>
          <option value="us">USA</option>
          <option value="gb">UK</option>
          <option value="in">India</option>
          <option value="de">Germany</option>
        </select>
      </div>

      {/* News Feed */}
      <div className="articles-grid">
        {articles.map((article) => (
          <div key={article.url} className="card">
            <img src={article.image} alt={article.title} />
            <h3>{article.title}</h3>
            <p>{article.description}</p>
            <a href={article.url} target="_blank" rel="noopener noreferrer">
              Read More...
            </a>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="pagination">
        <button onClick={() => handlePageChange(page - 1)} disabled={page === 1}>
          Previous
        </button>
        <span>Page {page} of {totalPages}</span>
        <button onClick={() => handlePageChange(page + 1)} disabled={page === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
};

export default NewsFeed;
