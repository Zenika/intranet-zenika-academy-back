import React from 'react';
import Axios from 'axios';
import { Redirect } from 'react-router-dom';
import './Program.scss';
import '../layout/Layout.scss';

class RecapProgramForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      redirectToReferrer: false,
    };
  }

  createProgram = (e) => {
    e.preventDefault();
    const { program } = this.props;
    Axios.post('/api/programs', program, { withCredentials: true })
      .then(() => this.setState(() => ({ redirectToReferrer: true })));
  };

  editProgram = (e) => {
    e.preventDefault();
    const { program } = this.props;
    Axios.put(`/api/programs/${program.id}/update`, program)
      .then(() => this.setState(() => ({ redirectToReferrer: true })));
  };

  render() {
    const { handleChange, program, edit } = this.props;

    const { redirectToReferrer } = this.state;
    if (redirectToReferrer === true) {
      return <Redirect to="/home/admin" />;
    }

    let actionButton;
    if (edit === 0) {
      actionButton = (
        <button
          type="submit"
          id="createButton"
          onClick={this.createProgram}
          className="button is-success"
        >
          Valider la création
        </button>
      );
    } else {
      actionButton = (
        <button
          type="submit"
          id="editButton"
          onClick={this.editProgram}
          className="button is-success"
        >
          Valider l&lsquo;édition
        </button>
      );
    }

    return (
      <article className="section box">
        <h1 className="title is-2 is-spaced">Récapitulatif</h1>
        <section className="box">
          <h2 id="programTitle" className="title is-3 is-spaced">
            Programme&nbsp;
            <span>{program.title}</span>
          </h2>
          <ul id="recapProgramList" className="list">
            {program.content.map((module, i) => (
              <li key={`moduleTitle-${module.title}`} className="list-item">
                <h3 id={`moduleTitle-${i}`} className="title is-4 is-spaced">
                  Module n°&nbsp;
                  {i + 1}
                  &nbsp;:&nbsp;
                  <span>{module.title}</span>
                </h3>
                <ul className="list">
                  {module.content.map((subModule, p) => (
                    <li
                      key={`subModuleTitle-${subModule.title}`}
                      className="list-item"
                    >
                      <h4
                        id={`subModuleTitle-${p}`}
                        className="title is-5 is-spaced"
                      >
                        Sous-module n°&nbsp;
                        {p + 1}
                        &nbsp;:&nbsp;
                        <span>{subModule.title}</span>
                      </h4>
                      <ul className="list">
                        {subModule.content.map((sequence, n) => (
                          <li
                            key={`sequenceTitle-${sequence.title}`}
                            className="list-item"
                          >
                            <h5
                              id={`sequenceTitle-${n}`}
                              className="title is-6 is-spaced"
                            >
                              <i className="fad fa-level-up" />
                              Séquence n°&nbsp;
                              {n + 1}
                              &nbsp;:&nbsp;
                              <span>{sequence.title}</span>
                            </h5>
                          </li>
                        ))}
                      </ul>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </section>
        <div className="field is-grouped">
          <div className="control">{actionButton}</div>
          <div className="control">
            <button
              className="button is-info"
              id="modifyButton"
              value={0}
              onClick={(e) => handleChange(e, program)}
              type="button"
            >
              Modifier
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
