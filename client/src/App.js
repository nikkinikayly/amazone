import React, { Fragment } from 'react';
import './App.css';
import {Route, Switch} from 'react-router-dom'
import Departments from './components/Departments';
import Department from './components/Department';
import Products from './components/Products';
import Product from './components/Product';
import Reviews from './components/Reviews';
import Review from './components/Review';
import NoMatch from './components/NoMatch'


const App = () => (
  <Fragment>
    {/* <Navbar /> */}
    <Switch>
      <Route exact path='/' component={Departments} />
      <Route exact path='/departments' component={Departments} />
      <Route exact path='/departments/:id' component={Department} />
      <Route exact path='/departments/:department_id/products' component={Products} />
      <Route exact path='/departments/:department_id/products/:id' component={Product} />
      <Route exact path='/departments/:department_id/products/:product_id/reviews' component={Reviews} />
      <Route exact path='/departments/:department_id/products/:product_id/reviews/:id' component={Review} />
      <Route component={NoMatch} />
    </Switch>
  </Fragment>
);

export default App;
