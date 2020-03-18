import React from "react";
import { Link } from "react-router-dom";
import notfound from "./notfound.png";
import "./notfound.scss";

const Notfound = () => (
  <div className="container-404">
    <h1 className="title is-1"> WOOPS ! </h1>
    <img src={notfound} id="notFound" alt="non trouvé" />
    <p className="subtitle is-3">Voilà qui n&lsquo;était pas prévu ... </p>
    <div>
      <Link to="/" id="goBack">
        Retourner à l&lsquo;accueil
      </Link>
    </div>
  </div>
);

export default Notfound;
