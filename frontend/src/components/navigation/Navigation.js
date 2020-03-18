import React, { Component } from "react";
import { Link } from "react-router-dom";
import { SignInModal } from "../signInModal/SignInModal";
import "./Navigation.scss";
import logo from "./logo.png";

class NavigationBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modalState: false,
      loggedIn: false,
      isNavAdmin: false,
      promoId: null,
      programId: null
    };
    this.setBurgerLink = this.setBurgerLink.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.connect = this.connect.bind(this);
    this.disconnect = this.disconnect.bind(this);
    this.handleSetBurgerLinkEnterPress = this.handleSetBurgerLinkEnterPress.bind(
      this
    );
    this.handleSetBurgerLinkClick = this.handleSetBurgerLinkClick.bind(this);
    this.handleSetNavbarStateClick = this.handleSetNavbarStateClick.bind(this);
    this.handleSetNavbarStateEnterPress = this.handleSetNavbarStateEnterPress.bind(
      this
    );
    this.handleSetBurgerBarClick = this.handleSetBurgerBarClick.bind(this);
    this.handleSetBurgerBarEnterPress = this.handleSetBurgerBarEnterPress.bind(
      this
    );
  }

  componentDidMount() {
    let isUserLogged = sessionStorage.getItem("loggedIn");
    isUserLogged = JSON.parse(isUserLogged);
    if (isUserLogged != null && isUserLogged) {
      this.setState({ loggedIn: true });
      this.connect();
    } else {
      this.setState({ loggedIn: false, modalState: "" });
    }
  }

  setNavbarState(state) {
    this.setState({ isNavAdmin: state });
    sessionStorage.setItem("navbarAdmin", state);
  }

  setBurgerBar = () => {
    const burger = document.querySelector(".burger");
    const nav = document.querySelector(`#${burger.dataset.target}`);
    burger.classList.toggle("is-active");
    nav.classList.toggle("is-active");
  };

  setBurgerLink = e => {
    const navLink = e.currentTarget;
    navLink.nextElementSibling.classList.toggle("is-hidden-mobile");
  };

  /**
   * Allows to open or close de sign in Modal
   * @param {*} ev boolean
   */
  toggleModal = ev => {
    if (!ev) {
      this.setState({ modalState: false });
    } else {
      this.setState({ modalState: true });
    }
  };

  handleSetBurgerLinkClick(e) {
    this.setBurgerLink(e);
  }

  handleSetBurgerLinkEnterPress(e) {
    if (e.keyCode === 13) {
      this.setBurgerLink(e);
    }
  }

  handleSetNavbarStateClick(state) {
    this.setNavbarState(state);
  }

  handleSetNavbarStateEnterPress(e, state) {
    if (e.keyCode === 13) {
      this.setNavbarState(state);
    }
  }

  handleSetBurgerBarClick() {
    this.setBurgerBar();
  }

  handleSetBurgerBarEnterPress(e) {
    if (e.keyCode === 13) {
      this.setBurgerBar();
    }
  }

  /**
   * Allows to disconnect a user
   */
  disconnect() {
    this.setState({
      modalState: false,
      isNavAdmin: false,
      loggedIn: false
    });
    return sessionStorage.clear();
  }

  /**
   * Allows to connect a user
   */
  connect() {
    const promoId = JSON.parse(sessionStorage.getItem("promoId"));
    const programId = JSON.parse(sessionStorage.getItem("programId"));
    const role = JSON.parse(sessionStorage.getItem("userRole"));
    if (role === 1) this.setState({ isNavAdmin: true });
    this.setState({ promoId, programId, loggedIn: true });
  }

  render() {
    const {
      loggedIn,
      modalState,
      isNavAdmin,
      email,
      password,
      promoId,
      programId
    } = this.state;
    const navbarMenu = document.querySelector("#navMenu") || "";
    let navbarMenuClass;
    if (isNavAdmin && loggedIn) {
      if (
        navbarMenu.className &&
        navbarMenu.className === "navbar-menu navbar-menu-front is-active"
      ) {
        navbarMenuClass = "navbar-menu navbar-menu-admin is-active";
      } else {
        navbarMenuClass = "navbar-menu navbar-menu-admin";
      }
    } else if (!isNavAdmin || !loggedIn) {
      if (
        navbarMenu.className &&
        navbarMenu.className === "navbar-menu navbar-menu-admin is-active"
      ) {
        navbarMenuClass = "navbar-menu navbar-menu-front is-active";
      } else {
        navbarMenuClass = "navbar-menu navbar-menu-front";
      }
    }
    const mainLink = (
      <div className="navbar-item is-arrowless">
        <Link
          tabIndex="0"
          className="navbar-link is-arrowless is-hidden-mobile"
          to={isNavAdmin ? "/home/admin" : `/user/promo/${promoId}/details`}
        >
          <img
            id="navbarLogo"
            src={logo}
            className="is-hidden-mobile"
            alt="logo zenika"
          />
        </Link>
        <Link
          tabIndex="0"
          className="navbar-link is-arrowless is-hidden-desktop is-hidden-tablet"
          to={isNavAdmin ? "/home/admin" : `/user/promo/${promoId}/details`}
        >
          <span className="navbar-link is-arrowless is-hidden-desktop is-hidden-tablet">
            Accueil
          </span>
        </Link>
      </div>
    );

    const adminLinks = (
      <div className="navbar-start">
        {mainLink}
        <div className="navbar-item has-dropdown is-hoverable">
          <span
            role="button"
            tabIndex="0"
            className="navbar-link"
            onClick={this.handleSetBurgerLinkClick}
            onKeyUp={this.handleSetBurgerLinkEnterPress}
          >
            Promotions
          </span>
          <div className="navbar-dropdown is-hidden-mobile is-boxed">
            <Link to="/admin/promo/create">
              <span className="navbar-item">Créer</span>
            </Link>
          </div>
        </div>
        <div className="navbar-item has-dropdown is-hoverable">
          <span
            role="button"
            tabIndex="0"
            className="navbar-link"
            onClick={this.handleSetBurgerLinkClick}
            onKeyUp={this.handleSetBurgerLinkEnterPress}
          >
            Programmes
          </span>
          <div className="navbar-dropdown is-hidden-mobile is-boxed">
            <Link to="/admin/program/create">
              <span className="navbar-item">Créer</span>
            </Link>
          </div>
        </div>
        <div className="navbar-item has-dropdown is-hoverable">
          <span
            role="button"
            tabIndex="0"
            className="navbar-link"
            onClick={this.handleSetBurgerLinkClick}
            onKeyUp={this.handleSetBurgerLinkEnterPress}
          >
            Utilisateurs
          </span>
          <div className="navbar-dropdown is-hidden-mobile is-boxed">
            <Link to="/admin/users/create">
              <span className="navbar-item">Créer</span>
            </Link>
          </div>
        </div>
      </div>
    );

    const notAdminLinks = (
      <div className="navbar-start">
        {mainLink}
        <div className="navbar-item has-dropdown is-hoverable">
          <span
            role="button"
            tabIndex="0"
            className="navbar-link"
            onClick={this.handleSetBurgerLinkClick}
            onKeyUp={this.handleSetBurgerLinkEnterPress}
          >
            Promotion
          </span>
          <div className="navbar-dropdown is-hidden-mobile is-boxed">
            <Link to={`/user/promo/${promoId}/details`}>
              <span className="navbar-item">Détail</span>
            </Link>
          </div>
        </div>
        <div className="navbar-item has-dropdown is-hoverable">
          <span
            role="button"
            tabIndex="0"
            className="navbar-link"
            onClick={this.handleSetBurgerLinkClick}
            onKeyUp={this.handleSetBurgerLinkEnterPress}
          >
            Programme
          </span>
          <div className="navbar-dropdown is-hidden-mobile is-boxed">
            <Link to={`/program/${programId}/details`}>
              <span className="navbar-item">Détail</span>
            </Link>
          </div>
        </div>
      </div>
    );

    const mainNav = (
      <nav
        className={isNavAdmin ? "navbar is-dark" : "navbar is-light"}
        role="navigation"
        aria-label="main navigation"
      >
        <div className="navbar-brand">
          <span
            role="button"
            tabIndex="0"
            className="navbar-burger burger"
            onClick={() => this.handleSetBurgerBarClick()}
            onKeyUp={() => this.handleSetBurgerBarEnterPress()}
            data-target="navMenu"
          >
            <span />
            <span />
            <span />
          </span>
        </div>
        <div className={navbarMenuClass} id="navMenu">
          {isNavAdmin ? adminLinks : notAdminLinks}
          <div className="navbar-end">
            {isNavAdmin && (
              <div className="navbar-item has-dropdown">
                <span id="adminNavText" className="display-desktop">
                  <i className="fas fa-users-cog" />
                  &nbsp;Admin
                </span>
              </div>
            )}
            <div className="navbar-item">
              <Link
                onClick={() => this.disconnect()}
                to="/"
                className={
                  isNavAdmin
                    ? "icon-signout-admin is-hidden-mobile"
                    : "icon-signout is-hidden-mobile"
                }
              >
                <i className="fas fa-sign-out-alt display-desktop" />
              </Link>
              <Link
                onClick={() => this.disconnect()}
                to="/"
                className="display-mobile"
              >
                <span className="navbar-link is-arrowless display-mobile">
                  {" "}
                  Se déconnecter
                </span>
              </Link>
            </div>
          </div>
        </div>
      </nav>
    );

    const loggedOutNav = (
      <nav
        className="navbar is-primary"
        role="navigation"
        aria-label="main navigation"
      >
        <div className="navbar-item display-mobile">
          <button
            type="submit"
            onClick={() => this.toggleModal(true)}
            className="button"
          >
            Se connecter
          </button>
        </div>
        <div className="navbar-menu">
          <div className="navBarLoggedOut">
            <div className="navbar-start">
              <p lang="en">There is no fate but what we make</p>
            </div>
          </div>
          <div className="navbar-end">
            <div className="navbar-item">
              <button
                type="submit"
                onClick={() => this.toggleModal(true)}
                className="button signInDesktop"
              >
                Se connecter
              </button>
            </div>
          </div>
        </div>
        {modalState && (
          <SignInModal
            toggleModal={this.toggleModal}
            email={email}
            password={password}
            connect={this.connect}
          />
        )}
      </nav>
    );

    if (loggedIn) {
      return mainNav;
    }
    return loggedOutNav;
  }
}

export default NavigationBar;
