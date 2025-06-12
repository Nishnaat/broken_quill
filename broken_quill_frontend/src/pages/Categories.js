import React, { useEffect, useState } from 'react';

function Categories() {
	const [posts, setPosts] = useState([]);
	const [filteredCategories, setFilteredCategories] = useState([]);
	const [languageFilter, setLanguageFilter] = useState('all');
	const [lengthFilter, setLengthFilter] = useState('all');

	useEffect(() => {
		fetch(`${process.env.REACT_APP_API_URL}/api/posts`)
			.then((res) => res.json())
			.then((data) => {
				setPosts(data);
				filterCategories(data, languageFilter, lengthFilter);
			})
			.catch((err) => console.error(err));
	}, []);

	useEffect(() => {
		filterCategories(posts, languageFilter, lengthFilter);
	}, [languageFilter, lengthFilter]);

	const filterCategories = (data, lang, len) => {
		let filtered = data;

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

		const uniqueCategories = [
			...new Set(filtered.flatMap(post => post.categories || ['Uncategorized']))
		];
		setFilteredCategories(uniqueCategories);
	};

	return (
		<div className="container">
			<h2>Categories</h2>

			<div className="filters mb-3">
				<label className="me-2">
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

				<label className="ms-4">
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

			<ul className="list-group">
				{filteredCategories.map((cat) => (
					<li key={cat} className="list-group-item">
						{cat}
					</li>
				))}
			</ul>
		</div>
	);
}

export default Categories;
