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

	return (
		<nav className="navbar navbar-expand-lg navbar-light bg-light">
			<div className="container">
				<Link className="navbar-brand" to="/">Broken Quill</Link>
				<div className="collapse navbar-collapse">
					<ul className="navbar-nav ms-auto">
						<li className="nav-item">
							<Link
								to="/"
								className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
							>
								Home
							</Link>
						</li>
						<li className="nav-item">
							<Link
								to="/categories"
								className={`nav-link ${location.pathname === '/categories' ? 'active' : ''}`}
							>
								Categories
							</Link>
						</li>
						<li className="nav-item">
							<Link
								to="/contact"
								className={`nav-link ${location.pathname === '/contact' ? 'active' : ''}`}
							>
								Contact
							</Link>
						</li>
					</ul>
				</div>
			</div>
		</nav>

	);
}

export default Header;
