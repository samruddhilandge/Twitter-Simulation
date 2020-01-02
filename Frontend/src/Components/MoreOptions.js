import React, { Component } from 'react'
import Dropdown from 'react-bootstrap/Dropdown'

export class MoreOptions extends Component {
    render() {
        return (
            <div>
                <Dropdown>
                    <Dropdown.Menu>
                        <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                        <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                        <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </div>
        )
    }
}

export default MoreOptions
