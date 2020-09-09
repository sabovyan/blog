import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';

import RssFeedIcon from '@material-ui/icons/RssFeed';
import GitHubIcon from '@material-ui/icons/GitHub';
import MailIcon from '@material-ui/icons/Mail';

import Home from './components/Home/Home';
import LoginForm from './components/LoginForm/LoginForm';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import MenuLink from './components/MenuLink/MenuLink';

import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
    };
  }
  handleLogOut = () => {
    this.setState((prevState) => ({
      isLoggedIn: !prevState.isLoggedIn,
    }));
  };

  render() {
    const { isLoggedIn } = this.state;
    return (
      <div className="App">
        <Router>
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
                <li hidden={!isLoggedIn} className="nav__list-item">
                  <Link
                    onClick={this.handleLogOut}
                    className="nav__link"
                    to="/"
                  >
                    Log out
                  </Link>
                </li>
              </ul>
            </nav>
          </header>

          <Switch>
            <Route exact path="/">
              <Home hiddenLink={isLoggedIn} />
            </Route>
            <ProtectedRoute
              path="/create"
              isAuth={isLoggedIn}
              component={Create}
            />
            <ProtectedRoute path="/read" isAuth={isLoggedIn} component={Read} />
            <Route path="/login">
              <LoginForm handlesAuthStatus={this.handleLogOut} />
            </Route>
          </Switch>
        </Router>

        <footer className="main__footer">
          <p>September, 2020</p>
          <MailIcon />
          <GitHubIcon />
          <RssFeedIcon />
        </footer>
      </div>
    );
  }
}

export default App;

function Create() {
  return <h2>Create</h2>;
}

function Read() {
  return <h2>Read</h2>;
}
