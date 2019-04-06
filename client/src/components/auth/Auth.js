
// import { auth, vessels } from "../../constants";
// import axios from "axios";

// export const logIn = () => {
//         const { username, password, isAuthenticated } = this.state;
//         const jwtToken = 'jwtToken';
//         axios.post(auth, 
//         { 'name': username, 
//           'password' :password 
//         })
//         .then((result) => {
//             console.log(result.data.token)
//             localStorage.setItem(jwtToken, result.data.token);
            

//         });
//       console.log(this.state);
// }



// export const isAuthenticated = () => {
//         let token = sessionStorage.getItem('jwtToken');
//         // const isAuthenticated  = false;
//         if(!token || token === '') {
//             return false
//         }
//         else {
//             return true
//         }
        
// };

// export const clearJWT = () => {
//         let token = sessionStorage.getItem('jwtToken');
//         if(token === undefined || token !== '') {
//             sessionStorage.removeItem('jwtToken'); 
//             console.log(token.valueOf)              
//         }

// }


// const mapDispatchToProps = (dispatch) => {
//     return {
//      loadUserFromToken: () => {
//       let token = sessionStorage.getItem(‘jwtToken’);
//       if(!token || token === ‘’) {//if there is no token, dont bother
//        return;
//       }
//      //fetch user from token (if server deems it’s valid token)
//      dispatch(meFromToken(token))
//      .then((response) => {
//       if (!response.error) {
//        //store token 
//        sessionStorage.setItem(‘jwtToken’, response.payload.data.token);
//        dispatch(meFromTokenSuccess(response.payload))
//       } else {
//        //remove token from storage
//        sessionStorage.removeItem(‘jwtToken’);
//        dispatch(meFromTokenFailure(response.payload));
//       }
//      });
//     },
//     resetMe: () =>{ // logout
//     sessionStorage.removeItem(‘jwtToken’); //remove token from storage
//     dispatch(resetToken());
//     }
//     }
//    }

// class Auth {
//     static loggedIn() {
//       return !!sessionStorage.jwt;
//     }
  
//     static logOut() {
//       sessionStorage.removeItem('jwt');
//     }
//   }
  
// export default Auth;