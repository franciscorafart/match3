import React, { Component } from 'react';
import './App.css';
import Level from './components/Level';
import SwaggerUI from 'swagger-ui';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      definitionLink: "https://petstore.swagger.io/v2/swagger.json",
    }
  }

  componentDidMount() {
    SwaggerUI({
      domNode: document.getElementById("api-data"),
      url: this.state.definitionLink
    })
  }

  render() {
    return (
      <div className="App">
        <Level/>
        <div id="api-data" />
      </div>
    );
  }
}
