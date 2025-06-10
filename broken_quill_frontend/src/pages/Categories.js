import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Categories() {
	const [categories, setCategories] = useState([]);

	useEffect(() => {
		fetch('${process.env.REACT_APP_API_URL}/api/posts')
			.then((res) => res.json())
			.then((data) => {
				// Extract unique categories
				const uniqueCategories = [...new Set(data.map(post => post.category || 'Uncategorized'))];
				setCategories(uniqueCategories);
			})
			.catch((err) => console.error(err));
	}, []);

	return (
		<div>
			<h2>Categories</h2>
			<ul className="list-group">
				{categories.map((cat) => (
					<li key={cat} className="list-group-item">
						{cat}
					</li>
				))}
			</ul>
		</div>
	);
}

export default Categories;
