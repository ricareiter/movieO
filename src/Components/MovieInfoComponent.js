import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";

const apiKey = process.env.REACT_APP_API_KEY;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  padding: 20px 30px;
  justify-content: left;
  border-bottom: 1px solid lightgray;
`;

const CoverImage = styled.img`
  object-fit: cover;
  height: 352px;
`;

const InfoColumn = styled.div`
  display: flex;
  flex-direction: column;
  margin: 20px;
`;

const MovieName = styled.span`
  font-size: 22px;
  font-weight: 600;
  color: black;
  margin: 15px 0;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`;

const MovieInfo = styled.span`
  font-size: 16px;
  font-weight: 500;
  color: black;
  overflow: hidden;
  margin: 4px 0;
  text-transform: capitalize;
  text-overflow: ellipsis;
  & span {
    opacity: 0.5;
  }
`;

const MovieInfoComponent = (props) => {
  const [movieInfo, setMovieInfo] = useState();
  const { selectedMovie } = props;
  useEffect(() => {
    axios
      .get(`http://www.omdbapi.com/?i=${selectedMovie}&apikey=${apiKey}`)
      .then((response) => setMovieInfo(response.data));
  }, [selectedMovie]);
  return (
    <div>
      <Container>
        <CoverImage src={movieInfo?.Poster} />
        <InfoColumn>
          <MovieName>Movie: {movieInfo?.Title}</MovieName>
          <MovieInfo>
            IMDB Rating: <span>{movieInfo?.imdbRating}</span>
          </MovieInfo>
          <MovieInfo>
            Year: <span>{movieInfo?.Year}</span>
          </MovieInfo>
          <MovieInfo>
            Languague: <span>{movieInfo?.Language}</span>
          </MovieInfo>
          <MovieInfo>
            Rated: <span>{movieInfo?.Rated}</span>
          </MovieInfo>
          <MovieInfo>
            Release: <span>{movieInfo?.Released}</span>
          </MovieInfo>
          <MovieInfo>
            Runtime: <span>{movieInfo?.Runtime}</span>
          </MovieInfo>
          <MovieInfo>
            Genre: <span>{movieInfo?.Genre}</span>
          </MovieInfo>
          <MovieInfo>
            Director: <span>{movieInfo?.Director}</span>
          </MovieInfo>
          <MovieInfo>
            Actors: <span>{movieInfo?.Actors}</span>
          </MovieInfo>
          <MovieInfo>
            Plot: <span>{movieInfo?.Plot}</span>
          </MovieInfo>
        </InfoColumn>
      </Container>
    </div>
  );
};

export default MovieInfoComponent;
