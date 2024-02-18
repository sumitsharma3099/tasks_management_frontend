const loginFields = [
    {
        labelText: "Email address",
        labelFor: "email-address",
        id: "email-address",
        name: "email",
        type: "email",
        autoComplete: "email",
        isRequired: true,
        placeholder: "Email address"
    },
    {
        labelText: "Password",
        labelFor: "password",
        id: "password",
        name: "password",
        type: "password",
        autoComplete: "password",
        isRequired: true,
        placeholder: "Password"
    }
]

const signupFields = [
    {
        labelText: "Full Name",
        labelFor: "full_name",
        id: "full_name",
        name: "full_name",
        type: "text",
        autoComplete: "fullname",
        isRequired: true,
        placeholder: "Full Name"
    },
    {
        labelText: "Email address",
        labelFor: "email",
        id: "email",
        name: "email",
        type: "email",
        autoComplete: "email",
        isRequired: true,
        placeholder: "Email address"
    },
    {
        labelText: "Password",
        labelFor: "password",
        id: "password",
        name: "password",
        type: "password",
        autoComplete: "password",
        isRequired: true,
        placeholder: "Password"
    },
    {
        labelText: "Profile Pic Url",
        labelFor: "profile_pic_url",
        id: "profile_pic_url",
        name: "profile_pic_url",
        type: "text",
        autoComplete: "profile_pic_url",
        isRequired: false,
        placeholder: "Profile Pic Url (Optional)"
    }
]

const editTaskFields = [
    {
        labelText: "Title",
        labelFor: "title",
        id: "title",
        name: "title",
        type: "text",
        autoComplete: "title",
        isRequired: true,
        placeholder: "Title"
    },
    {
        labelText: "Description",
        labelFor: "description",
        id: "description",
        name: "description",
        type: "textarea",
        autoComplete: "description",
        isRequired: true,
        placeholder: "Description"
    },
    {
        labelText: "Status",
        labelFor: "status",
        id: "status",
        name: "status",
        type: "select",
        autoComplete: "status",
        isRequired: true,
        placeholder: "Status"
    }
]

const newTaskFields = [
    {
        labelText: "Title",
        labelFor: "title",
        id: "title",
        name: "title",
        type: "text",
        autoComplete: "title",
        isRequired: true,
        placeholder: "Title"
    },
    {
        labelText: "Description",
        labelFor: "description",
        id: "description",
        name: "description",
        type: "textarea",
        autoComplete: "description",
        isRequired: true,
        placeholder: "Description"
    },
    {
        labelText: "Status",
        labelFor: "status",
        id: "status",
        name: "status",
        type: "select",
        autoComplete: "status",
        isRequired: true,
        placeholder: "Status"
    }
]

const editUserFields = [
    {
        labelText: "Full Name",
        labelFor: "full_name",
        id: "full_name",
        name: "full_name",
        type: "text",
        autoComplete: "fullname",
        isRequired: true,
        placeholder: "Full Name"
    },
    {
        labelText: "Profile Pic Url",
        labelFor: "profile_pic_url",
        id: "profile_pic_url",
        name: "profile_pic_url",
        type: "text",
        autoComplete: "profile_pic_url",
        isRequired: false,
        placeholder: "Profile Pic Url (Optional)"
    }
]
export { loginFields, signupFields, editTaskFields, newTaskFields, editUserFields }
