import React, { useState, useEffect } from 'react';
import { fetchDailyData } from '../../api';
import { Line, Bar } from 'react-chartjs-2';
import styles from './Chart.module.css';

const Chart = ({ data: { confirmed, recovered, deaths }, country }) => {
    let activeCases = 0;
    const [dailyData, setDailyData] = useState([]);
    useEffect(() => {
        const fetchAPi = async () => {
            setDailyData(await fetchDailyData());
        }
        fetchAPi();
        }, []);

    const lineChart = (
        dailyData.length ? (<Line
            data={{
                labels: dailyData.map(({ date }) => date),
                datasets: [
                    {
                        data: dailyData.map(({ confirmed }) => confirmed),
                        label: 'Infected',
                        borderColor: 'Red',
                        fill: true

                    },
                    {
                        data: dailyData.map(({ deaths }) => deaths),
                        label: 'Deaths',
                        borderColor: '#4a4948',
                        backgroundColor: 'rgba(74,73,72,0.5)',
                        fill: true
                    }],
            }} />) :
            null
    );
    if(confirmed) {
          activeCases =  confirmed.value - (recovered.value + deaths.value);
          console.log(activeCases);
      }
    const barChart = (
        confirmed ? (
            <Bar
                data={{
                    labels: ['Infected', 'Active','Recovered', 'Deaths'],
                    datasets: [
                        {
                            label: 'People',
                            backgroundColor: [
                                'rgba(255,0,0,0.5)',
                                'rgba(0,0,255,0.5)',
                                'rgba(0,255,0,0.5)',
                                'rgba(74, 73, 72,0.5)'
                            ],
                            data: [confirmed.value, activeCases, recovered.value, deaths.value ]
                        }
                    ]

                }}
                options={{
                    legend: { display: false },
                    title: { display: true, text: `Current State in ${country}` }
                }}

            />
        ) : null
    );


    return (
        <div className={styles.container}>
            {country ? barChart : lineChart }
        </div>
    )
}


export default Chart;