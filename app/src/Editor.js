import React from 'react';
import { savePost } from './SavePost';
import { Redirect } from 'react-router';
export function Editor(props) {
	const [redirect, setRedirect] = React.useState(false);
	const [error, setError] = React.useState(null);

	const [saving, setSaving] = React.useState(false);
	const handleSubmit = e => {
		const { title, content, tags } = e.target.elements;
		e.preventDefault();
		setSaving(true);
		savePost({
			title: title.value,
			content: content.value,
			date: new Date().toISOString(),
			tags: tags.value.split(',').map(t => t.trim()),
			authorId: props.user.id,
		}).then(
			() => setRedirect(true),
			response => {
				setSaving(false);
				setError(response.data.error);
			}
		);
	};
	if (redirect) {
		return <Redirect to="/" />;
	}
	return (
		<form onSubmit={handleSubmit}>
			<label htmlFor="title">Title</label>
			<input id="title" name="title" />
			<label htmlFor="content">content</label>
			<input id="content" name="content" />
			<label htmlFor="tags">tags</label>
			<input id="tags" name="tags" />
			<button type="submit" disabled={saving}>
				Submit
			</button>
			{error ? <div data-testid="post-error">{error}</div> : null}
		</form>
	);
}
