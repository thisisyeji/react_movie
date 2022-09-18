import { useState, useEffect } from 'react';

function App() {
	const [ToDo, setToDo] = useState('');
	const [ToDos, setToDos] = useState([]);
	const onChange = (event) => setToDo(event.target.value);
	const onSubmit = (event) => {
		event.preventDefault();
		if (ToDo === '') {
			return;
		}
		setToDos((currentArray) => [ToDo, ...currentArray]);
		setToDo('');
	};

	return (
		<div>
			<h1>My To Dos ({ToDos.length})</h1>
			<form onSubmit={onSubmit}>
				<input
					onChange={onChange}
					value={ToDo}
					type='text'
					placeholder='Write your to do...'
				/>
				<button>Add To Do</button>
			</form>
			<hr />
			<ul>
				{ToDos.map((todo, idx) => (
					<li key={idx}>{todo}</li>
				))}
			</ul>
		</div>
	);
}

export default App;
