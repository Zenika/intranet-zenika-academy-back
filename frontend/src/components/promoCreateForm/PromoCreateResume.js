import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import axios from 'axios';
import { BulmaSteps } from '../bulma-steps/BulmaSteps';

import './PromoCreate.scss';

class PromoCreateResume extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirectionToHome: false,
    };
    this.handleCreate = this.handleCreate.bind(this);
  }

  handleCreate() {
    const { promo, edit, promoId } = this.props;
    const { teachers, students } = promo;
    const teachersToUpsert = teachers.map((teacher) => {
      const obj = {
        id: teacher.value,
      };
      return obj;
    });
    const promoData = {
      title: promo.title,
      city: promo.city,
      startDate: promo.startDate,
      endDate: promo.endDate,
      programId: promo.program[0].value,
    };

    if (edit) {
      const users = {
        students,
        teachersToUpsert,
      };
      return axios.put(`/api/promotions/${promoId}/update`, { promoData, users })
        .then(() => {
          this.setState({ redirectionToHome: true });
        })
        .catch((err) => err);
    }
    return axios.post('/api/promotions', { promoData, teachersToUpsert })
      .then((res) => {
        students.forEach((student) => {
          const newStudent = {
            ...student,
            promotionId: res.data.id,
          };
          axios.post('/api/users', newStudent);
        });
        this.setState({ redirectionToHome: true });
      })
      .catch((err) => err);
  }

  render() {
    const { step, promo, prevStep, edit } = this.props;
    const { redirectionToHome } = this.state;
    const { handleCreate } = this;

    const startDate = promo.startDate
      .split('-')
      .reverse()
      .join('-');
    const endDate = promo.endDate
      .split('-')
      .reverse()
      .join('-');

    const buttonForm = (
      <section className="field buttonField">
        <section className="control">
          <button
            id="previousButton"
            type="button"
            className="button is-danger"
            onClick={prevStep}
          >
            Revenir
          </button>
        </section>
        <section className="control">
          <button
            id="confirmButton"
            type="button"
            onClick={handleCreate}
            className="button is-link"
          >
            Valider
          </button>
        </section>
      </section>
    );

    if (redirectionToHome) {
      return <Redirect to="/home/admin" />;
    }

    return (
      <div className="promoCreateForm">
        <article className="section box">
          <h1 className="title is-2 is-spaced">{`${
            edit ? 'Edition' : 'Création'
          } d'une promo`}</h1>
          <BulmaSteps step={step} />
          <section className="field">
            <span className="title is-4 is-spaced">Résumé</span>
          </section>
          <section className="control">
            <section className="field">
              <label htmlFor="promoTitle" className="label">
                Nom de la promo:
                <section id="promoTitle" className="field">
                  <p>{promo.title ? promo.title : ''}</p>
                </section>
              </label>
            </section>
          </section>
          <section>
            <section className="control">
              <section className="field">
                <label htmlFor="startDate" className="label">
                  Date de début:
                  <section className="field">
                    <span>
                      {' '}
                      <time id="startDate">{startDate || ''}</time>{' '}
                    </span>
                  </section>
                </label>
              </section>
            </section>
          </section>
          <section>
            <section className="control">
              <section className="field">
                <label htmlFor="endDate" className="label">
                  Date de fin:
                  <section className="field">
                    <span>
                      {' '}
                      <time id="endDate">{endDate || ''}</time>{' '}
                    </span>
                  </section>
                </label>
              </section>
            </section>
          </section>
          <section className="field">
            <label htmlFor="city" className="label">
              Ville:
              <section id="city" className="field">
                <p>{promo.city !== undefined ? promo.city : ''}</p>
              </section>
            </label>
          </section>
          <section className="field">
            <label htmlFor="program" className="label">
              Programme:
              <section id="program" className="field">
                <p>{promo.program.length ? promo.program[0].label : ''}</p>
              </section>
            </label>
          </section>
          <section className="field">
            <label htmlFor="teachers" className="label">
              Formateurs:
              <section id="teachers" className="field">
                {promo.teachers.length
                  ? promo.teachers.map((e) => <p key={e.value}>{e.label}</p>)
                  : ''}
              </section>
            </label>
          </section>
          <section className="field">
            <label htmlFor="students" className="label">
              Elèves:
              <section id="students" className="field">
                {promo.students.length
                  ? promo.students.map((e) => (
                      <p
                        key={e.lastName}
                      >{`${e.lastName}  ${e.firstName}  ${e.email}`}</p>
                    ))
                  : ''}
              </section>
            </label>
          </section>
          {buttonForm}
        </article>
      </div>
    );
  }
}

export default PromoCreateResume;
