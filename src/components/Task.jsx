import { useState } from "react";
import { useNavigate } from "react-router-dom";
import check from "./../assets/check.png"
import uncheck from "./../assets/uncheck.svg"
import { useDispatchContext } from "../App";

export default function Task({id, task, date, status, duration})
{
    const navigate = useNavigate();

    const [isEdit, setIsEdit] = useState(false);
    const [form, setForm] = useState({
        task,
        duration
    })

    const dispatch = useDispatchContext();

    function handleChange(event)
    {
        const {name, value} = event.target;

        setForm({...form, [name] : value})
    }

    function handleDiscard()
    {
        setForm({task, duration});
        setIsEdit(false);
    }

    function handleSave()
    {
        if (!form.task)
        {
            return;
        }

        dispatch({
            type : "Edit",
            id : id,
            task : form.task,
            duration : form.duration
        })

        setIsEdit(false);
    }

    function handleStart(id)
    {
        navigate("/start", {
            state : id
        })
    }

    const today = new Date();
    const todayString = `${String(today.getFullYear()).padStart(2, 0)}-${String(today.getMonth() + 1).padStart(2, 0)}-${String(today.getDate()).padStart(2, 0)}`

    return(
        <section className={`flex justify-between flex-wrap gap-y-3 items-center px-4 py-2 rounded-md mt-5 ${status === "Fail"? "bg-red-400" : "bg-[#2B2F31]"}`}>
            <div className="flex gap-2">
                <img src={status === "Unfinished" || status === "Fail"? uncheck : check} alt="Icon" />
                {
                    isEdit ?
                    <input className="border-2 border-white px-2 text-white rounded-md" type="text" name="task" id="task" value={form.task} onChange={(handleChange)} /> : 
                    <p className="text-lg text-white">{task}</p> 
                    
                }
                {
                    isEdit ? 
                    <input className="border-2 border-white px-2 text-white rounded-md" type="number" name="duration" id="duration" value={form.duration} onChange={handleChange} />:
                    <p className="text-lg text-white">
                        ({duration} Hours)
                    </p>
                }
                
            </div>

           {
                date === todayString && 
                 <div>
                    {
                        isEdit && 
                        <div className="flex gap-2">
                            <button onClick={handleSave} className="cursor-pointer bg-sky-300 w-20 rounded-md font-mono">Save</button>
                            <button onClick={handleDiscard} className="cursor-pointer bg-sky-200 w-20 rounded-md font-mono">Discard</button>
                        </div>
                    }
                    {
                        !isEdit && 

                        <div className="flex gap-2">
                            {
                                status === "Unfinished" &&
                                <>
                                    <button onClick={() => handleStart(id)} className="cursor-pointer bg-sky-300 w-20 rounded-md font-mono">Start</button>
                                    <button onClick={() => setIsEdit(true)} className="cursor-pointer bg-sky-200 w-20 rounded-md font-mono">Edit</button>
                                </>
                            }
                            
                        </div>
                    }
                    
                </div>
           }
        </section>
    )
}