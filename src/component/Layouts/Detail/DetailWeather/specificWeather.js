import classNames from 'classnames/bind';
import { useEffect, useState, useRef, memo } from 'react';
import { Ratio } from '../../../Icons/icon';

import { searchLat, searchLon } from '../../SideBar/sidebar';
import styles from './specific.module.scss';

const cx = classNames.bind(styles);

function Specific() {
    const [daily, setDaily] = useState([]);
    const [hourly, setHourly] = useState([]);
    const [hudimity, setHudimity] = useState();
    const [uv, setUV] = useState();
    const [wind10, setWin10] = useState();

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
            `https://api.open-meteo.com/v1/forecast?latitude=${lat.current}&longitude=${lon.current}&hourly=temperature_2m,dewpoint_2m,cloudcover,visibility&daily=sunrise,sunset,precipitation_sum&timeformat=unixtime&forecast_days=1&timezone=Asia%2FBangkok`,
        )
            .then((res) => res.json())
            .then((data) => {
                setDaily([data.daily]);
                setHourly([data.hourly]);
            });
        fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${lat.current}&longitude=${lon.current}&hourly=relativehumidity_2m,windspeed_10m,uv_index&windspeed_unit=ms&forecast_days=1`,
        )
            .then((res) => res.json())
            .then((data) => {
                setHudimity(data.hourly.relativehumidity_2m[23]);
                setUV(data.hourly.uv_index[23]);
                setWin10(data.hourly.windspeed_10m[23]);
            });
    }, []);

    function convertTime(time) {
        const unixTimestemp = time;
        let sun;
        let dateUnixx = new Date(unixTimestemp * 1000);
        const optionss = {
            timeZone: 'Asia/Bangkok',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
        };

        const formatterr = new Intl.DateTimeFormat('JP', optionss);
        // eslint-disable-next-line no-unused-vars
        return (sun = formatterr.format(dateUnixx));
    }

    return (
        <div className={cx('all')}>
            {daily.map((item, index) => {
                return (
                    <div key={index} className={cx('info')}>
                        <div className={cx('info-weather')}>
                            <div className={cx('riseset')}>
                                <div className={cx('rise')}>
                                    <p>Sunrise</p>
                                    <img
                                        src="image/rise.jpg"
                                        alt=""
                                        className={cx('image')}
                                    />
                                    <p className={cx('time')}>
                                        {convertTime(item.sunrise)}
                                    </p>
                                </div>
                                <div className={cx('set')}>
                                    <p>Sunset</p>
                                    <img
                                        src="image/set.png"
                                        alt=""
                                        className={cx('image')}
                                    />
                                    <p className={cx('time')}>
                                        {convertTime(item.sunset)}
                                    </p>
                                </div>
                            </div>
                            <div className={cx('rain')}>
                                <div className={cx('sum-rain')}>
                                    <p className={cx('pre-rain')}>
                                        Tổng lượng mưa: {item.precipitation_sum}
                                        mm
                                    </p>
                                </div>
                                <div className={cx('deatil-weather')}>
                                    {hourly.map((item, index) => {
                                        return (
                                            <div
                                                className={cx('weather')}
                                                key={index}
                                            >
                                                <p className={cx('right')}>
                                                    Nhiệt độ:{' '}
                                                    {Math.ceil(
                                                        item.temperature_2m[0],
                                                    )}
                                                    °C
                                                </p>
                                                <p className={cx('left')}>
                                                    Điểm sương:{' '}
                                                    {item.dewpoint_2m[0]}°C
                                                </p>
                                                <p
                                                    title="che phủ"
                                                    className={cx('right')}
                                                >
                                                    Mây: {item.cloudcover[0]}%
                                                </p>
                                                <p className={cx('left')}>
                                                    Tầm nhìn:{' '}
                                                    {item.visibility[0]}m
                                                </p>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                        <div className={cx('ratio')}>
                            <p className={cx('text')}>Độ ẩm, Chỉ số UV, Gió</p>
                            <div className={cx('ratio-1')}>
                                <Ratio
                                    percent={hudimity}
                                    className={cx('ratio-item')}
                                    classChildren={cx('circle-bg')}
                                    classPercent={cx('circle')}
                                    classText={cx('percentage')}
                                    text={hudimity + '%'}
                                />
                                <Ratio
                                    percent={hudimity}
                                    className={cx('ratio-item')}
                                    classChildren={cx('circle-bg')}
                                    classPercent={cx('circle')}
                                    classText={cx('percentage')}
                                    text={hudimity + '%'}
                                />
                            </div>
                            <div className={cx('ratio-2')}>
                                <Ratio
                                    percent={uv}
                                    className={cx('ratio-item')}
                                    classChildren={cx('circle-bg')}
                                    classPercent={cx('circle')}
                                    classText={cx('percentage')}
                                    text={uv + ' UV'}
                                />
                                <Ratio
                                    percent={wind10}
                                    className={cx('ratio-item')}
                                    classChildren={cx('circle-bg')}
                                    classPercent={cx('circle')}
                                    classText={cx('percentage')}
                                    text={wind10 + 'm/s'}
                                />
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

export default memo(Specific);
