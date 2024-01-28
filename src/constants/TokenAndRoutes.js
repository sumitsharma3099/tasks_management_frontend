let token = localStorage.getItem("token");
let user_full_name = localStorage.getItem("user_full_name");
const base_url = `http://localhost:3001/`;
const authorized_url = base_url + `authorized`;
const login_url = base_url + `login`;
const new_task_url = base_url + `tasks`;
const signup_url = base_url + `signup`;
const task_detail_view_url = base_url + `tasks/`;
const delete_task_url = base_url + `tasks/`;
const tasks_list_url = base_url + `tasks`;
const task_edit_url = base_url + `tasks/`;

export { token, user_full_name, authorized_url, login_url, new_task_url, signup_url, task_detail_view_url, delete_task_url, tasks_list_url, task_edit_url }