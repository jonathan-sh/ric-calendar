import { Dayjs } from 'dayjs';
import Day, { DayInfo } from '../day';
import './index.css';

export interface MonthInfo {
    days: DayInfo[]
}

const getMonthName = (date: DayInfo): string | any => {
    if (!date) return '';
    const nameByNumber = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
    ];
    const base = date.value as Dayjs;
    return nameByNumber[base.month()];
}

const month = ({ days }: MonthInfo) => {

    const weekAdjust = [];
    const first = days[0].value;
    const last = days[days.length - 1];

    const firstDay = (typeof first === 'number' ? first : first?.day()) || 0;
    if (first !== 1) {
        for (let i = 1; i <= firstDay; i++) {
            weekAdjust.push(i)
        }
    }
    return (<div className='month'>

        <span>{getMonthName(last)}</span>
        <br></br>
        {
            ['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((value, index) => <Day key={index} weekDay={value} />)
        }
        {
            weekAdjust.map((_, index) => <Day key={index} />)
        }
        {
            days.map(({ value, isFreeDay, isPast }, index) => {
                return (
                    <Day
                        key={index}
                        value={value}
                        isFreeDay={isFreeDay}
                        isPast={isPast}
                    />
                )
            })
        }
        <br></br>
    </div>
    )
};


export default month;