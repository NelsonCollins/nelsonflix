import React, {useEffect,useState} from 'react';
import axiso from './axios';
// import requests from './Requests';
import './Row.css';
import YouTube from "react-youtube";
import movieTrailer from 'movie-trailer';

const base_url = "https://image.tmdb.org/t/p/original/";

function Row({title, fetchUrl, isLargeRow}) {
    // State(How variables are written in react) is a short term memory that stores information and uses it when needed
    const [movies, setMovies] = useState([]);
    const [trailerUrl, setTrailerUrl] = useState("");

    // A snippet of code that runs on a specific condition/variable

    useEffect(() => {
        // To pull information when the row loads
        // if left [] blanck, it will only load the row once on page load and dont run again
        // if an argument is passed [movies], it will load the row everytime movie changes (Dependency)
        async function fetchData() {
            const request = await axiso.get(fetchUrl);
            // console.log(request) to identify expected data
            setMovies(request.data.results);
            return request;
        }
        fetchData();
    }, [fetchUrl]);

    const opts = {
        height: '390',
        width: '100%',
        playerVars: {
          // https://developers.google.com/youtube/player_parameters
          autoplay: 1,
        },
      };
      const handleClick  = (movie) =>{
          if (trailerUrl){
              setTrailerUrl("");
          }else{
              movieTrailer(movie?.name || "")
              .then(url => {

                  const urlParams = new URLSearchParams(new URL(url).search);
                  setTrailerUrl(urlParams.get('v'));

              })
              .catch(error  => console.log(error));
          }
      };



    // console.log(movies) or console.table(movies);

    return ( <
        div className = "row" > 
            { /*title*/ }
            <h2> {title} </h2> 

            <div className = "row__posters" >  { /*several row posters*/}
           
            {/*Map thorugh the movies*/} 
            { movies.map(movie => ( 
                <img 
                key = {movie.id}
                onClick={() => handleClick(movie)}
                className = {`row__poster ${isLargeRow && "row__posterLarge"}`}
                src = {`${base_url}${
                    isLargeRow ? movie.poster_path : movie.backdrop_path
                    }`}
                    alt = {movie.name}
                    />
                ))} 
        </div>
        {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
        </div>
    )
};

export default Row;