import 'jest-dom/extend-expect';
import 'react-testing-library/cleanup-after-each';
import { act } from 'react-dom/test-utils';
import React from 'react';
import { render, fireEvent, wait } from 'react-testing-library';
import { Editor } from '../Editor.js';
import { savePost as mockSavePost } from '../SavePost';
import { Redirect as mockRedirect } from 'react-router';
jest.mock('react-router', () => {
	return {
		Redirect: jest.fn(() => null),
	};
});
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

test('should render a form with title, content, tags, and a submit button', async () => {
	const { getByLabelText, getByText } = render(<Editor user={FakeUser} />);
	const preDate = Date.now();
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
		date: expect.any(String),
	});
	const postDate = Date.now();
	const date = new Date(mockSavePost.mock.calls[0][0].date).getTime();
	expect(date).toBeGreaterThanOrEqual(preDate);
	expect(date).toBeLessThanOrEqual(postDate);
	await wait(() => expect(mockRedirect).toHaveBeenCalledTimes(1));
	expect(mockRedirect).toHaveBeenCalledWith({ to: '/' }, {});
});
