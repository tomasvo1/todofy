import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import axios from 'axios';

export default class UserModalComponent extends React.Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.onChangeUserName = this.onChangeUserName.bind(this);
        this.onChangeUserEmail = this.onChangeUserEmail.bind(this);
        this.onChangeUserPassword = this.onChangeUserPassword.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            name: '',
            email: '',
            password: '',
            role: ''
        }
    }

    toggle() {
        this.setState({
            modal: !this.state.modal
        });
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
            date: new Date(),
            role: 'Member'
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
            <div>
                <div style={{ display: 'inline-block' }}>
                    <h3 style={{ float: 'left' }}>Users List</h3>
                    <Button color="secondary" onClick={this.toggle} style={{ float: 'right', marginLeft: '20px' }}>Create User</Button>
                </div>
                <Modal isOpen={this.state.modal}>
                    <form onSubmit={this.onSubmit}>

                        <ModalHeader>Create New Board</ModalHeader>
                        <ModalBody>
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
                        </ModalBody>
                        <ModalFooter>
                            <input type="submit" value="Create User" color="primary" className="btn btn-primary" />
                            <Button color="danger" onClick={this.toggle}>Cancel</Button>
                        </ModalFooter>
                    </form>
                </Modal>
            </div>
        );
    }
}