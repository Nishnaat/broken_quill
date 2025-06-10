import React, { useState } from 'react';

function Contact() {
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		message: ''
	});

	const [submitted, setSubmitted] = useState(false);

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		if (formData.name && formData.email && formData.message) {
			console.log('Form Submitted:', formData);
			setSubmitted(true);
			setFormData({ name: '', email: '', message: '' });
		}
	};

	return (
		<div className="card shadow-sm p-4">
			<h2 className="mb-4">Contact Us</h2>

			{submitted && (
				<div className="alert alert-success" role="alert">
					Thank you for your message!
				</div>
			)}

			<form onSubmit={handleSubmit}>
				<div className="mb-3">
					<label htmlFor="name" className="form-label">
						Name
					</label>
					<input
						type="text"
						className="form-control"
						id="name"
						name="name"
						value={formData.name}
						onChange={handleChange}
						required
					/>
				</div>

				<div className="mb-3">
					<label htmlFor="email" className="form-label">
						Email
					</label>
					<input
						type="email"
						className="form-control"
						id="email"
						name="email"
						value={formData.email}
						onChange={handleChange}
						required
					/>
				</div>

				<div className="mb-3">
					<label htmlFor="message" className="form-label">
						Message
					</label>
					<textarea
						className="form-control"
						id="message"
						name="message"
						rows="5"
						value={formData.message}
						onChange={handleChange}
						required
					></textarea>
				</div>

				<button type="submit" className="btn btn-primary">
					Send Message
				</button>
			</form>
		</div>
	);
}

export default Contact;
