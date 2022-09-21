import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
	const [Loading, setLoading] = useState(true);
	const [Movies, setMovies] = useState([]);
	const getMovies = async () => {
		const json = await (
			await fetch(
				`https://yts.mx/api/v2/list_movies.json?minimum_rating=9&sort_by=year`
			)
		).json();

		setMovies(json.data.movies);
		setLoading(false);
	};
	useEffect(() => {
		getMovies();
	}, []);
	console.log(Movies);
	return (
		<div>
			{Loading ? (
				<h1>Loading...</h1>
			) : (
				<div>
					{Movies.map((movie) => (
						<div key={movie.id}>
							<img src={movie.medium_cover_image} />
							<h2>{movie.title}</h2>
							<p>{movie.summary}</p>
							<ul>
								{movie.genres.map((g) => (
									<li key={g}>{g}</li>
								))}
							</ul>
						</div>
					))}
				</div>
			)}
		</div>
	);
}

export default App;
