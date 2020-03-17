import React, { Component } from 'react';
import Axios from 'axios';
import PromoCreateStepOne from './PromoCreateStepOne';
import { PromoCreateStepTwo } from './PromoCreateStepTwo';
import { PromoCreateStepThree } from './PromoCreateStepThree';
import { PromoCreateStepFour } from './PromoCreateStepFour';
import PromoCreateResume from './PromoCreateResume';

export class PromoCreateContainer extends Component {
  constructor() {
    super();
    this.state = {
      step: 1,
      title: '',
      startDate: '',
      endDate: '',
      students: [],
      teachers: [],
      program: [],
      country: '',
      city: '',
      csv: false,
      edit: false,
      promoId: 0,
    };
  }

  componentDidMount() {
    const { match } = this.props;
    document.title = 'Création de promotion';
    if (window.location.toString().indexOf('edit') !== -1) {
      document.title = 'Edition de promotion';
      const { id } = match.params;
      const url = `/api/promotions/details/${parseInt(id, 10)}`;
      Axios.get(url, { withCredentials: true })
        .then((result) => {
          const { users, promotion, program } = result.data;
          users.forEach((user) => {
            if (user.role === 2) {
              const obj = { label: `${user.firstName} ${user.lastName}`, value: user.id };
              this.setState((state) => {
                const teacherList = state.teachers.push(obj);
                return teacherList;
              });
            }
            if (user.role === 3) {
              const obj = {
                firstName: user.firstName, lastName: user.lastName, email: user.email, role: 'student',
              };
              this.setState((state) => {
                const studentList = state.students.push(obj);
                return studentList;
              });
            }
          });
          this.setState({
            edit: true,
            promoId: promotion.id,
            title: promotion.title,
            city: promotion.city,
            startDate: promotion.startDate.substr(0, promotion.startDate.indexOf('T')),
            endDate: promotion.endDate.substr(0, promotion.endDate.indexOf('T')),
            program: [{ label: program.title, value: program.id }],
          });
        });
    }
  }

  /**
   * Allows to handle state change in promo form
   * @param e event from wich data are coming from
   */
  handleChange = (e) => {
    const { name, value } = e.target;
    return this.setState({ [name]: value });
  };

  /**
   * Allows to handle state change from multi select
   * @param options options objects from multi select
   * @param name name of the state to update
   */
  handleMultiChange = (options, name) => {
    if (name === 'program') {
      return this.setState({ [name]: [options] });
    }
    return this.setState({ [name]: options });
  };

  /**
   * Allows to pass csv data into state
   * @param name name of the state to update
   * @param data data to put in the state
   */
  handleCSVImport = (name, data) => {
    this.setState({ [name]: [...data], csv: true });
  };

  /**
   * Allows to navigate forward on multiform
   */
  nextStep = () => {
    const { step } = this.state;
    return this.setState({ step: step + 1 });
  };

  /**
   * Allows to navigate backward on multiform
   */
  prevStep = () => {
    const { step } = this.state;
    return this.setState({ step: step - 1 });
  };

  render() {
    const {
      step,
      title,
      startDate,
      endDate,
      teachers,
      students,
      program,
      country,
      city,
      csv,
      edit,
      promoId,
    } = this.state;
    const promo = {
      title,
      startDate,
      endDate,
      teachers,
      students,
      program,
      country,
      city,
      promoId,
    };
    const {
      nextStep,
      prevStep,
      handleChange,
      handleMultiChange,
      handleCSVImport,
    } = this;

    switch (step) {
      case 1:
        return (
          <PromoCreateStepOne
            nextStep={nextStep}
            step={step}
            promo={promo}
            handleChange={handleChange}
            handleMultiChange={handleMultiChange}
            edit={edit}
          />
        );
      case 2:
        return (
          <PromoCreateStepTwo
            nextStep={nextStep}
            prevStep={prevStep}
            handleChange={handleChange}
            handleMultiChange={handleMultiChange}
            promo={promo}
            step={step}
            edit={edit}
          />
        );
      case 3:
        return (
          <PromoCreateStepThree
            nextStep={nextStep}
            prevStep={prevStep}
            handleChange={handleChange}
            handleMultiChange={handleMultiChange}
            name="teachers"
            promo={promo}
            step={step}
            edit={edit}
          />
        );
      case 4:
        return (
          <PromoCreateStepFour
            nextStep={nextStep}
            prevStep={prevStep}
            handleChange={handleChange}
            handleMultiChange={handleMultiChange}
            handleCSVImport={handleCSVImport}
            promo={promo}
            step={step}
            csv={csv}
            name="students"
            edit={edit}
          />
        );
      default:
        return (
          <PromoCreateResume
            nextStep={nextStep}
            prevStep={prevStep}
            promo={promo}
            step={step}
            promoId={promoId}
            edit={edit}
          />
        );
    }
  }
}

export default PromoCreateContainer;
