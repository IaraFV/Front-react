import React, { useState } from 'react';
import Calendar from 'react-calendar';
import './Calendario.css'


export function CalendarComponent() {
  const [value, onChange] = useState(new Date());

  return (
    <div>
      <Calendar onChange={onChange} value={value} />
    </div>
  );
}

