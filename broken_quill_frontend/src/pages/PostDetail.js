import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
	FacebookShareButton,
	TwitterShareButton,
	WhatsappShareButton,
	FacebookIcon,
	TwitterIcon,
	WhatsappIcon
} from 'react-share';
import { Helmet } from 'react-helmet';

function PostDetail() {
	const { slug } = useParams();
	const [post, setPost] = useState(null);

	useEffect(() => {
		fetch(`https://broken-quill-backend.onrender.com/api/posts/${slug}`)
			.then((res) => res.json())
			.then((data) => setPost(data));
	}, [slug]);

	if (!post) return <p>Loading...</p>;

	const shareUrl = window.location.href;

	return (
		<div className="container my-5">
			<Helmet>
				<title>{post.title} | My Blog</title>
				<meta name="description" content={post.excerpt || 'Check out this post on My Blog'} />
				<meta property="og:title" content={post.title} />
				<meta property="og:description" content={post.excerpt || 'Check out this post on My Blog'} />
				<meta property="og:type" content="article" />
				<meta property="og:url" content={shareUrl} />
				<meta property="og:image" content="https://yourdomain.com/default-og-image.jpg" />
			</Helmet>

			<h2 className="mb-3">{post.title}</h2>
			<div className="text-muted mb-3">{post.date}</div>
			<hr />
			<div dangerouslySetInnerHTML={{ __html: post.html }} />

			<div className="mt-5">
				<h5>Share this post:</h5>
				<div className="d-flex gap-3 align-items-center">
					<FacebookShareButton url={shareUrl}><FacebookIcon size={32} round /></FacebookShareButton>
					<TwitterShareButton url={shareUrl}><TwitterIcon size={32} round /></TwitterShareButton>
					<WhatsappShareButton url={shareUrl}><WhatsappIcon size={32} round /></WhatsappShareButton>
					<button
						className="btn btn-sm btn-outline-secondary"
						onClick={() => navigator.clipboard.writeText(shareUrl)}
					>
						Copy Link
					</button>
				</div>
			</div>
		</div>
	);
}

export default PostDetail;
