import React from 'react';

export function Editor() {
	const [saving, setSaving] = React.useState(false);
	const handleSubmit = e => {
		e.preventDefault();
		setSaving(true);
	};
	return (
		<form onSubmit={handleSubmit}>
			<label htmlFor="title">Title</label>
			<input id="title" />
			<label htmlFor="content">content</label>
			<input id="content" />
			<label htmlFor="tags">tags</label>
			<input id="tags" />
			<button type="submit" disabled={saving}>
				Submit
			</button>
		</form>
	);
}
