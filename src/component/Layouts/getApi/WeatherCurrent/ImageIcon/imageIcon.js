/* eslint-disable react-hooks/exhaustive-deps */
import classNames from 'classnames/bind';
import styles from './image.module.scss';

const cx = classNames.bind(styles);

function ImageIcon({ hour = 10, weather, temp, className }) {
    let src = '';
    if (hour <= 18 && hour >= 6) {
        if (temp > 15) {
            if (weather.includes('Clouds') || weather.includes('clouds')) {
                src = './image/1_4.png';
            }
            if (weather.includes('Clear') || weather.includes('clear')) {
                src = './image/1_2.png';
            }
            if (weather.includes('rain') || weather.includes('Rain')) {
                src = './image/2_4.png';
            }
        } else {
            src = './image/6_3.png';
        }
    } else {
        if (weather.includes('rain') || weather.includes('Rain')) {
            src = './image/6_2.png';
        } else {
            src = './image/6_1.png';
        }
    }

    return <img src={src} alt="" className={cx('image', className)} />;
}

export default ImageIcon;
