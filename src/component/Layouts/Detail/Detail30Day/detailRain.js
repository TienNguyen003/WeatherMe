import classNames from 'classnames/bind';
import { memo, useEffect, useRef, useState } from 'react';

import Chart from '../../getApi/Chartjs/chartRain';
import { searchLat, searchLon } from '../../SideBar/sidebar';
import styles from './detail.module.scss';

const cx = classNames.bind(styles);

function DetailRain() {
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
            `https://api.open-meteo.com/v1/forecast?latitude=${lat.current}&longitude=${lon.current}&hourly=precipitation_probability,precipitation&current_weather=true&timeformat=unixtime&forecast_days=1&timezone=Asia%2FBangkok`,
        )
            .then((res) => res.json())
            .then((data) => {
                setResult(data);
            });
    }, [lat, lon]);

    return (
        <div className={cx('detail')}>
            <Chart data={result} />
        </div>
    );
}

export default memo(DetailRain);
