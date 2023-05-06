/* eslint-disable array-callback-return */
import classNames from 'classnames/bind';
import { memo, useEffect, useState } from 'react';

import styles from './weather.module.scss';

const cx = classNames.bind(styles);

function ForecastWeather({ data }) {
    const [resultAPI, setResultAPI] = useState([]);

    useEffect(() => {
        setResultAPI(data.slice(2, 11));
    }, [data]);

    return (
        <div className={cx('forecast')}>
            {resultAPI.map((item, index) => {
                return (
                    <div className={cx('forecast-five')} key={index}>
                        <div className={cx('forecast-time')}>
                            {item.dt_txt.slice(11, 16)} 
                            {item.dt_txt.slice(11, 13) >= 1 &&
                            item.dt_txt.slice(11, 13) <= 11 ? (
                                <p>am</p>
                            ) : (
                                <p> pm</p>
                            )}
                        </div>
                        <div className={cx('temp-detail')}>
                            {item.dt_txt.slice(11, 13) >= 6 &&
                            item.dt_txt.slice(11, 13) <= 18 ? (
                                <img
                                    className={cx('icon')}
                                    src="https://i.imgur.com/seaIsmf.png"
                                    alt="nang"
                                />
                            ) : (
                                <img
                                    className={cx('icon')}
                                    src="https://i.imgur.com/7oMce65.png"
                                    alt="toi"
                                />
                            )}
                            <div className={cx('temp')}>
                                {Math.floor(item.main.temp - 273.15)} °C
                            </div>
                        </div>
                        {item.weather.map((item, index) => {
                            return (
                                <p className={cx('description')} key={index}>
                                    {item.description}
                                </p>
                            );
                        })}
                        <div className={cx('energy')}>
                            <div className={cx('humidity')}>
                                <img
                                    src="https://thoitiet.app/assets/images/icon-1/humidity-xl.svg"
                                    alt="am"
                                    className={cx('icon-humidity')}
                                />
                                <p>{item.main.humidity} %</p>
                            </div>
                            <div className={cx('wind')}>
                                <img
                                    src="https://thoitiet.app/assets/images/icon-1/ph-wind.svg"
                                    alt="gio"
                                    className={cx('icon-wind')}
                                />
                                <p className={cx('wind')}>
                                    {item.wind.speed} m/s
                                </p>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

export default memo(ForecastWeather);
