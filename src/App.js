import React, { Component } from 'react';
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

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: Boolean(window.localStorage.getItem('isLoggedIn')) || false,
    };
  }
  handleLogOut = () => {
    this.setState((prevState) => ({
      isLoggedIn: !prevState.isLoggedIn,
    }));
  };

  componentDidMount() {
    const { isLoggedIn } = this.state;
    if (isLoggedIn) {
      /* TODO not the best solution */
      // eslint-disable-next-line no-restricted-globals
      history.replaceState('/', '/create');
    }
  }

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
              <Login handlesAuthStatus={this.handleLogOut} />
            </Route>
            <Route path="/signup">
              <SignUp />
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

function Read() {
  return <h2>Read</h2>;
}
