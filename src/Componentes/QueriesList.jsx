import PropTypes from "prop-types";
import classes from "./QueriesList.module.css";
import { Button } from "@mui/material";

// import { useEffect } from "react";

export const QueriesList = ({ queries, handleQueryClick }) => {
  const formatDate = (date) => {
    const options = {
      day: "numeric",
      month: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
    };
    return new Intl.DateTimeFormat("es-ES", options).format(new Date(date));
  };

  return (
    <>
      {queries && (
        <div>
          <ul>
            {queries.map((query) => (
              <li className={classes.queryStyle} key={query._id}>
                <strong>Buscado: </strong> {query.queryOptions.q}{" "}
                <strong>Tipo de Busqueda: </strong> {query.searchType}{" "}
                <strong>Fecha de busqueda:</strong> {formatDate(query.date)}{" "}
                <Button
                  size="small"
                  variant="contained"
                  onClick={() => handleQueryClick(query)}
                >
                  {" "}
                  Borrar
                </Button>
                <br />
                <Button
                  size="small"
                  variant="contained"
                  onClick={() => handleQueryClick(query)}
                >
                  {" "}
                  Modificar
                </Button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};

QueriesList.propTypes = {
  queries: PropTypes.array,
  handleQueryClick: PropTypes.func,
};
