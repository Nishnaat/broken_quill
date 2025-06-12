// src/components/Footer.jsx
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaInstagram, FaYoutube } from 'react-icons/fa';

const Footer = ({ darkMode }) => {
	const footerClass = darkMode ? 'footer-dark' : 'footer-light';

	useEffect(() => {
		const script = document.createElement('script');
		script.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1584144256760502';
		script.async = true;
		script.crossOrigin = 'anonymous';
		document.body.appendChild(script);

		try {
			(window.adsbygoogle = window.adsbygoogle || []).push({});
		} catch (e) {
			console.error('AdSense error:', e);
		}
	}, []);

	return (
		<footer className={`mt-5 py-4 text-center border-top ${footerClass}`}>
			<p style={styles.title}>📝 My Shayari Blog</p>

			<nav style={styles.nav}>
				<Link to="/">Home</Link> |{' '}
				<Link to="/posts">All Posts</Link> |{' '}
				<Link to="/categories">Categories</Link> |{' '}
				<Link to="/contact">Contact</Link>
			</nav>

			<div style={styles.social}>
				<a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
					<FaFacebook size={22} />
				</a>
				<a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
					<FaInstagram size={22} />
				</a>
				<a href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
					<FaYoutube size={22} />
				</a>
			</div>

			{/* 🔸 Google AdSense Ad */}
			<ins className="adsbygoogle"
				style={{ display: 'block', margin: '20px auto' }}
				data-ad-client="ca-pub-1584144256760502"
				data-ad-slot="6050255608"
				data-ad-format="auto"
				data-full-width-responsive="true"></ins>

			<p style={styles.credits}>
				© 2025 Naked Metaphor. All rights reserved.<br />
				Made with ❤️
			</p>
		</footer>
	);
};

const styles = {
	title: {
		fontWeight: 'bold',
		fontSize: '1.2rem',
		marginBottom: '0.5rem',
	},
	nav: {
		marginBottom: '1rem',
	},
	social: {
		display: 'flex',
		justifyContent: 'center',
		gap: '1rem',
		marginBottom: '1rem',
	},
	credits: {
		fontStyle: 'italic',
		opacity: 0.8,
		marginTop: '1rem',
	},
};

export default Footer;
