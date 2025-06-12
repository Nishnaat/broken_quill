import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Categories() {
	const [posts, setPosts] = useState([]);
	const [filteredPosts, setFilteredPosts] = useState([]);
	const [languages, setLanguages] = useState([]);
	const [lengths, setLengths] = useState([]);
	const [selectedLanguage, setSelectedLanguage] = useState('all');
	const [selectedLength, setSelectedLength] = useState('all');

	useEffect(() => {
		fetch(`${process.env.REACT_APP_API_URL}/api/posts`)
			.then((res) => res.json())
			.then((data) => {
				setPosts(data);
				setFilteredPosts(data);

				const languageSet = new Set();
				const lengthSet = new Set();

				data.forEach(post => {
					(post.categories || []).forEach(cat => {
						const lowerCat = cat.trim().toLowerCase();
						if (["english", "hindi", "urdu"].includes(lowerCat)) {
							languageSet.add(lowerCat);
						}
						if (["short", "medium", "long"].includes(lowerCat)) {
							lengthSet.add(lowerCat);
						}
					});
				});

				setLanguages(['all', ...Array.from(languageSet)]);
				setLengths(['all', ...Array.from(lengthSet)]);
			})
			.catch((err) => console.error(err));
	}, []);

	useEffect(() => {
		let result = posts;

		if (selectedLanguage !== 'all') {
			result = result.filter(post =>
				(post.categories || []).some(cat => cat.toLowerCase() === selectedLanguage)
			);
		}

		if (selectedLength !== 'all') {
			result = result.filter(post =>
				(post.categories || []).some(cat => cat.toLowerCase() === selectedLength)
			);
		}

		setFilteredPosts(result);
	}, [selectedLanguage, selectedLength, posts]);

	return (
		<div>
			<h2>Categories</h2>

			<div style={{ marginBottom: '1rem' }}>
				<label style={{ marginRight: '0.5rem' }}>Language:</label>
				<select value={selectedLanguage} onChange={(e) => setSelectedLanguage(e.target.value)}>
					{languages.map(lang => (
						<option key={lang} value={lang}>
							{lang.charAt(0).toUpperCase() + lang.slice(1)}
						</option>
					))}
				</select>
			</div>

			<div style={{ marginBottom: '1rem' }}>
				<label style={{ marginRight: '0.5rem' }}>Length:</label>
				<select value={selectedLength} onChange={(e) => setSelectedLength(e.target.value)}>
					{lengths.map(len => (
						<option key={len} value={len}>
							{len.charAt(0).toUpperCase() + len.slice(1)}
						</option>
					))}
				</select>
			</div>

			<ul className="list-group mt-4">
				{filteredPosts.length > 0 ? (
					filteredPosts.map(post => (
						<li key={post.slug} className="list-group-item">
							<Link to={`/posts/${post.slug}`}>{post.title}</Link>
						</li>
					))
				) : (
					<li className="list-group-item">No posts found for selected filters.</li>
				)}
			</ul>
		</div>
	);
}

export default Categories;
