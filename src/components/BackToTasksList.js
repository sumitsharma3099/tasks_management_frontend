import { useNavigate } from 'react-router-dom';

export default function BackToTasksList() {
    const navigate = useNavigate();
    return (
        <>
            <button onClick={() => navigate("/tasks_list")}
                type="button" className="bg-gray-500 hover:bg-gray-700 text-white py-1 px-2 rounded-lg focus:outline-none focus:shadow-outline">
                &larr; Back To Tasks List
            </button>
        </>
    )
}