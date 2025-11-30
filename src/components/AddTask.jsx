import { useState, useEffect } from "react";
import { useDispatchContext } from "../App";
import { useNavigate } from "react-router-dom";

export default function AddTask()
{   
    const dispatch = useDispatchContext();
    const navigate = useNavigate();

    const today = new Date();
    const [status, setStatus] = useState(null)
    const [form, setForm] = useState({
        task : "",
        duration : "",
        date : `${String(today.getFullYear()).padStart(2, 0)}-${String(today.getMonth() + 1).padStart(2, 0)}-${String(today.getDate()).padStart(2, 0)}`

    })

    function handleSubmit(event)
    {
        event.preventDefault();

        dispatch({
            type : "Add",
            payload : form
        })

        setForm({
            task : "",
            duration : "",
            date : `${String(today.getFullYear()).padStart(2, 0)}-${String(today.getMonth() + 1).padStart(2, 0)}-${String(today.getDate()).padStart(2, 0)}`
        })

        navigate("/")
    }

    function handleChange(event)
    {
        const {name, value} = event.target;

        if (name !== "date")
        {
            setForm({
                ...form,
                [name] : value
            })
            return;
        }

        const inputDate = new Date(value)

        if (inputDate > today)
        {
            setForm(
                {...form, [name] :value}
            )
            return;
        }

        else if (inputDate.getFullYear() === today.getFullYear() && inputDate.getMonth() === today.getMonth() && inputDate.getDate() === today.getDate())
        {
            setForm(
                {...form, [name] : value}
            )
            return;
        }

        setStatus("error");
    }

    // inside component
    useEffect(() => {
        if (form.task && form.duration && form.date) {
            setStatus("Ready");
        } else {
            setStatus(null); // optional, reset when form is incomplete
        }
    }, [form]);

    return(
        <div className="absolute top-[50%] left-[50%] translate-[-50%] w-[90%] max-w-[800px]">
            <h1 className="text-center text-3xl py-7 text-white">Add Task</h1>
            <form action="#" className="flex flex-col items-end" onSubmit={handleSubmit}>
                <div className="flex flex-col gap-1 mb-3 w-full">
                    <label className="text-xl text-white" htmlFor="task">Task</label>
                    <input onChange={(e) => handleChange(e)} value={form.task} className="bg-[#2B2F31] outline-none border-none p-2 rounded-md text-white" type="text" name="task" id="task" placeholder="Eg. Study React" />
                </div>

                <div className="flex flex-col gap-1 mb-3 w-full">
                    <label className="text-xl text-white" htmlFor="duration">Duration</label>
                    <input onChange={(e) => handleChange(e)} value={form.duration}  className="bg-[#2B2F31] outline-none border-none p-2 rounded-md text-white" type="number" name="duration" id="duration" min="1" placeholder="Duration" />
                </div>

                <div className="flex flex-col gap-1 mb-3 w-full">
                    <label className="text-white text-xl" htmlFor="date">Date</label>
                    <input onChange={(e) => handleChange(e)} value={form.date}  className="w-full bg-[#2B2F31] outline-none border-none p-2 rounded-md text-white" type="date" name="date" id="date" />
                </div>
                <button disabled={status !== "Ready"} className={`${status === "Ready"? "cursor-pointer bg-sky-300" : "cursor-not-allowed bg-teal-50"} hover:bg-sky-600 duration-300 py-0.5 hover:text-white font-mono  w-20 rounded-md`}>Add</button>
            </form>
            {
                status === "error" && 
                <p className="text-teal-100 text-xl pt-9">You can't add task for previous date.</p>
            }
        </div>
    )
}