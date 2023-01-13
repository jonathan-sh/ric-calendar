import React, { useEffect } from 'react';
import './App.css';
import { DayInfo } from './day';
import dayjs, { Dayjs } from 'dayjs';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import Month, { MonthInfo } from './month';

function App() {
  const params = new URLSearchParams(window.location.search);
  const s = params.get('s');
  let fromQuery;
  if (s) {
    const base = s.split('-');
    if (base.length > 1) {
      fromQuery = base[1] + '/' + base[0] + '/' + new Date().getFullYear();
    }
  }
  const [start, setStart] = React.useState<Dayjs | null>(
    dayjs(fromQuery),
  );

  const handleChange = (newValue: Dayjs | null) => {
    setStart(newValue);
  };


  const [months, setMonths] = React.useState<MonthInfo[]>([]);

  useEffect(() => {
    let counter = 0;
    let days = [];
    let months = [];
    let date: Dayjs | any = start;
    let month = start?.month();
    const currentDay = start?.date() || 0;
    for (let value = 1; value < currentDay; value++) {
      days.push({ isPast: true, value })
    }
    for (let i = 0; i <= 200; i++) {
      if (month !== date?.month()) {
        month = date?.month();
        months.push({ days });
        days = [];
      }

      const day: DayInfo = {
        value: date,
        isFreeDay: (counter === 4 || counter === 5)
      };
      days.push(day);
      counter++;
      date = date?.add(1, 'day');
      if (counter > 5) counter = 0;
    }
    setMonths([...months]);
  }, [start])

  return (
    <div className="App">
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <MobileDatePicker
          label="Set your first day of this shift"
          inputFormat="DD/MM/YYYY"
          value={start}
          onChange={handleChange}
          renderInput={(params) => <TextField {...params} />}
        />
      </LocalizationProvider>
      {
        months.map(({ days }, index) => {
          return (<Month
            key={index}
            days={days}
          />)
        })
      }
    </div>
  );
}

export default App;
