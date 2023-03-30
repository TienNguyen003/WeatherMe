/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable array-callback-return */
import classNames from 'classnames/bind';
import { memo } from 'react';
import ImageIcon from './ImageIcon/imageIcon';

import styles from './weather.module.scss';

const cx = classNames.bind(styles);

function WeatherCurrent({ data }) {
    let check = data.cod;
    if (Object.keys(data).length !== 0 && check === 200) {
        const name = data.name;
        const temp = Math.ceil(data.main.temp);
        const tempmin = Math.ceil(data.main.temp_min);
        const tempmax = Math.ceil(data.main.temp_max);

        let weather;
        data.weather.map((item) => {
            weather = item.main;
        });
        const feelslike = Math.ceil(data.main.feels_like);
        const wind = data.wind.speed;
        const visibility = data.visibility;
        const humidity = data.main.humidity;

        // time current
        const date = new Date();
        const hour = date.getHours();
        const minute = date.getMinutes();
        let pa = 'AM';
        hour > 12 ? (pa = 'PM') : (pa = 'AM');
        let upTime = hour + ':' + minute + ' ' + pa;

        // convert time unix
        const location = data.coord.lon;
        let country = 'America';
        let countryCode = data.sys.country;
        let capital = 'New_York';
        let langue = 'en-US';
        if (location >= -150 && location < -75) {
            country = 'America';
            capital = 'New_York';
            langue = 'en-' + countryCode;
        }
        if (location >= 94 && location < 140) {
            country = 'Asia';
            if (data.name) {
                if (data.sys.country === 'VN') {
                    capital = 'Ho_Chi_Minh';
                } else {
                    capital = data.name;
                }
            }
            langue = 'en-' + countryCode;
        }
        if (location >= -74 && location < -9) {
            country = 'Africa';
            capital = 'Blantyre';
            langue = 'en-' + countryCode;
        }
        if (location >= -8 && location < 94) {
            country = 'Europe';
            capital = 'London';
            langue = 'en-' + countryCode;
        }
        if (location >= 140 && location < 160) {
            country = 'Australia';
            capital = 'Adelaide';
            langue = 'en-' + countryCode;
        }
        const unixTimestamp = data.sys.sunrise;
        let dateUnix = new Date(unixTimestamp * 1000);
        const options = {
            timeZone: country + '/' + capital,
            hour: '2-digit',
            minute: '2-digit',
        };
        const formatter = new Intl.DateTimeFormat(langue, options);
        let sunrise = formatter.format(dateUnix);
        sunrise = sunrise.replace('AM', '');

        const unixTimestemp = data.sys.sunset;
        let dateUnixx = new Date(unixTimestemp * 1000);
        const optionss = {
            timeZone: country + '/' + capital,
            hour: '2-digit',
            minute: '2-digit',
        };

        const formatterr = new Intl.DateTimeFormat(langue, optionss);
        let sunset = formatterr.format(dateUnixx);
        sunset = sunset.replace('PM', '');

        return (
            <div className={cx('info-detail')}>
                <div className={cx('name')}>{name}</div>
                <div className={cx('temps')}>
                    <ImageIcon hour={hour} temp={temp} weather={weather} />
                    <h1 className={cx('temp')}>{temp} </h1>
                    <p className={cx('sign')}>°C</p>
                    <div className={cx('des')}>
                        <p className={cx('decription')}>{weather}</p>
                        <p className={cx('feels-temp')}>
                            Feelslike {feelslike} °
                        </p>
                    </div>
                </div>
                <div className={cx('time-user')}>Updated as of {upTime}</div>
                <div className={cx('describe')}>
                    <div className={cx('min-max')}>
                        <img
                            className={cx('img-icon')}
                            src="https://thoitiet.app/assets/images/icon-1/temperature.svg"
                        />
                        <p>Min/Max</p>
                        <p className={cx('wind')}>
                            {tempmin}°/{tempmax}°
                        </p>
                    </div>
                    <div className={cx('wind-info')}>
                        <img
                            className={cx('img-icon')}
                            src="https://thoitiet.app/assets/images/icon-1/ph-wind.svg"
                        />
                        <p>Wind</p>
                        <p className={cx('wind')}>{wind} m/s</p>
                    </div>
                    <div className={cx('visibi-info')}>
                        <img
                            src="https://thoitiet.app/assets/images/icon-1/clarity-eye-line.svg"
                            className={cx('img-icon')}
                        />
                        <p>Visibility</p>
                        <p className={cx('visibility')}>{visibility} m</p>
                    </div>
                    <div className={cx('humidity-info')}>
                        <img
                            src="https://thoitiet.app/assets/images/icon-1/humidity-xl.svg"
                            className={cx('img-icon')}
                        />
                        <p>Humidity</p>
                        <p className={cx('humidity')}>{humidity} %</p>
                    </div>
                    <div className={cx('sun')}>
                        <img
                            className={cx('img-icon')}
                            src="https://thoitiet.app/assets/images/icon-1/dawn.svg"
                        />
                        <p className={cx('sunrise')}>Sunrise/Sunset</p>
                        <p className={cx('sunrise')}>
                            {sunrise}/{sunset}
                        </p>
                    </div>
                </div>
            </div>
        );
    }
}

export default memo(WeatherCurrent);
