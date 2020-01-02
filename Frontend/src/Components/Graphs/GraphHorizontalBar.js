import React,{Component} from 'react';
import { HorizontalBar} from 'react-chartjs-2';
import axios from 'axios';
import config from '../../config/settings'

class GraphHorizontalBar extends Component{

    constructor(props){

        super(props);
        this.state={
             chartData:{
                 
             }

        }
    }

    componentDidMount(){

      //  var rooturl="localhost";
        axios.get('http://'+config.hostname+':3001/dailyTweets')
        .then(response => {
        console.log("Status Code : ",response.status);
        if(response.status === 200){
        
            console.log("Response data:", response.data.graphData);

        }
        const result=response.data.graphData;
        const views=[];
        const ids=[]
        for(let i=0;i<result.length;i++){

            ids[i]=result[i].day;
            views[i]=result[i].count;
        }
        console.log("daily tweet count:", views);
        console.log("ids:", ids);
        
        const chartData1={
            labels:['Day 1','Day 2','Day 3','Day 4','Day 5','Day 6','Day 7'], 
                 datasets:[{
                     label:['Daily tweets upto last 7 Days'],
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
            <div classname="chart" style={{width:800}}>
                <HorizontalBar
                    height={600}
                    width={900}
                    data={this.state.chartData}
                    options={{
                       maintainAspectRatio:false,
                        title:{
                            display:this.props.displayTitle,
                            text:"NUMBER OF TWEETS PER DAY",
                            fontSize:25
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
                            xAxes: [{
                                ticks: {
                                    beginAtZero: true
                                }
                            }]
                        },
                      
                    }}
                    
                    />

            </div>
        );
    }

}

export default GraphHorizontalBar;