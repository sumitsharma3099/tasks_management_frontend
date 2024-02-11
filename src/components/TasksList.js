import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { delete_task_url, tasks_list_url } from '../constants/TokenAndRoutes';
import swal from 'sweetalert';
import debounce from 'lodash/debounce';

const TasksList = () => {
    let token = localStorage.getItem("token");
    let user_full_name = localStorage.getItem("user_full_name");
    const [records, setrecords] = useState([]);
    const [selectedOption, setSelectedOption] = useState('All');
    const [searchText, setSearchText] = useState('');
    const [sortBy, setSortBy] = useState('created_at');
    const [sortDirection, setSortDirection] = useState('DESC');

    const handleSelectChange = (event) => {
        setSelectedOption(event.target.value);
        filterTasks(event.target.value, searchText, sortBy, sortDirection);
    };

    const setSortByAndDirection = (by, direction) => {
        setSortBy(by);
        setSortDirection(direction == "ASC" ? "DESC" : "ASC");
        filterTasks(selectedOption, searchText, sortBy, sortDirection);
    }
    const navigate = useNavigate();

    const openTaskDetailView = (task_id) => {
        localStorage.setItem("task_id", task_id);
        navigate("/task_detail_view")
    }
    const editTask = (task_id) => {
        localStorage.setItem("task_id", task_id);
        navigate("/edit_task")
    }
    const deleteTask = (task_id) => {

        if (token && task_id) {
            fetch((delete_task_url + task_id),
                {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': token
                    }
                }).then(response => response.json())
                .then(result => {
                    if (result.status == "SUCCESS") {
                        setrecords((prevArray) => prevArray.filter((item) => item.id !== task_id));
                        swal("Great!", "Task Deleted successfully.", "success");
                    } else {
                        swal("Oops!", result.error, "error");
                        navigate("/tasks_list")
                    }
                })
                .catch(() => swal("Oops!", "Something went wrong!", "error"))
        }
    }

    const filterTasks = (for_status, search_text, sortBy, sortDirection) => {
        if (token && user_full_name) {
            fetch((tasks_list_url + `?for_status=` + for_status + "&search_text=" + search_text + "&sort_by=" + sortBy + "&sort_direction=" + sortDirection),
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': token
                    }
                }).then(response => response.json())
                .then(result => {
                    if (result.status == "SUCCESS") {
                        setrecords(result.data);
                    } else {
                        swal("Oops!", result.error, "error");
                        navigate("/tasks_list")
                    }
                })
                .catch(error => console.log(error))
        } else {
            navigate("/")
        }
    }

    const handleSearchInputChange = debounce((e) => {;
        setSearchText(e.target.value);
        filterTasks(selectedOption, e.target.value, sortBy, sortDirection)
      }, 500)

    useEffect(() => {
        filterTasks('All', searchText, sortBy, sortDirection);
    }, [])

    return (
        <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="w-full space-y-8 bg-white px-10 py-10 rounded-lg">
                <h4 className="mb-2 mt-0 text-2xl text-center font-medium leading-tight text-primary">
                    Tasks List
                </h4>
                <hr></hr>
                <div className='flex w-full flex-wrap items-center justify-between px-3'>
                    <button type="button" onClick={() => navigate("/new_task")} className="text-lime-700 hover:text-white border border-lime-700 hover:bg-lime-800 focus:ring-4 focus:outline-none focus:ring-lime-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-lime-400 dark:text-lime-400 dark:hover:text-white dark:hover:bg-lime-500 dark:focus:ring-lime-900">
                        New Task
                    </button>


                    <div className="flex items-center">

                        <input
                            type="text"
                            className="border border-gray-300 p-2 rounded-l-md mr-2 focus:outline-none focus:border-blue-500"
                            placeholder="Enter text"
                            onChange={(e) => handleSearchInputChange(e)}
                        />


                        <button
                            className="bg-blue-500 text-white p-2 rounded-r-md hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue"
                            onClick={() => filterTasks(selectedOption, searchText, sortBy, sortDirection)}
                        >
                            Search
                        </button>
                    </div>


                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Filter :</label>
                        <select value={selectedOption} onChange={handleSelectChange} className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-50 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'>
                            <option value="All">All</option>
                            <option value="To Do">To Do</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Done">Done</option>
                        </select>
                    </div>
                </div>


                <div className="flex flex-col">
                    <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                            <div className="overflow-hidden">
                                <table className="min-w-full text-left text-sm font-light">
                                    <thead className="border-b font-medium dark:border-neutral-500">
                                        <tr>
                                            <th className="col px-6 py-4 text-center 
                                            text-emerald-500 hover:cursor-pointer hover:text-black" onClick={() => setSortByAndDirection('title', sortDirection)} title='Click to Sort by Title'>
                                                <div className='flex items-center justify-center'>
                                                Title
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 7.5 7.5 3m0 0L12 7.5M7.5 3v13.5m13.5 0L16.5 21m0 0L12 16.5m4.5 4.5V7.5" />
                                                </svg>
                                                </div>
                                               
                                            </th>
                                            <th className="col px-6 py-4 text-center text-emerald-500 hover:cursor-pointer hover:text-black" onClick={() => setSortByAndDirection('description', sortDirection)} title='Click to Sort by Description'>
                                            <div className='flex items-center justify-center'>
                                                Description
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 7.5 7.5 3m0 0L12 7.5M7.5 3v13.5m13.5 0L16.5 21m0 0L12 16.5m4.5 4.5V7.5" />
                                                </svg>
                                                </div>
                                            </th>
                                            <th className="col px-6 py-4 text-center">Status</th>
                                            <th className="col px-6 py-4 text-center">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {records.length > 0 ? (records.map((record) => (
                                            <tr className="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-600 text-center"
                                                key={record.id}>
                                                <td className="whitespace-nowrap px-6 py-4 font-medium">{record.sort_title}</td>
                                                <td className="whitespace-nowrap px-6 py-4">{record.sort_description}</td>
                                                <td className="whitespace-nowrap px-6 py-4 font-medium">{record.status}</td>
                                                <td className="whitespace-nowrap px-6 py-4">
                                                    <button type="button" onClick={() => openTaskDetailView(record.id)} className="text-purple-700 hover:text-white border border-purple-700 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-purple-400 dark:text-purple-400 dark:hover:text-white dark:hover:bg-purple-500 dark:focus:ring-purple-900">
                                                        Detail view
                                                    </button>
                                                    <button type="button" onClick={() => deleteTask(record.id)} className="text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-red-400 dark:text-red-400 dark:hover:text-white dark:hover:bg-red-500 dark:focus:ring-red-900">
                                                        Delete Task
                                                    </button>
                                                    <button type="button" onClick={() => editTask(record.id)} className="text-green-700 hover:text-white border border-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-green-400 dark:text-green-400 dark:hover:text-white dark:hover:bg-green-500 dark:focus:ring-green-900">
                                                        Edit Task
                                                    </button>
                                                </td>
                                            </tr>
                                        ))) : <tr>
                                            <td colSpan={4}><p className='text-center font-meduim text-xl'>No Records Found.</p></td>
                                        </tr>}

                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default TasksList;
