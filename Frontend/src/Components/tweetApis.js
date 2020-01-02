import React, { Component } from 'react';
import {
    Card,
    CardImg,
    CardText,
    CardBody,
    CardTitle,
    CardSubtitle,
    CardLink
} from "reactstrap";

export const processTweetText = (tweetText) => {
    let hyperLinkExp = /http:\/\/[\w\.\/]*/g;
    let textArr = tweetText.split(' ');
    for (let i = 0; i < textArr.length; i++) {
        let text = textArr[i];
        let match = hyperLinkExp.exec(text);
        if (match) {
            let http = /http:\/\//g;
            text = text.replace(http, "") + " ";
            textArr[i] = <CardLink key={i} href={textArr[i]} target="_blank" className='blue' onClick={(evt) => { evt.stopPropagation(); }}>{text}</CardLink>
        } else {
            textArr[i] = textArr[i] + " ";
        }
    }
    return <CardText> {textArr} </CardText>;
}
export const getUserFullName = () => {
    //TODO : combine localstorage firstname + " "+ lastname
    return localStorage.getItem("firstname") + " " + localStorage.getItem("lastname");
    //return 'Keerthi Akella';
}
export const getUserName = () => {
    return localStorage.getItem("username");
    //return 'keerthi';
}
export const getPageSize = () => {
    return 10;
}


export const getMonthAndDate = (timeStamp) => {
    const monthsArr = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']
    timeStamp += "";
    let postedDate = new Date(timeStamp);
    let month = monthsArr[postedDate.getMonth()];
    let date = postedDate.getDate();
    return month + "  " + date;
}
export const TWEETCHARLIMIT = '280';