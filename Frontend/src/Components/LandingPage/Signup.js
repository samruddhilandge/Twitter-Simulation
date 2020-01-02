import React, { Component } from 'react'
import axios from 'axios';
import { Redirect } from 'react-router'

import config from '../../Config/settings.js'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import './../../CSS/SignupPage.css'

let faker = require('faker')
const validator = require('validator');



class Signup extends Component {

    constructor(props) {
        super(props)
        this.state = {
            firstName: "",
            lastName: "",
            username: "",
            userPassword: "",
            email: "",
            zipcode: "",
            state: "",
            city: "",
            finishedSignUp: false,
            message: "",
            signup:false,
        }

        this.firstNameChangeHandler = this.firstNameChangeHandler.bind(this)
        this.lastNameChangeHandler = this.lastNameChangeHandler.bind(this)
        this.usernameChangeHandler = this.usernameChangeHandler.bind(this)
        this.passwordChangeHandler = this.passwordChangeHandler.bind(this)
        this.emailChangeHandler = this.emailChangeHandler.bind(this)

        this.cityChangeHandler = this.cityChangeHandler.bind(this)
        this.stateChangeHandler = this.stateChangeHandler.bind(this)
        this.zipcodeChangeHandler = this.zipcodeChangeHandler.bind(this)

        this.submitSignUp = this.submitSignUp.bind(this)

    }

    firstNameChangeHandler = (e) => {
        this.setState({
            firstName: e.target.value
        })
    }

    lastNameChangeHandler = (e) => {
        this.setState({
            lastName: e.target.value
        })
    }

    passwordChangeHandler = (e) => {
        var isValidPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/.test(e.target.value)
        if(isValidPassword){
            this.setState({
                //finishedSignUp: true,
                userPassword: e.target.value,
                message: ""
            })
        }
        else{
            this.setState({
                finishedSignUp: false,
                message: "Please enter a password between 8 to 15 characters which contain at least one lowercase letter, one uppercase letter, one numeric digit, and one special character"
            })
        }
        
    }

    usernameChangeHandler = (e) => {
        var str = (e.target.value).toLowerCase()
        this.setState({
            username: str
        })
    }

    emailChangeHandler = (e) => {
        var isValidEmail = /\S+@\S+\.\S+/.test(e.target.value)
        if(isValidEmail){
            this.setState({
                //finishedSignUp: true,
                email: e.target.value,
                message: ""
            })
        }
        else{
            this.setState({
                finishedSignUp: false,
                message:"please enter valid email"
            })
        }
        
    }

    stateChangeHandler = (e) => {
        let userInputState = e.target.value;
        const states = new Set([
            'al', 'alabama',
            'ak', 'alaska',
            'az', 'arizona',
            'ar', 'arkansas',
            'ca', 'california',
            'co', 'colorado',
            'ct', 'connecticut',
            'de', 'delaware',
            'dc', 'district of columbia',
            'fl', 'florida',
            'ga', 'georgia',
            'hi', 'hawaii',
            'id', 'idaho',
            'il', 'illinois',
            'in', 'indiana',
            'ia', 'iowa',
            'ks', 'kansas',
            'ky', 'kentucky',
            'la', 'louisiana',
            'me', 'maine',
            'md', 'maryland',
            'ma', 'massachusetts',
            'mi', 'michigan',
            'mn', 'minnesota',
            'ms', 'mississippi',
            'mo', 'missouri',
            'mt', 'montana',
            'ne', 'nebraska',
            'nv', 'nevada',
            'nh', 'new hampshire',
            'nj', 'new jersey',
            'nm', 'new mexico',
            'ny', 'new york',
            'nc', 'north carolina',
            'nd', 'north dakota',
            'oh', 'ohio',
            'ok', 'oklahoma',
            'or', 'oregon',
            'pa', 'pennsylvania',
            'ri', 'rhode island',
            'sc', 'south carolina',
            'sd', 'south dakota',
            'tn', 'tennessee',
            'tx', 'texas',
            'ut', 'utah',
            'vt', 'vermont',
            'va', 'virginia',
            'wa', 'washington',
            'wv', 'west virginia',
            'wi', 'wisconsin',
            'wy', 'wyoming'
        ]);  
        
        if (states.has(userInputState.toLowerCase()) === true) {
            console.log(userInputState.toLowerCase());
            this.setState({
                state: userInputState,
                message:""
            })
        } else {
            this.setState({
                finishedSignUp: false,
                message: "Please enter valid State"
            })
        }
    }

