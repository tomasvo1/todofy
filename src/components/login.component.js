import React, { Component } from 'react';
import axios from 'axios';

export default class Login extends Component {
    constructor(props) {
        super(props);

        this.onChangeUserEmail = this.onChangeUserEmail.bind(this);
        this.onChangeUserPassword = this.onChangeUserPassword.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            email: '',
            password: '',
        }
    }

    onChangeUserEmail(e) {
        this.setState({
            email: e.target.value
        });
    }

    onChangeUserPassword(e) {
        this.setState({
            password: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();
        
        const user = {
            email: this.state.email,
            password: this.state.password,
        };
        
        axios.post('http://localhost:4000/api/users/login', user)
            .then(res => console.log(res.data));

        this.setState({
            email: '',
            password: '',
        })
    }

    render() {
        return (
            <div style={{ marginTop: 10 }}>
                <h3 align="center">Login</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>E-mail: </label>
                        <input
                            type="email"
                            className="form-control"
                            required
                            value={this.state.email}
                            onChange={this.onChangeUserEmail} />
                    </div>
                    <div className="form-group">
                        <label>Password: </label>
                        <input
                            type="password"
                            className="form-control"
                            required
                            value={this.state.password}
                            onChange={this.onChangeUserPassword} />
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Login" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}