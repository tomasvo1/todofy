import React, { Component } from 'react';
import axios from 'axios';

export default class EditUser extends Component {

    constructor(props) {
        super(props);

        this.onChangeUserName = this.onChangeUserName.bind(this);
        this.onChangeUserEmail = this.onChangeUserEmail.bind(this);
        this.onChangeUserRole = this.onChangeUserRole.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            name: '',
            email: '',
            role: ''
        }
    }

    componentDidMount() {
        axios.get('http://localhost:4000/api/users/' + this.props.match.params.id)
            .then(response => {
                this.setState({
                    name: response.data.name,
                    email: response.data.email,
                    password: response.data.password,
                    role: response.data.role
                })
            })
            .catch(function (error) {
                console.log(error);
            })
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

    onChangeUserRole(e) {
        this.setState({
            role: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();
        const obj = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            role: this.state.role
        };

        axios.post('http://localhost:4000/api/users/update/' + this.props.match.params.id, obj)
            .then(res => console.log(res.data));

        this.props.history.push('/');
    }

    render() {
        return (
            <div>
                <h3 align="center">Update User</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Name: </label>
                        <input type="text"
                            className="form-control"
                            value={this.state.name}
                            onChange={this.onChangeUserName}
                        />
                    </div>
                    <div className="form-group">
                        <label>Email: </label>
                        <input
                            type="text"
                            className="form-control"
                            value={this.state.email}
                            onChange={this.onChangeUserEmail}
                        />
                    </div>
                    <div className="form-group">
                        <div className="form-check form-check-inline">
                            <input className="form-check-input"
                                type="radio"
                                name="priorityOptions"
                                id="priorityLow"
                                value="Member"
                                checked={this.state.role === 'Member'}
                                onChange={this.onChangeUserRole}
                            />
                            <label className="form-check-label">Member</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input className="form-check-input"
                                type="radio"
                                name="priorityOptions"
                                id="priorityMedium"
                                value="Manager"
                                checked={this.state.role === 'Manager'}
                                onChange={this.onChangeUserRole}
                            />
                            <label className="form-check-label">Manager</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input className="form-check-input"
                                type="radio"
                                name="priorityOptions"
                                id="priorityHigh"
                                value="Admin"
                                checked={this.state.role === 'Admin'}
                                onChange={this.onChangeUserRole}
                            />
                            <label className="form-check-label">Admin</label>
                        </div>
                    </div>
                    <br />
                    <div className="form-group">
                        <input type="submit" value="Update User" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}