import { useState, useEffect } from 'react';
import { editUserFields } from "../constants/formFields"
import FormAction from "./FormAction";
import Input from "./Input";
import { useNavigate } from 'react-router-dom';
import { user_update_url } from '../constants/TokenAndRoutes';
import swal from 'sweetalert';
import BackToTasksList from '../components/BackToTasksList';
import { clearSession, createSession } from '../constants/CommonFunctions';

export default function EditTask() {
    let token = localStorage.getItem("token");
    let user_full_name = localStorage.getItem("user_full_name");
    let user_profile_pic_url = localStorage.getItem("profile_pic_url");
    const fields = editUserFields;

    const [editUserState, setEditUserState] = useState({});

    const handleChange = (e) => setEditUserState({ ...editUserState, [e.target.id]: e.target.value });

    const handleSubmit = (e) => {
        e.preventDefault();
        updateUser()
    }

    const navigate = useNavigate();

    useEffect(() => {
        if (token && user_full_name && user_profile_pic_url) {
            setEditUserState({ full_name: user_full_name, profile_pic_url: user_profile_pic_url })
        } else {
            navigate("/")
        }
    }, [])

    //Function to Update Task.
    const updateUser = () => {

        let SignupFields = {
            user: {
                full_name: editUserState['full_name'],
                profile_pic_url: editUserState['profile_pic_url'],
                email: editUserState['email']
            }
        };


        fetch((user_update_url),
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
                    createSession(result.data.user.full_name, result.data.jwt, result.data.user.profile_pic_url)
                    navigate("/tasks_list");
                    swal("Great!", "Account Updated successfully.", "success");
                } else {
                    clearSession();
                    swal("Oops!", result.error, "error");
                }
            })
            .catch(() => swal("Oops!", "Something went wrong!", "error"));
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className='flex flex-col items-center'>
                <h2 className="text-2xl font-extrabold text-emerald-500">Edit Account</h2>
            </div>
            <div>
                {
                    fields.map(field =>
                        <Input
                            key={field.id}
                            handleChange={handleChange}
                            value={editUserState[field.id]}
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
                <FormAction handleSubmit={handleSubmit} text="Update Account" />
                <div className='flex flex-col items-center p-2'>
                    <BackToTasksList />
                </div>
            </div>
        </form>
    )
}
