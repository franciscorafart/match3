import React, { Component } from 'react';
import './App.css';
import Level from './components/Level';
import Config from './organization_config.json';
import SwaggerUI from 'swagger-ui';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      organizationConfig: null,
      definitionList: null,
      definitionLink: "https://petstore.swagger.io/v2/swagger.json"
    }
    this.swaggerhub = this.swaggerhub.bind(this)
    this.getOrganizationData = this.getOrganizationData.bind(this)
  }

  componentWillMount() {
    this.setState({
      organizationConfig:  Config.orgData,
    })
  }

  componentDidMount() {
    SwaggerUI({
      domNode: document.getElementById("api-data"),
      url: this.state.definitionLink
    })
  }

  swaggerhub(inputMethod, inputResource, inputParams) {
    let url = ""
    if (inputParams) {
      url = "https://api.swaggerhub.com/apis/" + inputResource + "?" + inputParams
    } else {
      url = "https://api.swaggerhub.com/apis/" + inputResource
    }

    return fetch(url, {
        method: inputMethod
    }).then(response => {
      if (response.ok) {
        return response.json()
      } throw new Error('There was an issue requesting the API')
    }).then(json => {
      return json
    })
  }

  getOrganizationData(organization) {
    let inputParams = "page=0&limit=20&sort=NAME&order=ASC"
    let inputResource = organization;

    this.swaggerhub('GET', inputResource, inputParams).then(response => {
      this.setState({
        definitionList: response.apis
      })
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
