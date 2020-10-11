import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from 'react-router-dom';
import './App.css';
import funnyFrog from './assets/funny-frog-512-281352.png';
import Index from './pages/Index';
import Play from './pages/Play';
import Upload from './pages/Upload';

function App() {
  return (
    <Router>
      <div>
        <nav className="navbar navbar-expand-sm bg-dark navbar-dark fixed-top">
          <Link to="/" className="navbar-brand">
            <img
              alt="The funny frog logo"
              className="rounded"
              src={funnyFrog}
              style={{ height: '25px', paddingRight: '10px' }}
            />
            ShootTube
          </Link>
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link to="/" className="nav-link">Home</Link>
            </li>
          </ul>
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link to="/upload" className="nav-link">Upload</Link>
            </li>
          </ul>
        </nav>
        <div className="page-wrapper container">
          <Switch>
            <Route exact path="/">
              <Index />
            </Route>
            <Route path="/upload">
              <Upload />
            </Route>
            <Route path="/play/:slug">
              <Play />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
