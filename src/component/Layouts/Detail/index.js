import classNames from 'classnames/bind';
import { memo, useRef } from 'react';

import Weather16Day from '../getApi/Weather16Day/weather16';
import DetailRain from './Detail30Day/detailRain';
import DetailHourly from './DetailHourly/detailHourly';
import Specific from './DetailWeather/specificWeather';
import styles from './index.module.scss';

const cx = classNames.bind(styles);

function DetailWeather() {
    const refAnimation = useRef();
    const refNone = useRef();

    const handleOnload = () => {
        setInterval(() => {
            refAnimation.current.classList.remove(
                'Detail_animation-bacground__Gwugo',
            );
            refNone.current.classList.remove('Detail_none__nptUZ');
        }, 2000);
    };

    return (
        <div
            className={cx('animation-bacground')}
            onLoad={handleOnload}
            ref={refAnimation}
        >
            <div className={cx('none')} ref={refNone}>
                <div className={cx('detail')}>
                    <DetailRain />
                    <Specific />
                </div>
                <div>
                    <h3 className={cx('title')}>
                        Dự báo thời tiết những ngày tới
                    </h3>
                    <Weather16Day />
                </div>
                <div>
                    <h3 className={cx('title')}>Xem chi tiết từng giờ</h3>
                    <DetailHourly />
                </div>
            </div>
        </div>
    );
}

export default memo(DetailWeather);
