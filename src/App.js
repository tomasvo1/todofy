import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import CreateTodo from './components/create-todo.component';
import CreateBoard from './components/create-board.component';
import CreateUser from './components/create-user.component';

import EditTodo from './components/edit-todo.component';
import EditUser from './components/edit-user.component';
import EditBoard from './components/edit-board.component';

import TodosList from './components/todos-list.component';
import UsersList from './components/users-list.component';
import BoardList from './components/board-list.component';

import MainPage from './components/main-page.component';

import Register from './components/register.component';
import Login from './components/login.component';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="container">
          <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <Link to="/" className="navbar-brand">TodoFy</Link>
            <div className="collpase navbar-collapse">
              <ul className="navbar-nav mr-auto">
                <li className="navbar-item">
                  <Link to="/todos" className="nav-link">Todos</Link>
                </li>
                <li className="navbar-item">
                  <Link to="/boards" className="nav-link">Boards</Link>
                </li>
                <li className="navbar-item">
                  <Link to="/users" className="nav-link">Users</Link>
                </li>
              </ul>
            </div>
          </nav>
          <br/>
          <Route path="/" exact component={MainPage} />
          <Route path="/todos" exact component={TodosList} />
          <Route path="/boards" exact component={BoardList} />
          <Route path="/users" exact component={UsersList} />
          <Route path="/edit/:id" component={EditTodo} />
          <Route path="/edit-user/:id" component={EditUser} />
          <Route path="/edit-board/:id" component={EditBoard} />
          <Route path="/create" component={CreateTodo} />
          <Route path="/create-board" component={CreateBoard} />
          <Route path="/create-user" component={CreateUser} />
          <Route path="/register" component={Register} />
          <Route path="/login" component={Login} />
        </div>
      </Router>
    );
  }
}

export default App;
