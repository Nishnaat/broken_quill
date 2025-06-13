import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

function Header({ darkMode, setDarkMode }) {
	const location = useLocation();

	useEffect(() => {
		if (darkMode) {
			document.body.classList.add('bg-dark', 'text-white');
			document.body.classList.remove('bg-light', 'text-dark');
		} else {
			document.body.classList.add('bg-light', 'text-dark');
			document.body.classList.remove('bg-dark', 'text-white');
		}
	}, [darkMode]);

	// Function to check if link is active
	const isActive = (path) => location.pathname === path;

	return (
		<nav className={`navbar navbar-expand-lg ${darkMode ? 'navbar-dark bg-dark' : 'navbar-light bg-light'}`}>
			<div className="container">
				<Link className="navbar-brand" to="/">Broken Quill</Link>
				<button
					className="navbar-toggler"
					type="button"
					data-bs-toggle="collapse"
					data-bs-target="#navbarNav"
					aria-controls="navbarNav"
					aria-expanded="false"
					aria-label="Toggle navigation"
				>
					<span className="navbar-toggler-icon"></span>
				</button>
				<div className="collapse navbar-collapse" id="navbarNav">
					<ul className="navbar-nav ms-auto">
						<li className="nav-item">
							<Link className={`nav-link ${isActive('/') ? 'active' : ''}`} to="/">Home</Link>
						</li>
						<li className="nav-item">
							<Link className={`nav-link ${isActive('/contact') ? 'active' : ''}`} to="/contact">Contact</Link>
						</li>
						<li className="nav-item">
							<Link className={`nav-link ${isActive('/posts') ? 'active' : ''}`} to="/posts">All Posts</Link>
						</li>
						<li className="nav-item">
							<Link className={`nav-link ${isActive('/categories') ? 'active' : ''}`} to="/categories">Categories</Link>
						</li>
						<li className="nav-item">
							<button
								onClick={() => setDarkMode(!darkMode)}
								className={`btn btn-sm ${darkMode ? 'btn-outline-light' : 'btn-outline-dark'} ms-3`}
							>
								{darkMode ? '☀️ Light' : '🌙 Dark'}
							</button>
						</li>
					</ul>
				</div>
			</div>
		</nav>
	);
}

export default Header;
