import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Categories() {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [languageFilter, setLanguageFilter] = useState('all');
  const [lengthFilter, setLengthFilter] = useState('all');

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/api/posts`)
      .then((res) => res.json())
      .then((data) => {
        console.log('Fetched posts:', data);
        setPosts(data);
        setFilteredPosts(data);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    console.log('Applying filters:', { languageFilter, lengthFilter });
    const filtered = posts.filter(post => {
      const cats = Array.isArray(post.categories) ? post.categories : [];
      const matchLang = languageFilter === 'all' || cats.includes(languageFilter);
      const matchLen = lengthFilter === 'all' || cats.includes(lengthFilter);
      return matchLang && matchLen;
    });
    console.log('Filtered posts:', filtered);
    setFilteredPosts(filtered);
  }, [languageFilter, lengthFilter, posts]);

  return (
    <div className="container mt-4">
      <h2>Categories</h2>
      <div className="mb-3">
        <label className="me-2">Language:</label>
        <select
          value={languageFilter}
          onChange={e => setLanguageFilter(e.target.value)}
          className="form-select d-inline w-auto me-3"
        >
          <option value="all">All</option>
          <option value="english">English</option>
          <option value="hindi">Hindi</option>
          <option value="urdu">Urdu</option>
        </select>

        <label className="me-2">Length:</label>
        <select
          value={lengthFilter}
          onChange={e => setLengthFilter(e.target.value)}
          className="form-select d-inline w-auto"
        >
          <option value="all">All</option>
          <option value="short">Short</option>
          <option value="medium">Medium</option>
          <option value="long">Long</option>
        </select>
      </div>

      <ul className="list-group">
        {filteredPosts.length === 0 ? (
          <li className="list-group-item">No posts found for selected filters.</li>
        ) : (
          filteredPosts.map(post => (
            <li key={post.slug} className="list-group-item">
              <Link to={`/posts/${post.slug}`}>{post.title}</Link>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

export default Categories;
