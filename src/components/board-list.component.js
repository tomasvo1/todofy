import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';
import axios from 'axios';

const Board = props => (
    <tr>
        <td>{props.board.name}</td>
        <td>{props.board.users}</td>
        <td>{props.board.date}</td>
        <td>
            <Link to={"/edit-board/" + props.board._id}>Edit</Link>
        </td>
    </tr>
)

export default class BoardList extends Component {
    constructor(props) {
        super(props);
        this.state = { boards: [] };
    }

    componentDidMount() {
        axios.get('http://localhost:4000/api/boards/')
            .then(response => {
                this.setState({ boards: response.data });
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    boardList() {
        return this.state.boards.map(function (currentBoard, i) {
            return <Board board={currentBoard} key={i} />;
        })
    }

    render() {
        return (
            <div>
                <div style={{display:'inline-block'}}>
                    <h3 style={{float:'left'}}>Boards List</h3>
                    <Link to="/create-board">
                        <Button color="secondary" style={{float:'right', marginLeft: '20px'}}>Create Board</Button>
                    </Link>
                </div>
                <table className="table table-striped" style={{ marginTop: 20 }} >
                    <thead>
                        <tr>
                            <th>Board Name</th>
                            <th>Board Todos</th>
                            <th>Date Created</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.boardList()}
                    </tbody>
                </table>
            </div>
        )
    }
}