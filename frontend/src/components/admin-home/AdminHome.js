import React, { Component } from 'react';
import axios from 'axios';
import Moment from 'react-moment';
import './AdminHome.scss';

class AdminHome extends Component {
  _isMounted = false;

  constructor(props) {
    super(props);
    this.state = {
      promotions: {},
      programs: {},
    };
  }

  componentDidMount() {
    this._isMounted = true;
    document.title = 'Page d\'accueil Admin';
    const token = sessionStorage.getItem("token");
    axios.get('/api/promotions', { withCredentials: true })
      .then((res) => {
        const promotions = res.data;
        if (this._isMounted) {
          this.setState({ promotions });
        }
      });

    axios.get('/api/programs', { withCredentials: true })
      .then((res) => {
        const programs = res.data;
        if (this._isMounted) {
          this.setState({ programs });
        }
      });
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    let { promotions, programs } = this.state;
    promotions = promotions.length > 0 ? promotions : [];
    programs = programs.length > 0 ? programs : [];

    return (
      <>
        <h1 className="title is-2 mbmd">Bienvenue</h1>

        <a
          href="/admin/promo/create"
          className="button is-primary admin-home-link promo-creation"
        >
          Créer une promotion
        </a>
        <a
          href="/admin/program/create"
          className="button is-primary admin-home-link program-creation"
        >
          Créer un programme
        </a>
        <a
          href="/admin/users/create"
          className="button is-primary admin-home-link user-creation"
        >
          Créer un utilisateur
        </a>
        <div className="notification">
          <h2 className="title is-4 mbmd">Liste des promotions :</h2>
          <ul className="promosContainer">
            {promotions.map((promotion) => (
              <li className="promoLineContainer" key={promotion.id}>
                <h1 className="promotionTitle">{promotion.title}</h1>
                {' du '}
                <Moment format="DD/MM/YYYY">{promotion.startDate}</Moment>
                {' au '}
                <Moment format="DD/MM/YYYY">{promotion.endDate}</Moment>
                {' à '}
                {promotion.city}{' '}
                <a
                  href={`/admin/promo/${promotion.id}/details`}
                  className="detailsLink"
                  title="Détails de la promo"
                >
                  détails...
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className="notification">
          <h2 className="title is-4 mbmd">Liste des programmes :</h2>
          <ul className="promosContainer">
            {programs.map((program) => {
              if (program.type === 1) {
                return (
                  <li key={program.id} className="promoLineContainer">
                    <h1 className="promotionTitle">{program.title}</h1>{' '}
                    <a
                      href={`/program/${program.id}/details`}
                      className="detailsLink"
                      title="Détails du programme"
                    >
                      détails...
                    </a>
                  </li>
                );
              }
              return true;
            })}
          </ul>
        </div>
      </>
    );
  }
}

export default AdminHome;
