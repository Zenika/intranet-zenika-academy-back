import React from 'react';
import { BulmaSteps } from '../bulma-steps/BulmaSteps';
import DatePicker from '../datepicker/DatePicker';
import './PromoCreate.scss';

function PromoCreateStepOne(props) {
  const { nextStep, step, handleChange, promo, edit } = props;

  const buttonForm = (
    <div className="field buttonField">
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
      <article className="div box">
        <h1 className="title is-2 is-spaced">{`${
          edit ? 'Edition' : 'Création'
        } d'une promo`}</h1>
        <BulmaSteps step={step} />
        <div className="control">
          <label htmlFor="promoName" className="label">
            Nom de la promo:
            <input
              id="promoName"
              className="input "
              name="title"
              defaultValue={promo.title}
              onChange={(e) => handleChange(e)}
              type="text"
              placeholder="Promo"
            />
          </label>
        </div>
        <div className="level">
          <div className="control">
            <span className="label">Date de début: </span>
            <DatePicker
              date={promo.startDate}
              name="startDate"
              defaultValue={promo.startDate}
              handleChange={(e) => handleChange(e)}
            />
          </div>
          <div className="control">
            <span className="label">Date de fin: </span>
            <DatePicker
              date={promo.endDate}
              name="endDate"
              defaultValue={promo.endDate}
              handleChange={(e) => handleChange(e)}
            />
          </div>
        </div>
        <div className="field">
          <label htmlFor="city" className="label">
            Ville:
            <div className="field">
              <input
                type="text"
                id="city"
                className="input"
                defaultValue={promo.city}
                name="city"
                onChange={(e) => handleChange(e)}
                placeholder="Ville"
              />
            </div>
          </label>
        </div>
        {buttonForm}
      </article>
    </div>
  );
}

export default PromoCreateStepOne;
