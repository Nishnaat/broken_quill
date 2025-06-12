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
				setPosts(data);
				setFilteredPosts(data);
			})
			.catch((err) => console.error(err));
	}, []);

	useEffect(() => {
		let filtered = posts;

		if (languageFilter !== 'all') {
			filtered = filtered.filter(post =>
				Array.isArray(post.categories) &&
				post.categories.includes(languageFilter)
			);
		}

		if (lengthFilter !== 'all') {
			filtered = filtered.filter(post =>
				Array.isArray(post.categories) &&
				post.categories.includes(lengthFilter)
			);
		}

		setFilteredPosts(filtered);
	}, [languageFilter, lengthFilter, posts]);

	const handleLanguageChange = (e) => setLanguageFilter(e.target.value);
	const handleLengthChange = (e) => setLengthFilter(e.target.value);

	const languages = ['all', 'english', 'hindi', 'urdu'];
	const lengths = ['all', 'short', 'medium', 'long'];

	return (
		<div className="container">
			<h2 className="my-3">Categories</h2>

			<div className="mb-3">
				<label className="form-label me-2">Language:</label>
				<select value={languageFilter} onChange={handleLanguageChange} className="form-select d-inline w-auto me-3">
					{languages.map(lang => (
						<option key={lang} value={lang}>{lang.charAt(0).toUpperCase() + lang.slice(1)}</option>
					))}
				</select>

				<label className="form-label me-2">Length:</label>
				<select value={lengthFilter} onChange={handleLengthChange} className="form-select d-inline w-auto">
					{lengths.map(len => (
						<option key={len} value={len}>{len.charAt(0).toUpperCase() + len.slice(1)}</option>
					))}
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
