import React, { Component } from "react";
import {
  BrowserRouter,
  Route,
  Link,
  Redirect,
  withRouter
} from "react-router-dom";
import { isAuthenticated, clearJWT, logIn } from "./components/auth";
import HomePage from './components/home/HomePage';
import VesselsPage from './components/vessels/VesselsPage';
import VesselPage from './components/vessels/VesselPage';
import NewVesselPage from './components/vessels/NewVesselPage';
import LoginPage from './components/login/LoginPage.js';
import Auth from './components/auth';



const Router = () => {
    return (
      <BrowserRouter>
        <div>
          <strong><AuthButton/></strong>
          <ul>
            <li>
              <Link to="/LoginPage">Login</Link>
            </li>
            <li>
              <Link to="/home">Home</Link>
            </li>
            <li>
              <Link to="/vessels">Vessels</Link>
            </li>
          </ul>
          <Route path="/loginPage" component={LoginPage} />
          <Route path="/home" component={HomePage} />
          <PrivateRoute path="/vessels" component={VesselsPage} onEnter={requireAuth}/>
        </div>
      </BrowserRouter>
    );
  }
  
const AuthButton = withRouter(
    ({ history }) =>
      isAuthenticated === true ? (
        <p>
          Welcome!{" "}
          <button
            onClick={() => {
              clearJWT(() => history.push("/"));
            }}
          >
            Sign out
          </button>
        </p>
      ) : (
        <p>You are not logged in.</p>
      )
  );
  
  function PrivateRoute({ component: Vessels, ...rest }) {
    
    return (
      <Route
        {...rest}
        render={props =>
            isAuthenticated === true 
              ? 
              <Vessels/> 
              :
              <Redirect
                to={{
                  pathname: "/home",
                  state: { from: props.location }
                }}/>
              }
            
            
              
             />
    );
  }

  function requireAuth(nextState, replace) {
    console.log(Auth.loggedIn());
    if (!Auth.loggedIn()) {
      replace({
        pathname: '/login',
        state: { nextPathname: nextState.location.pathname }
      })
    }
  }




  
  // USE for VEssels and subroutes
  // const routes = [
  //   {
  //     path: "/sandwiches",
  //     component: Sandwiches
  //   },
  //   {
  //     path: "/tacos",
  //     component: Tacos,
  //     routes: [
  //       {
  //         path: "/tacos/bus",
  //         component: Bus
  //       },
  //       {
  //         path: "/tacos/cart",
  //         component: Cart
  //       }
  //     ]
  //   }
  // ];

  // Mapping for subroutes

  // {routes.map((route, i) => (
  //   <RouteWithSubRoutes key={i} {...route} />
  // ))}
  
  // class LoginPage extends Component {
  //   state = { redirectToReferrer: false };
  
  //   login = () => {
  //     JWTExists.authenticate(() => {
  //       this.setState({ redirectToReferrer: true });
  //     });
  //   };
  
  //   render() {
  //     let { from } = this.props.location.state || { from: { pathname: "/" } };
  //     let { redirectToReferrer } = this.state;
  
  //     if (redirectToReferrer) return <Redirect to={from} />;
  
  //     return (
  //      <Login/>
  //     )
  //   }
  // }
  
  export default Router;
  