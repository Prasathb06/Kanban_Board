import React from 'react';
import Card from 'react-bootstrap/Card';
import { BsThreeDots } from "react-icons/bs";
import Dropdown from 'react-bootstrap/Dropdown';
import { IoTrashOutline } from "react-icons/io5";
import { FaPencilAlt } from "react-icons/fa";
import { AiOutlineMessage } from "react-icons/ai";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import { FaRegFileAlt } from "react-icons/fa";
import ProgressBar from 'react-bootstrap/ProgressBar';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import Tooltip from 'react-bootstrap/Tooltip';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import { Draggable } from "@hello-pangea/dnd";
import './Cards.css';

const Cards = ({ tasks, setTasks, setEdit, setForm }) => {
  const prioritystyle = {
    Low: "low",
    Medium: "medium",
    High: "high"
  }


  const techstyle = {
    Backend: "back",
    UIDesign: "ui",
    Frontend: "front",
    QA: "qa",
    Devops: "dev"
  }


  let handleDelete = (id) => {
    let allTasks = JSON.parse(localStorage.getItem("tasks")) || []

    let updated = allTasks.filter(task => task.id !== id)

    setTasks(updated)
    localStorage.setItem("tasks", JSON.stringify(updated))
  }

  let handleEdit = (task, id) => {
    setEdit({ task, id })
    setForm(true)
  }

  return (
    <>
      {
        tasks.map((task, index) => (
          <Draggable
            key={task.id}
            draggableId={task.id.toString()}
            index={index}
          >
            {(provided) => (
              <Card
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                style={{
                  width: '20rem',
                  ...provided.draggableProps.style
                }}
                className='card'
              >
                <Card.Body>
                  <div className='header'>
                    <div className='type'>
                      <Card.Title className={`priority ${prioritystyle[task.priority]}`}>
                        {task.priority}
                      </Card.Title>
                      <Card.Title className={`tech ${techstyle[task.technology]}`}>{task.technology}</Card.Title>
                    </div>
                    <div className='actions'>
                      <Dropdown align="end">
                        <Dropdown.Toggle className="three-dot">
                          <BsThreeDots />
                        </Dropdown.Toggle>

                        <Dropdown.Menu className="three-dot-menu">
                          <Dropdown.Item className='delete' onClick={() => handleDelete(task.id)}><IoTrashOutline className='iconsD' />Delete</Dropdown.Item>
                          <Dropdown.Item className='delete' onClick={() => handleEdit(task, task.id)}><FaPencilAlt className='iconsE' />Edit</Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    </div>
                  </div>
                  <Card.Subtitle className='title' >{task.projectname}</Card.Subtitle>
                  <OverlayTrigger
                    placement="top"
                    overlay={
                      <Tooltip className='tooltips'>
                        {task.textarea}
                      </Tooltip>
                    }
                  >
                    <Card.Text className="description whitespace-nowrap overflow-hidden text-ellipsis cursor-pointer">
                      {task.textarea}
                    </Card.Text>
                  </OverlayTrigger>
                  <div className="contents leading-none m-0 p-0">
                    <div className='flex justify-between mb-1'>
                      <div className='flex progressive'>
                        <span className='loading'>
                          {
                            task.status === "completed" ? (
                              <IoIosCheckmarkCircleOutline className="text-gray-600 text-xl" />
                            ) : (
                              <DotLottieReact
                                className='load'
                                src="https://lottie.host/62b74593-91bc-4521-a679-57f3ca3e35bf/dU20BVMLji.lottie"
                                loop
                                autoplay
                              />
                            )
                          }
                        </span>
                        <span>
                          {task.status === "completed" ? "Completed" : "Progress"}
                        </span>
                      </div>

                      <div>
                        <p className="m-0">{`${task.progress || 0}%`}</p>
                      </div>
                    </div>
                    <ProgressBar now={task.progress} className='bar m-0'/>
                  </div>
                  <div className='footer'>
                    <div className='flex -space-x-2'>
                      {
                        task.addmembers.map((img, id) => (
                          <img src={img.url} key={id} alt="member" class="w-10 h-10 rounded-full border-2 border-white" />
                        ))
                      }
                    </div>
                    <div className='information'>

                      <button type="button" className="filebtn">
                        <FaRegFileAlt />
                        <span>{task.files?.length || 0}</span>
                      </button>

                      <button type="button" className=" messagebtn">
                        <AiOutlineMessage />
                        <span>{task.messageCount || 0}</span>
                      </button>

                    </div>
                  </div>
                </Card.Body>
              </Card>
            )}
          </Draggable>
        ))
      }
    </>
  )
}

export default Cards