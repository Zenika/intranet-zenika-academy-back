import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";

export class SignInModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      redirectToAdmin: false,
      redirectToUser: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  handleSignIn(user) {
    const { connect, toggleModal } = this.props;
    axios
      .post("http://localhost:4000/api/users/signin", user)
      .then(res => {
        sessionStorage.setItem("promoId", `${res.data.promoId}`);
        sessionStorage.setItem("loggedIn", "true");
        sessionStorage.setItem("userRole", `${res.data.role}`);
        if (res.data.promoId) {
          const url = `http://localhost:4000/api/promotions/details/${res.data.promoId}`;
          axios.get(url).then(result => {
            sessionStorage.setItem("programId", `${result.data.program.id}`);
          });
        }
        this.setState({ redirectToUser: false, redirectToAdmin: true });
        if (res.data.role === 3 || res.data.role === 2) {
          this.setState({ redirectToUser: true, redirectToAdmin: false });
        }
        setTimeout(() => connect(), 100);
      })
      .catch(() => {
        toggleModal(false);
      });
  }

  handleSubmit(e) {
    e.preventDefault();
    const { email, password } = this.state;
    const user = {
      email,
      password
    };

    this.setState({ email: "", password: "" });
    return this.handleSignIn(user);
  }

  render() {
    const { email, password, redirectToUser, redirectToAdmin } = this.state;
    const { handleChange, handleSubmit } = this;
    const { toggleModal } = this.props;
    if (redirectToUser === true) {
      return <Redirect to="/home/user" />;
    }
    if (redirectToAdmin === true) {
      return <Redirect to="/home/admin" />;
    }
    return (
      <section id="modalLogin" className="modal is-active">
        <section className="modal-background" />
        <section className="modal-card">
          <header className="modal-card-head">
            <p className="modal-card-title">Connexion</p>
          </header>
          <section className="modal-card-body">
            <form>
              <section className="field">
                <p className="control has-icons-left">
                  <input
                    id="emailInput"
                    required
                    className="input"
                    type="email"
                    name="email"
                    placeholder="Email"
                    onChange={handleChange}
                    value={email}
                  />
                  <span className="icon is-small is-left" />
                </p>
              </section>
              <section className="field">
                <p className="control has-icons-left">
                  <input
                    id="passwordInput"
                    required
                    className="input"
                    type="password"
                    name="password"
                    placeholder="Password"
                    onChange={handleChange}
                    value={password}
                  />
                  <span className="icon is-small is-left">
                    <i className="fas fa-lock" />
                  </span>
                </p>
              </section>
              <footer className=" modalFooter">
                <button
                  id="submitButton"
                  type="submit"
                  onClick={handleSubmit}
                  className="button is-success"
                >
                  Se connecter
                </button>
                <button
                  id="cancelButton"
                  type="button"
                  onClick={() => toggleModal(false)}
                  className="button"
                >
                  Annuler
                </button>
              </footer>
            </form>
          </section>
        </section>
      </section>
    );
  }
}

export default SignInModal;
