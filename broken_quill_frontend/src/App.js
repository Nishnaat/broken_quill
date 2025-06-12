import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import PostDetail from './pages/PostDetail';
import Contact from './pages/Contact'; // You can comment this out if not created yet
import Header from './components/Header';
import Allposts from './pages/Allposts';
import Categories from './pages/Categories';
import Footer from './components/Footer';


function App() {
	const [darkMode, setDarkMode] = useState(false);
	return (
		<Router>
			<>
				<Header darkMode={darkMode} setDarkMode={setDarkMode} />
				<div className={`container mt-4 ${darkMode ? 'bg-dark text-light' : ''}`}>
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/posts/:slug" element={<PostDetail d />} />
						<Route path="/contact" element={<Contact darkMode={darkMode} />} />
						<Route path="/posts" element={<Allposts darkMode={darkMode} />} />
						<Route path="/categories" element={<Categories darkMode={darkMode} />} />
					</Routes>
				</div>
				<Footer darkMode={darkMode} />
			</>
		</Router>
	);
}

export default App;
