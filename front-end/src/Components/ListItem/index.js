import "./styles.css";

const ListItem = (props) => {
  const { text, id, isCompleted, handleEdit, handleRemove, handleCheck } =
    props;

  return (
    <div className="list-item">
      <p
        className={`list-item__title list-item__title--${
          isCompleted ? "checked" : null
        }`}
      >
        {text}
      </p>
      <div className="list-item__btns-wrapper">
        <input
          onClick={() => handleCheck(id)}
          className="list-item__checkbox"
          type="checkbox"
        />
        <i className="fa fa-pencil" onClick={() => handleEdit(id)} />
        <i className="fa fa-trash" onClick={() => handleRemove(id)} />
      </div>
    </div>
  );
};

export default ListItem;
