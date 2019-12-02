import React, { Component } from 'react';
import { Button } from 'reactstrap';
import { Link } from 'react-router-dom';

export default class CreateTodo extends Component {
    render() {
        return (
            <div>
                <div style={{ marginTop: '10%' }}>
                    <h2 align="center">Want to make some tasks huh?</h2>
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '15%' }}>
                    <Link to="/register">
                        <Button color="secondary" size="lg" style={{}}>Register</Button>
                    </Link>
                    <Link to="/login">
                        <Button color="secondary" size="lg" style={{ marginLeft: '5px' }}>Login</Button>
                    </Link>
                </div>
            </div>
        )
    }
}

