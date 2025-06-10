import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function AllPosts() {
	const [posts, setPosts] = useState([]);

	useEffect(() => {
		fetch(`${process.env.REACT_APP_API_URL}/api/posts/${slug}`)
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
						<div className="card h-100 shadow-sm">
							<div className="card-body">
								<h5 className="card-title">{post.title}</h5>
                                <p className="card-text">{post.excerpt || 'This is a featured post!'}</p>
								<Link to={`/posts/${post.slug}`} className="btn btn-outline-primary">
									Read More
								</Link>
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}

export default AllPosts;
