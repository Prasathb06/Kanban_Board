import React, { useEffect, useState } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import { IoAdd } from "react-icons/io5";
import { TfiReload } from "react-icons/tfi";
import { FaCheck } from "react-icons/fa6";
import { RiProgress6Line } from "react-icons/ri";
import { PiArrowFatLineRightFill } from "react-icons/pi";
import { DragDropContext, Droppable } from "@hello-pangea/dnd";
import './Home.css'
import Cards from './Cards'
import TaskForm from './TaskForm';


const Home = () => {
    let [form, setForm] = useState(false)
    let [tasks, setTasks] = useState([])
    let [edit, setEdit] = useState(null)
    let [status, setStatus] = useState("")

    useEffect(() => {
        let newtask = JSON.parse(localStorage.getItem("tasks")) || []
        // local storage la irukura task get panni show panrathuku
        if (Array.isArray(newtask)) {
            setTasks(newtask)
        } else {
            setTasks([])
        }
    }, [])

    const handleDragEnd = (result) => {
        if (!result.destination) return;

        const { destination, draggableId } = result;

        const updatedTasks = tasks.map((task) => {
            if (task.id.toString() === draggableId) {

                if (destination.droppableId === "completed") {
                    return {
                        ...task,
                        status: destination.droppableId,
                        progress: 100
                    }
                }else if(destination.droppableId === "review"){
                    return{
                        ...task,
                        status: destination.droppableId,
                        progress : 75
                    }
                }else if(destination.droppableId === "inprogress"){
                    return{
                        ...task,
                        status: destination.droppableId,
                        progress : 50
                    }
                }
                else if(destination.droppableId === "todo"){
                    return{
                        ...task,
                        status: destination.droppableId,
                        progress : 25
                    }
                }

                return {
                    ...task,
                    status: destination.droppableId
                }
            }

            return task
        });

        setTasks(updatedTasks);
        localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    };

    const todoCount = tasks.filter(task => task.status === "todo").length
    const progressCount = tasks.filter(task => task.status === "inprogress").length
    const reviewCount = tasks.filter(task => task.status === "review").length
    const completedCount = tasks.filter(task => task.status === "completed").length

    return (
        <>
            <DragDropContext onDragEnd={handleDragEnd}>
                <div className="kanban-header">
                    <h1 className="kanban-title">Kanban Task Board</h1>
                </div>
                <div className="grid grid-cols-4 gap-4 items-start auto-rows-max m-4 gridcontainer">
                    <div className='gridcard'>
                        <div className='griditems'>
                            <div className='status'>
                                <p className='text-gray-800 text-xl pr-2'><PiArrowFatLineRightFill /></p>
                                <p className='pr-2'>TO-DO</p>
                                <p className='w-5 h-5 rounded-full bg-white text-gray-500 flex items-center justify-center cursor-pointer'>{todoCount}</p>
                            </div>
                        </div>
                        <Droppable droppableId="todo">
                            {(provided) => (
                                <div
                                    ref={provided.innerRef}
                                    {...provided.droppableProps}
                                >
                                    <Cards
                                        tasks={tasks.filter(task => task.status === "todo")}
                                        setTasks={setTasks}
                                        setEdit={setEdit}
                                        setForm={setForm}
                                    />
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                        <button onClick={() => { setForm(true), setStatus("todo") }} className="flex items-center justify-center gap-2 px-8 py-3 rounded-lg  transition taskaddbtn">
                            <IoAdd className='text-lg' />
                            Add Task
                        </button>
                    </div>
                    <div className='gridcard'>
                        <div className='griditems'>
                            <div className='status'>
                                <p className='text-indigo-800 text-xl pr-2'><RiProgress6Line /></p>
                                <p className='pr-2'>In Progress</p>
                                <p className='w-5 h-5 rounded-full bg-white text-gray-500 flex items-center justify-center cursor-pointer'>{progressCount}</p>
                            </div>
                        </div>
                        <Droppable droppableId="inprogress">
                            {(provided) => (
                                <div
                                    ref={provided.innerRef}
                                    {...provided.droppableProps}
                                >
                                    <Cards tasks={tasks.filter(task => task.status === "inprogress")} setTasks={setTasks} setEdit={setEdit} setForm={setForm} />
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                        <button onClick={() => { setStatus("inprogress"), setForm(true) }} className="flex items-center justify-center gap-2 px-8 py-3 rounded-lg  transition taskaddbtn">
                            <IoAdd className='text-lg' />
                            Add Task
                        </button>
                    </div>
                    <div className='gridcard'>
                        <div className='griditems'>
                            <div className='status'>
                                <p className='text-orange-600 text-xl pr-2'><TfiReload /></p>
                                <p className='pr-2'>In Review</p>
                                <p className='w-5 h-5 rounded-full bg-white text-gray-500 flex items-center justify-center cursor-pointer'>{reviewCount}</p>
                            </div>
                        </div>
                        <Droppable droppableId="review">
                            {(provided) => (
                                <div
                                    ref={provided.innerRef}
                                    {...provided.droppableProps}
                                >
                                    <Cards tasks={tasks.filter(task => task.status === "review")} setTasks={setTasks} setEdit={setEdit} setForm={setForm} />
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                        <button onClick={() => { setStatus("review"), setForm(true) }} className="flex items-center justify-center gap-2 px-8 py-3 rounded-lg  transition taskaddbtn">
                            <IoAdd className='text-lg' />
                            Add Task
                        </button>
                    </div>
                    <div className='gridcard'>
                        <div className='griditems'>
                            <div className='status'>
                                <p className='text-green-600 text-xl pr-2'><FaCheck /></p>
                                <p className='pr-2'>Completed</p>
                                <p className='w-5 h-5 rounded-full bg-white text-gray-500 flex items-center justify-center cursor-pointer'>{completedCount}</p>
                            </div>
                        </div>
                        <Droppable droppableId="completed">
                            {(provided) => (
                                <div
                                    ref={provided.innerRef}
                                    {...provided.droppableProps}
                                >
                                    <Cards tasks={tasks.filter(task => task.status === "completed")} setTasks={setTasks} setEdit={setEdit} setForm={setForm} />
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                        <button onClick={() => { setStatus("completed"), setForm(true) }} className="flex items-center justify-center gap-2 px-8 py-3 rounded-lg  transition taskaddbtn">
                            <IoAdd className='text-lg' />
                            Add Task
                        </button>
                    </div>
                </div>
                {
                    form && (
                        <div className='modal-overlay'>
                            <div className='modal-content'>
                                <TaskForm clossForm={() => setForm(false)} setTasks={setTasks} edit={edit} setEdit={setEdit} status={status} />
                            </div>
                        </div>
                    )
                }
            </DragDropContext>
        </>
    )
}

export default Home