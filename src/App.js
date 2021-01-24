import React, { Component } from 'react';
import axios from 'axios';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import Select from 'react-select';


import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from './component/Header';
import Footer from './component/Footer';
import About from './Views/About';



export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      products: [],
      loading: true,
      filtered: [],
      select: null
    }
  };

  //getting data from the API
  async getUsersData() {
    const res = await axios.get('https://app.getrecall.com/api/products')
    this.setState({ loading: false, products: res.data.products })
  };
  componentDidMount() {
    this.getUsersData()
  };

  //feltring data by category
  onFilteredChangeCustom(value, accessor) {
    console.log("The value is " + value);
    let filtered = this.state.filtered;
    console.log("the filtered items" + JSON.stringify(this.state.filtered));
    let insertNewFilter = 1;

    if ( filtered.length) {
      console.log("filtered.length " + filtered.length);
      filtered.forEach((filter, i) => {
        if (filter["id"] === accessor) {
          if (value === "" || !value.length) filtered.splice(i, 1);
          else filter["value"] = value;

          insertNewFilter = 0;
        }
      });
    }

    if (insertNewFilter) {
      filtered.push({ id: accessor, value: value });
    }

    this.setState({ filtered: filtered });
    console.log("The filtered data is " + JSON.stringify(this.state.filtered));
  }

  //removing duplicated value of category for the react select
  uniqueOptions = (objectsArray, objectKey) => {
    var a = objectsArray.map((o, i) => {
      return o[objectKey];
    });

    return a.filter(function (i, index) {
      return a.indexOf(i) >= index;
    });
  };

  
  render() {

    //defining the clolumns for our table
    const columns = [
    {
      Header: 'Image',
        accessor: 'thumbnail',
        width: 200,
        Cell: e => <img src={e.value} alt=''  /> 
    },
    {
      Header: 'Name',
      accessor: 'name',
      style: { 'whiteSpace': 'unset', 'textAlign': 'center' },
      
    },
    {
      Header: 'description',
      accessor: 'description',
      style: { 'whiteSpace': 'unset', 'textAlign': 'center' },
      width: 210
    },
    {
      Header: 'category',
      accessor: 'category',
      style: { 'whiteSpace': 'unset', 'textAlign': 'center' },
    },

      {
        Header: 'features',
        accessor: 'features',
        style: { 'whiteSpace': 'unset'},
        width: 350
       
      },

      {
        Header: 'Download specification PDF',
        accessor: 'datasheet',
        style: { 'whiteSpace': 'unset', "textAlign": "center" },
        Cell: e => <a href={e.value}> {e.value} </a>,
        width: 200
      },

      {
        Header: 'For more details visite',
        accessor: 'link',
        style: { 'whiteSpace': 'unset', "textAlign": "center" },
        Cell: e => <a href={e.value}> {e.value} </a>,
        width: 200
      },

    ]
    
    return (
      <div className="relative pb-10 min-h-screen">
        <Router>
          <Header />
          <div className="p-3">
            <Switch>
              <Route exact path="/">
                
               <h1>Filter By category :{" "}</h1>
               <div>
                 
                  {/* feltring section*/}
                  <Select
                    isMulti
                    style={{ width: "50%", marginBottom: "20px" }}
                    onChange={(entry) => {
                      this.setState({ select: entry });
                      this.onFilteredChangeCustom(entry.map(o => {
                        return o.value
                      }), "category");
                    }}
                    value={this.state.products.select}
                    {/* getting all categories*/}
                    options={this.uniqueOptions(this.state.products, "category").map((category, i) => {
                      return { id: i, value: category, label: category };
                    })}

                    theme={theme => ({
                      ...theme,
                      borderRadius: 0,
                      colors: {
                        ...theme.colors,

                      },
                    })}
                  />
               </div>
                
                {/* react table section*/}
                <ReactTable 
                  data={this.state.products}
                  filtered={this.state.filtered}
                  columns={columns} 
                  style={{
                    height: "550px" // This will force the table body to overflow and scroll, since there is not enough room
                  }}
                  className="-striped -highlight"
                />
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


