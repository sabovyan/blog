import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';

import RssFeedIcon from '@material-ui/icons/RssFeed';
import GitHubIcon from '@material-ui/icons/GitHub';
import MailIcon from '@material-ui/icons/Mail';

import Login from './pages/Login/Login';
import Create from './pages/Create/Create';
import Home from './pages/Home/Home';
import SignUp from './pages/SignUp/SignUp';

import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import MenuLink from './components/MenuLink/MenuLink';

import './App.css';

function App() {
  const handleLogOut = () => {};

  return (
    <div className="App">
      <Router>
        <Header handleLogOut={handleLogOut} />
        <Switcher />
      </Router>

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

function Header({ handleLogOut }) {
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
          <li hidden className="nav__list-item">
            <Link onClick={handleLogOut} className="nav__link" to="/">
              Log out
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

function Switcher({ handleLogOut }) {
  return (
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <ProtectedRoute path="/create" component={Create} />
      <ProtectedRoute path="/read" component={Read} />
      <Route path="/signin">
        <Login handlesAuthStatus={handleLogOut} />
      </Route>
      <Route path="/signup">
        <SignUp />
      </Route>
    </Switch>
  );
}
