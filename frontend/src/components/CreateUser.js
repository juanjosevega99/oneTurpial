import React, { Component } from 'react'
import axios from 'axios'

export default class CreateUser extends Component {

  state = {
    users: [],
    document_type: '',
    id: '',
    firstname: '',
    lastname: '',
    birth_date: ''
  }
  async componentDidMount() {
    this.getUsers()
  }

  getUsers = async () => {
    const res = await axios.get('http://localhost:4000/users')
    this.setState({ users: res.data })
  }

  onChangeUserName = (e) => {
    this.setState({
      username: e.target.value
    })
  }

  onInputChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  onSubmit = async e => {
    e.preventDefault()
    const newUser = {
      document_type: this.state.document_type,
      id: this.state.id,
      firstname: this.state.firstname,
      lastname: this.state.lastname,
      birth_date: this.state.birth_date,
    }
    if (this.state.editing) {
      await axios.put('http://localhost:4000/users/' + this.state.id, newUser)
    } else {
      await axios.post('http://localhost:4000/users', newUser)
    }
    window.location.href = 'http://localhost:3000/user'
  }

  deleteUser = async (id) => {
    await axios.delete('http://localhost:4000/users/' + id)
    this.getUsers()
  }

  render() {
    return (
      <div className="row">
        <div className="col-md-4">
          <div className="card card-body">
            <h3>Create New User</h3>
            <form onSubmit={this.onSubmit}>
              {/* DOCUMENT TYPE */}
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="cedula o nit"
                  onChange={this.onInputChange}
                  name="document_type"
                  value={this.state.document_type}
                  required
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="ID"
                  onChange={this.onInputChange}
                  name="id"
                  value={this.state.id}
                  required
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="FirstName"
                  onChange={this.onInputChange}
                  name="firstname"
                  value={this.state.firstname}
                  required
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="LastName"
                  onChange={this.onInputChange}
                  name="lastname"
                  value={this.state.lastname}
                  required
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="birth date: 1999-05-09"
                  onChange={this.onInputChange}
                  name="birth_date"
                  value={this.state.birth_date}
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary">
                Save
              </button>
            </form>
          </div>
        </div>
        <div className="col-md-8">
          <ul className="list-group">
            {
              this.state.users.map(user => (
                <li
                  className="list-group-item list-group-item-action"
                  key={user.id}
                  onDoubleClick={() => this.deleteUser(user.id)}
                >
                  {user.firstname}
                </li>)
              )
            }
          </ul>
        </div>
      </div>
    )
  }
}
