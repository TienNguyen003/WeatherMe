/* eslint-disable array-callback-return */
import classNames from 'classnames/bind';
import { useEffect, useRef, useState } from 'react';

import { searchLat, searchLon } from '../../SideBar/sidebar';
import ImageIcon from '../WeatherCurrent/ImageIcon/imageIcon';
import styles from './weather16.module.scss';

const cx = classNames.bind(styles);

function Weather16Day() {
    const [result, setResult] = useState([]);

    let lat = useRef();
    let lon = useRef();
    if (searchLat === undefined) {
        lat.current = 21.0245;
        lon.current = 105.8412;
    } else {
        lat.current = searchLat;
        lon.current = searchLon;
    }

    useEffect(() => {
        fetch(
            `https://api.weatherbit.io/v2.0/forecast/daily?lat=${lat.current}&lon=${lon.current}&key=e1306917cbe54a83b9dd96751898801d`,
        )
            .then((res) => res.json())
            .then((data) => {
                setResult(data.data);
            });
    }, []);

    return (
        <div className={cx('result')}>
            {result.slice(1, 10).map((item, index) => {
                const date = new Date();
                const hour = date.getHours();
                return (
                    <div className={cx('result-item')} key={index}>
                        <p className={cx('date')}>
                            {item.datetime.slice(5, 10)}
                        </p>
                        <ImageIcon
                            hour={hour}
                            temp={item.temp}
                            weather={item.weather.description}
                            className={cx('image')}
                        />
                        <div className={cx('temp')}>
                            {Math.floor(item.temp)}°C{' '}
                            <p className={cx('temp-min')}>{Math.floor(item.app_min_temp)}°C</p>
                        </div>
                        <p className={cx('desc')}>{item.weather.description}</p>
                    </div>
                );
            })}
        </div>
    );
}

export default Weather16Day;
