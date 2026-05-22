export default function Dashboard({ user, onLogout }) {
  return (
    <div style={styles.container}>
      <h1>Bem-vindo, {user}</h1>

      <button style={styles.button} onClick={onLogout}>
        Sair
      </button>
    </div>
  );
}

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    padding: 10,
    marginTop: 20,
    background: "red",
    color: "#fff",
    border: "none",
    borderRadius: 6,
  },
};
