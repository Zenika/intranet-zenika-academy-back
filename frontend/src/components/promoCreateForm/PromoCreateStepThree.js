import React, { Component } from 'react';
import axios from 'axios';
import './PromoCreate.scss';
import { BulmaSteps } from '../bulma-steps/BulmaSteps';
import SearchbarAutoComplete from '../searchbarauto/SearchbarAuto';

export class PromoCreateStepThree extends Component {
  constructor(props) {
    super(props);
    this.state = {
      teachers: [],
    };
  }

  componentDidMount() {
    const { promo } = this.props;
    setTimeout(() => {
      axios
        .get('/api/users')
        .then((res) =>
          res.data.forEach((teacher) => {
            /** RETRIEVE ONLY AVAILABLE OR THIS PROMO TEACHERS FOR MULTISELECT */
            if (teacher.role === 2) {
              if (
                !Number(teacher.promotionId) ||
                teacher.promotionId === promo.promoId
              ) {
                const obj = {
                  label: `${teacher.firstName} ${teacher.lastName}`,
                  value: teacher.id,
                };
                this.setState((state) => {
                  const teacherList = state.teachers.push(obj);
                  return teacherList;
                });
              }
            }
          }),
        )
        .catch((err) => err);
    }, 100);
  }

  render() {
    const {
      nextStep,
      prevStep,
      step,
      promo,
      handleMultiChange,
      edit,
    } = this.props;

    const { teachers } = this.state;

    const buttonForm = (
      <section className="field buttonField section">
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
            id="resumeButton"
            type="button"
            className="button is-link"
            onClick={nextStep}
          >
            Continuer
          </button>
        </section>
      </section>
    );

    return (
      <div className="promoCreateForm">
        <article className="section box">
          <h1 className="title is-2 is-spaced">{`${
            edit ? 'Edition' : 'Création'
          } d'une promo`}</h1>
          <BulmaSteps step={step} />
          <section className="control">
            <span className="label">Choisir des formateurs existants:</span>
            <section className="field">
              <section className="control">
                <SearchbarAutoComplete
                  defaultValue={promo.teachers}
                  name="teachers"
                  options={teachers}
                  handleChange={(e) => handleMultiChange(e, 'teachers')}
                  searchKey="title"
                  defaultLabel="Formateurs"
                  isMulti
                />
              </section>
            </section>
          </section>
          {buttonForm}
        </article>
      </div>
    );
  }
}

export default PromoCreateStepThree;
