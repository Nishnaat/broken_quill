import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Header() {
	const [darkMode, setDarkMode] = useState(false);

	useEffect(() => {
		if (darkMode) {
			document.body.classList.add('bg-dark', 'text-white');
			document.body.classList.remove('bg-light', 'text-dark');
		} else {
			document.body.classList.add('bg-light', 'text-dark');
			document.body.classList.remove('bg-dark', 'text-white');
		}
	}, [darkMode]);

	return (
		<nav className={`navbar navbar-expand-lg ${darkMode ? 'navbar-dark bg-dark' : 'navbar-light bg-light'}`}>
			<div className="container">
				<Link className="navbar-brand" to="/">
					Broken Quill
				</Link>
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
							<Link className="nav-link" to="/">Home</Link>
						</li>
						<li className="nav-item">
							<Link className="nav-link" to="/contact">Contact</Link>
						</li>
						<li className="nav-item">
							<Link className="nav-link" to="/posts">All Posts</Link>
						</li>
						<li className="nav-item">
							<Link className="nav-link" to="/categories">Categories</Link>
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
