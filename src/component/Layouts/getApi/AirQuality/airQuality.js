import { memo, useEffect, useState } from 'react';
import classNames from 'classnames/bind';

import CheckAqi from './check';
import styles from './airquality.module.scss';

const cx = classNames.bind(styles);

function AirQuality({ lon, lat }) {
    const [result, setResult] = useState([]);
    const [message, setMessage] = useState('');

    useEffect(() => {
        fetch(
            `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=d78fd1588e1b7c0c2813576ba183a667`,
        )
            .then((res) => res.json())
            .then((data) => {
                setResult(data.list);
            });
    }, [lat, lon]);

    const callbackFunction = (childData) => {
        setMessage(childData);
    };

    return (
        <div className={cx('air-quality')}>
            <h3>Chất lượng không khí</h3>
            {result.map((item, index) => {
                return (
                    <div key={index} className={cx('info')}>
                        <div className={cx('quality')}>
                            <CheckAqi
                                aqi={item.main.aqi}
                                parent={callbackFunction}
                            />
                        </div>
                        <div className={cx('pollution')}>
                            <div>
                                <p className={cx('name-polu')}>CO</p>
                                <p>{item.components.co}</p>
                            </div>
                            <div>
                                <p className={cx('name-polu')}>
                                    NH<sub>3</sub>
                                </p>
                                <p>{item.components.nh3}</p>
                            </div>
                            <div>
                                <p className={cx('name-polu')}>NO</p>
                                <p>{item.components.no}</p>
                            </div>
                            <div>
                                <p className={cx('name-polu')}>
                                    NO<sub>2</sub>
                                </p>
                                <p>{item.components.no2}</p>
                            </div>
                        </div>
                        <div className={cx('pollution')}>
                            <div>
                                <p className={cx('name-polu')}>
                                    O<sub>3</sub>
                                </p>
                                <p>{item.components.o3}</p>
                            </div>
                            <div>
                                <p className={cx('name-polu')}>
                                    PM<sub>10</sub>
                                </p>
                                <p>{item.components.pm10}</p>
                            </div>
                            <div>
                                <p className={cx('name-polu')}>
                                    PM<sub>2.5</sub>
                                </p>
                                <p>{item.components.pm2_5}</p>
                            </div>
                            <div>
                                <p className={cx('name-polu')}>
                                    SO<sub>2</sub>
                                </p>
                                <p>{item.components.so2}</p>
                            </div>
                        </div>
                    </div>
                );
            })}
            <p className={cx('people')}>{message}</p>
        </div>
    );
}

export default memo(AirQuality);
