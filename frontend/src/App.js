import React, { Component } from "react";
import Modal from "./components/Modal";
import axios from "axios";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeItem: {
        title: "",
        description: "",
        completed: false
      },
      todoList: []
    };
  }

  componentDidMount() {
    this.refreshList();
  }

  refreshList = () => {
    axios
      .get("http://localhost:8000/api/todos/")
      .then(res => this.setState({ todoList: res.data }))
      .catch(err => console.log(err));
  };

  renderItems = () => {
    const items = this.state.todoList;

    return items.map(item => (
      <li
        key={item.id}
        className="list-group-item d-flex align-items-center"
      >
        <span>
          <button
            onClick={() => this.updateCompleteStatus(item)}
            className="btn btn-success p-2 mr-2"
          >
            {item.completed ? "☑" : "☐"}
          </button>
        </span>
        <span
          className={`todo-title mr-auto p-2 ${
            item.completed ? "completed-todo" : ""
          }`}
          title={item.description}
        >
          {item.title}
        </span>
        <span>
          <button
            onClick={() => this.editItem(item)}
            className="btn btn-secondary p-2 mr-2"
          >
            ✎{" "}
          </button>
          <button
            onClick={() => this.handleDelete(item)}
            className="btn btn-danger p-2"
          >
            ✘{" "}
          </button>
        </span>
      </li>
    ));
  };

  toggle = () => {
    this.setState({ modal: !this.state.modal });
  };

  handleSubmit = item => {
    this.toggle();

    if (item.id) {
      axios
        .put(`http://localhost:8000/api/todos/${item.id}/`, item)
        .then(res => this.refreshList());
      return;
    }

    axios
      .post("http://localhost:8000/api/todos/", item)
      .then(res => this.refreshList());
  };

  handleDelete = item => {
    axios
      .delete(`http://localhost:8000/api/todos/${item.id}`)
      .then(res => this.refreshList());
  };

  createItem = () => {
    const item = { title: "", description: "", completed: false };
    this.setState({ activeItem: item, modal: !this.state.modal });
  };

  editItem = item => {
    this.setState({ activeItem: item, modal: !this.state.modal });
  };

  updateCompleteStatus = item => {
    const newItem = {...item, completed: !item.completed};

    axios
      .put(`http://localhost:8000/api/todos/${item.id}/`, newItem)
      .then(res => this.refreshList());
    return;
  }

  render() {
    return (
      <main className="content">
        <h1 className="text-white text-uppercase text-center my-4">Todo app</h1>
        <div className="row ">
          <div className="col-md-6 col-sm-10 mx-auto p-0">
            <div className="card p-3">
              <ul className="list-group list-group-flush">
                {this.renderItems()}
              </ul>
            </div>
          </div>
        </div>
        <div className="text-center my-4">
          <button onClick={this.createItem} className="btn btn-primary">
            Add task
          </button>
        </div>
        {this.state.modal ? (
          <Modal
            activeItem={this.state.activeItem}
            toggle={this.toggle}
            onSave={this.handleSubmit}
          />
        ) : null}
      </main>
    );
  }
}

export default App;