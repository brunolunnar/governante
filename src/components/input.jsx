export const Input = ({ label, id, type, placeholder, ...rest }, ref) => {
  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <input type={type} placeholder={placeholder} id={id} {...rest} />
    </div>
  );
};
