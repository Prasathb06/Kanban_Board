import React, { useReducer, useEffect } from 'react';
import "./TaskForm.css";
import { FaPlus } from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";
import { toast, Slide } from "react-toastify";
import Select from 'react-select'




const TaskForm = ({ clossForm, setTasks, edit, setEdit, status }) => {

    let handleimage = (e) => {
        const files = e.target.files[0]

        if (files && files.type.startsWith("image/")) {

            const alreadyExist = state.addmembers.some(
                (img) => img.name === files.name && img.size === files.size
            )

            if (alreadyExist) {
                dispatch({
                    type: "setError",
                    payload: {
                        addmemberserror: "Member already added"
                    }
                })
                return
            }

            const imageurl = {
                url: URL.createObjectURL(files),
                name: files.name,
                size: files.size
            }

            dispatch({
                type: "update",
                field: "addmembers",
                payload: [...state.addmembers, imageurl]
            })

            e.target.value = null;
        }
    }

    let handleFileUpload = (e) => {
        const file = e.target.files[0]

        if (file) {

            const allowedTypes = [
                "application/pdf",
                "application/msword",
                "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
                "application/vnd.ms-excel",
                "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
            ];

            if (!allowedTypes.includes(file.type)) {
                dispatch({
                    type: "setError",
                    payload: {
                        fileserror: "Only PDF, DOC, Excel allowed"
                    }
                })
                e.target.value = null
                return
            }
            const alreadyExist = state.files.some(
                (f) => f.name === file.name && f.size === file.size
            )

            if (alreadyExist) {
                dispatch({
                    type: "setError",
                    payload: {
                        fileserror: "File already added"
                    }
                })
                e.target.value = null
                return
            }

            dispatch({
                type: "update",
                field: "files",
                payload: [...state.files, {
                    name: file.name,
                    size: file.size,
                    type: file.type
                }]
            })
        }

        e.target.value = null
    }
    let handleDelete = (index, key) => {
        const updated = state[key].filter((_, i) => i !== index)

        dispatch({
            type: "update",
            field: key,
            payload: updated
        })
    }

    let initialState = {
        projectname: "",
        technology: "",
        textarea: "",
        priority: "Low",
        progress: 0,
        files: [],
        messageCount: 0,
        addmembers: [],
        projecterror: "",
        technologyerror: "",
        textareaerror: "",
        addmemberserror: "",
        priorityerror: "",
        fileserror: "",
        progresserror: "",
        messageCounterror: ""
    }

    let reducer = (state, action) => {
        switch (action.type) {
            case "update":
                return { ...state, [action.field]: action.payload, [`${action.field}error`]: "" }
            case "setAll":
                return { ...state, ...action.payload }
            case "setError":
                return { ...state, ...action.payload }
            case "reset":
                return initialState
            default:
                return state
        }

    }

    let handleSubmit = (e) => {
        e.preventDefault()
        let isValid = true

        if (state.projectname === "") {
            dispatch({
                type: "setError",
                payload: {
                    projecterror: "Project name is required"
                }
            })
            isValid = false
        }

        if (state.technology === "") {
            dispatch({
                type: "setError",
                payload: {
                    technologyerror: "Technology is required"
                }
            })
            isValid = false
        }

        if (state.textarea === "") {
            dispatch({
                type: "setError",
                payload: {
                    textareaerror: "Description is required"
                }
            })
            isValid = false
        }

        if (Number(state.progress) < 0 || Number(state.progress) > 100) {
            dispatch({
                type: "setError",
                payload: {
                    progresserror: "Progress must be between 0 and 100"
                }
            })
            isValid = false
        }

        if (Number(state.messageCount) < 0) {
            dispatch({
                type: "setError",
                payload: {
                    messageCounterror: "Enter valid message count"
                }
            })
            isValid = false
        }
        if (isValid) {

            let storState = {
                id: edit ? edit.task.id : Date.now(),
                projectname: state.projectname,
                technology: state.technology,
                textarea: state.textarea,
                priority: state.priority,
                addmembers: state.addmembers,
                progress: state.progress,
                files: state.files,
                messageCount: state.messageCount,
                status: edit ? edit.task.status : status
            }

            let existingtask = JSON.parse(localStorage.getItem("tasks")) || []

            if (edit) {
                existingtask = existingtask.map((task) =>
                    task.id === edit.task.id ? storState : task
                )
            } else {
                existingtask.push(storState)
            }

            localStorage.setItem('tasks', JSON.stringify(existingtask))

            toast.success(edit ? 'Task Updated Successfully' : 'Task Added Successfully', {
                position: "top-center",
                autoClose: 1000,
                theme: "dark",
                transition: Slide,
            });

            setTasks(existingtask)
            dispatch({ type: "reset" })
            clossForm()
            setEdit(null)
        }
    }
    const [state, dispatch] = useReducer(reducer, initialState)

    useEffect(() => {
        if (edit?.task) {

            dispatch({
                type: "setAll",
                payload: {
                    projectname: edit.task.projectname || "",
                    technology: edit.task.technology || "",
                    textarea: edit.task.textarea || "",
                    priority: edit.task.priority || "Low",
                    addmembers: edit.task.addmembers || [],
                    progress: edit.task.progress || 0,
                    messageCount: edit.task.messageCount || 0,
                    files: edit.task.files || []
                }
            })
        }
    }, [edit])


    const techOptions = [
        { value: "UIDesign", label: "UI Design" },
        { value: "Backend", label: "Backend" },
        { value: "Frontend", label: "Frontend" },
        { value: "QA", label: "QA" },
        { value: "Devops", label: "Devops" }
    ];

    const priorityOptions = [
        { value: "Low", label: "Low" },
        { value: "Medium", label: "Medium" },
        { value: "High", label: "High" }
    ];

    let handleCancel = () => {
        dispatch({ type: "reset" })
        clossForm()
    }
    return (
        <>

            <form className='mt-4 formcontroller'>
                <div className="space-y-12">
                    <div class="border-b border-gray-900/10 pb-4">
                        <h1 class="colour heading">Add Task</h1>
                        <div class="mt-3 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-6">
                            <div class="sm:col-span-3">
                                <label htmlFor="first-name" class="colour block text-sm/6 font-medium text-gray-900">Project Name <span className="text-red-500">*</span></label>
                                <div class="mt-2">
                                    <input id="first-name" placeholder='Project Name' value={state.projectname} type="text" name="first-name" autocomplete="given-name" class="block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" onChange={(e) => dispatch({ type: "update", field: "projectname", payload: e.target.value })} />
                                    <span className='errormsg'>{state.projecterror}</span>
                                </div>
                            </div>

                            <div class="sm:col-span-3">
                                <label htmlFor="country" class="colour block text-sm/6 font-medium text-gray-900">Technology <span className="text-red-500">*</span></label>
                                <fieldset>
                                    <div className="mt-2">
                                        <Select
                                            options={techOptions}
                                            placeholder="Select Technology"
                                            value={techOptions.find(
                                                (option) => option.value === state.technology
                                            )}
                                            onChange={(selected) =>
                                                dispatch({ type: "update", field: "technology", payload: selected.value })
                                            }
                                        />
                                    </div>
                                </fieldset>
                                <span className='errormsg'>{state.technologyerror}</span>
                            </div>
                            <div class="sm:col-span-3">
                                <label htmlFor="country" class="colour block text-sm/6 font-medium text-gray-900">Priority <span className="text-red-500">*</span></label>
                                <fieldset>
                                    <div className="mt-2">
                                        <Select
                                            options={priorityOptions}
                                            value={priorityOptions.find(
                                                (option) => option.value === state.priority
                                            )}
                                            onChange={(selected) =>
                                                dispatch({ type: "update", field: "priority", payload: selected.value })
                                            }
                                        />
                                    </div>
                                </fieldset>
                                <span className='errormsg'>{state.priorityerror}</span>
                            </div>

                            <div class="sm:col-span-3">
                                <label htmlFor="last-name" class="colour block text-sm/6 font-medium text-gray-900">Add Members <span className="text-red-500">*</span></label>
                                <div className="flex -space-x-2">
                                    {
                                        (state.addmembers || []).slice(0, 3).map((img, index) => (
                                            <div key={index} className="relative mt-2 group z-0 hover:z-10">
                                                <img
                                                    src={img.url}
                                                    alt="member"
                                                    className="w-10 h-10 rounded-full border-2 border-white shadow"
                                                />

                                                <button
                                                    type="button"
                                                    onClick={() => handleDelete(index, "addmembers")}
                                                    className="deletebtn">
                                                    <RxCross2 className="text-xl text-red" />
                                                </button>
                                            </div>
                                        ))
                                    }
                                    {state.addmembers.length > 3 && (
                                        <div className="-ml-2 mt-2 w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-sm font-semibold border-2 border-white">
                                            +{state.addmembers.length - 3}
                                        </div>
                                    )}
                                    <label className="mt-2 w-10 h-10 rounded-full bg-indigo-600 text-white flex items-center justify-center cursor-pointer hover:bg-indigo-500 addicon">
                                        <FaPlus />
                                        <input type="file" className="hidden" accept='image/*' onChange={handleimage} />
                                    </label>
                                </div>
                                <span className='errormsg'>{state.addmemberserror}</span>
                            </div>

                            <div className="sm:col-span-3">
                                <label htmlFor="country" class="colour block text-sm/6 font-medium text-gray-900"> Progress (%) <span className="text-red-500">*</span></label>
                                <input type="number" min="0" max="100" value={state.progress} className="form-control focuscontrol mt-2" onChange={(e) => dispatch({ type: "update", field: "progress", payload: e.target.value })}
                                />
                                <span className='errormsg'>{state.progresserror}</span>
                            </div>

                            <div className="sm:col-span-3">
                                <label className="colour block text-sm font-medium ">
                                    Upload Files <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="file"
                                    className="form-control mt-2 bg-indigo-600 focuscontrol "
                                    accept=".pdf,.doc,.docx,.xls,.xlsx"
                                    onChange={handleFileUpload}
                                />
                                <div className="mt-2 space-y-2">
                                    {(state.files || []).map((file, index) => (
                                        <div
                                            key={index}
                                            className="flex justify-between items-center bg-gray-100 px-3 py-2 rounded-md">
                                            <span className="text-sm text-black-500">
                                                {file.name}
                                            </span>
                                            <button
                                                type="button"
                                                onClick={() => handleDelete(index, "files")}
                                                className="text-red-500 font-bold">
                                                <RxCross2 className="text-xl text-red" />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                                <span className='errormsg'>{state.fileserror}</span>
                            </div>

                            <div className="sm:col-span-3">
                                <label htmlFor="country" class="colour block text-sm/6 font-medium text-gray-900">Message <span className="text-red-500">*</span></label>
                                <input type="number" value={state.messageCount} className="form-control focuscontrol mt-2" onChange={(e) => dispatch({
                                    type: "update", field: "messageCount", payload: e.target.value
                                })} />
                                <span className='errormsg'>{state.messageCounterror}</span>
                            </div>

                            <div class="sm:col-span-6">
                                <label htmlFor="discreption" class="colour block text-sm/6 font-medium text-gray-900">Project Description <span className="text-red-500">*</span></label>
                                <div className="mt-2 ">
                                    <textarea
                                        id="description"
                                        value={state.textarea}
                                        name="description"
                                        rows="4"
                                        placeholder='Description...'
                                        className="textarea focus:outline-indigo-600 sm:text-sm/6 px-3 py-2 bg-white" onChange={(e) => dispatch({ type: "update", field: "textarea", payload: e.target.value })} />
                                    <span className='errormsg'>{state.textareaerror}</span>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

                <div class="mt-3 flex items-center justify-end gap-x-6 from-btn">
                    <button type="reset" className="cancel text-sm/6 font-semibold text-gray-900" onClick={handleCancel}>Cancel</button>
                    <button type="submit" className="submit rounded-3 bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" onClick={handleSubmit}>{edit ? "Save" : "Add"}</button>
                </div>
            </form>


        </>
    )
}

export default TaskForm