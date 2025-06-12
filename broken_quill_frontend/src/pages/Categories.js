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
						const lowerCat = cat.toLowerCase();
						if (["english", "hindi", "urdu"].includes(lowerCat)) languageSet.add(lowerCat);
						if (["short", "medium", "long"].includes(lowerCat)) lengthSet.add(lowerCat);
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

			<div>
				<label>Language: </label>
				<select value={selectedLanguage} onChange={(e) => setSelectedLanguage(e.target.value)}>
					{languages.map(lang => (
						<option key={lang} value={lang}>{lang}</option>
					))}
				</select>
			</div>

			<div>
				<label>Length: </label>
				<select value={selectedLength} onChange={(e) => setSelectedLength(e.target.value)}>
					{lengths.map(len => (
						<option key={len} value={len}>{len}</option>
					))}
				</select>
			</div>

			<ul className="list-group mt-4">
				{filteredPosts.map(post => (
					<li key={post.slug} className="list-group-item">
						<Link to={`/posts/${post.slug}`}>{post.title}</Link>
					</li>
				))}
			</ul>
		</div>
	);
}

export default Categories;
