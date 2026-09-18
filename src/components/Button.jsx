import "./Button.css";

const Button = ({ id, text, action, variante = "primario", type = "button" }) => {
  const handleAction = (e) => action(e);

  return (
    <button id={id} type={type} className={`btn btn-${variante}`} onClick={handleAction}>
      {text}
    </button>
  );
};

export default Button;
