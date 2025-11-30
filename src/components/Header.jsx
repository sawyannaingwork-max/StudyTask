import { NavLink } from "react-router-dom";

export default function Header()
{
    return(
        <header className="bg-[#141617] shadow-sm px-5 py-5 shadow-white flex justify-between items-center">
            <h1 className="text-xl sm:text-3xl text-white">Study Tasks</h1>
            <nav>
                <ul className="flex gap-2 sm:gap-5">
                    <li className="text-sky-300"><NavLink to="/">Home</NavLink></li>
                    <li className="text-sky-300"><NavLink to="/add">Add Task</NavLink></li>
                    <li className="text-sky-300"><NavLink to="/summary">Summary</NavLink></li>
                </ul>
            </nav>
        </header>
    )
}