import React, { Component } from 'react';
import axios from 'axios';
import { auth, vessels, addVessel } from "../../constants";

class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            credentials: {
                username: '',
                password: ''
            },
            isAuthenticated: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.gimmeVessels = this.gimmeVessels.bind(this);
        this.Add = this.Add.bind(this);
        this.clearJWT = this.clearJWT.bind(this);
    }

    handleChange(e) {
        const field = e.target.name;
        const credentials = this.state.credentials;
        credentials[field] = e.target.value;
        return this.setState({credentials: credentials});
    }


    handleSubmit(e) {
        e.preventDefault();
        const { credentials } = this.state;
        const jwtToken = 'jwtToken';
        axios.post(auth, 
        { 'name': credentials.username, 
          'password' : credentials.password 
        })
        .then((result) => {
            console.log(result.data.token)
            sessionStorage.setItem(jwtToken, result.data.token);
            
        }).then(() => {
            axios.get(vessels, { headers: { 'Authorization': jwtToken } })
        .then((data) => {
            console.log(data.data)

        });
        });
      console.log(this.state);
    }

    Add(e) {
        e.preventDefault();
        let token = sessionStorage.getItem('jwtToken');
        axios.post(addVessel,{
            // ships to add goes here
        } ,{ headers: { 'Authorization': `Bearer ${token}` }
        
    })
        .then((data) => {
            console.log(data)

        });
    }

    clearJWT = () => {
        let token = sessionStorage.getItem('jwtToken');
        if(token === undefined || token !== '') {
            sessionStorage.removeItem('jwtToken'); 
            console.log(token)              
        }

}

    gimmeVessels(e) {
        e.preventDefault();
        let token = sessionStorage.getItem('jwtToken');
        axios.get(vessels, { headers: { 'Authorization': {token} } })
        .then((data) => {
            console.log(data)

        });
    }

    

    render() {
        const { username, password, submitted } = this.state;
        return (
            <div>
                <h2>Login</h2>
                <form name="login-form" onSubmit={this.handleSubmit}>
                    <div>
                        <label htmlFor="username">Username</label>
                        <input type="text" name="username" value={username} onChange={this.handleChange} /> 
                        {submitted && !username &&
                            <div><small>Username is required</small></div>
                        }
                    </div>
                    <div>
                        <label htmlFor="password">Password</label>
                        <input type="password" name="password" value={password} onChange={this.handleChange} />
                        {submitted && !password &&
                            <div><small>Password is required</small></div>
                        }
                    </div>
                    <div>
                        <button>Login</button>
                        
                    </div>
                </form>
                <div>
                    <button onClick={this.clearJWT}>Logout</button>
                    <button onClick={this.gimmeVessels}>Gimme Vessels</button>
                    <button onClick={this.Add}>Add Vessels</button>
                </div>
            </div>
        );
    }
}

export default Login;
