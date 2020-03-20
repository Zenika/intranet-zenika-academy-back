import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Notfound from '../notfound/Notfound';
import NavigationBar from '../navigation/Navigation';
import Footer from '../footer/Footer';
import { PromoCreateContainer } from '../promoCreateForm/PromoCreateContainer';
import ProgramFormContainer from '../program/ProgramFormContainer';
import UserCreateContainer from '../user/UserCreateContainer';
import Home from '../home/Home';
import AdminHome from '../admin-home/AdminHome';
import StudentHome from '../student-home/StudentHome';
import PromoData from '../promo/PromoData';
import ProgramDetails from '../programDetails/ProgramDetails';
import ProgramData from '../program/ProgramData';
import './App.scss';

class App extends React.Component {
  render() {
    return (
      <Router>
        <header className="header">
          <NavigationBar />
        </header>
        <main className="container fluid">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/home/user" component={StudentHome} />
            <Route
              exact
              key="program-detail"
              path="/program/:id/details"
              component={ProgramDetails}
            />
            <Route path="/home/admin" component={AdminHome} />
            <Route
              key="create-promo"
              path="/admin/users/create"
              component={UserCreateContainer}
            />
            <Route
              key="create-promo"
              path="/admin/promo/create"
              component={PromoCreateContainer}
            />
            <Route
              key="edit-promo"
              path="/admin/promo/edit/:id"
              component={PromoCreateContainer}
            />
            <Route
              key="show-promo-details"
              path="/:role/promo/:id/details"
              component={PromoData}
            />
            <Route
              exact
              path="/admin/promo/:id/details"
              component={PromoData}
            />
            <Route
              exact
              path="/admin/program/:id/details"
              component={ProgramData}
            />
            <Route
              key="create-program"
              exact
              path="/admin/program/create"
              component={ProgramFormContainer}
            />
            <Route
              key="edit-program"
              exact
              path="/admin/program/:id/edit"
              component={ProgramFormContainer}
            />
            <Route component={Notfound} />
          </Switch>
        </main>
        <footer className="footer">
          <Footer />
        </footer>
      </Router>
    );
  }
}

export default App;
