import 'jest-dom/extend-expect';
import 'react-testing-library/cleanup-after-each';
import React from 'react';
import { render, fireEvent } from 'react-testing-library';
import { Editor } from '../Editor.js';
import { savePost as mockSavePost } from '../SavePost';
afterEach(() => {
	mockSavePost.mockClear();
});
const FakeUser = {
	id: '123',
};
const MockPost = {
	title: 'Title',
	content: 'Content',
	tags: ['tags1', 'tags2'],
};
jest.mock('../SavePost', () => {
	return {
		savePost: jest.fn(() => Promise.resolve()),
	};
});

test('should render a form with title, content, tags, and a submit button', () => {
	const { getByLabelText, getByText } = render(<Editor user={FakeUser} />);
	getByLabelText(/title/i).value = MockPost.title;
	getByLabelText(/content/i).value = MockPost.content;
	getByLabelText(/tags/i).value = MockPost.tags;
	const submitButton = getByText(/submit/i);
	fireEvent.click(submitButton);
	expect(submitButton).toBeDisabled();
	expect(mockSavePost).toHaveBeenCalledTimes(1);
	expect(mockSavePost).toHaveBeenCalledWith({
		...MockPost,
		authorId: FakeUser.id,
	});
});
