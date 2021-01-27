import React, { useEffect } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import CheckoutPage from './pages/checkout/checkout.component';

import Header from './components/header/header.component';

import { checkUserSession } from './redux/user/user.actions';
import { selectCurrentUser } from './redux/user/user.selectors'; 
// import { selectCollectionsForPreview } from './redux/shop/shop.selectors';


import './App.css';

const App = ({checkUserSession, currentUser}) => {

  useEffect(() => {
    checkUserSession();
  }, [checkUserSession]);   // array assures will only fire 1 time on component did mount

  // removed component did mount when adding useEffect
  // componentDidMount() {
  //   const { checkUserSession }  = this.props;
  //   checkUserSession();
  // }
  return (
    <div>
      <Header />
      <Switch>
        <Route exact path='/' component={HomePage} />
        <Route path='/shop' component={ShopPage} />
        <Route exact path='/checkout' component={CheckoutPage} />
        <Route 
          exact 
          path='/signin' 
          render={() => 
              currentUser 
              ? (<Redirect to='/' />) 
              : (<SignInAndSignUpPage />)
          }
        />
      </Switch>
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
  //collectionsArray: selectCollectionsForPreview
});

const mapDispatchToProps = dispatch => ({
  checkUserSession: user => dispatch(checkUserSession())
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
