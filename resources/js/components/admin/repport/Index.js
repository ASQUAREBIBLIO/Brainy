import React, { Component } from "react";
import { render } from "react-dom";
import {
    BrowserRouter as Router,
    Routes as Switch,
    Route
} from "react-router-dom";
import { Bar } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import { UserData } from './UserData';
import Sidebar from '../family/Sidebar';
import Report from './Index'
import '../../../../css/app.css';

var dateObj = new Date();
var month = dateObj.getMonth() + 1; //months from 1-12
var day = dateObj.getDate();
var year = dateObj.getFullYear();

const Today = year + "/" + month + "/" + day;


Chart.register(...registerables);

export default class Index extends Component {
    constructor() {
      super();
      this.state = {
        data: {
          labels: UserData.map(o => o.day),
          datasets: [
            {
              label: 'Week Events Number',
              backgroundColor: '#6963dd',
              data: UserData.map(o => o.event)
            }
          ]
        },
        options: {
          plugins: {
            title: {
              display: true,
              text: 'Bar Chart'
            }
          }
        }
      };
    }

    render() {
        return (
            <Router>
                <div className="header">
                    <div className="nav">
                        <Sidebar />
                    </div>
                    <div className="body">
                        <div>
                            <h4>Reports</h4>
                            <h6>Report of the week</h6>
                        </div>
                        <div>
                            <p className='text-center fs-10'>Current date: {Today}</p>
                        </div>
                        <div style={{height: '300px', width: '900px'}} className="d-flex mb-2 justify-content-center">
                            <Bar
                                data={this.state.data}
                                options={this.state.options}
                                style={{width: '100%', display: 'flex', justifyContent:'center'}}
                            />
                        </div>
                    </div>
                </div>
                <Switch>
                    <Route path="/admin/index/report" exact component={Report} />
                </Switch>
            </Router>
        );
    }
  }

render(<Index />, document.getElementById("report"));
