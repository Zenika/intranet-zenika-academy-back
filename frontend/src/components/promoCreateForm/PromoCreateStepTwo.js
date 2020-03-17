import React, { Component } from 'react';
import axios from 'axios';
import { BulmaSteps } from '../bulma-steps/BulmaSteps';
import CreatableSelect from '../searchbarauto/CreatableSearchbar';
import './PromoCreate.scss';

export class PromoCreateStepTwo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      programs: [],
    };
  }

  componentDidMount() {
    setTimeout(() => {
      axios.get('/api/programs', { withCredentials: true })
        .then((res) => res.data.forEach((program) => {
          if (program.type === 1) {
            const obj = { label: program.title, value: program.id };
            this.setState((state) => {
              const programList = state.programs.push(obj);
              return programList;
            });
          }
        }))
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
    const { programs } = this.state;

    const buttonForm = (
      <div className="field buttonField section">
        <div className="control">
          <button
            id="previousButton"
            type="button"
            className="button is-danger"
            onClick={prevStep}
          >
            Revenir
          </button>
        </div>
        <div className="control">
          <button
            id="resumeButton"
            type="button"
            className="button is-link"
            onClick={nextStep}
          >
            Continuer
          </button>
        </div>
      </div>
    );
    return (
      <div className="promoCreateForm">
        <article className="section box">
          <h1 className="title is-2 is-spaced">{`${
            edit ? 'Edition' : 'Création'
          } d'une promo`}</h1>
          <BulmaSteps step={step} />
          <div className="control">
            <span className="label">Choisir un programme : </span>
            <section className="field">
              <section className="control">
                <CreatableSelect
                  defaultValue={promo.program}
                  name="program"
                  options={programs}
                  handleChange={(e) => handleMultiChange(e, 'program')}
                  searchKey="title"
                  defaultLabel="Programme"
                />
              </section>
            </section>
          </div>
          <div className="control">{buttonForm}</div>
        </article>
      </div>
    );
  }
}

export default PromoCreateStepTwo;
