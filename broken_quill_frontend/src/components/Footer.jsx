// src/components/Footer.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaInstagram, FaYoutube } from 'react-icons/fa';

const Footer = ({ darkMode }) => {
	const footerClass = darkMode ? 'footer-dark' : 'footer-light';

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

			<p style={styles.credits}>
				© 2025 Broken Quill. All rights reserved.<br />
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
	},
};

export default Footer;
