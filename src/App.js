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
import PageNotFound from './pages/PageNotFound';

function App() {
  return (
     <BrowserRouter>
        <Routes>
            <Route exact path="/" element={<LoginPage/>} />
            <Route exact path="/signup" element={<SignupPage/>} />
            <Route exact path="/tasks_list" element={<TasksListPage/>} />
            <Route exact path="/task_detail_view" element={<TaskDetailViewPage/>} />
            <Route exact path="/edit_task" element={<EditTaskPage/>} />
            <Route exact path="/new_task" element={<NewTaskPage/>} />
            <Route exact path="*" element={<PageNotFound/>} />
        </Routes>
      </BrowserRouter>
  );
}

export default App;
