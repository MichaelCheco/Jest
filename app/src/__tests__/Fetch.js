import 'jest-dom/extend-expect';
import 'react-testing-library/cleanup-after-each';
import React from 'react';
import { render, waitForElement } from 'react-testing-library';
import axiosMock from 'axios';
import Fetch from '../Fetch';
const url = '/greeting';
it('fetches data correctly', () => {
	const { getByTestId } = render(<Fetch url={url} />);
});
