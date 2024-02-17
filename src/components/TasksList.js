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
    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(5);
    const [totalPages, setTotalPages] = useState(0);
    const [totalRecords, setTotalRecords] = useState(0);


    const handleSelectChange = (event) => {
        setSelectedOption(event.target.value);
        filterTasks(event.target.value, searchText, sortBy, sortDirection, page, perPage);
    };

    const setSortByAndDirection = (by, direction) => {
        setSortBy(by);
        setSortDirection(direction == "ASC" ? "DESC" : "ASC");
        filterTasks(selectedOption, searchText, sortBy, sortDirection, page, perPage);
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
                        filterTasks(selectedOption, searchText, sortBy, sortDirection, page, perPage);
                        // setrecords((prevArray) => prevArray.filter((item) => item.id !== task_id));
                        swal("Great!", "Task Deleted successfully.", "success");
                    } else {
                        swal("Oops!", result.error, "error");
                        navigate("/tasks_list")
                    }
                })
                .catch(() => swal("Oops!", "Something went wrong!", "error"))
        }
    }

    const filterTasks = (for_status, search_text, sortBy, sortDirection, page, perPage) => {
        if (token && user_full_name) {
            fetch((tasks_list_url + `?for_status=` + for_status + "&search_text=" + search_text + "&sort_by=" + sortBy + "&sort_direction=" + sortDirection + "&page=" + page + "&per_page=" + perPage),
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': token
                    }
                }).then(response => response.json())
                .then(result => {
                    console.log("------------------", result)
                    if (result.status == "SUCCESS") {
                        setrecords(result.data.tasks);
                        let pagination = result.data.pagination_hash
                        setPage(pagination.page);
                        setPerPage(pagination.per_page);
                        setTotalPages(pagination.total_pages);
                        setTotalRecords(pagination.total_records);
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

    const handleSearchInputChange = debounce((e) => {
        ;
        setSearchText(e.target.value);
        filterTasks(selectedOption, e.target.value, sortBy, sortDirection, page, perPage)
    }, 500)

    const nextPage = () => {
        let nextpg = page + 1
        setPage(nextpg);
        filterTasks(selectedOption, searchText, sortBy, sortDirection, nextpg, perPage);
    }

    const prevPage = () => {
        let prevpg = page - 1
        setPage(prevpg);
        filterTasks(selectedOption, searchText, sortBy, sortDirection, prevpg, perPage);
    }

    const changePerPageRecords = (value) => {
        setPerPage(value);
        filterTasks(selectedOption, searchText, sortBy, sortDirection, page, value);
    }

    useEffect(() => {
        filterTasks('All', searchText, sortBy, sortDirection, page, perPage);
    }, [])

    return (
        <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="w-full space-y-8 bg-white px-10 py-10 rounded-lg">
                <h4 className="mb-2 mt-0 text-2xl text-center font-medium leading-tight text-emerald-500">
                    Hey! {user_full_name}, Your tasks list has arrived. 🚀
                </h4>
                <hr></hr>
                <div className="grid lg:grid-cols-3 gap-4 sm:grid-cols-1">
                    <div className='mt-1'>
                        <button type="button" onClick={() => navigate("/new_task")} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                            New Task
                        </button>
                    </div>
                    <div className='mt-1'>
                        <input
                            type="search"
                            className="border border-gray-300 p-2 rounded mr-2 focus:outline-none focus:ring-purple-500 focus:border-purple-500 w-full"
                            placeholder="Search by Title & Description"
                            onChange={(e) => handleSearchInputChange(e)} />
                    </div>
                    <div className='mt-1'>
                        <select value={selectedOption} onChange={handleSelectChange} className='rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm'>
                            <option value="All">All</option>
                            <option value="To Do">To Do</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Done">Done</option>
                        </select>
                    </div>
                </div>
                <hr></hr>
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border border-gray-300">
                        <thead>
                            <tr>
                                <th className="col px-3 py-2 text-center 
                                            text-emerald-500 hover:cursor-pointer hover:text-black" onClick={() => setSortByAndDirection('title', sortDirection)} title='Click to Sort by Title'>
                                    <div className='flex items-center justify-center'>
                                        Title
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 7.5 7.5 3m0 0L12 7.5M7.5 3v13.5m13.5 0L16.5 21m0 0L12 16.5m4.5 4.5V7.5" />
                                        </svg>
                                    </div>
                                </th>
                                <th className="col px-3 py-2 text-center text-emerald-500 hover:cursor-pointer hover:text-black" onClick={() => setSortByAndDirection('description', sortDirection)} title='Click to Sort by Description'>
                                    <div className='flex items-center justify-center'>
                                        Description
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 7.5 7.5 3m0 0L12 7.5M7.5 3v13.5m13.5 0L16.5 21m0 0L12 16.5m4.5 4.5V7.5" />
                                        </svg>
                                    </div>
                                </th>
                                <th className="col px-3 py-2 text-center">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {records.length > 0 ? (records.map((record) => (
                                <tr className="border transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-600 text-center"
                                    key={record.id}>
                                    <td className="border-b lg:p-4 sm:p-2">{record.sort_title}<b>-({record.status})</b></td>
                                    <td className="border-b lg:p-4 sm:p-2">{record.sort_description}</td>
                                    <td className="flex items-center justify-center lg:p-4 sm:p-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 fill-blue-500" onClick={() => openTaskDetailView(record.id)} title='Detail View'>
                                            <path d="M11.625 16.5a1.875 1.875 0 1 0 0-3.75 1.875 1.875 0 0 0 0 3.75Z" />
                                            <path fillRule="evenodd" d="M5.625 1.5H9a3.75 3.75 0 0 1 3.75 3.75v1.875c0 1.036.84 1.875 1.875 1.875H16.5a3.75 3.75 0 0 1 3.75 3.75v7.875c0 1.035-.84 1.875-1.875 1.875H5.625a1.875 1.875 0 0 1-1.875-1.875V3.375c0-1.036.84-1.875 1.875-1.875Zm6 16.5c.66 0 1.277-.19 1.797-.518l1.048 1.048a.75.75 0 0 0 1.06-1.06l-1.047-1.048A3.375 3.375 0 1 0 11.625 18Z" clipRule="evenodd" />
                                            <path d="M14.25 5.25a5.23 5.23 0 0 0-1.279-3.434 9.768 9.768 0 0 1 6.963 6.963A5.23 5.23 0 0 0 16.5 7.5h-1.875a.375.375 0 0 1-.375-.375V5.25Z" />
                                        </svg>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 fill-red-500" onClick={() => deleteTask(record.id)} title='Delete Task'>
                                            <path fillRule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z" clipRule="evenodd" />
                                        </svg>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 fill-yellow-500" onClick={() => editTask(record.id)} title='Edit Task'>
                                            <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32l8.4-8.4Z" />
                                            <path d="M5.25 5.25a3 3 0 0 0-3 3v10.5a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3V13.5a.75.75 0 0 0-1.5 0v5.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5V8.25a1.5 1.5 0 0 1 1.5-1.5h5.25a.75.75 0 0 0 0-1.5H5.25Z" />
                                        </svg>
                                    </td>
                                </tr>
                            ))) : <tr>
                                <td colSpan={3} className='border lg:p-4 sm:p-2'><p className='text-center font-meduim text-xl'>No Records Found.</p></td>
                            </tr>}
                        </tbody>
                    </table>
                </div>
                <hr></hr>
                <div className='flex items-center justify-center'>
                    <nav aria-label="Page navigation example">
                        <ul className="list-style-none mb-3 flex">
                            <li>
                                <button disabled={page <= 1}
                                    className={"relative block rounded px-3 py-1.5 text-sm border mx-2 " + (page <= 1 ? " bg-emerald-200 text-white border-emerald-200 " : " bg-emerald-500 text-white border-emerald-500 hover:text-emerald-500 hover:bg-white ")}
                                    onClick={() => prevPage()}> &larr; Previous</button>
                            </li>
                            <li className='flex items-center'>
                                <p className='text-xs'>Total results <b>{totalRecords},</b> Showing page <b>{page}</b> of <b>{totalPages}</b></p>
                            </li>
                            <li>
                                <button
                                    disabled={page >= totalPages}
                                    className={"relative block rounded px-3 py-1.5 text-sm border mx-2 " + (page >= totalPages ? " bg-emerald-200 text-white border-emerald-200 " : " bg-emerald-500 text-white border-emerald-500 hover:text-emerald-500 hover:bg-white ")}
                                    onClick={() => nextPage()}>Next &rarr;</button>
                            </li>
                        </ul>
                    </nav>
                </div>
                <div className='flex items-center justify-center'>
                    <nav aria-label="Page navigation example">
                        <ul className="list-style-none mb-3 flex">
                        <li className='flex items-center'>
                                <p className='text-xs'><b>Records Per Page</b></p>
                            </li>
                            <li>
                                <button disabled={perPage === 5}
                                    className={"relative block rounded px-3 py-1.5 text-sm border mx-2 " + (perPage === 5 ? " bg-emerald-200 text-white border-emerald-200 " : " bg-emerald-500 text-white border-emerald-500 hover:text-emerald-500 hover:bg-white ")}
                                    onClick={() => changePerPageRecords(5)}>5</button>
                            </li>
                            
                            <li>
                                <button
                                    disabled={perPage === 10}
                                    className={"relative block rounded px-3 py-1.5 text-sm border mx-2 " + (perPage === 10 ? " bg-emerald-200 text-white border-emerald-200 " : " bg-emerald-500 text-white border-emerald-500 hover:text-emerald-500 hover:bg-white ")}
                                    onClick={() => changePerPageRecords(10)}>10</button>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </div>
    );
};
export default TasksList;
