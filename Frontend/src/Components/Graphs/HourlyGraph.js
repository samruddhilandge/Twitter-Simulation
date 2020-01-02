import React,{Component} from 'react';
import { Pie} from 'react-chartjs-2';
import axios from 'axios';
import config from '../../config/settings';
class HourlyGraph extends Component{
 
    constructor(props){

        super(props);
        this.state={
             chartData:{ }

        }
    }

    componentDidMount(){

        //var rooturl="localhost";
        axios.get('http://'+config.hostname+':3001/hourlyTweets')
        .then(response => {
        console.log("Status Code : ",response.status);
        if(response.status === 200){
        
            console.log("Response data:", response.data.graphData);

        }
        const result=response.data.graphData;
        const retweets=[];
      
        for(let i=0;i<result.length;i++){

    
            retweets[i]=result[i].count;
        }
        console.log("retweets:", retweets);
        
        
        const chartData1={
            labels:['9AM-10AM','10AM-11AM','11AM-12PM','1PM-2PM','2PM-3PM','3PM-4PM','4PM-5PM','5PM-6PM','6PM-7PM','7PM-8PM','8PM-9PM'], //tweets
            datasets:[{
                label:['Hourly Tweets'],
                data:
                   retweets 
                
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
               'rgba(54, 32, 25, 0.6)',
               'rgba(255, 206, 226, 0.6)',
               
            ],
            borderWidth:4,
            hoverBorderWidth:3,
            hoverBorderColor:"#000000"
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
        console.log('GraphPie') 
        return(
            <div classname="chart" style={{width:500}}>
                <Pie
                    height={500}
                    width={500}
                    data={this.state.chartData}
                    options={{
                       maintainAspectRatio:false,
                        title:{
                            display:this.props.displayTitle,
                            text:"HOURLY TWEETS GRAPH",
                            fontSize:25,
                            fontFamily:'lato'
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
                            
                        }
                    }}
                    
                    />

            </div>
        );
    }

}

export default HourlyGraph;