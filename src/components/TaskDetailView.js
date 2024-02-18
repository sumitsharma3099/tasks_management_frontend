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
                <div className="bg-white p-4 rounded-md shadow-md mb-4">
                    <h2 className="text-xl font-bold mb-2">{record.title}</h2>
                    <p className="text-gray-600 mb-2">{record.description}</p>
                    {record.status === 'Done' && <>
                    <div className={"inline-block py-1 px-2 text-sm font-semibold rounded bg-green-500 text-white"}>
                        {record.status}
                    </div>
                    </>}
                    {record.status === 'To Do' && <>
                    <div className={"inline-block py-1 px-2 text-sm font-semibold rounded bg-red-500 text-white"}>
                        {record.status}
                    </div>
                    </>}
                    {record.status === 'In Progress' && <>
                    <div className={"inline-block py-1 px-2 text-sm font-semibold rounded bg-yellow-500 text-white"}>
                        {record.status}
                    </div>
                    </>}
                </div>
                <hr></hr>
                <BackToTasksList />

            </div>
        </div>
    );
};
export default TaskDetailView;
