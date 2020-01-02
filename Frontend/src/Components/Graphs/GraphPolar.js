import React,{Component} from 'react';
import { Polar} from 'react-chartjs-2';
import axios from 'axios';
class GraphPolar extends Component{


    constructor(props){

        super(props);
        this.state={
             chartData:{ }

        }
    }

   
    static defaultProps={
        displayTitle:true,
        displayLegend:true,
        legendPosition:'bottom'
    }
    render(){

        return(
            <div classname="chart" style={{width:700}}>
                <Polar
                    height={900}
                    width={900}
                    data={this.state.chartData}
                    options={{
                       maintainAspectRatio:false,
                        title:{
                            display:this.props.displayTitle,
                            text:"PROFILE VIEWS/DAY",
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
                            
                        }
                    }}
                    
                    />

            </div>
        );
    }

}

export default GraphPolar;