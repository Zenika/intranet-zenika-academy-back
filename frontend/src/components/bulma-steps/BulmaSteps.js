import React, { Component } from "react";

export class BulmaSteps extends Component {
  render() {
    const { step } = this.props;
    return (
      <ul className="steps section has-content-centered">
        <li className={`steps-segment ${step === 1 ? "is-active" : " "}`}>
          <span className="steps-marker">
            <p className="is-size-4">{step >= 1 ? "1" : " "}</p>
          </span>
          <div className="steps-content" />
        </li>
        <li className={`steps-segment ${step === 2 ? "is-active" : " "}`}>
          <span className="steps-marker">
            <p className="is-size-4">{step >= 2 ? "2" : " "}</p>
          </span>
          <div className="steps-content" />
        </li>
        <li className={`steps-segment ${step === 3 ? "is-active" : " "}`}>
          <span className="steps-marker">
            <p className="is-size-4">{step >= 3 ? "3" : " "}</p>
          </span>
          <div className="steps-content" />
        </li>
        <li className={`steps-segment ${step === 4 ? "is-active" : " "}`}>
          <span className="steps-marker">
            <p className="is-size-4">{step >= 4 ? "4" : " "}</p>
          </span>
          <div className="steps-content" />
        </li>
        <li className={`steps-segment ${step === 5 ? "is-active" : " "}`}>
          <span className="steps-marker">
            <p className="is-size-4">{step >= 5 ? "5" : " "}</p>
          </span>
          <div className="steps-content" />
        </li>
      </ul>
    );
  }
}

export default BulmaSteps;
