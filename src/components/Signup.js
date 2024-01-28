import { useState, useEffect } from 'react';
import { signupFields } from "../constants/formFields"
import FormAction from "./FormAction";
import Input from "./Input";
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert';
import { authorized_url, signup_url } from '../constants/TokenAndRoutes';
import {createSession } from '../constants/CommonFunctions'

export default function Signup() {

  let token = localStorage.getItem("token");
  let user_full_name = localStorage.getItem("user_full_name");
  const fields = signupFields;

  let fieldsState = {};
  fields.forEach(field => fieldsState[field.id] = '');

  const [signupState, setSignupState] = useState(fieldsState);

  const handleChange = (e) => setSignupState({ ...signupState, [e.target.id]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    createAccount()
  }

  const navigate = useNavigate();

  useEffect(() => {

    // Check if user is already login then goto tasks list page. 
    if (token && user_full_name) {
      fetch(authorized_url,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': token
          }
        }).then(response => response.json())
        .then(result => {
          if (result.status == "SUCCESS") {
            navigate("/tasks_list");
            swal("Great!", "You are already login.", "success");
          }
        })
        .catch(() => swal("Oops!", "Something went wrong!","error"))
    }
  }, [])

  //function to create Account/User.
  const createAccount = () => {

    let SignupFields = {
      user: {
        email: signupState['email'],
        password: signupState['password'],
        full_name: signupState['full_name'],
        profile_pic_url: signupState['profile_pic_url']
      }
    };

    fetch(signup_url,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(SignupFields)
      }).then(response => response.json())
      .then(result => {
        if (result.status == "SUCCESS") {
          createSession(result.data.user.full_name, result.data.jwt, result.data.user.profile_pic_url)
          navigate("/tasks_list");
          swal("Great!", "Account created successfully and Login successfully.", "success");
        } else {
          swal("Oops!", result.error, "error");
        }
      })
      .catch(() => swal("Oops!", "Something went wrong!","error"))
  }

  return (
    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
      <div className="">
        {
          fields.map(field =>
            <Input
              key={field.id}
              handleChange={handleChange}
              value={signupState[field.id]}
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
        <FormAction handleSubmit={handleSubmit} text="Signup" />
      </div>
    </form>
  )
}
