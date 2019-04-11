import React, { useEffect } from 'react';
import axios from 'axios';
const [data, setData] = React.useState(null);
function Fetch({ url }) {
	useEffect(() => {
		const loadData = async () => {
			const res = await axios.get(url);
			setData(res.data);
		};
		loadData();
	}, [url]);

	if (!data) {
		return <p>Loading</p>;
	}
	return <p>{data.message}</p>;
}

export default Fetch;
