import classNames from 'classnames/bind';
import Chart from 'chart.js/auto';

import styles from './charts.module.scss';
import { memo, useEffect, useRef } from 'react';
const cx = classNames.bind(styles);

function Charts({ data }) {
    let chart = useRef(null);

    useEffect(() => {
        if (data.length !== 0) {
            const timeNew = [];
            // eslint-disable-next-line array-callback-return
            data.hourly.time.map((item) => {
                const unixTimestemp = item;
                let dateUnixx = new Date(unixTimestemp * 1000);
                const optionss = {
                    timeZone: data.timezone,
                    hour: '2-digit',
                    minute: '2-digit',
                };

                const formatterr = new Intl.DateTimeFormat('FR', optionss);
                let sunset = formatterr.format(dateUnixx);
                let time = sunset.replace('PM', '');
                timeNew.push(time);
            });

            const precipitation = data.hourly.precipitation;
            const precipitation_probability =
                data.hourly.precipitation_probability;

            const canvas = document.querySelector('#canva').getContext('2d');
            if (chart.current != null) {
                chart.current.destroy();
            }
            chart.current = new Chart(canvas, {
                data: {
                    labels: timeNew.splice(0, 13),
                    datasets: [
                        {
                            type: 'line',
                            label: 'Lưu lượng mưa (mm)',
                            data: precipitation.map((item) => item),
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
                            label: 'Tỉ lệ có mưa (%)',
                            data: precipitation_probability.map((item) => item),
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
                            text: 'Khả năng có mưa và lưu lượng mưa',
                        },
                        tooltip: {
                            usePointStyle: true,
                            callbacks: {
                                labelPointStyle: function (context) {
                                    return {
                                        pointStyle: 'circle',
                                    };
                                },
                            },
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
