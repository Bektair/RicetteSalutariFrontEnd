import LoginForm from "./LoginForm"

function Register() {
    return <LoginForm route="/api/user/register/" method="register"/>
}

export default Register