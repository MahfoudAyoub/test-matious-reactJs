import React, { Component } from 'react'
import axios from 'axios'
import ReactTable from 'react-table';
import 'react-table/react-table.css'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import Header from './component/Header'
import Footer from './component/Footer'
import About from './Views/About'


export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      products: [],
      loading: true,
      subCategory: '',
    }
  };
  async getUsersData() {
    const res = await axios.get('http://app.getrecall.com:8080/products')
    console.log(res.data)
    this.setState({ loading: false, products: res.data.products })
  };
  componentDidMount() {
    this.getUsersData()
  };
  
  render() {
    console.log(this.state.products)
    const columns = [
    {
      Header: 'Image',
        accessor: 'thumbnail',
        Cell: e => <img src={e.value} /> 
    },
    {
      Header: 'Name',
      accessor: 'name',
      style: { 'whiteSpace': 'unset' },
      Cell: row => (
        <div style={{ textAlign: "center" }}>{row.value}</div>
      )
    },
    {
      Header: 'description',
      accessor: 'description',
      style: { 'whiteSpace': 'unset' },
      Cell: row => (
        <div style={{ textAlign: "center" }}>{row.value}</div>
      )
    },
    {
      Header: 'category',
      accessor: 'category',
      style: { 'whiteSpace': 'unset' },
      Cell: row => (
        <div style={{ textAlign: "center" }}>{row.value}</div>
      )
    },

      {
        Header: 'features',
        accessor: 'features',
        style: { 'whiteSpace': 'unset'},
        Cell: row => (
          <div style={{ textAlign: "center" }}>{row.value}</div>
        )
      },

      {
        Header: 'Download specification PDF',
        accessor: 'datasheet',
        style: { 'whiteSpace': 'unset' },
        Cell: row => (
          <div style={{ textAlign: "center" }}>{row.value}</div>
        ),
        Cell: e => <a href={e.value}> {e.value} </a>
      },

      {
        Header: 'Click in Link for more details',
        accessor: 'link',
        style: { 'whiteSpace': 'unset' },
        Cell: row => (
          <div style={{ textAlign: "center" }}>{row.value}</div>
        ),
        Cell: e => <a href={e.value}> {e.value} </a>
      },

    ]
    return (
      <div className="relative pb-10 min-h-screen">
        <Router>

          <Header />

          <div>filter</div>
    
          <div className="p-3">
            <Switch>
              <Route exact path="/">
                <ReactTable data={this.state.products}
                  columns={columns} />
              </Route>
              <Route path="/about">
                <About />
              </Route>
            </Switch>
          </div>

          <Footer />

        </Router>
      </div>
    )
  }
}

