import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Agenda from '../agenda/Agenda';
import Contacts from '../contacts/ContactList';
import WelcomeBooklet from '../welcomeBooklet/WelcomeBooklet';
import RessourcesList from '../ressources/RessourceList';
import Notfound from '../notfound/Notfound';
import NavigationBar from '../navigation/Navigation';
import Footer from '../footer/Footer';
import PromoList from '../promo/PromoList';
import PromoForm from '../promo/PromoForm';
import RessourceForm from '../ressources/RessourceForm';
import ProgramList from '../program/ProgramList';
import ProgramForm from '../program/ProgramForm';
import ModuleList from '../module/ModuleList';
import ModuleForm from '../module/ModuleForm';
import RssFeedList from '../rssFeed/RssFeedList';
import RssFeedForm from '../rssFeed/RssFeedForm';
import WhoToFollowForm from '../whoToFollow/WhoToFollowForm';
import WhoToFollowList from '../whoToFollow/WhoToFollowList';
import UserProfile from '../user/UserProfile';
import UserForm from '../user/UserForm';
import Home from '../home/Home';
import Administration from '../dashboard/Dashboard';
import AdminHome from '../admin-home/AdminHome';
import StudentHome from '../student-home/StudentHome';
import './App.scss';
import { PromoCreateContainer } from '../promoCreateForm/PromoCreateContainer';
import ProgramFormContainer from '../program/ProgramFormContainer';

class App extends React.Component {
  render() {
    return (
      <Router>
        <header>
          <NavigationBar />
        </header>
        <main className="container fluid">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/agenda" component={Agenda} />
            <Route exact path="/contacts" component={Contacts} />
            <Route exact path="/welcomeBooklet" component={WelcomeBooklet} />
            <Route exact path="/ressources" component={RessourcesList} />
            <Route
              key="create-ressource"
              path="/ressources/create"
              component={RessourceForm}
            />
            <Route path="/home/user" component={StudentHome} />
            <Route path="/home/admin" component={AdminHome} />

            <Route
              key="edit-ressource"
              path="/ressources/:id/edit"
              component={RessourceForm}
            />
            <Route exact path="/rssFeed" component={RssFeedList} />
            <Route exact path="/whoToFollow" component={WhoToFollowList} />
            <Route
              key="create-promo"
              path="/admin/user/create"
              component={UserForm}
            />
            <Route exact path="/admin/promo/list" component={PromoList} />
            <Route
              key="create-promo"
              path="/admin/promo/create"
              component={PromoCreateContainer}
            />
            <Route
              key="edit-promo"
              path="/admin/promo/:id/edit"
              component={PromoForm}
            />
            <Route exact path="/admin/module/list" component={ModuleList} />
            <Route
              key="edit-module"
              path="/admin/module/:id/edit"
              component={ModuleForm}
            />
            <Route
              key="create-module"
              path="/admin/module/create"
              component={ModuleForm}
            />
            <Route exact path="/admin/program" component={ProgramList} />
            <Route
              key="create-program"
              exact
              path="/admin/program/create"
              component={ProgramFormContainer}
            />
            <Route
              key="edit-parcours"
              path="/admin/program/:id/edit"
              component={ProgramForm}
            />
            <Route
              exact
              path="/admin/program/ressources"
              component={RessourcesList}
            />
            <Route
              key="create-ressource"
              path="/admin/program/ressources/create"
              component={RessourceForm}
            />
            <Route
              key="edit-ressource"
              path="/admin/program/ressources/:id/edit"
              component={RessourceForm}
            />
            <Route
              exact
              path="/admin/community/rssFeed"
              component={RssFeedList}
            />
            <Route
              key="create-rss"
              exact
              path="/admin/community/rssFeed/create"
              component={RssFeedForm}
            />
            <Route
              key="edit-rss"
              exact
              path="/admin/community/rssFeed/:id/edit"
              component={RssFeedForm}
            />
            <Route
              exact
              path="/admin/community/whoToFollow"
              component={WhoToFollowList}
            />
            <Route
              key="create-whotofollow"
              exact
              path="/admin/community/whoToFollow/create"
              component={WhoToFollowForm}
            />
            <Route
              key="edit-whotofollow"
              exact
              path="/admin/community/whoToFollow/:id/edit"
              component={WhoToFollowForm}
            />
            <Route exact path="/profile" component={UserProfile} />
            <Route path="/admin/dashboard" component={Administration} />
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
