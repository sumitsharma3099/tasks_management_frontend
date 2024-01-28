import './App.css';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import SignupPage from './pages/Signup';
import LoginPage from './pages/Login';
import TasksListPage from './pages/TasksList';
import TaskDetailViewPage from './pages/TaskDetailView';
import EditTaskPage from './pages/EditTask';
import NewTaskPage from './pages/NewTask';

function App() {
  return (
     <BrowserRouter>
        <Routes>
            <Route path="/" element={<LoginPage/>} />
            <Route path="/signup" element={<SignupPage/>} />
            <Route path="/tasks_list" element={<TasksListPage/>} />
            <Route path="/task_detail_view" element={<TaskDetailViewPage/>} />
            <Route path="/edit_task" element={<EditTaskPage/>} />
            <Route path="/new_task" element={<NewTaskPage/>} />
        </Routes>
      </BrowserRouter>
  );
}

export default App;
