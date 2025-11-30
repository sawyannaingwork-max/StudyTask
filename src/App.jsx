import { Routes, Route } from "react-router-dom"
import Home from "./components/Home"
import { createContext, useContext, useEffect, useReducer } from "react";
import AddTask from "./components/AddTask";
import TaskStart from "./components/TaskStart"
import Header from "./components/Header";
import Summary from "./components/Summary";

const tasksContext = createContext();
const dispatchContext = createContext();

export default function App()
{
    let tasks = localStorage.getItem("study tasks");

    if (tasks)
    {
        tasks = JSON.parse(tasks);

        const today = new Date();

        tasks = tasks.map(function(task)
        {
            const taskDate = new Date(task.date);

            if (today.getFullYear() === taskDate.getFullYear() && today.getMonth() === taskDate.getMonth() && today.getDate() === taskDate.getDate())
            {
                return task;
            }

            else if (taskDate < today)
            {
                return {...task, status : "Fail"}
            }

            else 
            {
                return task;
            }
        })
    }

    else 
    {
        tasks = [];
    }

    const [studyTasks, dispatch] = useReducer(reducer, tasks);

    function reducer(studyTasks, action)
    {
        switch(action.type){
            case "Add":
                return [...studyTasks, {...action.payload, status : "Unfinished", id : tasks.length + 1}]
            
            case "Edit":
                return studyTasks.map(function(task)
                {
                    if (task.id === action.id)
                    {
                        return {...task, task : action.task, duration : action.duration}
                    }

                    return task
                })
            
            case "Finished":
                return studyTasks.map(function(task)
                {
                    if (task.id === action.id)
                    {
                        return {...task, status : "Finished"}
                    }

                    return task;
                })
        }
    }

    useEffect(function()
    {
        localStorage.setItem("study tasks", JSON.stringify(studyTasks))
    }, [studyTasks])

    return (
        <tasksContext.Provider value={studyTasks}>
            <dispatchContext.Provider value={dispatch}>
                <Header />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/add" element={<AddTask />} />
                    <Route path="/start" element={<TaskStart />} />
                    <Route path="/summary" element={<Summary />} />
                </Routes>
            </dispatchContext.Provider>
        </tasksContext.Provider>
    )
}

export function useTasksContext()
{
    return useContext(tasksContext)
}

export function useDispatchContext()
{
    return useContext(dispatchContext)
}