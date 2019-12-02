import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import UserModalComponent from './userModal.component';
import axios from 'axios';

const User = props => (
    <tr>
        <td>{props.user.name}</td>
        <td>{props.user.email}</td>
        <td>{props.user.date}</td>
        <td>
            <Link to={"/edit-user/" + props.user._id}>Edit</Link>
        </td>
    </tr>
)

export default class UsersList extends Component {
    constructor(props) {
        super(props);
        this.state = { users: [] };
    }

    componentDidMount() {
        axios.get('http://localhost:4000/api/users/')
            .then(response => {
                this.setState({ users: response.data });
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    usersList() {
        return this.state.users.map(function (currentUser, i) {
            return <User user={currentUser} key={i} />;
        })
    }

    render() {
        return (
            <div>
                <UserModalComponent/>
                <table className="table table-striped" style={{ marginTop: 20 }} >
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Date Joined</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.usersList()}
                    </tbody>
                </table>
            </div>
        )
    }
}