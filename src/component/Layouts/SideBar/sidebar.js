/* eslint-disable eqeqeq */
/* eslint-disable array-callback-return */
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import routesConfig from '../../../config/routes';
import { SearchIcon, SunIcon } from '../../Icons/icon';
import ButtonCustom from '../Button/button';
import AirQuality from '../getApi/AirQuality/airQuality';
import Charts from '../getApi/Chartjs/chart';
import ForecastWeather from '../getApi/ForecastWeather/forecastWeather';
import WeatherThree from '../getApi/Weather3Day/weather3';
import WeatherCurrent from '../getApi/WeatherCurrent/weatherCurrent';
import Debounce from './debounce.js';
import styles from './sidebar.module.scss';

const cx = classNames.bind(styles);
export let searchLat;
export let searchLon;

function SideBar() {
    const [input, setInput] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    const [data, setData] = useState({});
    const [data3day, setData3day] = useState([]);
    const [resultForecast, setResultForecast] = useState([]);
    const [lat, setLat] = useState(21.0245);
    const [lon, setLon] = useState(105.8412);

    let debounce = Debounce(input, 1000);

    if (input === '') {
        debounce = 'Ha Noi';
    }
    useEffect(() => {
        if (!debounce.trim()) {
            setSearchResult([]);
        } else {
            fetch(
                `https://api.openweathermap.org/data/2.5/weather?q=${debounce}&units=metric&appid=d78fd1588e1b7c0c2813576ba183a667`,
            )
                .then((res) => res.json())
                .then((data) => {
                    // eslint-disable-next-line react-hooks/exhaustive-deps
                    data.cod === 200 ? setData(data) : (debounce = 'Ha Noi');
                });
            fetch(
                `https://api.openweathermap.org/data/2.5/forecast?q=${debounce}&appid=d78fd1588e1b7c0c2813576ba183a667`,
            )
                .then((res) => res.json())
                .then((data) => {
                    data.cod === '200'
                        ? setResultForecast(data.list)
                        : (debounce = 'Ha Noi');
                });
            fetch(
                `https://api.openweathermap.org/data/2.5/forecast?q=${debounce}&appid=d78fd1588e1b7c0c2813576ba183a667`,
            )
                .then((res) => res.json())
                .then((data) => {
                    if (data.cod === '200') {
                        setData3day(data.list);
                        setLat(data.city.coord.lat);
                        setLon(data.city.coord.lon);
                        searchLat = data.city.coord.lat;
                        searchLon = data.city.coord.lon;
                    }
                });
        }
    }, [debounce]);

    function handleInputSearch(e) {
        const searchValue = e.target.value;
        if (searchValue == false) {
            setInput(searchValue.trim());
        } else {
            setInput(searchValue);
        }
    }

    return (
        <div className={cx('sidebar')}>
            <div className={cx('header-sidebar')}>
                <Link to={routesConfig.Home} className={cx('info')}>
                    <SunIcon width="4rem" height="4rem" />
                    <p className={cx('name-logo')}>Weather</p>
                </Link>
                <div className={cx('search')}>
                    <input
                        type="text"
                        value={input}
                        placeholder="Search"
                        className={cx('input-search')}
                        onChange={(e) => {
                            setInput(e.target.value);
                            handleInputSearch(e);
                        }}
                    />
                    <button className={cx('icon-search')}>
                        <SearchIcon />
                    </button>
                </div>
            </div>
            <>{searchResult}</>
            <h3 className={cx('current-time')}>Thời tiết hiện tại</h3>
            <div className={cx('detail')}>
                <WeatherCurrent data={data} />
                <WeatherThree data={data3day} />
            </div>
            <h3 className={cx('forecast-name')}>Thời tiết 24 giờ tới</h3>
            <div className={cx('forecast')}>
                <div className={cx('temp-24')}>
                    <ForecastWeather data={resultForecast} />
                    <Charts data={resultForecast} />
                </div>
                <div className={cx('detail-weather')}>
                    <AirQuality lat={lat} lon={lon} />
                    <Link
                        to={routesConfig.Detail}
                        className={cx('see-more')}
                        debounce={debounce}
                    >
                        <ButtonCustom outline large className={cx('button')}>
                            Chi tiết
                        </ButtonCustom>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default SideBar;

//http://dataservice.accuweather.com/locations/v1/topcities/50?apikey=tGR21ALdZzc1GhhDW5yGT60F7e2l2GZF (50 city)
