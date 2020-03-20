import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Axios from 'axios';
import Moment from 'react-moment';
import './PromoData.scss';

class PromoDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      program: {},
      promotion: {},
      isAdmin: false,
      redirectToAdmin: false,
      redirectToPromoEdit: false,
    };
    this.handleDelete = this.handleDelete.bind(this);
    this.handleDeleteClick = this.handleDeleteClick.bind(this);
    this.handleDeleteEnterKey = this.handleDeleteEnterKey.bind(this);
    this.goToPromoEdit = this.goToPromoEdit.bind(this);
  }

  componentDidMount() {
    document.title = 'Détails de la promo';
    const role = sessionStorage.getItem('userRole');
    if (JSON.parse(role) === 1) {
      this.setState({ isAdmin: true });
    }
    const { match } = this.props;
    const url = `/api/promotions/details/${parseInt(match.params.id, 10)}`;
    Axios.get(url).then((result) => {
      this.setState({
        users: result.data.users,
        program: result.data.program,
        promotion: result.data.promotion,
      });
    });
  }

  /**
   * Allows to delete a promo in the DB
   * delete students
   * update teachers with promoId null
   * @param {*} id Promo Id
   */
  handleDelete(id) {
    const url = `/api/promotions/${id}`;
    // eslint-disable-next-line no-restricted-globals,no-alert
    if (confirm('Voulez vous supprimer cette promotion?')) {
      Axios.delete(url)
        .then(() => {
          this.setState({ redirectToAdmin: true });
        })
        .catch((err) => err);
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

  goToPromoEdit() {
    return this.setState({ redirectToPromoEdit: true });
  }

  render() {
    const {
      users,
      program,
      promotion,
      redirectToAdmin,
      isAdmin,
      redirectToPromoEdit,
    } = this.state;
    const { handleDeleteClick, handleDeleteEnterKey, goToPromoEdit } = this;
    const teachers = users.filter((user) => user.role === 2);
    const students = users.filter((user) => user.role === 3);
    const programTitle = program ? program.title : 'Pas de programme associé';
    const detailLink = program ? (
      <a
        href={`/program/${program.id}/details`}
        title="Détails du programme"
        className="detailsLink"
      >
        détails...
      </a>
    ) : null;

    if (redirectToAdmin) {
      return <Redirect to="/home/admin" />;
    }

    if (redirectToPromoEdit) {
      const path = `/admin/promo/edit/${promotion.id}`;
      return (
        <Redirect
          to={{
            pathname: path,
            data: { teachers, students, promotion },
          }}
        />
      );
    }
    return (
      <>
        <div className="container">
          <div className="PromoDataHeader">
            <div className="promoInfo">
              <h1 className="title is-1 promoTitle">{promotion.title}</h1>
              <h2 className="subtitle is-3">
                à {promotion.city} du{' '}
                <Moment format="DD/MM/YYYY">{promotion.startDate}</Moment> au{' '}
                <Moment format="DD/MM/YYYY">{promotion.endDate}</Moment>
              </h2>
            </div>
            {isAdmin && (
              <div className="buttonContainer">
                <a
                  href="/home/admin"
                  className="button is-dark goBack"
                  title="Revenir à l'accueil"
                >
                  Revenir à l&apos;accueil
                </a>
                <button
                  title=" Edition d'une promo"
                  type="button"
                  className="button is-warning"
                  onClick={goToPromoEdit}
                >
                  Editer
                </button>
                <button
                  title="Suppression d'une promo"
                  type="button"
                  className="button is-danger"
                  onClick={() => handleDeleteClick(promotion.id)}
                  onKeyUp={() => handleDeleteEnterKey(promotion.id)}
                >
                  Supprimer
                </button>
              </div>
            )}
          </div>
          <div className="container">
            <div className="notification">
              <h3 className="title is-3">Formateurs</h3>
              <ul className="promoTeachers">
                {teachers.map((teacher) => (
                  <li
                    key={`teacher-${teacher.id}`}
                  >{`${teacher.firstName} ${teacher.lastName}`}</li>
                ))}
              </ul>
            </div>
          </div>
          <div className="container">
            <div className="notification">
              <h3 className="title is-3">Elèves</h3>
              <ul className="promoStudents">
                {students.map((student) => (
                  <li
                    key={`student-${student.id}`}
                  >{`${student.firstName} ${student.lastName}`}</li>
                ))}
              </ul>
            </div>
          </div>
          <div className="container">
            <div className="notification">
              <h3 className="title is-3">Programme</h3>
              <p>{programTitle}</p>
              {detailLink}
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default PromoDetails;
