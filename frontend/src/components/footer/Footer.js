import React from 'react';
import './Footer.scss';
import Linkedin from './linkedin.png';
import Twitter from './twitter.png';
import Youtube from './youtube.png';
import Github from './github.png';

const Footer = () => (
  <article className="content has-text-centered">
    <div className="content has-text-centered">
      <address>
        <strong>ZENIKA ACADEMY - </strong>
        10 rue Milan 75009 Paris France -
        <a href="info@zenika.com"> info@zenika.com - </a>
        <a href="tel:+33(0)1 45 26 19 15">+33(0)1 45 26 19 15</a>
      </address>
      <p className="socialContainer">
        <a href="https://fr.linkedin.com/company/zenika">
          <img className="socialIcon" src={Linkedin} alt="linkedin icon" />
        </a>
        <a href="https://twitter.com/ZenikaIT">
          <img className="socialIcon" src={Twitter} alt="twitter icon" />
        </a>
        <a href="https://www.youtube.com/user/ZenikaITTv">
          <img className="socialIcon" src={Youtube} alt="youtube icon" />
        </a>
        <a href="https://github.com/Zenika">
          <img className="socialIcon" src={Github} alt="github icon" />
        </a>
        <a href="https://blog.zenika.com/"> - ESPACE BLOG - </a>
        <a href="https://www.zenika.com/press">ESPACE PRESSE</a>
      </p>
    </div>
  </article>
);

export default Footer;
