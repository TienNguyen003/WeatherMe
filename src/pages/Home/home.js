import classNames from 'classnames/bind';
import SideBar from '../../component/Layouts/SideBar/sidebar';
import styles from './home.module.scss';

const cx = classNames.bind(styles);

function Home() {
    return (
        <div className={cx('weather')}>
            <SideBar></SideBar>
        </div>
    );
}

export default Home;
