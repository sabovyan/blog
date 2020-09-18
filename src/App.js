import React from 'react';
import { Route, Switch, Link, useHistory } from 'react-router-dom';

import RssFeedIcon from '@material-ui/icons/RssFeed';
import GitHubIcon from '@material-ui/icons/GitHub';
import MailIcon from '@material-ui/icons/Mail';

import SignIn from './pages/SignIn/SingIn';
import Create from './pages/Create/Create';
import Home from './pages/Home/Home';
import SignUp from './pages/SignUp/SignUp';

import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import MenuLink from './components/MenuLink/MenuLink';
import { useAuth } from './services/Authentication';

import './App.css';

function App() {
  const auth = useAuth();
  const history = useHistory();

  const handleLogOut = () => {
    auth.signout().then(() => {
      history.push('/');
    });
  };

  return (
    <div className="App">
      <Header auth={auth} handleLogOut={handleLogOut} />
      <Switcher auth={auth} />

      <Footer />
    </div>
  );
}

export default App;

function Read() {
  return <h2>Read</h2>;
}

function Footer() {
  return (
    <footer className="main__footer">
      <p>September, 2020</p>
      <MailIcon />
      <GitHubIcon />
      <RssFeedIcon />
    </footer>
  );
}

function Header({ handleLogOut, auth }) {
  return (
    <header className="nav__header">
      <div className="nav__logo">
        <MenuLink activeOnlyWhenExact={true} to="/" label="Blog" />
      </div>
      <nav className="nav__main">
        <ul className="nav__list">
          <li className="nav__list-item">
            <MenuLink to="/create" label="Create" />
          </li>
          <li className="nav__list-item">
            <MenuLink to="/read" label="Read" />
          </li>

          <li hidden={!auth.user} className="nav__list-item">
            <Link onClick={handleLogOut} className="nav__link" to="/">
              Log out
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

function Switcher({ handleLogOut, auth }) {
  return (
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <ProtectedRoute isAuth={auth.user} path="/create" component={Create} />
      <ProtectedRoute isAuth={auth.user} path="/read" component={Read} />
      <Route path="/signin">
        <SignIn />
      </Route>
      <Route path="/signup">
        <SignUp />
      </Route>
    </Switch>
  );
}
