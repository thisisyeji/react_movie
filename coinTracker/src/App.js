import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
	const [Loading, setLoading] = useState(true);
	const [Coins, setCoins] = useState([]);
	const [Value, setValue] = useState('');

	const onChange = (event) => setValue(event.target.value);

	useEffect(() => {
		axios.get('https://api.coinpaprika.com/v1/tickers').then((json) => {
			setCoins(json.data);
			setLoading(false);
		});
	}, []);

	return (
		<div>
			<h1>The Coins!{Loading ? '' : `(${Coins.length})`}</h1>
			{Loading ? (
				<strong>Loading...</strong>
			) : (
				<>
					<select style={{ width: '50%' }}>
						{Coins.map((coin) => (
							<option key={coin.id}>
								{coin.name}({coin.symbol}) : {coin.quotes.USD.price}{' '}
								{coin.symbol}
							</option>
						))}
					</select>
				</>
			)}
		</div>
	);
}

export default App;
