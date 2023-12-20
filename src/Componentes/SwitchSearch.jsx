// SearchSwitch.jsx
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import PropTypes from "prop-types";

const SearchSwitch = ({ isSearchingRepos, onToggle }) => {
  return (
    <FormControlLabel
      control={
        <Switch
          checked={isSearchingRepos}
          onChange={onToggle}
          inputProps={{ "aria-label": "controlled" }}
        />
      }
      label={isSearchingRepos ? "Repositorios" : "Usuarios"}
    />
  );
};

SearchSwitch.propTypes = {
  isSearchingRepos: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired,
};

export default SearchSwitch;
