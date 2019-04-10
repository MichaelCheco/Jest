import React from 'react';

function MyComponent(props) {
	const [toggle, setToggle] = React.useState(false);

	return (
		<>
			<p data-testid="name">{toggle ? props.name : ''}</p>
			<button onClick={() => setToggle(!toggle)} data-testid="button">
				{props.name ? (toggle ? 'Hide Name' : 'Show Name') : 'No name Provided'}
			</button>
		</>
	);
}

export default MyComponent;
