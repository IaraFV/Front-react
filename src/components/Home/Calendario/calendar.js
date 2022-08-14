import React from "react";
import { array } from "yup";

const monthNames = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];

const weekNames = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];


export function CalendarComponent() {
    const date = new Date();

    const dayWeek = date.getDay();
    const day = date.getDate();
    const year = date.getFullYear();
    const month = date.getMonth();
    const nameMonth = monthNames[month];
    const week = weekNames[dayWeek];

    const first = date.getDate() - date.getDate();

    function getWeeks() {
        const arrayWeeks = [];

        for(let i = 0; i<7; i++){
            let next = new Date(date.getTime())
            next.setDate(first + i);

            const nameWeek = weekNames[next.getDay()];
            arrayWeeks.push(nameWeek);
        }
        return arrayWeeks
    }

    function getNumber () {
        const numbersWeek = [];

        for(let i = 0; i < 7; i++){
            let next = new Date(date.getTime());
            next.setDate(first + i);

            const numbersWeek = next.getDate();
            numbersWeek.push(numbersWeek)
        }
        return numbersWeek
    }

    const weekDays = getWeeks();
    const numberDays = getNumber();
    
    return (

        <>
            <h1 className="title-calendar">{nameMonth}</h1>
            <h2 className="sub-title-calendar">{year}</h2>

            <ul className="list">
                <li className="list_item active">
                    <span>Dom</span>
                </li>
                
            </ul>
            <ul className="list">
                <li className="list_item">
                    <span>1</span>
                </li>
                
            </ul>
        </>

    )
}