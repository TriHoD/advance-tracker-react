import React from 'react';

const isIncome = Math.round(Math.random());

const InforCard = () => {
    return (
        <div elevation={3} style={{ textAlign: 'center', padding: '0 10%' }} >
            Try saying: <br />
            Add {isIncome ? 'Income ' : 'Expense '}
            for {isIncome ? '$100 ' : '$50 '}
            in Category {isIncome ? 'Salary ' : 'Bills '}
            on {isIncome ? 'Sunday ' : 'Monday '}
        </div>
    )
}

export default InforCard;
