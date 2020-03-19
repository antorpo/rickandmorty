import React from "react";
import ReactDOM from "react-dom";
import "./styles.css";
import logo from "./images/logo.png";
import Loader from "./components/Loader";
import Popup from "./components/Popup";

function CharacterCard(props) {
  const { character } = props;

  return (
    <div
      className="CharacterCard"
      style={{ backgroundImage: `url(${character.image})` }}
    >
      <div className="CharacterCard__name-container text-truncate">
        {character.name}
      </div>
    </div>
  );
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.togglePopup = this.togglePopup.bind(this);
    this.fetchCharacters = this.fetchCharacters.bind(this);
    this.getNameTest = this.getNameTest.bind(this);
  }

  state = {
    loading: true, // Indicador para decir que esta cargando.
    error: null, // Para cachear el error.
    data: {
      info: {},
      results: []
    },
    nextPage: 1,
    showPopup: false
  };

  togglePopup() {
    this.setState({
      showPopup: !this.state.showPopup
    });
  }

  componentDidMount() {
    this.fetchCharacters();
  }

  fetchCharacters = async () => {
    this.setState({
      loading: true,
      error: null
    });

    try {
      // fetch() permite hacer un GET de un determinado endpoint.
      const response = await fetch(
        `https://rickandmortyapi.com/api/character/?page=${this.state.nextPage}`
      );
      const data = await response.json();

      this.setState({
        loading: false,
        data: {
          info: data.info,
          results: [].concat(this.state.data.results, data.results)
        },
        nextPage: this.state.nextPage + 1
      });
    } catch (error) {
      this.setState({
        loading: false,
        error: error
      });
    }
  };

  getNameTest(event){
    console.log(event.name);
  };

  render() {
    if (this.state.error) {
      return <h1>{`Error: ${this.state.error.message}`}</h1>;
    }

    return (
      <div className="container">
        <div className="App">
          <img className="Logo" src={logo} alt="Rick y Morty" />

          <ul className="row">
            {this.state.data.results.map(character => (
              <li className="col-6 col-md-3" key={character.id}>
                <CharacterCard onClick={this.getNameTest} character={character} />
              </li>
            ))}
          </ul>

          {/* && Evalua la condicion y se toma como un entonces */}
          {this.state.loading && (
            <div className="text-center">
              <Loader />
            </div>
          )}

          {/* Cuando no este cargando se va a mostrar el boton */}
          {!this.state.loading && this.state.data.info.next && (
            <button onClick={this.fetchCharacters}>Load More</button>
          )}
        </div>
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
