import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert';
import { task_detail_view_url } from '../constants/TokenAndRoutes';
import BackToTasksList from '../components/BackToTasksList'

const TaskDetailView = () => {
    let token = localStorage.getItem("token");
    const [record, setrecord] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        let task_id = localStorage.getItem("task_id");
        if (task_id && token) {
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
                        setrecord(result.data);
                    } else {
                        navigate("/");
                    }
                })
                .catch(() => swal("Oops!", "Something went wrong!", "error"))
        } else {
            navigate("/")
        }
    }, [])

    return (
        <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="w-full space-y-8 bg-white px-10 py-10 rounded-lg">
                <h4 className="mb-2 mt-0 text-2xl text-center font-medium leading-tight text-primary">
                    Tasks Detail view
                </h4>
                <hr></hr>
                <div className="max-w-md mx-auto mt-8 bg-white rounded-md overflow-hidden shadow-md">
                    <div className="p-6">
                        <h2 className="text-xl font-semibold mb-4">{record.title}</h2>
                        <i className="text-gray-700 mb-2">{record.description}</i>
                        <hr></hr>
                        <p className="text-gray-600"><b>Status: </b>{record.status}</p>
                    </div>
                </div>
                <hr></hr>
                <BackToTasksList />

            </div>
        </div>
    );
};
export default TaskDetailView;
