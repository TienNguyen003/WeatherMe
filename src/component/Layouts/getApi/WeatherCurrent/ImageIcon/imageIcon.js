/* eslint-disable react-hooks/exhaustive-deps */
import classNames from 'classnames/bind';
import styles from './image.module.scss';

const cx = classNames.bind(styles);

function ImageIcon({ hour = 10, weather, temp, className }) {
    let src = '';
    if (hour <= 18 && hour >= 6) {
        if (temp > 15) {
            if (weather.includes('Clouds') || weather.includes('clouds')) {
                src = 'https://i.imgur.com/4p2LGLF.png';
            }
            if (weather.includes('Clear') || weather.includes('clear')) {
                src = 'https://i.imgur.com/seaIsmf.png';
            }
            if (weather.includes('rain') || weather.includes('Rain')) {
                src = 'https://i.imgur.com/v03wYFv.png';
            }
        } else {
            src = 'https://i.imgur.com/Joh4VzT.png';
        }
    } else {
        if (weather.includes('rain') || weather.includes('Rain')) {
            src = 'https://i.imgur.com/EoM4sQu.png';
        } else {
            src = 'https://i.imgur.com/7oMce65.png';
        }
    }

    return <img src={src} alt="" className={cx('image', className)} />;
}

export default ImageIcon;
