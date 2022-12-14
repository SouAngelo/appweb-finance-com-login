import { useState, useContext } from "react";
import { authContext } from "../../Contexts/auth";
import { Link } from "react-router-dom";
import "../Login/styles.sass";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nome, setNome] = useState("");

  const { signUp, loadingAuth } = useContext(authContext);

  function handleSubmit(e) {
    e.preventDefault();

    if (nome !== "" && email !== "" && password !== "") {
      signUp(email, password, nome);
    }
  }

  return (
    <section className="vh-100">
      <div className="container py-5 h-100">
        <div className="row d-flex align-items-center justify-content-center h-100">
          <div className="col-md-8 col-lg-7 col-xl-6">
            <img
              src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
              className="img-fluid"
              alt="Phone image"
            />
          </div>
          <div className="col-md-7 col-lg-5 col-xl-5 offset-xl-1">
            <form onSubmit={handleSubmit}>
              <h1>Entrar</h1>

              <div className="form-outline mb-4">
                <input
                  type="text"
                  id="form1Example13"
                  className="form-control form-control-lg"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                />
                <label className="form-label" htmlFor="form1Example13">
                  Nome
                </label>
              </div>

              <div className="form-outline mb-4">
                <input
                  type="email"
                  id="form1Example13"
                  className="form-control form-control-lg"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <label className="form-label" htmlFor="form1Example13">
                  Email address
                </label>
              </div>

              <div className="form-outline mb-4">
                <input
                  type="password"
                  id="form1Example23"
                  className="form-control form-control-lg"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <label className="form-label" htmlFor="form1Example23">
                  Password
                </label>
              </div>

              <button
                type="submit"
                className="btn btn-primary btn-lg btn-block"
              >
                {loadingAuth ? (
                  <div className="loading">
                    <h1>Entrando...</h1>
                  </div>
                ) : (
                  "Cadastrar"
                )}
              </button>

              <p>
                J?? tem uma conta? <Link to="/login">Clique aqui</Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Register;
