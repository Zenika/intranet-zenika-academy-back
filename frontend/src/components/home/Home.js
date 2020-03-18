import React, { Component } from "react";
import "../app/index.scss";
import "../app/App.scss";

class Home extends Component {
  componentDidMount() {
    document.title = "Page d'accueil Zintranet";
  }

  render() {
    return (
      <>
        <h1>Bienvenue sur l&apos;intranet de la Zenika Academy </h1>
      </>
    );
  }
}

export default Home;
