import React, { Component } from 'react';
import Select from 'react-select';
import axios from 'axios';

const options = [];
const todosToPost = [];

export default class EditBoard extends Component {

    constructor(props) {
        super(props);

        this.onChangeBoardName = this.onChangeBoardName.bind(this);
        this.onChangeBoardTodos = this.onChangeBoardTodos.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            name: '',
            todos: [],
            date: ''
        }
    }

    componentDidMount() {
        axios.get('http://localhost:4000/api/boards/' + this.props.match.params.id)
            .then(response => {
                this.setState({
                    name: response.data.name,
                    todos: response.data.todos,
                    date: response.data.date
                })
            })
            .catch(function (error) {
                console.log(error);
            })

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

        const obj = {
            name: this.state.name,
            todos: todosToPost,
            date: this.state.date
        };

        axios.post('http://localhost:4000/api/boards/update/' + this.props.match.params.id, obj)
            .then(res => console.log(res.data));

        this.props.history.push('/');
    }

    render() {
        const { selectedOption } = this.state;
        return (
            <div>
                <h3 align="center">Update Board</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Board Name: </label>
                        <input type="text"
                            className="form-control"
                            value={this.state.name}
                            onChange={this.onChangeBoardName}
                        />
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
                    <br />
                    <div className="form-group">
                        <input type="submit" value="Update Todo" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}