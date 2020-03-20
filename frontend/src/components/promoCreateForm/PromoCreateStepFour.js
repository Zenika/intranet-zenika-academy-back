import React, { Component } from 'react';
import CsvPicker from '../csvPicker/CsvPicker';
import './PromoCreate.scss';
import { BulmaSteps } from '../bulma-steps/BulmaSteps';

export class PromoCreateStepFour extends Component {
  render() {
    const {
      nextStep,
      prevStep,
      step,
      handleCSVImport,
      name,
      promo,
      edit,
    } = this.props;
    const selected = !!(promo.students.length && promo.students.length > 0);

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
            <span htmlFor="students" className="label">
              Importer des étudiants :
            </span>
            <div className="csvPickerContainer">
              <CsvPicker
                selected={selected}
                name={name}
                handleCSVImport={handleCSVImport}
              />
            </div>
          </section>
          {buttonForm}
        </article>
      </div>
    );
  }
}

export default PromoCreateStepFour;
