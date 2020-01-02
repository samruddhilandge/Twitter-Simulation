
import React, { Component } from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

export class EditProfileForm extends Component {

    constructor(props) {
        super(props)

        this.state = {
            show: true,
            username: '',
            email: '',
            city: '',
            state: '',
            zipcode: '',
            firstName: '',
            lastName: '',
            description: '',
            profilePicture: '',
            isUser: true,
            updateDone: false,
            imageName:""
        }

        this.handleClose = this.handleClose.bind(this);
        this.handleSave = this.handleSave.bind(this);

        this.firstNameChangeHandler = this.firstNameChangeHandler.bind(this)
        this.lastNameChangeHandler = this.lastNameChangeHandler.bind(this)

        this.cityChangeHandler = this.cityChangeHandler.bind(this)
        this.stateChangeHandler = this.stateChangeHandler.bind(this)
        this.zipcodeChangeHandler = this.zipcodeChangeHandler.bind(this)
        this.descriptionChangeHandler = this.descriptionChangeHandler.bind(this)
    }

    componentDidMount = () => {
        this.setState({
            username: this.props.profileInfo.username,
            city: this.props.profileInfo.city,
            state: this.props.profileInfo.state,
            zipcode: this.props.profileInfo.zipcode,
            firstName: this.props.profileInfo.firstName,
            lastName: this.props.profileInfo.lastName,
            description: this.props.profileInfo.description,
            profilePicture: this.props.profileInfo.profilePicture,
        })
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

    stateChangeHandler = (e) => {
        this.setState({
            state: e.target.value
        })
    }
    cityChangeHandler = (e) => {
        this.setState({
            city: e.target.value
        })
    }
    zipcodeChangeHandler = (e) => {
        this.setState({
            zipcode: e.target.value
        })
    }

    descriptionChangeHandler = (e) => {
        this.setState({
            description: e.target.value
        })
    }
    handleClose = (e, closeCallback) => {
        this.setState({
            show: true,
        })
        //debugger;
        closeCallback();
    }

    handleSave = (e, saveCallback) => {
        console.log('Saving Profile Details -- In Modal');
        console.log(e);
        this.setState({
            show: false
        })
        
        saveCallback(this.state);
    }

    

    onFileChange(files) {
       // debugger;
        if (files == null || files.length == 0) return;
        let file = files[0];
       
        this.setState({
            profilePicture: file,
            imageName: file.name
        });
    }


    render() {
        console.log(this.props);
        let imageDiv = (<div className='buttons fadein'>
            <div className='button'>
                <label htmlFor='single'>
                    <img src={this.state.profilePicture} alt="Profile pic" height="40px" width="60px" ></img>
                </label>
                
                {/* <input type='file' id='single' name="selectedFile" onChange={this.onPicUpload} style={{ height: "0px", width: "0px" }} accept="image/x-png,image/gif,image/jpeg" /> */}
            </div>
        </div>);

        return (
            <div>
             
                <Modal show={this.state.show} id="modalId" onHide={(e) => {
                    this.handleClose(e, this.props.onClose);
                }}>
                    <Modal.Header closeButton>
                        <Modal.Title>Edit Profile</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group controlId='profileImage'>
                                <div className="image-upload">
                                  
                                    <label for="input-file">
                                        <i id="image" className="far fa-image fa-2x"></i>
                                    </label>
                                  
                                    <input id="input-file" className="hidden" type="file" onChange={(e) => this.onFileChange(e.target.files)} />
{this.state.imageName}
                                </div>
                            </Form.Group>
                            <Form.Group controlId="formName">
                                <Form.Label>First Name</Form.Label>
                                <Form.Control onChange={this.firstNameChangeHandler} defaultValue={this.state.firstName} type="text" placeholder="first name" />
                                <Form.Label>Last Name</Form.Label>
                                <Form.Control onChange={this.lastNameChangeHandler} defaultValue={this.state.lastName} type="text" placeholder="last name" />
                            </Form.Group>
                            <Form.Group controlId="formUserDesc">
                                <Form.Label>Bio</Form.Label>
                                <Form.Control onChange={this.descriptionChangeHandler} defaultValue={this.state.description} type="text" placeholder="bio" />
                            </Form.Group>

                            <Form.Group controlId="formUserCity">
                                <Form.Label>City</Form.Label>
                                <Form.Control onChange={this.cityChangeHandler} defaultValue={this.state.city} type="text" placeholder="city" />
                            </Form.Group>
                            <Form.Group controlId="formUserState">
                                <Form.Label>State</Form.Label>
                                <Form.Control onChange={this.stateChangeHandler} defaultValue={this.state.state} type="text" placeholder="state" />
                            </Form.Group>
                            <Form.Group controlId="formUserZipcode">
                                <Form.Label>Zip code</Form.Label>
                                <Form.Control onChange={this.zipcodeChangeHandler} defaultValue={this.state.zipcode} type="text" placeholder="zipcode" />
                            </Form.Group>




                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={(e) => {
                            this.handleClose(e, this.props.onClose);
                            window.$('modalId').modal('hide');
                        }} >Close </Button>
                        <Button type="submit" variant="primary" onClick={(e) => {
                            this.handleSave(e, this.props.onSave)
                        }}>Save</Button>
                    </Modal.Footer>
                </Modal>
            </div >
        )
    }
}

export default EditProfileForm
