// these should normally be in your jest setupTestFrameworkScriptFile
import 'jest-dom/extend-expect';
import 'react-testing-library/cleanup-after-each';
import React from 'react';
import { render, fireEvent, wait } from 'react-testing-library';
import { GreetingLoader } from '../greeting-loader-01-mocking';
import { loadGreeting as mockLoadGreeting } from '../api';

jest.mock('../api', () => {
	return {
		loadGreeting: jest.fn(subject =>
			Promise.resolve({ data: { greeting: `Hi ${subject}` } })
		),
	};
});
test('loads greetings on click', async () => {
	const { getByLabelText, getByTestId, getByText } = render(<GreetingLoader />);
	const nameInput = getByLabelText(/name/i);
	const loadButton = getByText(/load/i);
	nameInput.value = 'Mary';
	fireEvent.click(loadButton);
	await wait(() =>
		expect(getByTestId('greeting')).toHaveTextContent('Hi Mary')
	);
	expect(mockLoadGreeting).toHaveBeenCalledTimes(1);
	expect(mockLoadGreeting).toHaveBeenCalledWith('Mary');
});
