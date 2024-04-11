import { useState } from "react";
import "./LoginForm"
import LoginForm from "./LoginForm";

export default function Login() {
  
    return <LoginForm route="/api/token/" method="login"/>
  }