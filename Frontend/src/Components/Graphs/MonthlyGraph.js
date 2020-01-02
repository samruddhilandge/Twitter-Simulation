import React,{Component} from 'react';
import {Bar, Line, Pie} from 'react-chartjs-2';
import axios from 'axios';
import { identifier } from '@babel/types';
import { isDate } from 'util';
import config from '../../config/settings';
class MonthlyGraph extends Component{

    constructor(props){

        super(props);
        this.state={
            
             chartData:{}
        }
    }

    componentDidMount(){

        //var rooturl="localhost";
        axios.get('http://'+config.hostname+':3001/monthlyTweets')
        .then(response => {
        console.log("Status Code : ",response.status);
        if(response.status === 200){
        
            console.log("Response data:", response.data.graphData);

        }
        const result=response.data.graphData;
        const views=[];
        const usernames=[]
        for(let i=0;i<result.length;i++){

            usernames[i]=result[i].month+1;
            views[i]=result[i].count;
        }
        console.log("views:", views);
        console.log("usernames:", usernames);
        
        const chartData1={
            labels:usernames, 
            datasets:[{
                label:['Monthly Tweet'],
                data:views
            ,
            backgroundColor:[
               'rgba(255, 99, 132, 0.6)',
               'rgba(54, 162, 235, 0.6)',
               'rgba(255, 206, 86, 0.6)',
               'rgba(75, 192, 192, 0.6)',
               'rgba(153, 102, 255, 0.6)',
               'rgba(255, 159, 64, 0.6)',
               'rgba(105, 179, 64, 0.6)',
               'rgba(205, 159, 68, 0.6)',
               'rgba(200, 200, 64, 0.6)',
               'rgba(250, 200,185, 0.6)',
            
            ]
           }
       ]
        }
        this.setState({
            chartData:chartData1
        })
    
    });
    }

    static defaultProps={
        displayTitle:true,
        displayLegend:true,
        legendPosition:'bottom'
    }
    render(){

        return(
            <div classname="chart" style={{width:600}}>
                <Bar
                    height={500}
                    width={2000}
                    data={this.state.chartData}
                    options={{
                       maintainAspectRatio:false,
                        title:{
                            display:this.props.displayTitle,
                            text:"TWEETS PER MONTH",
                            fontSize:25,
                            fontFamily:"Lato"
                        },
                        legend:{
                            display:this.props.displayLegend,
                            position:this.props.legendPosition,
                            labels:{
                                fontColor:'#000'
                            }
                        }, 
                        layout:{
                            padding:{
                                left:50,
                                right:0
                            }
                            
                        },
                        scales: {
                            yAxes: [{
                                ticks: {
                                    beginAtZero: true
                                }
                            }],
                            xAxes: [{
                                barPercentage: 0.5
                            }]
                        }
                    }}
                    
                    />
            </div>
        );
    }

}

export default MonthlyGraph;