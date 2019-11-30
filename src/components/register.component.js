import React, { Component } from 'react';
import axios from 'axios';

export default class Register extends Component {
    constructor(props) {
        super(props);

        this.onChangeUserName = this.onChangeUserName.bind(this);
        this.onChangeUserEmail = this.onChangeUserEmail.bind(this);
        this.onChangeUserPassword = this.onChangeUserPassword.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            name: '',
            email: '',
            password: '',
        }
    }

    onChangeUserName(e) {
        this.setState({
            name: e.target.value
        }); 
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
        
        const newUser = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            date: new Date()
        };
        
        axios.post('http://localhost:4000/api/users/add', newUser)
            .then(res => console.log(res.data));

        this.setState({
            name: '',
            email: '',
            password: '',
        })
    }

    render() {
        return (
            <div style={{ marginTop: 10 }}>
                <h3 align="center">Register</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Name: </label>
                        <input
                            type="text"
                            className="form-control"
                            required
                            value={this.state.name}
                            onChange={this.onChangeUserName} />
                    </div>
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
                        <input type="submit" value="Register" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}