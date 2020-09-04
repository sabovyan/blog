import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link,
  useRouteMatch,
} from "react-router-dom";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: true,
    };
  }
  handleLogOut = (e) => {
    this.setState((prevState) => ({
      loggedIn: !prevState.loggedIn,
    }));
  };

  handleNavLinkActivation = (e) => {
    if (!this.state.loggedIn) {
      e.preventDefault();
    }
  };

  render() {
    const { loggedIn } = this.state;
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
                  <MenuLink
                    onClick={this.handleNavLinkActivation}
                    to="/create"
                    label="Create"
                  />
                </li>
                <li className="nav__list-item">
                  <MenuLink
                    onClick={this.handleNavLinkActivation}
                    to="/read"
                    label="Read"
                  />
                </li>
                <li hidden={!loggedIn} className="nav__list-item">
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

          <SwitchRoutes />
        </Router>
      </div>
    );
  }
}

export default App;

function Home() {
  return (
    <div className="Home">
      <h2>Home</h2>
      <button>log In</button>
    </div>
  );
}

function Create() {
  return <h2>Create</h2>;
}

function Read() {
  return <h2>Read</h2>;
}

class SwitchRoutes extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/create">
          <Create />
        </Route>
        <Route path="/read">
          <Read />
        </Route>
      </Switch>
    );
  }
}

function MenuLink({ label, to, activeOnlyWhenExact, onClick }) {
  let match = useRouteMatch({
    path: to,
    exact: activeOnlyWhenExact,
  });
  return (
    <Link
      onClick={onClick}
      className={match ? " nav__link active" : "nav__link"}
      to={to}
    >
      {label}
    </Link>
  );
}
