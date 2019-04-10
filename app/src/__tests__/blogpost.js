import 'jest-dom/extend-expect';
import 'react-testing-library/cleanup-after-each';
import React from 'react';
import { render, fireEvent } from 'react-testing-library';
import MyComponent from '../blogpost';

test('should properly show/hide a name when toggled', () => {
	const { getByTestId, rerender } = render(<MyComponent name="michael" />);
	const ToggleButton = getByTestId('button');
	expect(ToggleButton).toHaveTextContent('Show Name');
	fireEvent.click(ToggleButton);
	expect(getByTestId('name')).toHaveTextContent('michael');
	rerender(<MyComponent />);
	expect(ToggleButton).toHaveTextContent('No name Provided');
	expect(getByTestId('name').nodeValue).toBeNull();
});
