import { useState } from "react";
import { useTasksContext } from "../App";

export default function useTasks()
{
    const today = new Date();

    const tasks = useTasksContext();

    const todayString = `${String(today.getFullYear()).padStart(2, 0)}-${String(today.getMonth() + 1).padStart(2, 0)}-${String(today.getDate()).padStart(2, 0)}`

    const [currentDate, setCurrentDate] = useState(todayString);

    if (tasks.length === 0)
    {
        return({
            currentDate,
            hasNext : false,
            hasPrevious : false,
            handleNext : () => {},
            handlePrevious : () => {}
        })
    }

    // Getting a list of all dates from tasksarray
    let dates = tasks.map(function(task)
    {
        return task.date
    })

    // Addint currentDate to array to make it easier for us to check previous and next
    dates = [...dates, currentDate]
    
    // Making dates to be unique
    let uniqueDates = Array(...new Set(dates));

    // Converting uniqueDates to array of date object instead of string
    uniqueDates = uniqueDates.map(function(date)
    {
        return new Date(date);
    })

    // Sorting the uniqueDates
    uniqueDates.sort(function(date1, date2)
    {
        return date1 - date2
    })

    // Converthing uniquedDates array from object to string
    uniqueDates = uniqueDates.map(function(date)
    {
        return `${String(date.getFullYear()).padStart(2, 0)}-${String(date.getMonth() + 1).padStart(2, 0)}-${String(date.getDate()).padStart(2, 0)}`
    })

    let hasNext;
    let hasPrevious;

    // Get the index value of current Date
    const index = uniqueDates.indexOf(currentDate)

    hasNext = index < uniqueDates.length - 1;
    hasPrevious = index > 0;

    function handleNext()
    {
        setCurrentDate(uniqueDates[index + 1])
    }

    function handlePrevious()
    {
        setCurrentDate(uniqueDates[index - 1])
    }

    return({
        currentDate,
        hasNext : hasNext,
        hasPrevious : hasPrevious,
        handleNext : handleNext,
        handlePrevious : handlePrevious
    })
}