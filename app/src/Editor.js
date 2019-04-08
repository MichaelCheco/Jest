import React, { Component } from 'react';

export class Editor extends Component {
	render() {
		return (
			<form>
				<label htmlFor="title">Title</label>
				<input id="title" />
				<label htmlFor="content">content</label>
				<input id="content" />
				<label htmlFor="tags">tags</label>
				<input id="tags" />
				<button type="submit">Submit</button>
			</form>
		);
	}
}
