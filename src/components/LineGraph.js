import React, {useState, useEffect} from 'react'
import {Line} from 'react-chartjs-2'
import numeral from "numeral"

const options ={
    legend:{
        display: false,
    },
    elements: {
        point: {
            radius: 0,
        },
    },
    maintainAspectRatio: false,
    tooltips:{
        mode: "index",
        intersect: false, 
        callbacks: {
            label: function (tooltipItem, data){
                return numeral(tooltipItem.value).format("+0,0");
            },
        },
    },
    scales: {
        xAxes: [
            {
                type:"time",
                time: {
                    format: "MM/DD/YY",
                    tooltipFormat:"ll",
                }
            },
        ],
        yAxes: [
            {
                gridlines: {
                    display:false,
                },
                ticks:{
                    callback: function (value, index, values) {
                        return numeral(value).format("0a");
                    },
                },             
            },
        ],
    },
}


//https://disease.sh/covid-19/historical/all?lastdays=120

function LineGraph({casesType = 'cases'}) {
    //state for chart data
    const [chartData, setChartData] = useState({});

    // set x to the data and y to the date's case delta
    //cases type set to deaths or recovered will render that data
    const formatChartData = (data, casesType='cases') =>{
        let chartData=[]
        let lastDataPoint; 
        for (let date in data.cases){
            if (lastDataPoint){
                const newDataPoint ={
                    x: date,
                    y:data[casesType][date] - lastDataPoint
                }
                chartData.push(newDataPoint)
            }
            lastDataPoint = data[casesType][date];
        }
        return chartData

    };
    
    useEffect(() => {
        const getData = async() =>{
            await fetch("https://disease.sh/v3/covid-19/historical/all?lastdays=120")
            .then(response => response.json())
            .then((data) =>{
                const chartData = formatChartData(data, 'cases');
                setChartData(chartData)
            })
        };
        getData()
    }, [casesType])


    return (
        <div className="lineGraph">
            {chartData?.length>0 && (
                <Line 
                options={options}
                data={{
                    datasets:[
                    {
                        data: chartData,
                        backgroundColor: "rgba(245, 209, 195,0.5)",
                        borderColor: "#FEB89F"
                    },],
                }} />
            )}
            
        </div>
    )
}

export default LineGraph
