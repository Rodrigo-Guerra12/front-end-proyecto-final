/* eslint-disable no-constant-condition */
import { useState } from "react";
import classes from "./SearchResults.module.css";
import PropTypes from "prop-types";
import Card from "@mui/material/Card";
import { Button } from "@mui/material";

// eslint-disable-next-line react/prop-types
function SearchResults({ results, isSearchingRepos }) {
  console.log("Results, ", results);
  const [showDescription, setShowDescription] = useState(null);

  const toggleDescription = (index) => {
    setShowDescription(index === showDescription ? null : index); //Si showDescription es ===  al indice se muestra si no es igual se oculta
  };

  return (
    <div>
      <ul>
        {results &&
          results.map((result, index) => (
            <>
              <div className={classes.cardcontent}>
                <Card
                  className={classes.hoverCard}
                  sx={{
                    margin: 2,
                    alignContent: "center",
                    alignItems: "center",
                    display: "flex",
                  }}
                >
                  {isSearchingRepos ? (
                    <li key={index} className={classes.li}>
                      <img
                        className={classes.imgstyle}
                        src={result?.owner?.avatar_url}
                        alt={`Avatar de ${result?.owner?.login}`}
                        width="50"
                        height="50"
                      />
                      <strong>Nombre del Repositorio:</strong> {result?.name}
                      <br />
                      <br />
                      <br />
                      {showDescription === index ? (
                        <>
                          <div className={classes.descriptionstyle}>
                            <strong>Nombre de Usuario:</strong>{" "}
                            {result?.owner?.login}
                            <strong>Fecha de creacion:</strong>
                            {result?.created_at}
                            <strong>Estrellas:</strong>{" "}
                            {result?.stargazers_count}
                            <a
                              href={`https://github.com/${result?.owner?.login}`}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {" "}
                              Ir al perfil
                            </a>
                          </div>
                          <br />
                        </>
                      ) : null}
                      <Button
                        size="small"
                        variant="contained"
                        onClick={() => toggleDescription(index)}
                      >
                        {showDescription === index ? "Ocultar" : "Más"}
                      </Button>
                    </li>
                  ) : (
                    <li key={index} className={classes.li}>
                      <img
                        className={classes.imgstyle}
                        src={result?.avatar_url}
                        alt={`Avatar de ${result?.owner?.login}`}
                        width="50"
                        height="50"
                      />

                      <a
                        href={`https://github.com/${result?.login}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Ir al perfil de {result.login}
                      </a>
                      <Button
                        size="small"
                        variant="contained"
                        onClick={() => toggleDescription(index)}
                      >
                        {showDescription === index ? "Ocultar" : "Más"}
                      </Button>
                      {showDescription === index ? (
                        <>
                          <div className={classes.descriptionstyle}>
                            <strong>Nombre de Usuario:</strong> {result?.login}
                            <a
                              href={`https://github.com/${result?.login}?tab=repositories`}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              Ver los repos de {result.login}
                            </a>
                          </div>
                          <br />
                        </>
                      ) : null}
                    </li>
                  )}
                </Card>
              </div>
            </>
          ))}
      </ul>
    </div>
  );
}
SearchResults.propTypes = {
  results: PropTypes.arrayOf(
    PropTypes.shape({
      owner: PropTypes.shape({
        avatar_url: PropTypes.string,
        login: PropTypes.string,
      }),
      name: PropTypes.string,
      description: PropTypes.string,
      created_at: PropTypes.string,
      stargazers_count: PropTypes.number,
    })
  ),
};

export default SearchResults;
