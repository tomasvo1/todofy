import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import Select from 'react-select';
import axios from 'axios';

const options = [];
const todosToPost = [];

export default class BoardModalComponent extends React.Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.onChangeBoardName = this.onChangeBoardName.bind(this);
        this.onChangeBoardTodos = this.onChangeBoardTodos.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            modal: false,
            name: '',
            todos: [],
            date: new Date()
        }
    }

    componentDidMount() {
        axios.get('http://localhost:4000/api/todos/')
            .then(response => {
                response.data.forEach(element => {
                    options.push({ value: element._id, label: element.todo_description })
                });
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    toggle() {
        this.setState({
            modal: !this.state.modal
        });
    }

    handleChange = selectedOption => {
        selectedOption.map(function (option) {
            if (todosToPost.indexOf(option.value) === -1) {
                todosToPost.push(option.value)
            }
            return todosToPost
        })

        this.setState({
            todos: selectedOption
        });
    };

    onChangeBoardName(e) {
        this.setState({
            name: e.target.value
        });
    }

    onChangeBoardTodos(e) {
        this.setState({
            todos: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();

        console.log(`Form submitted:`);
        console.log(`Board Name: ${this.state.name}`);
        console.log(`Board Todos: ${todosToPost}`);
        console.log(`Date Created: ${this.state.date}`);

        const newBoard = {
            name: this.state.name,
            todos: todosToPost,
            date: this.state.date,
        };

        axios.post('http://localhost:4000/api/boards/add', newBoard)
            .then(res => console.log(res.data));

        this.setState({
            name: '',
            todos: '',
            date: ''
        })
    }

    render() {
        const { selectedOption } = this.state;
        return (
            <div>
                <div style={{ display: 'inline-block' }}>
                    <h3 style={{ float: 'left' }}>Boards List</h3>
                    <Button color="secondary" onClick={this.toggle} style={{ float: 'right', marginLeft: '20px' }}>Create Board</Button>
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
                                    value={this.state.name}
                                    onChange={this.onChangeBoardName} />
                            </div>
                            <div className="form-group">
                                <label>Todos: </label>
                                <Select
                                    value={selectedOption}
                                    onChange={this.handleChange}
                                    isMulti
                                    options={options}
                                />
                            </div>
                        </ModalBody>
                        <ModalFooter>
                            <input type="submit" value="Create Board" color="primary" className="btn btn-primary" />
                            <Button color="danger" onClick={this.toggle}>Cancel</Button>
                        </ModalFooter>
                    </form>
                </Modal>
            </div>
        );
    }
}