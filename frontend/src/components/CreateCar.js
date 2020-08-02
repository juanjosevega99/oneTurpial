import React, { Component } from 'react'
import axios from 'axios'

export default class CreateCar extends Component {

  state = {
    users: [],
    userSelected: '',
    placa: '',
    marca: '',
    modelo: '',
    editing: false,
  }

  async componentDidMount() {
    const res = await axios.get('http://localhost:4000/users')
    if (res.data.length > 0) {
      this.setState({
        users: res.data.map(user => user.id),
        userSelected: res.data[0].id
      })
      if (this.props.match.params.id) {
        const res = await axios.get('http://localhost:4000/cars/' + this.props.match.params.id)
        this.setState({
          placa: res.data.placa,
          marca: res.data.marca,
          modelo: res.data.modelo,
          userSelected: res.data.id,
          editing: true,
          _id: this.props.match.params.id
        })
      }
    }
  }

  onSubmit = async (e) => {
    e.preventDefault()
    const newCar = {
      placa: this.state.placa,
      marca: this.state.marca,
      modelo: this.state.modelo,
      user_id: this.state.userSelected,
    }
    if (this.state.editing) {
      await axios.put('http://localhost:4000/cars/' + this.state._id, newCar)
    } else {
      await axios.post('http://localhost:4000/cars', newCar)
    }
    window.location.href = '/'
  }

  onInputChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  onChangeDate = date => {
    this.setState({ date })
  }

  render() {
    return (
      <div className="col-md-6 offset-md-3">
        <div className="card card-body">
          <h4>Create a Car</h4>
          <form onSubmit={this.onSubmit}>
            {/* SELECT THE USER */}
            <div className="form-group">
              <select
                className="form-control"
                value={this.state.userSelected}
                name="userSelected"
                onChange={this.onInputChange}
                required
              >
                {
                  this.state.users.map(user => (
                    <option key={user} value={user}>
                      {user}
                    </option>
                  ))
                }
              </select>
            </div>
            {/* Car Placa */}
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                placeholder="Placa"
                onChange={this.onInputChange}
                name="placa"
                value={this.state.placa}
                required
              />
            </div>
            {/* Car Marca */}
            <div className="form-group">
              <textarea
                type="text"
                className="form-group"
                placeholder="Marca"
                name="marca"
                onChange={this.onInputChange}
                value={this.state.marca}
                required
              >
              </textarea>
            </div>
            {/* Car Modelo */}
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                placeholder="Modelo"
                onChange={this.onInputChange}
                name="modelo"
                value={this.state.modelo}
                required
              />
            </div>
            <button className="btn btn-primary">
              Save
            </button>
          </form>
        </div>
      </div>
    )
  }
}
