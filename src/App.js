import styled from "styled-components";
import MovieComponent from "./Components/MovieComponent";
import React, { useState } from "react";
import axios from "axios";
import MovieInfoComponent from "./Components/MovieInfoComponent";

const Header = styled.div`
  display: flex;
  flex-direction: row;
  background-color: #369ff5;
  color: white;
  padding: 10px;
  font-size: 25px;
  font-weight: bold;
  box-shadow: 0 3px 6px 0 #555;
  justify-content: space-between;
  align-items: center;
`;

const AppName = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  font-size: 40px;
`;

const SearchBox = styled.div`
  display: flex;
  flex-direaction: row;
  padding: 10px 10px;
  background-color: white;
  border-radius: 6px;
  margin-left: 20px;
  width: 2 0%;
  align-items: center;
`;

const SearchInput = styled.input`
  color: black;
  font-size: 16px;
  font-weight: bold;
  border: none;
  outline: none;
  margin-left: 15px;
`;

const MovieListContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 30px;
  gap: 24px;
  justify-content: space-evenly;
`;

const apiKey = "6f5e60dc";

function App() {
  const [searchQuery, setSearchQuery] = useState();
  const [timeOutId, setTimeOutId] = useState();
  const [movieList, setMovieList] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState();

  const fetchData = async (movieName, apiKey) => {
    const response = await axios.get(
      `https://www.omdbapi.com/?s=${movieName}&apikey=${apiKey}`
    );
    setMovieList(response.data.Search);
  };

  const onTextChange = (e) => {
    clearTimeout(timeOutId);
    setSearchQuery(e.target.value);
    const timeout = setTimeout(() => fetchData(searchQuery, apiKey), 500);
    setTimeOutId(timeout);
  };

  return (
    <div>
      <Header>
        <AppName>movieO</AppName>
        <SearchBox>
          <SearchInput
            onChange={onTextChange}
            value={searchQuery}
            placeholder="Search Movie"
          />
        </SearchBox>
      </Header>
      {selectedMovie && <MovieInfoComponent selectedMovie={selectedMovie} />}
      <MovieListContainer>
        {movieList?.length
          ? movieList.map((movie, _index) => (
              <MovieComponent
                key={_index}
                movie={movie}
                setSelectedMovie={setSelectedMovie}
              />
            ))
          : "No movies found"}
      </MovieListContainer>
    </div>
  );
}

export default App;
