import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import './ProgramDetails.scss';

class ProgramDetails extends Component {
  _isMounted = false;

  constructor(props) {
    super(props);
    this.state = {
      programDetails: [],
      isAdmin: false,
      // redirectToStudentHome: false,
      redirectToProgramEdit: false,
      redirectToAdmin: false,
      programId: null,
      promotionId: null,
    };
    this.titles = [];
    this.goToProgramEdit = this.goToProgramEdit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleDeleteClick = this.handleDeleteClick.bind(this);
    this.handleDeleteEnterKey = this.handleDeleteEnterKey.bind(this);
  }

  componentDidMount() {
    const { match } = this.props;
    const { id } = match.params;
    this._isMounted = true;
    const role = sessionStorage.getItem('userRole');
    const promoId = sessionStorage.getItem('promoId');

    if (JSON.parse(role) === 1) {
      this.setState({ isAdmin: true });
    }
    if (JSON.parse(promoId) !== null) {
      this.setState({ promotionId: promoId });
    }
    axios.get(`http://localhost:4000/api/programs/${id}/details`)
      .then((res) => {
        const programDetails = res.data;
        if (this._isMounted) {
          this.setState({ programDetails, programId: id });
        }
      });
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  display = (programDetails) => {
    if (programDetails.content) {
      programDetails.content.forEach(this.display);
    }
  }

  record = (programDetails) => {
    let className;
    if (programDetails.content) {
      if (programDetails.type === 1) {
        className = 'programTitle';
      } else if (programDetails.type === 2) {
        className = 'moduleTitle';
      } else if (programDetails.type === 3) {
        className = 'subModuleTitle';
      } else if (programDetails.type === 4) {
        className = 'sequenceTitle';
      }
      this.titles.push(
        <div key={programDetails.title} className={className}>
          {programDetails.title}
        </div>,
      );
      programDetails.content.forEach(this.record);
    }
  }

  goToProgramEdit() {
    return this.setState({ redirectToProgramEdit: true });
  }

  /**
 * Allows to delete a program in the DB
 * @param {*} id Promo Id
 */
  handleDelete(id) {
    const url = `http://localhost:4000/api/programs/${id}`;
    // eslint-disable-next-line no-restricted-globals
    if (confirm('Voulez vous supprimer ce programme?')) {
      axios.delete(url)
        .then(() => {
          this.setState({ redirectToAdmin: true });
        })
        .catch((err) => console.error(err));
    }
  }

  /**
 * Allows to call the delete method on mouse click
 * @param {*} id Promo Id
 */
  handleDeleteClick(id) {
    return this.handleDelete(id);
  }

  /**
 * Allows to call the delete method on enter Key press
 * @param {*} id Promo Id
 */
  handleDeleteEnterKey(e, id) {
    if (e.key === 'Enter') {
      return this.handleDelete(id);
    }
    return false;
  }

  render() {
    const {
      programDetails, isAdmin, redirectToProgramEdit, programId, redirectToAdmin, promotionId,
    } = this.state;
    const { goToProgramEdit, handleDeleteClick, handleDeleteEnterKey } = this;
    this.record(programDetails);

    if (redirectToAdmin) {
      return <Redirect to="/home/admin" />;
    }

    if (redirectToProgramEdit) {
      const path = `/admin/program/${programId}/edit`;
      return (
        <Redirect to={{
          pathname: path,
        }}
        />
      );
    }

    return (
      <>
        {!isAdmin && (
          <div className="buttonContainer">
            <a href={`/user/promo/${promotionId}/details`} className="button is-dark goBack">Revenir à l&apos;accueil</a>
          </div>
        )}
        {isAdmin && (
          <div className="buttonContainer">
            <a href="/home/admin" className="button is-dark goBack">Revenir à l&apos;accueil</a>
            <button
              type="button"
              className="button is-warning"
              onClick={goToProgramEdit}
            >
              Editer
            </button>
            <button
              type="button"
              className="button is-danger"
              onClick={() => handleDeleteClick(programId)}
              onKeyUp={() => handleDeleteEnterKey(programId)}
            >
              Supprimer
            </button>
          </div>
        )}
        <section className="studentHomeSection">{this.titles}</section>
      </>
    );
  }
}

export default ProgramDetails;
