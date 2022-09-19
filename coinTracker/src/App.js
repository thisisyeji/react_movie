import { useState, useEffect } from 'react';

function MinutesToHours() {
	const [Amount, setAmount] = useState(0);
	const [Inverted, setInverted] = useState(false);

	const onChange = (event) => setAmount(event.target.value);

	const reset = () => setAmount(0);
	const onFlip = () => {
		reset();
		setInverted((current) => !current);
	};

	return (
		<div>
			<div>
				<label htmlFor='minutes'>Minutes</label>
				<input
					value={Inverted ? Amount * 60 : Amount}
					id='minutes'
					type='number'
					placeholder='Minutes'
					onChange={onChange}
					disabled={Inverted}
				/>
			</div>

			<div>
				<label htmlFor='hours'>Hours</label>
				<input
					value={Inverted ? Amount : Math.round(Amount / 60)}
					id='hours'
					type='number'
					placeholder='Hours'
					disabled={!Inverted}
					onChange={onChange}
				/>
			</div>
			<button onClick={reset}>Reset</button>
			<button onClick={onFlip}>{Inverted ? 'Turn back' : 'Invert'}</button>
		</div>
	);
}

function KmToMiles() {
	const [Amount, setAmount] = useState(0);
	const [Inverted, setInverted] = useState(false);

	const onChange = (event) => setAmount(event.target.value);
	const reset = () => setAmount(0);
	const invert = () => {
		reset();
		setInverted((current) => !current);
	};

	return (
		<div>
			<div>
				<label htmlFor='km'>Km</label>
				<input
					value={Inverted ? (Amount * 1.609).toFixed(6) : Amount}
					type='number'
					id='km'
					placeholder='Km'
					onChange={onChange}
					disabled={Inverted}
				/>
			</div>

			<div>
				<label htmlFor='miles'>Miles</label>
				<input
					value={Inverted ? Amount : (Amount / 1.609).toFixed(6)}
					type='number'
					id='miles'
					placeholder='Miles'
					onChange={onChange}
					disabled={!Inverted}
				/>
			</div>

			<button onClick={reset}>Reset</button>
			<button onClick={invert}>{Inverted ? 'Turn back' : 'Invert'}</button>
		</div>
	);
}

function App() {
	const [Index, setIndex] = useState('xx');

	const onSelect = (event) => setIndex(event.target.value);

	return (
		<div>
			<h1>Super Converter</h1>
			<select value={Index} onChange={onSelect}>
				<option value='xx'>Select your units</option>
				<option value='0'>Minutes & Hours</option>
				<option value='1'>Km & Miles</option>
			</select>
			<hr />
			{Index === 'xx' ? 'Please select your units.' : null}
			{Index === '0' ? <MinutesToHours /> : null}
			{Index === '1' ? <KmToMiles /> : null}
		</div>
	);
}

export default App;
