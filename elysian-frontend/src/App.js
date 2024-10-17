import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './styles.css';
import Navbar from './components/Navbar';
import ProductList from './components/ProductList';
import Chairs from './components/Chairs';
import Sofas from './components/Sofas';
import Tables from './components/Tables';
import Beds from './components/Beds';

function App() {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route exact path="/" component={() => (
          <>
            <div className="mainImage">
              <img className="responsiveImg" src="/img/backgroundmain.jpg" alt="Main Background" />
            </div>
            <ProductList />
          </>
        )} />
        <Route path="/chairs" component={Chairs} />
        <Route path="/sofas" component={Sofas} />
        <Route path="/tables" component={Tables} />
        <Route path="/beds" component={Beds} />
      </Switch>
      <div className="footer">
        <p>©Copyright Elysian Furnishings 2024</p>
        <p>Email: Elysian@email.com</p>
        <p>Phone: 1-423-476-3157</p>
      </div>
    </Router>
  );
}

export default App;