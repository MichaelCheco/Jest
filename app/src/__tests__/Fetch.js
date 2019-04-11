import 'jest-dom/extend-expect';
import 'react-testing-library/cleanup-after-each';
import React from 'react';
import { render, waitForElement } from 'react-testing-library';
import axiosMock from 'axios';
import Fetch from '../Fetch';
const url = '/greeting';

it('fetches data correctly', async () => {
	axiosMock.get.mockResolvedValueOnce({ data: { message: 'hi' } });
	const { getByTestId, debug } = render(<Fetch url={url} />);
	const loadingText = getByTestId('loading');
	debug(loadingText);
	expect(loadingText).toHaveTextContent('Loading');
	// debug();
	const resolvedValue = await waitForElement(() => getByTestId('resolved'));
	expect(resolvedValue).toHaveTextContent('hi');
	expect(axiosMock.get).toHaveBeenCalledTimes(1);
	expect(axiosMock.get).toHaveBeenCalledWith(url);
});
