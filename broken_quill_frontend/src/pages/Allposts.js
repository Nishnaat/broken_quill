import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function AllPosts({ darkMode }) {
	const [posts, setPosts] = useState([]);

	useEffect(() => {
		fetch(`${process.env.REACT_APP_API_URL}/api/posts`)
			.then((res) => res.json())
			.then((data) => setPosts(data))
			.catch((err) => console.error(err));
	}, []);

	return (
		<div>
			<h2>All Blog Posts</h2>
			<div className="row">
				{posts.map((post) => (
					<div className="col-md-6 mb-4" key={post.slug}>
						<div className={`card featured-post mb-5 shadow ${darkMode ? 'custom-dark-card' : 'custom-light-card'}`}>
							<div className="card-body">
								<h5 className="card-title">{post.title}</h5>
                                <p className="card-text">{post.excerpt || 'No Excerpt'}</p>
								<Link to={`/posts/${post.slug}`} className="read-more-btn">Read More</Link>
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}

export default AllPosts;
