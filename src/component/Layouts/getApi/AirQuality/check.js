/* eslint-disable react-hooks/exhaustive-deps */
import classNames from 'classnames/bind';
import { memo, useEffect, useRef } from 'react';
import styles from './airquality.module.scss';

const cx = classNames.bind(styles);

function CheckAqi({ aqi = 5, parent }) {
    const sendData = () => {
        if (notePeople.current === '') {
            notePeople.current =
                '“Hãy nhìn sâu vào thiên nhiên, bạn sẽ thấu hiểu mọi thứ rõ ràng hơn.”';
        }
        parent([notePeople.current]);
    };

    let state = useRef('');
    let des = useRef('');
    let notePeople = useRef('');
    let classCus = useRef('');

    useEffect(() => {
        sendData();
        if (aqi === 5) {
            classCus.current = 'red';
            state.current = 'Very Poor';
            des.current =
                'Có hại cho sức khỏe cho hầu hết mọi người. Mọi người đều có thể trải nghiệm ảnh hưởng sức khỏe. Nhóm cảm ứng có thể bị ảnh hưởng nặng nề hơn.';
            notePeople.current =
                '“Phần còn lại của thế giới (thiên nhiên) có thể tiếp tục sống mà không có chúng ta, nhưng chúng ta không thể tồn tại nếu thiếu đi chúng.”';
        }
        if (aqi === 4) {
            classCus.current = 'red';
            state.current = 'Poor';
            des.current =
                'Mọi người có thể bắt đầu bị ảnh hưởng sức khỏe; thành viên của các nhóm nhạy cảm có thể bị ảnh hưởng sức khỏe nghiêm trọng hơn.';
            notePeople.current =
                '“Chúng ta nên biết tôn trọng mọi sinh vật sống và thay thế bạo lực bằng sự bao dung, thấu hiểu và một tình yêu to lớn.”';
        }
        if (aqi === 3) {
            classCus.current = '';
            state.current = 'Normal';
            des.current =
                'Chất lượng không khí ở mức chấp nhận được. Tuy nhiên, một số chất gây ô nhiễm có thể ảnh hưởng đến sức khỏe của những người nhạy cảm với không khí bị ô nhiễm.';
            notePeople.current =
                '“Hãy nhìn sâu vào thiên nhiên, bạn sẽ thấu hiểu mọi thứ rõ ràng hơn.”';
        }
        if (aqi === 2) {
            classCus.current = 'green';
            state.current = 'Good';
            des.current =
                'Chất lượng không khí đạt tiêu chuẩn và ô nhiễm không khí được coi là ít hoặc không nguy hiểm.';
            notePeople.current =
                'Có một sự thật không thể chối bỏ rằng một nhóm nhỏ công dân có ý thức và tận tâm có thể thay đổi cả thế giới.”';
        }
        if (aqi === 1) {
            classCus.current = 'green';
            state.current = 'Good';
            des.current =
                'Chất lượng không khí đạt tiêu chuẩn và ô nhiễm không khí được coi là ít hoặc không nguy hiểm.';
            notePeople.current =
                '“Hãy nhớ rằng Trái Đất thích cảm nhận đôi chân trần và làn gió luôn thích chơi đùa với mái tóc của bạn.”';
        }
    }, [aqi]);

    return (
        <div className={cx('polluted-state')}>
            <div className={cx('aqi', classCus.current)}>
                <p>{state.current}</p>
            </div>
            <div className={cx('des-aqi')}>{des.current}</div>
        </div>
    );
}

export default memo(CheckAqi);
