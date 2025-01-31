export default function Error({ children }) {
  if (!children) return null;

  const style = {
    color: "#f31",
    margin: "1rem 0",
  };

  return <p style={style}>{children}</p>;
}
