import { Router } from "express";
import {login} from '../Authentification/Login.js'


const routeLogin= Router()

routeLogin.post('/',login)

export default routeLogin