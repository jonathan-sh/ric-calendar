import React from 'react';

import './index.css';
import { Dayjs } from 'dayjs';

export interface DayInfo {
    value?: Dayjs | undefined | number;
    weekDay?: string;
    isFreeDay?: boolean;
    isPast?: boolean;
}

const day = ({ value, isFreeDay = false, isPast = false, weekDay }: DayInfo) => {
    let style = 'day';
    if (isFreeDay) style += ' mark';
    if (isPast) style += ' past';
    if (!value) style += ' empty';
    let day: any = typeof value === 'number' ? value : value?.date();
    day = weekDay ? weekDay : day;
    return (
        <div className={style}>
            {day}
        </div>
    );
}

export default day;
