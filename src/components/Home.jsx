import useTasks from "../custom/useTasks";
import { useTasksContext } from "../App";

import previous from "./../assets/previous.svg"
import next from "./../assets/next.svg"

import Task from "./Task";

export default function Home()
{
    const { currentDate, hasNext, hasPrevious, handleNext, handlePrevious} = useTasks();
    const tasks = useTasksContext();

    // Getting all the task for the current Date
    const currentTasks = tasks.filter(function(task)
    {
        return task.date === currentDate;
    })

    if (currentTasks.length === 0)
    {
        return <p className="text-white text-3xl text-center mt-9">No Task for Today :(</p>
    }

    const today = new Date();
    const todayString = `${String(today.getFullYear()).padStart(2, 0)}-${String(today.getMonth() + 1).padStart(2, 0)}-${String(today.getDate()).padStart(2, 0)}`

    return(
        <div className="w-[90%] max-w-[860px] mx-auto">
            <div className="flex justify-between items-center mt-9">
                {
                    hasPrevious && 
                    <img onClick={handlePrevious} className="cursor-pointer" src={previous} alt="Previous" />
                }
                <h1 className="text-3xl text-white">{currentDate === todayString? "Today" : currentDate}</h1>
                {
                    hasNext && 
                    <img onClick={handleNext} className="cursor-pointer" src={next} alt="Next" />
                }
            </div>
            {
                currentTasks.map(function(currentTask)
                {
                    return(
                        <Task 
                            key = {currentTask.id}
                            {...currentTask}
                        />
                    )
                })
            }
        </div>
    )
}