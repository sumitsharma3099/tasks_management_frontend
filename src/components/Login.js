import { useState, useEffect } from 'react';
import { loginFields } from "../constants/formFields";
import FormAction from "./FormAction";
import Input from "./Input";
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert';
import { authorized_url, login_url } from '../constants/TokenAndRoutes';
import { clearSession, createSession } from '../constants/CommonFunctions'

export default function Login() {
    let token = localStorage.getItem("token");
    let user_full_name = localStorage.getItem("user_full_name");
    const fields = loginFields;

    let fieldsState = {};
    fields.forEach(field => fieldsState[field.id] = '');

    const [loginState, setLoginState] = useState(fieldsState);

    const handleChange = (e) => {
        setLoginState({ ...loginState, [e.target.id]: e.target.value })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        authenticateUser();
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
                    } else {
                        clearSession();
                    }
                })
                .catch(() => swal("Oops!", "Something went wrong!","error"))
        }
    }, []);

    // this function is use to login user.
    const authenticateUser = () => {

        let loginFields = {
            email: loginState['email-address'],
            password: loginState['password']
        };

        fetch(login_url,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(loginFields)
            }).then(response => response.json())
            .then(result => {
                if (result.status == "SUCCESS") {
                    createSession(result.data.user.full_name, result.data.jwt, result.data.user.profile_pic_url)
                    navigate("/tasks_list");
                    swal("Great!", "Login successfully.", "success");
                } else {
                    swal("Oops!", result.error, "error");
                }
            })
            .catch(() => swal("Oops!", "Something went wrong!", "error"))
    }


    return (
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="-space-y-px">
                {
                    fields.map(field =>
                        <Input
                            key={field.id}
                            handleChange={handleChange}
                            value={loginState[field.id]}
                            labelText={field.labelText}
                            labelFor={field.labelFor}
                            id={field.id}
                            name={field.name}
                            type={field.type}
                            isRequired={field.isRequired}
                            placeholder={field.placeholder} />
                    )
                }
            </div>
            <FormAction handleSubmit={handleSubmit} text="Login" />
        </form>
    )
}
