import React,{Component} from 'react';
import { Pie} from 'react-chartjs-2';
import axios from 'axios';
import config from '../../config/settings'

class GraphPie extends Component{

    constructor(props){

        super(props);
        this.state={
             chartData:{ }

        }
    }

    componentDidMount(){

       // var rooturl="localhost";
        axios.get('http://'+config.hostname+':3001/fetchRetweets')
        .then(response => {
        console.log("Status Code : ",response.status);
        if(response.status === 200){
        
            console.log("Response data:", response.data.graphData);

        }
        const result=response.data.graphData;
        const retweets=[];
        const usernames=[]
        for(let i=0;i<result.length;i++){

            usernames[i]=result[i].username;
            retweets[i]=result[i].length;
        }
        console.log("retweets:", retweets);
        console.log("usernames:", usernames);
        
        
        const chartData1={
            labels:usernames,
            datasets:[{
                label:['retweets'],
                data:
                   retweets  
                
            ,
            backgroundColor:[
               'rgba(255, 99, 132, 0.6)',
               'rgba(54, 162, 235, 0.6)',
               'rgba(255, 206, 86, 0.6)',
               'rgba(75, 192, 192, 0.6)',
               'rgba(153, 102, 255, 0.6)',
              
             
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
            <div classname="chart" style={{width:700}}>
                <Pie
                    height={500}
                    width={900}
                    data={this.state.chartData}
                    options={{
                       maintainAspectRatio:false,
                        title:{
                            display:this.props.displayTitle,
                            text:"TOP 5 TWEETS WITH MORE RETWEETS",
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

export default GraphPie;