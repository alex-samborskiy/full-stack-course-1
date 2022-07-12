import { FILTERS } from "../../utils";

import "./styles.css";

const FiltersBar = ({ setFilterType }) => {
  return (
    <div className="filters-bar">
      <button
        className="filters-bar__btn"
        onClick={() => setFilterType(FILTERS.ALL)}
      >
        All
      </button>
      <button
        className="filters-bar__btn"
        onClick={() => setFilterType(FILTERS.DONE)}
      >
        Done
      </button>
      <button
        className="filters-bar__btn"
        onClick={() => setFilterType(FILTERS.TODO)}
      >
        Todo
      </button>
    </div>
  );
};

export default FiltersBar;
