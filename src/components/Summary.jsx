import useTasks from "../custom/useTasks";
import { useTasksContext } from "../App";
import previous from "./../assets/previous.svg"
import next from "./../assets/next.svg"
import Task from "./Task";

export default function Summary()
{
    const {currentDate, hasPrevious, hasNext, handlePrevious, handleNext} = useTasks();

    const tasks = useTasksContext();

    const total = tasks.length;

    const success = tasks.filter(function(task)
    {
        return task.status === "Finished"
    }).length;

    const fail = tasks.filter(function(task)
    {
        return task.status === "Fail"
    }).length;

    const unfinished = tasks.filter(function(task)
    {
        return task.status === "Unfinished"
    }).length;

    // Getting the task for current date
    const currentTasks = tasks.filter(function(task)
    {
        return task.date === currentDate;
    })

    // Getting finished tasks for current Date 
    const finishedTasks = tasks.filter(function(task)
    {
        return task.status === "Finished"
    })

    // Getting unfinished tasks for curren DAte
    const unfinishedTasks = tasks.filter(function(task)
    {
        return task.staus === "Unfinished";
    })

    // Getting failes tasks for current Date
    const failedTasks = tasks.filter(function(task)
    {
        return task.status === "Fail";
    })

    const today = new Date();
    const todayString = `${String(today.getFullYear()).padStart(2, 0)}-${String(today.getMonth() + 1).padStart(2, 0)}-${String(today.getDate()).padStart(2, 0)}`

    return(
        <div className="w-[90%] max-w-[1000px] mx-auto mt-9">
            <div className="flex flex-wrap justify-between gap-5">
                <div className="bg-[#2B2F31] px-10 py-5 text-center text-white">
                    <h2 className="pb-2 text-xl">Total</h2> 
                    <span>{total}</span>
                </div>
                <div className="bg-[#2B2F31] px-10 py-5 text-center text-white">
                    <h2 className="pb-2 text-xl">Success</h2>
                    <span>{success}</span>
                </div>
                <div className="bg-[#2B2F31] px-10 py-5 text-center text-white">
                    <h2 className="pb-2 text-xl">Fail</h2>
                    <span>{fail}</span>
                </div>
                <div className="bg-[#2B2F31] px-10 py-5 text-center text-white">
                    <h2 className="pb-2 text-xl">Unfinished</h2>
                    <span>{unfinished}</span>
                </div>
            </div>
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
            <div className="pt-9">
                <h2 className="text-2xl text-white">Finished Tasks</h2>
                {
                    finishedTasks.length === 0?
                    <p className="text-lg text-white">None</p> :
                    finishedTasks.map(function(task)
                    {
                        return (
                            <Task 
                                key = {task.id}
                                {...task}
                            />
                        )
                    })
                    
                }
            </div>
            <div className="pt-9">
                <h2 className="text-2xl text-white">Remaining Tasks</h2>
                {
                    unfinishedTasks.length === 0?
                    <p className="text-lg text-white">None</p> :
                    unfinishedTasks.map(function(task)
                    {
                        return (
                            <Task 
                                key = {task.id}
                                {...task}
                            />
                        )
                    })
                    
                }
            </div>
            <div className="pt-9">
                <h2 className="text-2xl text-white">Failed Tasks</h2>
                {
                    failedTasks.length === 0?
                    <p className="text-lg text-white">None</p> :
                    failedTasks.map(function(task)
                    {
                        return (
                            <Task 
                                key = {task.id}
                                {...task}
                            />
                        )
                    })
                    
                }
            </div>
        </div>
    )
}