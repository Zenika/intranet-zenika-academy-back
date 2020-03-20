import React, { Component } from 'react';
import './UserProfile.scss';
import SearchbarAutoComplete from '../searchbarauto/SearchbarAuto';

class UserForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: props.user,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleChangeRole = this.handleChangeRole.bind(this);
  }

  componentDidMount() {
    document.title = "Admin / Création d'utilisateur";
  }

  handleChange = (e) => {
    const { value, name } = e.target;
    this.setState((prev) => ({
      user: {
        ...prev.user,
        [name]: value,
      },
    }));
  };

  handleChangeRole = (e) => {
    this.setState((prev) => ({
      user: {
        ...prev.user,
        role: e.value,
      },
    }));
  };

  render() {
    const { user } = this.state;
    const { firstName, lastName, email, role } = user;

    const roleList = [
      { value: 'admin', label: 'Administrateur' },
      { value: 'teacher', label: 'Formateur' },
      { value: 'student', label: 'Etudiant' },
    ];
    const { changeStep } = this.props;
    return (
      <>
        <article className="section box">
          <h1 className="title is-2 mprobmd">Création d&lsquo;utilisateur </h1>
          <form onSubmit={() => changeStep(1, user)}>
            <div className="field is-grouped">
              <div className="control">
                <label htmlFor="lastName" className="label">
                  <input
                    id="userLastName"
                    type="text"
                    className="input"
                    name="lastName"
                    placeholder="Nom"
                    defaultValue={lastName}
                    onChange={this.handleChange}
                  />
                </label>
                <label htmlFor="firstName" className="label">
                  <input
                    id="userFirstName"
                    type="text"
                    className="input"
                    name="firstName"
                    placeholder="Prénom"
                    defaultValue={firstName}
                    onChange={this.handleChange}
                  />
                </label>
                <label htmlFor="email" className="label">
                  <input
                    id="userEmail"
                    type="mail"
                    className="input"
                    name="email"
                    placeholder="E-mail"
                    defaultValue={email}
                    onChange={this.handleChange}
                  />
                </label>
                <section className="field">
                  <SearchbarAutoComplete
                    name="roleList"
                    options={roleList}
                    defaultValue={role}
                    handleChange={this.handleChangeRole}
                    searchKey="value"
                    defaultLabel="Rôle"
                    isMulti={false}
                  />
                </section>
              </div>
            </div>
            <div className="field is-grouped">
              <div className="control">
                <button
                  id="validateButton"
                  className="button is-success userProfileButton"
                  type="submit"
                >
                  Valider
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
          </form>
        </article>
      </>
    );
  }
}

export default UserForm;
