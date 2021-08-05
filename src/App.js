import React, { useState, useEffect } from "react";
import logo from "./images/logo.png";
import Loader from "./components/Loader";
import { Popup } from "./components/Popup";
import { CharacterCard } from "./components/CharacterCard";
import "./App.css";

export const App = () => {
  const [character, setCharacter] = useState();
  const [popup, setPopup] = useState(false);
  const [state, setState] = useState({
    loading: true,
    error: null,
    data: {
      info: {},
      results: [],
    },
    nextPage: 1,
  });

  const openPopup = (item) => {
    setCharacter(item)
    setPopup(true);
  };

  const closePopup = () => {
    setPopup(false);
  };

  const fetchCharacters = async () => {
    setState({ loading: true, error: null });

    try {
      const response = await fetch(
        `https://rickandmortyapi.com/api/character/?page=${state.nextPage}`
      );

      const data = await response.json();

      setState({
        loading: false,
        data: {
          info: data.info,
          results: [].concat(state.data.results, data.results),
        },
        nextPage: state.nextPage + 1,
      });
    } catch (err) {
      setState({ loading: false, error: err });
    }
  };

  // componentDidMount == (dependencies [])
  useEffect(() => {
    fetchCharacters();

    // Clean up
    //return () =>{}
  }, []);

  if (state.error) {
    return <h1>{`Error: ${state.error.message}`}</h1>;
  }

  return (
    <div className="container">
      <div className="App">
        <img className="Logo" src={logo} alt="Rick y Morty" />

        {state.loading ? (
          <div className="text-center">
            <Loader />
          </div>
        ) : (
          <ul className="row">
            {state.data.results.map((character) => (
              <li
                className="col-6 col-md-3"
                style={{ cursor: "pointer" }}
                key={character.id}
                onClick={() => openPopup(character)}
              >
                <CharacterCard character={character} />
              </li>
            ))}
          </ul>
        )}

        <Popup
          character={character}
          isOpen={popup}
          closePopup={closePopup}
        />
        {/* Cuando no este cargando se va a mostrar el boton */}
        {!state.loading && state.data.info.next && (
          <button onClick={fetchCharacters}>Load More</button>
        )}
      </div>
    </div>
  );
};
