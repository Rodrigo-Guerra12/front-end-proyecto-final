import { useState, useEffect } from "react";
import SearchResults from "./SearchResults";
import classes from "./SearchBar.module.css";
import { Button } from "@mui/material";
import TextField from "@mui/material/TextField";
import SwitchSearch from "./SwitchSearch";
import { QueriesList } from "./QueriesList";

//Importo dependencias
function SearchBar() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [searchResults, setSearchResults] = useState(null); //Manejo de estados del componente segun las peticiones del usuario
  const [isSearchingRepos, setIsSearchingRepos] = useState(true);
  const [queryList, setQueryList] = useState([]);
  const deleteQuery = (id) => {
    const filteredQueryList = queryList.filter((query) => id !== query._id);
    setQueryList(filteredQueryList);
  };
  const deleteQueryClick = async (query) => {
    if (query) {
      const urlDelete = `http://localhost:3000/api/queries/${query._id}`;
      console.log("urlDelete, ", query);
      try {
        const response = await fetch(urlDelete, { method: "Delete" });
        if (response.ok) {
          deleteQuery(query._id);
        }
      } catch (error) {
        console.log("Error:  ", error.message);
      }
    }
  };

  const urlQuery = `http://localhost:3000/api/queries/`;
  const fetchQueries = async () => {
    try {
      const response = await fetch(urlQuery);
      const data = await response.json();
      setQueryList(data);
    } catch (error) {
      console.log("Error:  ", error.message);
    }
  };

  useEffect(() => {
    fetchQueries();
    // eslint-disable-next-line no-undef, react-hooks/exhaustive-deps
  }, [searchResults]);

  const handleSearch = async () => {
    // Construye la URL de búsqueda con los parámetros de consulta y paginación. Es async por que se necesita esperar por los datos.
    // const apiUrl = `https://api.github.com/search/repositories?q=${searchTerm}&page=${currentPage}&per_page=${itemsPerPage}`;
    //Le pego a la url completada por los datos que ingreso el usuario

    const url1 = `http://localhost:3000/api/${
      isSearchingRepos ? "repo-info" : "users-info"
    }?name=${searchTerm}`;
    let response;
    try {
      if (searchTerm) {
        // eslint-disable-next-line no-unused-vars
        //Aca tengo que setear
        response = await fetch(url1, {
          headers: {
            Authorization: `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 ${
              //Token de autorizacion para las peticiones a la Api
              import.meta.env.REACT_APP_GITHUB_API_TOKEN
            }`,
          },
        });
      }

      if (response && response.ok) {
        const data = await response.json();
        setSearchResults(data.items); // Almacena los resultados en el estado
      } else {
        console.error("Error en la solicitud, ");
      }
    } catch (error) {
      console.error("Error de red:", error);
    }
    //Aca lo seteo a False
  };

  useEffect(() => {
    // Realiza la búsqueda al cargar la página y cada vez que cambia la página
    handleSearch();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  useEffect(() => {
    setSearchTerm("");
    setSearchResults([]);
  }, [isSearchingRepos]);

  return (
    //Contenido que va a mostrar el componente
    <>
      <div>
        <div className={classes.divsearch}>
          <img
            className={classes.imggit}
            src="https://i0.wp.com/www.globalemancipation.ngo/wp-content/uploads/2017/09/github-logo.png?ssl=1"
          ></img>
          <div className={classes.inputui}>
            <TextField
              type="text"
              placeholder="Buscar repositorios"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div>
            <SwitchSearch
              isSearchingRepos={isSearchingRepos}
              onToggle={() => setIsSearchingRepos((prev) => !prev)}
            />
          </div>

          <div>
            <Button size="small" variant="contained" onClick={handleSearch}>
              Buscar
            </Button>
          </div>
          <h2>Historial de Queries</h2>
          <QueriesList
            queries={queryList}
            handleQueryClick={deleteQueryClick}
          />
        </div>

        <SearchResults
          isSearchingRepos={isSearchingRepos}
          results={searchResults}
        />

        <div className={classes.pagination}>
          <footer>
            <Button
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Anterior
            </Button>

            {currentPage}
            <Button onClick={() => setCurrentPage(currentPage + 1)}>
              Siguiente
            </Button>
          </footer>
        </div>
      </div>
    </>
  );
}

export default SearchBar;
