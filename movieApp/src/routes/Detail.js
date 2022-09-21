import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

function Detail() {
	const { id } = useParams();
	const [Loading, setLoading] = useState(true);
	const [Movie, setMovie] = useState([]);

	const getMovie = async () => {
		const json = await (
			await fetch(`https://yts.mx/api/v2/list_movies.json?movie_id=${id}`)
		).json();
		setMovie(json.data.movies);
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
						{Movie.map((movie) => {
							<img src={movie.medium_cover_image} />;
						})}
					</div>
				)}
			</div>
		</div>
	);
}

export default Detail;
