import React, { Component } from 'react'

export default class Search extends Component {

  render() {
    return (
      <section className="main">
        <input type="text" className="input" placeholder="Buscar..." />
      </section>
    )
  }

}