import { useState, useEffect } from 'react';
import { newTaskFields } from "../constants/formFields"
import FormAction from "./FormAction";
import Input from "./Input";
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert';
import { authorized_url, new_task_url } from '../constants/TokenAndRoutes';
import { clearSession } from '../constants/CommonFunctions'
import BackToTasksList from '../components/BackToTasksList'

export default function NewTask() {

  let token = localStorage.getItem("token");
  let user_full_name = localStorage.getItem("user_full_name");
  const fields = newTaskFields;
  let fieldsState = {};

  fields.forEach(field => fieldsState[field.id] = '');
  fieldsState['status'] = 'To Do';
  const [newTaskState, setNewTaskState] = useState(fieldsState);

  const handleChange = (e) => setNewTaskState({ ...newTaskState, [e.target.id]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    CreateTask()
  }

  const navigate = useNavigate();

  useEffect(() => {
    if (token && user_full_name) {

      // Check user is login or not before opening new task page. 
      fetch(authorized_url,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': token
          }
        }).then(response => response.json())
        .then(result => {
          if (result.status == "ERROR") {
            clearSession();
            navigate("/");
          }
        })
        .catch(() => swal("Oops!", "Something went wrong!", "error"))
    } else {
      navigate("/");
    }
  }, [])

  // Use to Create task.
  const CreateTask = () => {

    let NewtaskFields = {
      task: {
        title: newTaskState['title'],
        description: newTaskState['description'],
        status: newTaskState['status']
      }
    };

    fetch(new_task_url,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token
        },
        body: JSON.stringify(NewtaskFields)
      }).then(response => response.json())
      .then(result => {
        if (result.status == "SUCCESS") {
          swal("Great!", "Task Created successfully.", "success");
          navigate("/tasks_list");
        } else {
          swal("Oops!", result.error, "error");
        }
      })
      .catch(() => swal("Oops!", "Something went wrong!", "error"))
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className='flex flex-col items-center'>
        <h2 className="text-2xl font-extrabold text-emerald-500">Create New Task</h2>
      </div>
      <div className="">
        {
          fields.map(field =>
            <Input
              key={field.id}
              handleChange={handleChange}
              value={newTaskState[field.id]}
              labelText={field.labelText}
              labelFor={field.labelFor}
              id={field.id}
              name={field.name}
              type={field.type}
              isRequired={field.isRequired}
              placeholder={field.placeholder}
            />
          )
        }
        <FormAction handleSubmit={handleSubmit} text="Create Task" />
        <div className='flex flex-col items-center p-2'>
          <BackToTasksList />
        </div>
      </div>
    </form>
  )
}
