import React, { Component } from 'react';

export class SignInModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }


  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  handleSubmit(e) {
    e.preventDefault();
    const { email, password } = this.state;
    const { connect } = this.props;
    const user = {
      email,
      password,
    };

    this.setState({ email: '', password: '' });
    return connect(user);
  }

  render() {
    const { email, password } = this.state;
    const { handleChange, handleSubmit } = this;
    const { toggleModal } = this.props;
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
                    type="text"
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
            </form>
          </section>
          <footer className="modal-card-foot modalFooter">
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
        </section>
      </section>
    );
  }
}

export default SignInModal;
