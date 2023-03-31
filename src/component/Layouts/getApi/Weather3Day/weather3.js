/* eslint-disable array-callback-return */
import classNames from 'classnames/bind';
import { memo } from 'react';
import ImageIcon from '../WeatherCurrent/ImageIcon/imageIcon';
import styles from './weather.module.scss';

const cx = classNames.bind(styles);
export let result;
export let resultData;

function WeatherThree({ data }) {
    let arr = [];
    const date = new Date();
    const hour = date.getHours();

    if (data.length !== 0) {
        result = [];
        resultData = data
        for (let i = 0; i < data.length - 1; i++) {
            if (
                data[i].dt_txt.slice(0, 10) !== data[i + 1].dt_txt.slice(0, 10)
            ) {
                arr.push(data[i]);
                result.push(data[i]);
            }
        }
    }
    arr = arr.slice(1, 4);

    return (
        <div className={cx('weather-sub')}>
            {arr.map((item, index) => {
                let tempCr = Math.floor(item.main.temp - 273.15);
                return (
                    <div key={index} className={cx('list-item')}>
                        <div className={cx('title')}>
                            {item.dt_txt.slice(0, 10)}
                        </div>
                        {item.weather.map((item, index) => {
                            return (
                                <ImageIcon
                                    className={cx('img')}
                                    weather={item.main}
                                    hour={hour}
                                    temp={tempCr}
                                    key={index}
                                />
                            );
                        })}
                        <div className={cx('desc')}>
                            <div className={cx('humiditys')}>
                                <img
                                    src="https://thoitiet.app/assets/images/icon-1/dewpoint.svg"
                                    alt="Dự báo lượng mưa"
                                    className={cx('img-icon')}
                                />
                                <span className={cx('humidity')}>
                                    {item.main.humidity}%
                                </span>
                            </div>
                            {item.weather.map((item) => {
                                return (
                                    <p
                                        key={item.id}
                                        className={cx('description')}
                                    >
                                        {item.description}
                                    </p>
                                );
                            })}
                            <div className={cx('temp')}>
                                <span>
                                    {Math.floor(item.main.temp_min - 273.15)}°
                                </span>{' '}
                                /{' '}
                                <span>
                                    {Math.floor(item.main.temp_max - 273.15)}°
                                </span>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

export default memo(WeatherThree);