    cityChangeHandler = (e) => {
        this.setState({
            city: e.target.value
        })
    }

    zipcodeChangeHandler = (e) => {
        var isValidZip = /(^\d{5}$)|(^\d{5}-\d{4}$)/.test(e.target.value);
        if (isValidZip){
            this.setState({
                //finishedSignUp: true,
                zipcode: e.target.value,
                message: ""
            })
        }
        else {
            this.setState({
                finishedSignUp: false,
                message: "Please enter valid Zipcode"
            })
        }
       
    }

    submitSignUp = (e) => {
        //console.log("in submit ")
        e.preventDefault();
        console.log(this.state.message)
       

        const data = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            userPassword: this.state.userPassword,
            username: this.state.username,
            state: this.state.state,
            city: this.state.city,
            zipcode: this.state.zipcode,
            email: this.state.email
        }

        console.log("data is..")
        console.log(data);

        // this.setState({
        //     message: "Username already exists"
        // })

        axios.defaults.withCredentials = true;

        axios.post('http://' + config.hostname + ':'+ config.port + '/signup', data)

            .then(response => {
                console.log("frontend")
                //console.log("Status Code : ", response.status);
                console.log("Response from Sign Up " + response);
                console.log(response);
                //console.log(response.message)
                console.log(response.data.responseMessage)

                if (response.data.responseMessage === 'Successfully Added!') {
                    this.setState({
                        finishedSignUp: true,
                        signup: true,
                        message: "User signed up successfully"
                    })
                } else {
                    this.setState({
                        finishedSignUp: false,
                        signup: false,
                        message: "username already exists"
                    })
                }
            });
    }

    render() {

        var nextpage = null
        if (this.state.finishedSignUp === true && this.state.signup === true) {
            nextpage = <Redirect to="/" />
        }
        return (
            <div>
                {nextpage}
                <br></br>
                <center>
                    <Card style={{ width: '24rem' }} >
                        <br></br>
                        <span className="fab fa-twitter" style={{
                            marginRight: "10px",
                            fontSize: "1.5rem",
                            color: "rgba(29,161,242,1.00)"
                        }}></span>

                        <h4>Create your account</h4>
                        <br></br>
                        <center>
                            <Form style={{ width: '20rem' }}>
                                <Form.Group controlId="formGridName" >
                                    <Row>
                                        <Col>
                                            <Form.Control placeholder="First name" onChange={this.firstNameChangeHandler} />
                                        </Col>
                                        <Col>
                                            <Form.Control placeholder="Last name" onChange={this.lastNameChangeHandler} />
                                        </Col>
                                    </Row>
                                </Form.Group>
                                <Form.Group controlId="username">
                                    <Form.Control required placeholder="Username" name="Username" onChange={this.usernameChangeHandler} />
                                </Form.Group>
                                <Form.Group controlId="email">
                                    <Form.Control required placeholder="EmailId" name="email" type="email" onChange={this.emailChangeHandler} />
                                </Form.Group>
                                <Form.Group controlId="formBasicPassword">
                                    <Form.Control type="password" required placeholder="Password" required name="userPassword" onChange={this.passwordChangeHandler} />
                                </Form.Group>

                                <Form.Group controlId="formGridAddress1">
                                    <Row>
                                        <Col>
                                            <Form.Control placeholder="City" onChange={this.cityChangeHandler} />
                                        </Col>
                                        <Col>
                                            <Form.Control placeholder="Zip Code" onChange={this.zipcodeChangeHandler} />
                                        </Col>
                                        <Col>
                                            <Form.Control placeholder="State" onChange={this.stateChangeHandler} />
                                        </Col>
                                    </Row>
                                </Form.Group>
                                <p class="text-danger">{this.state.message}</p>

                                <Button variant="primary" type="submit" onClick={this.submitSignUp}>
                                    Create your account
                            </Button>

                            </Form>
                            <br></br>
                        </center>
                    </Card>
                </center>
            </div>
        )
    }
}

export default Signup