import React from 'react';
import Axios from 'axios';
import { Redirect } from 'react-router-dom';
import './UserProfile.scss';
import '../layout/Layout.scss';

class RecapProgramForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: props.user,
      redirectToReferrer: false,
    };
  }

  componentDidMount() {
    document.title = "Admin / Récapitulatif création d'utilisateur";
  }

    createUser = (e) => {
      e.preventDefault();
      const { user } = this.state;
      Axios.post('/api/users ', user, { withCredentials: true })
        .then(() => this.setState(() => ({ redirectToReferrer: true })));
    };

  render() {
    const { user } = this.props;
    let roleDetail;
    if (user.role === 'admin') roleDetail = 'Administrateur';
    if (user.role === 'teacher') roleDetail = 'Formateur';
    if (user.role === 'student') roleDetail = 'Eleve';

    const { redirectToReferrer } = this.state;
    if (redirectToReferrer === true) {
      return <Redirect to="/home/admin" />;
    }

    return (
      <article className="section box">
        <h2 className="title is-2 is-spaced">
          Récapitulatif du formulaire d&lsquo;utilisateur
        </h2>
        <section className="box">
          <h2 className="title is-4 is-spaced">
            <ul className="list" id="recapUserList">
              <li id="lastName" className="list-item">
                Nom :&nbsp;
                <span>{user.lastName}</span>
              </li>
              <li id="firstName" className="list-item">
                Prénom :&nbsp;
                <span>{user.firstName}</span>
              </li>
              <li id="email" className="list-item">
                Email :&nbsp;
                <span>{user.email}</span>
              </li>
              <li id="role" className="list-item">
                Rôle :&nbsp;
                <span>{roleDetail}</span>
              </li>
            </ul>
          </h2>
        </section>
        <div className="field is-grouped">
          <div className="control">
            <button
              type="button"
              id="createButton"
              onClick={(e) => this.createUser(e)}
              className="button is-success"
            >
              Créer
            </button>
          </div>
          <div className="control">
            <a
              href="/home/admin/"
              id="cancelButton"
              type="button"
              className="button is-danger"
            >
              Annuler
            </a>
          </div>
        </div>
      </article>
    );
  }
}

export default RecapProgramForm;
