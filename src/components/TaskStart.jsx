import { useLocation, useNavigate } from "react-router-dom";
import { useTasksContext, useDispatchContext } from "../App";
import { useEffect, useState, useRef } from "react";

import pause from "./../assets/pause.svg"
import resume from "./../assets/resume.svg"

export default function HandleStart()
{
    let interval;
    let pauseInterval;
    const { state : id } = useLocation();
    const tasks = useTasksContext();
    const dispatch = useDispatchContext();

    // Getting the task of id 
    const currentTask = tasks.find(function(task)
    {
        return task.id === id;
    })

    const duration = currentTask.duration * 3600;

    const startTime = useRef(new Date());

    const pauseTime = useRef(0);

    const [timer, setTimer] = useState(function()
    {
        return new Date() - startTime.current - pauseTime.current;
    })

    // Calculating hour, minutes and seconds 
    let tempTimer = Math.round(timer / 1000);

    const hours = Math.floor(tempTimer / 3600) 
    tempTimer = tempTimer % 3600

    const minutes = Math.floor(tempTimer / 60);
    tempTimer = tempTimer % 60;

    const seconds = tempTimer

    useEffect(function()
    {
        if (timer >= duration * 1000)
        {
            clearInterval(interval);
            dispatch({type : "Finished", id : id});
            return;
        }

        interval = setInterval(function()
        {
            setTimer(new Date() - startTime.current)
        }, 1000)

        return () => clearInterval(interval)
    },[timer])

    function handlePause()
    {
        clearInterval(interval);

        pauseInterval = setInterval(function()
        {
            pauseTime.current += 1000;
        }, 1000)
    }

    function handleResume()
    {
        clearInterval(pauseInterval);

        setTimer(new Date() - startTime.current - pauseTime.current)
    }

    return(
        <div className="absolute top-[50%] translate-x-[-50%] translate-y-[-50%] left-[50%]">
            <h1 className="text-center text-white text-3xl pb-7">{currentTask.task}</h1>
            <div className="flex py-3">
                <div className="w-25 h-15 bg-[#2B2F31] flex justify-center items-center text-white border-2 border-sky-300 rounded-sm">{String(hours).padStart(2, 0)}</div>
                <div className="w-25 h-15 bg-[#2B2F31] flex justify-center items-center text-white border-2 border-sky-300 rounded-sm">{String(minutes).padStart(2, 0)}</div>
                <div className="w-25 h-15 bg-[#2B2F31] flex justify-center items-center text-white border-2 border-sky-300 rounded-sm">{String(seconds).padStart(2, 0)}</div>
            </div>
            <div className="flex gap-2 items-center justify-center">
                <div onClick={handlePause}  className="cursor-pointer bg-[#2B2F31] w-10 h-10 rounded-[50%] flex justify-center items-center">
                    <img className="w-4" src={pause} alt="Pause" />
                </div>
                <div onClick={handleResume} className=" cursor-pointer bg-[#2B2F31] w-10 h-10 rounded-[50%] flex justify-center items-center">
                    <img className="w-5" src={resume} alt="Resume" />
                </div>
            </div>
            {
                timer > duration * 1000 && 
                <p className="text-3xl text-white pt-7">Congraulations you finished the task.</p>
            }
        </div>
    )
}