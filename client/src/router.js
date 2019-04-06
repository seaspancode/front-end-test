import React, { Component } from "react";
import {
  BrowserRouter,
  Route,
  Link,
  Redirect,
  withRouter
} from "react-router-dom";
import { isAuthenticated, clearJWT, logIn } from "./components/auth";
import history from "history";
import LoginPage from "./components/login/"
import Vessels from "./components/vessels";
import Home from "./components/home";

const Router = () => {
    return (
      <BrowserRouter>
        <div>
          
          <ul>
            <li>
              <Link to="/loginPage">Login</Link>
            </li>
            <li>
              <Link to="/home">Home</Link>
            </li>
            <li>
              <Link to="/vessels">Vessels</Link>
            </li>
          </ul>
          <Route path="/loginPage" component={LoginPage} />
          <Route path="/home" component={Home} />
          <PrivateRoute path="/vessels" component={Vessels} />
        </div>
        <strong><AuthButton/></strong>
      </BrowserRouter>
    );
  }
  
const AuthButton = withRouter(
    ({ history }) =>
      Auth.loggedIn === true ? (
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
          Auth.loggedIn === false 
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

  class Auth {
    static loggedIn() {
      return !!sessionStorage.jwtToken;
    }
  
    static logOut() {
      sessionStorage.removeItem('jwtToken');
    }
  }
  
  export default Router;
  