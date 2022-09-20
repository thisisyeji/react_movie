import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
	const [Loading, setLoading] = useState(true);
	const [Coins, setCoins] = useState([]);
	const [Amount, setAmount] = useState(0);
	const [Index, setIndex] = useState(0);
	const [Inverted, setInverted] = useState(false);

	const onChange = (event) => setAmount(event.target.value);
	const onSelect = (event) => setIndex(event.target.value);
	const reset = () => setAmount(0);
	const invert = () => {
		reset();
		setInverted((current) => !current);
	};

	useEffect(() => {
		axios.get('https://api.coinpaprika.com/v1/tickers').then((json) => {
			setCoins(json.data);
			setLoading(false);
		});
	}, []);

	return (
		<>
			<div>
				<h1>The Coins! 💰 {Loading ? '' : `(${Coins.length})`}</h1>
				{Loading ? (
					<strong>Loading...</strong>
				) : (
					<>
						<select style={{ width: '50%' }} value={Index} onChange={onSelect}>
							{Coins.map((coin, idx) => (
								<option key={coin.id} value={idx}>
									{coin.name} : {coin.quotes.USD.price}
									{coin.symbol}
								</option>
							))}
						</select>
						<hr />

						<div>
							<label>
								${' '}
								<input
									value={
										Inverted
											? (Amount * Coins[Index].quotes.USD.price).toFixed(5)
											: Amount
									}
									type='number'
									style={{ width: 250 }}
									onChange={onChange}
									disabled={Inverted}
								/>{' '}
							</label>
							<span style={{ paddingLeft: 10, paddingRight: 10 }}>⇨</span>
							<label>
								<input
									value={
										Inverted
											? Amount
											: (Amount / Coins[Index].quotes.USD.price).toFixed(10)
									}
									type='number'
									style={{ width: 250 }}
									onChange={onChange}
									disabled={!Inverted}
								/>{' '}
								{Coins[Index].symbol}
							</label>
							<br />
							<button onClick={reset}>Reset</button>
							<button onClick={invert}>
								{Inverted ? 'Turn back' : 'Invert'}
							</button>
						</div>
					</>
				)}
			</div>
		</>
	);
}

export default App;
