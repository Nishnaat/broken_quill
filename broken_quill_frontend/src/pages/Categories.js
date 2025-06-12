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
				applyFilters(data, languageFilter, lengthFilter);
			})
			.catch((err) => console.error(err));
	}, []);

	useEffect(() => {
		applyFilters(posts, languageFilter, lengthFilter);
	}, [languageFilter, lengthFilter]);

	const applyFilters = (data, lang, len) => {
		let filtered = [...data];

		if (lang !== 'all') {
			filtered = filtered.filter(post =>
				lang === 'english'
					? post.categories?.includes('english')
					: post.categories?.some(c => c === 'hindi' || c === 'urdu')
			);
		}

		if (len !== 'all') {
			filtered = filtered.filter(post => post.length === len);
		}

		setFilteredPosts(filtered);
	};

	// Group posts by category
	const groupedByCategory = {};
	filteredPosts.forEach(post => {
		(post.categories || ['Uncategorized']).forEach(cat => {
			if (!groupedByCategory[cat]) groupedByCategory[cat] = [];
			groupedByCategory[cat].push(post);
		});
	});

	return (
		<div className="container">
			<h2>Categories</h2>

			<div className="filters mb-4">
				<label className="me-3">
					Language:
					<select
						value={languageFilter}
						onChange={(e) => setLanguageFilter(e.target.value)}
						className="form-select d-inline-block w-auto ms-2"
					>
						<option value="all">All</option>
						<option value="english">English</option>
						<option value="hindi/urdu">Hindi/Urdu</option>
					</select>
				</label>

				<label>
					Length:
					<select
						value={lengthFilter}
						onChange={(e) => setLengthFilter(e.target.value)}
						className="form-select d-inline-block w-auto ms-2"
					>
						<option value="all">All</option>
						<option value="short">Short</option>
						<option value="medium">Medium</option>
						<option value="long">Long</option>
					</select>
				</label>
			</div>

			{Object.entries(groupedByCategory).map(([category, posts]) => (
				<div key={category} className="mb-4">
					<h5 className="text-primary">{category}</h5>
					<ul className="list-group">
						{posts.map((post) => (
							<li key={post.slug} className="list-group-item">
								<Link to={`/post/${post.slug}`}>{post.title}</Link>
							</li>
						))}
					</ul>
				</div>
			))}

			{filteredPosts.length === 0 && (
				<div className="alert alert-warning mt-4">No posts found with selected filters.</div>
			)}
		</div>
	);
}

export default Categories;
