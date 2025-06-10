import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Home({ darkMode }) {
	const [posts, setPosts] = useState([]);
	const [featured, setFeatured] = useState(null);

	useEffect(() => {
		axios.get('${process.env.REACT_APP_API_URL}/api/posts')
			.then(res => {
				setPosts(res.data);

				// Assume first post is featured
				if (res.data.length > 0) {
					setFeatured(res.data[0]);
				}
			})
			.catch(err => console.error(err));
	}, []);

	return (
		<>
			{featured && (
				<div className="card featured-post mb-5 shadow">
					<div className="card-body">
						<h2 className="card-title">{featured.title} ⭐</h2>
						<p className="card-text">{featured.excerpt || 'This is a featured post!'}</p>
						<Link to={`/posts/${featured.slug}`} className="read-more-btn">Read More</Link>
					</div>
				</div>
			)}
			<h3 className="mb-4">📚 Latest Posts</h3>
			<div className="row">
				{posts.slice(1).map(post => (
					<div className="col-md-6 mb-4" key={post.slug}>
<div className={`card featured-post mb-5 shadow ${darkMode ? 'custom-dark-card' : 'custom-light-card'}`}>
							<div className="card-body">
								<h5 className="card-title">{post.title}</h5>
								<p className="card-text">{post.excerpt || 'This is a featured post!'}</p>
								<Link to={`/posts/${post.slug}`} className="read-more-btn">Read More</Link>
							</div>
						</div>
					</div>
				))}
			</div>
		</>
	);
}

export default Home;
