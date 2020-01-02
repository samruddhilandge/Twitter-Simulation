import React, { Component } from "react";
import 'react-bootstrap';
import Navbar from 'react-bootstrap/Navbar';

import GraphBar from './Graphs/GraphBar';
import GraphPie from './Graphs/GraphPie';
import GraphDoughnut from './Graphs/GraphDoughnut';
import GraphLine from './Graphs/GraphLine';
import GraphPolar from './Graphs/GraphPolar';
import GraphHorizontalBar from './Graphs/GraphHorizontalBar';
import HourlyGraph from "./Graphs/HourlyGraph";
import ProfileViews from "./Graphs/ProfileViews";
import MonthlyGraph from "./Graphs/MonthlyGraph";
import {Row,Col} from 'react-bootstrap';

class Analytics extends Component {

    render(){

        return(
            <div>
                <div>
                    <Navbar bg="light" >
                        <Navbar.Brand >
                            <a style={{
                            paddingLeft: "2rem"
                            }} href="/">

                            <span className="fab fa-twitter" style={{
                            marginRight: "10px",
                            fontSize: "2rem",
                            color: "rgba(29,161,242,1.00)"
                            }}></span>
                        </a>

                        </Navbar.Brand>
                    <h5>Analytics</h5>
                    </Navbar>
                </div>
                <Row>
                    <Col><GraphBar/></Col>
                    <Col style={{marginRight:"0px"}}><HourlyGraph/></Col>
                </Row>
                <br/><br/>
                <Row>
                    <Col><GraphHorizontalBar/></Col>
                    <Col><GraphDoughnut/></Col>
                </Row>
                <br/><br/>
                <Row>
                    <Col><MonthlyGraph/></Col>
                    <Col><GraphPie/></Col>
                </Row>
                <br/><br/>
                <Row>
                    <Col><GraphLine/></Col>
                </Row>
                </div>

            
      );
    }
    
}

export default Analytics;
