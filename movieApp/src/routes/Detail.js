import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

function Detail() {
	const { id } = useParams();
	const [Loading, setLoading] = useState(true);
	const [Movie, setMovie] = useState([]);

	const getMovie = async () => {
		const json = await (
			await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)
		).json();
		// console.log(json.data.movie);
		setMovie(json.data.movie);
		setLoading(false);
	};

	useEffect(() => {
		getMovie();
	}, []);

	return (
		<div>
			<h1>Detail</h1>
			<div>
				{Loading ? (
					'Loading...'
				) : (
					<div>
						<img src={Movie.medium_cover_image} alt={Movie.title} />
						<h2>{Movie.title}</h2>
						<p>Rating: ⭐️{Movie.rating}</p>
						<p>Year: {Movie.year}</p>
						<p>{Movie.description_full}</p>

						<ul>
							{Movie.genres.map((genre) => (
								<li key={genre}>{genre}</li>
							))}
						</ul>
					</div>
				)}
			</div>
		</div>
	);
}

export default Detail;
