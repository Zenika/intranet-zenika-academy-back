import React from "react";
import "./UserProfile.scss";
import "../layout/Layout.scss";
import UserForm from "./UserForm";
import RecapUserForm from "./RecapUserForm";

class UserCreateContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      step: 0,
      user: {
        firstName: "",
        lastName: "",
        email: "",
        role: ""
      }
    };
  }

  componentDidMount() {
    document.title = "Admin / Création d'utilisateur";
  }

  changeStep = (step, user) => {
    this.setState({ step, user });
  };

  render() {
    const { step, user } = this.state;

    return (
      <>
        {step === 0 ? (
          <UserForm user={user} changeStep={this.changeStep} />
        ) : (
          <RecapUserForm user={user} changeStep={this.changeStep} />
        )}
      </>
    );
  }
}

export default UserCreateContainer;
