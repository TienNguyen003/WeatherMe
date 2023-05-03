/* eslint-disable array-callback-return */
import classNames from 'classnames/bind';
import { memo, useEffect } from 'react';
import { Link } from 'react-router-dom';

import routesConfig from '../../../../config/routes';
import { result, resultData } from '../../getApi/Weather3Day/weather3';
import ButtonCustom from '../../Button/button';
import styles from './detailHourly.module.scss';

const cx = classNames.bind(styles);

function DetailHourly() {
    let results = [];
    if (result !== undefined) {
        results = result.slice(1, 5);
    }
    let resultDatas = resultData;
    let arr = [];
    let news = [];

    results.map((item) => {
        for (let i = 0; i < resultDatas.length - 1; i++) {
            if (
                resultDatas[i].dt_txt.slice(5, 10) ===
                    item.dt_txt.slice(5, 10) &&
                result[0].dt_txt.slice(5, 10) !==
                    resultDatas[i].dt_txt.slice(5, 10)
            ) {
                arr.push(resultDatas[i]);
            }
        }
    });

    useEffect(() => {
        const weathersTime = document.querySelector(
            '.detailHourly_weather-time__A9pTa',
        );
        const button = document.querySelectorAll('.Button_wrapper__C7Jgp');
        button.forEach((item) => {
            item.onclick = () => {
                for (let i = 0; i < button.length; i++) {
                    button[i].classList.remove('Button_primary__3Uq+s');
                }
                item.classList.add('Button_primary__3Uq+s');
                const span = item.querySelector('.Button_title__vlRey');
                arr.map((item) => {
                    if (item.dt_txt.slice(5, 10) === span.innerHTML) {
                        news.push(item);
                    }
                });
                let html = '';
                news.map((items) => {
                    let timeA = '';
                    let src = '';
                    if (
                        items.dt_txt.slice(10, 13) <= 18 &&
                        items.dt_txt.slice(10, 13) > 6
                    ) {
                        src = './image/1_2.png';
                    } else {
                        src = './image/6_1.png';
                    }
                    if (items.dt_txt.slice(10, 13) >= 12) {
                        timeA = 'pm';
                    } else {
                        timeA = 'am';
                    }
                    html += `
                        <div style="display: flex;justify-content: space-between;width: 650px;align-items: center;margin: 0 20px;padding: 10px;">
                            <p style="width: 160px;">${items.dt_txt.slice(
                                10,
                            )} ${timeA}</p>
                            <div style="display: flex;align-items: center">
                                <img style="width: 30px;height: 30px;" src=${src}>
                                <p style="width: 40px;margin-left: 5px">${Math.ceil(
                                    items.main.temp - 273.15,
                                )} °C</p>
                            </div>
                            <div style="display: flex;align-items: center">
                                <img style="width: 15px" src="./image/4_1.png"/>
                                <p style="width: 40px;margin-left: 5px">${
                                    items.main.humidity
                                } %</p>
                            </div>
                            <div style="display: flex;align-items: center">
                                <img style="width: 20px" src="./image/1_1.png"/>
                                <p style="width: 60px;margin-left: 5px">${
                                    items.clouds.all
                                } %</p>
                            </div>
                            <div style="display: flex;align-items: center">
                                <img style="width: 15px" src="./image/5_1.png"/>
                                <p style="width: 70px;margin-left: 5px">${
                                    items.wind.speed
                                } m/s</p>
                            </div>
                        </div>`;
                });
                weathersTime.innerHTML = html;
                // eslint-disable-next-line react-hooks/exhaustive-deps
                news = [];
            };
        });
    }, [arr, news]);

    return (
        <div>
            <div className={cx('button-all')}>
                {results.length !== 0 ? (
                    results.map((item, index) => {
                        return (
                            <ButtonCustom
                                key={index}
                                className={cx('button')}
                                children={item.dt_txt.slice(5, 10)}
                            />
                        );
                    })
                ) : (
                    <div>
                        <p className={cx('title')}>
                            Hãy quay lại trang chủ để xem chi tiết
                        </p>
                        <Link to={routesConfig.Home}>
                            <ButtonCustom
                                children={'Trang chủ'}
                                className={cx('button')}
                            />
                        </Link>
                    </div>
                )}
            </div>
            <div className={cx('weather-time')}></div>
        </div>
    );
}

export default memo(DetailHourly);
