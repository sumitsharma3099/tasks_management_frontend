import { useState, useEffect } from 'react';
import { editTaskFields } from "../constants/formFields"
import FormAction from "./FormAction";
import Input from "./Input";
import { useNavigate } from 'react-router-dom';
import { task_edit_url, task_detail_view_url } from '../constants/TokenAndRoutes';
import swal from 'sweetalert';
import BackToTasksList from '../components/BackToTasksList'

export default function EditTask() {
  let token = localStorage.getItem("token");
  let user_full_name = localStorage.getItem("user_full_name");
  const fields = editTaskFields;
  let fieldsState = {};

  fields.forEach(field => fieldsState[field.id] = '');
  const [editTaskState, setEditTaskState] = useState(fieldsState);

  const handleChange = (e) => setEditTaskState({ ...editTaskState, [e.target.id]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    updateTask()
  }

  const navigate = useNavigate();

  useEffect(() => {
    let task_id = localStorage.getItem("task_id");
    if (token && user_full_name) {
      fetch((task_detail_view_url + task_id),
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': token
          }
        }).then(response => response.json())
        .then(result => {

          if (result.status == "SUCCESS") {
            const fieldsState = Object.fromEntries(
              Object.entries(result.data).filter(([key]) => key !== 'id')
            );
            setEditTaskState(fieldsState)
          } else {
            navigate("/tasks_list");
            swal("Oops!", result.error, "error");
          }
        })
        .catch(() => swal("Oops!", "Something went wrong!", "error"))
    } else {
      navigate("/")
    }
  }, [])

  //Function to Update Task.
  const updateTask = () => {

    let SignupFields = {
      task: {
        title: editTaskState['title'],
        description: editTaskState['description'],
        status: editTaskState['status']
      }
    };
    let task_id = localStorage.getItem("task_id");

    fetch((task_edit_url + task_id),
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token
        },
        body: JSON.stringify(SignupFields)
      }).then(response => response.json())
      .then(result => {
        if (result.status == "SUCCESS") {
          navigate("/tasks_list");
          swal("Great!", "Task Updated successfully.", "success");
        } else {
          swal("Oops!", result.error, "error");
        }
      })
      .catch(() => swal("Oops!", "Something went wrong!", "error"));
  }

  return (
    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
      <div className='flex flex-col items-center p-6'>
        <h2 className="text-2xl font-extrabold text-emerald-500">Edit Task</h2>
      </div>
      <div className="">
        {
          fields.map(field =>
            <Input
              key={field.id}
              handleChange={handleChange}
              value={editTaskState[field.id]}
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
        <FormAction handleSubmit={handleSubmit} text="Update Task" />
        <div className='flex flex-col items-center p-6'>
          <BackToTasksList />
        </div>
      </div>
    </form>
  )
}
