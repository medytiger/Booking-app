import React, { useState } from 'react';
import { DateRangePicker } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import format from 'date-fns/format';
import { startOfDay, endOfDay } from 'date-fns';

export default function CalendarPicker() {
    const [selectedRange, setSelectedRange] = useState(null);
    const [focusedInput, setFocusedInput] = useState(null);

    const theme = createTheme({
        palette: {
            primary: {
                main: '#3f51b5', // Couleur primaire
            },
            secondary: {
                main: '#f50057', // Couleur secondaire
            },
        },
        typography: {
            fontFamily: 'Arial, sans-serif', // Police de caractères
            fontSize: 14, // Taille de police de base
        },
        overrides: {
            MuiButton: {
                root: {
                    textTransform: 'none', // Désactive la transformation du texte en majuscules
                },
            },
            // Autres surcharges de styles si nécessaire
        },
    });


    const handleRangeChange = ({ startDate, endDate }) => {
        setSelectedRange({ startDate, endDate });
    };

    let footer = <p>Please select a date range.</p>;
    if (selectedRange && selectedRange.startDate && selectedRange.endDate) {
        const formattedStartDate = format(selectedRange.startDate, 'dd/MM/yyyy');
        const formattedEndDate = format(selectedRange.endDate, 'dd/MM/yyyy');
        footer = (
            <p>
                You selected {formattedStartDate} to {formattedEndDate}.
            </p>
        );
    }

    return (
        <ThemeProvider theme={theme}>

            <div>
                <DateRangePicker
                    startDate={selectedRange && selectedRange.startDate}
                    endDate={selectedRange && selectedRange.endDate}
                    onDatesChange={handleRangeChange}
                    startDateId="start_date"
                    endDateId="end_date"
                    minimumNights={0}
                    focusedInput={focusedInput}
                    onFocusChange={(focusedInput) => setFocusedInput(focusedInput)}
                    displayFormat="dd/MM/yyyy"
                    isOutsideRange={(date) => date < startOfDay(new Date()) || date > endOfDay(new Date())}
                    renderCalendarInfo={() => <p>Select the start and end dates.</p>}
                    renderDayContents={(day) => <span>{day.format('D')}</span>}
                    renderMonthText={(month) => <span>{month.format('MMMM YYYY')}</span>}
                    daySize={40}
                    dayAriaLabelFormat="MMMM D, YYYY"
                />
                {footer}
            </div>

        </ThemeProvider>
    );
}
