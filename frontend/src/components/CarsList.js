import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

export default class CarsList extends Component {

  state = {
    cars: []
  }

  async componentDidMount() {
    this.getCars()
  }

  getCars = async () => {
    const res = await axios.get('http://localhost:4000/cars')
    this.setState({
      cars: res.data
    })
  }

  render() {
    return (
      <div className="row">
        {
          this.state.cars.map(car => (
            <div className="col-md-4 p-2" key={car.user_id}>
              <div className="card">
                <div className="card-header d-flex justify-content-between">
                  <h5>{car.modelo}</h5>
                  <Link className="btn btn-secondary" to={'/edit/' + car.user_id}>
                    Edit
                  </Link>
                </div>
                <div className="card-body">
                  <p>{car.placa}</p>
                  <p>{car.user_id}</p>
                  <p>{car.marca}</p>
                </div>
                <div className="card-footer">
                  <button className="btn btn-danger" onClick={() => this.deleteCar(car.user_id)}>
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        }
      </div>
    )
  }
}