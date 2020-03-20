import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import './StudentHome.scss';

class StudentHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirectToUser: false,
      promotionId: '',
    };
  }

  componentDidMount() {
    document.title = "Page d'accueil Eleve";
    const id = sessionStorage.getItem('promoId');
    const role = sessionStorage.getItem('userRole');
    if (JSON.parse(role) === 2 || JSON.parse(role) === 3) {
      return this.setState({
        redirectToUser: true,
        promotionId: id,
      });
    }
    return true;
  }

  render() {
    const { redirectToUser, promotionId } = this.state;
    if (redirectToUser) {
      return <Redirect to={`/user/promo/${promotionId}/details`} />;
    }
    return <h1>Hello!</h1>;
  }
}

export default StudentHome;
