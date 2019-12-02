import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import Select from 'react-select';
import axios from 'axios';

const options = [];

export default class TodoModalComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = { modal: false };
        this.toggle = this.toggle.bind(this);
        this.onChangeTodoDescription = this.onChangeTodoDescription.bind(this);
        this.onChangeTodoResponsible = this.onChangeTodoResponsible.bind(this);
        this.onChangeTodoPriority = this.onChangeTodoPriority.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount() {
        axios.get('http://localhost:4000/api/users/')
            .then(response => {
                response.data.forEach(element => {
                    options.push({ value: element._id, label: element.name })
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
        this.setState({
            todo_responsible: selectedOption.value,
        });
    };

    onChangeTodoDescription(e) {
        this.setState({
            todo_description: e.target.value
        });
    }

    onChangeTodoResponsible(e) {
        this.setState({
            todo_responsible: e.target.value
        });
    }

    onChangeTodoPriority(e) {
        this.setState({
            todo_priority: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();

        console.log(`Form submitted:`);
        console.log(`Todo Description: ${this.state.todo_description}`);
        console.log(`Todo Responsible: ${this.state.todo_responsible}`);
        console.log(`Todo Priority: ${this.state.todo_priority}`);

        const newTodo = {
            todo_description: this.state.todo_description,
            todo_responsible: this.state.todo_responsible,
            todo_priority: this.state.todo_priority,
            todo_completed: this.state.todo_completed
        };

        axios.post('http://localhost:4000/api/todos/add', newTodo)
            .then(res => console.log(res.data));

        this.setState({
            todo_description: '',
            todo_responsible: '',
            todo_priority: '',
            todo_completed: false
        })
    }

    render() {
        const { selectedOption } = this.state;
        return (
            <div>
                <div style={{ display: 'inline-block' }}>
                    <h3 style={{ float: 'left' }}>Todos List</h3>
                    <Button color="secondary" onClick={this.toggle} style={{ float: 'right', marginLeft: '20px' }}>Create Todo</Button>
                </div>
                <Modal isOpen={this.state.modal}>
                    <form onSubmit={this.onSubmit}>

                        <ModalHeader>Create New Todo</ModalHeader>
                        <ModalBody>
                            <div className="form-group">
                                <label>Description: </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={this.state.todo_description}
                                    onChange={this.onChangeTodoDescription} />
                            </div>
                            <div className="form-group">
                                <label>Responsible: </label>
                                <Select
                                    value={selectedOption}
                                    onChange={this.handleChange}
                                    options={options}
                                />
                            </div>
                            <div className="form-group">
                                <div className="form-check form-check-inline">
                                    <input
                                        className="form-check-input"
                                        type="radio"
                                        name="priorityOptions"
                                        id="priprityLow"
                                        value="Low"
                                        checked={this.state.todo_priority === 'Low'}
                                        onChange={this.onChangeTodoPriority} />
                                    <label className="form-check-label">Low</label>
                                </div>
                                <div className="form-check form-check-inline">
                                    <input
                                        className="form-check-input"
                                        type="radio"
                                        name="priorityOptions"
                                        id="priprityMedium"
                                        value="Medium"
                                        checked={this.state.todo_priority === 'Medium'}
                                        onChange={this.onChangeTodoPriority} />
                                    <label className="form-check-label">Medium</label>
                                </div>
                                <div className="form-check form-check-inline">
                                    <input
                                        className="form-check-input"
                                        type="radio"
                                        name="priorityOptions"
                                        id="priprityHigh"
                                        value="High"
                                        checked={this.state.todo_priority === 'High'}
                                        onChange={this.onChangeTodoPriority} />
                                    <label className="form-check-label">High</label>
                                </div>
                            </div>
                        </ModalBody>
                        <ModalFooter>
                            <input type="submit" value="Create Todo" color="primary" className="btn btn-primary" />
                            <Button color="danger" onClick={this.toggle}>Cancel</Button>
                        </ModalFooter>
                    </form>
                </Modal>
            </div>
        );
    }
}