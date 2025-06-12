import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Categories({ darkMode }) {
	const [posts, setPosts] = useState([]);
	const [filteredPosts, setFilteredPosts] = useState([]);
	const [languages, setLanguages] = useState(['all']);
	const [lengths, setLengths] = useState(['all']);
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
					// Extract from categories array
					if (Array.isArray(post.categories)) {
						post.categories.forEach(cat => {
							const lowerCat = cat.trim().toLowerCase();
							if (["english", "hindi", "urdu"].includes(lowerCat)) {
								if (["hindi", "urdu"].includes(lowerCat)) {
									languageSet.add("hindi/urdu");
								} 
								else {
									languageSet.add(lowerCat);
								}
							}
						});
					}

					// Extract from separate `length` field
					if (typeof post.length === 'string') {
						const len = post.length.trim().toLowerCase();
						if (["short", "medium", "long"].includes(len)) {
							lengthSet.add(len);
						}
					}
				});


				setLanguages(['all', ...Array.from(languageSet)]);
				setLengths(['all', ...Array.from(lengthSet)]);
			})
			.catch((err) => console.error("Fetch error:", err));
	}, []);

	useEffect(() => {
		let result = posts;

		if (selectedLanguage !== 'all') {
			result = result.filter(post =>
				(post.categories || []).some(cat => {
					const lowerCat = cat.trim().toLowerCase();
					if (selectedLanguage === 'hindi/urdu') {
						return lowerCat === 'hindi' || lowerCat === 'urdu';
					}
					return lowerCat === selectedLanguage;
				})
			);
		}

		if (selectedLength !== 'all') {
			result = result.filter(post =>
				post.length?.trim().toLowerCase() === selectedLength
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
						<option key={lang} value={lang}>{lang.charAt(0).toUpperCase() + lang.slice(1)}</option>
					))}
				</select>
			</div>

			<div style={{ marginBottom: '1rem' }}>
				<label style={{ marginRight: '0.5rem' }}>Length:</label>
				<select value={selectedLength} onChange={(e) => setSelectedLength(e.target.value)}>
					{lengths.map(len => (
						<option key={len} value={len}>{len.charAt(0).toUpperCase() + len.slice(1)}</option>
					))}
				</select>
			</div>

			<ul className={`list-group mt-4 ${darkMode ? 'bg-dark text-white' : 'bg-light text-dark'}`}>
				{filteredPosts.length > 0 ? (
					filteredPosts.map(post => (
						<li
							key={post.slug}
							className={`list-group-item ${darkMode ? 'bg-dark text-white border-secondary' : 'bg-light text-dark border-light'}`}
						>
							<Link
								to={`/posts/${post.slug}`}
								className={`text-decoration-none ${darkMode ? 'text-light' : 'text-dark'}`}
							>
								{post.title}
							</Link>
						</li>
					))
				) : (
					
					<li className={`list-group-item ${darkMode ? 'bg-dark text-white' : 'bg-light text-dark'}`}>
						No posts found for selected filters.
					</li>
				)}
			</ul>


		</div>
	);
}

export default Categories;
