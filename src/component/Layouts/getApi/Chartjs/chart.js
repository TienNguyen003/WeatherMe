import classNames from 'classnames/bind';
import Chart from 'chart.js/auto';

import styles from './charts.module.scss';
import { memo, useEffect } from 'react';
const cx = classNames.bind(styles);

let chart = null;

function Charts({ data }) {
    useEffect(() => {
        if (data.length !== 0) {
            const canvas = document.querySelector('#canva').getContext('2d');
            if (chart != null) {
                chart.destroy();
            }
            chart = new Chart(canvas, {
                data: {
                    labels: data
                        .slice(2, 11)
                        .map((item) => item.dt_txt.slice(10, 16)),
                    datasets: [
                        {
                            type: 'bar',
                            label: 'City ​​temperature (°C)',
                            data: data.map((item) =>
                                Math.ceil(item.main.temp - 273.15),
                            ),
                            borderWidth: 1,
                            borderColor: [
                                'rgb(255, 99, 132)',
                                'rgb(255, 159, 64)',
                                'rgb(255, 205, 86)',
                                'rgb(75, 192, 192)',
                                'rgb(54, 162, 235)',
                                'rgb(153, 102, 255)',
                                'rgb(201, 203, 207)',
                            ],
                            backgroundColor: [
                                'rgba(255, 99, 132, 0.2)',
                                'rgba(255, 159, 64, 0.2)',
                                'rgba(255, 205, 86, 0.2)',
                                'rgba(75, 192, 192, 0.2)',
                                'rgba(54, 162, 235, 0.2)',
                                'rgba(153, 102, 255, 0.2)',
                                'rgba(201, 203, 207, 0.2)',
                            ],
                            color: '#000',
                        },
                        {
                            type: 'line',
                            label: 'City humidity (%)',
                            data: data.map((item) => item.main.humidity),
                            borderWidth: 1,
                            borderColor: [
                                'rgb(255, 99, 132)',
                                'rgb(255, 159, 64)',
                                'rgb(255, 205, 86)',
                                'rgb(75, 192, 192)',
                                'rgb(54, 162, 235)',
                                'rgb(153, 102, 255)',
                                'rgb(201, 203, 207)',
                            ],
                            backgroundColor: [
                                'rgba(255, 99, 132, 0.2)',
                                'rgba(255, 159, 64, 0.2)',
                                'rgba(255, 205, 86, 0.2)',
                                'rgba(75, 192, 192, 0.2)',
                                'rgba(54, 162, 235, 0.2)',
                                'rgba(153, 102, 255, 0.2)',
                                'rgba(201, 203, 207, 0.2)',
                            ],
                            color: '#000',
                        },
                    ],
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true,
                        },
                    },
                    interaction: {
                        mode: 'index',
                        intersect: false,
                    },
                    plugins: {
                        title: {
                            display: true,
                            text: 'Nhiệt độ và độ ẩm 24 giờ',
                        },
                        tooltip: {
                            enabled: true,
                            position: 'nearest',
                            usePointStyle: true,
                        },
                    },
                },
            });
        }
    }, [data]);

    return (
        <div className={cx('chart')}>
            <canvas id="canva"></canvas>
        </div>
    );
}

export default memo(Charts);
