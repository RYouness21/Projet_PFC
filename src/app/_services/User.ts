import { Role } from "./Role";



export interface User{
    id:number,
    email:string,
    password:string,
    username:string,
    roles :[
        {
            id: number,
            name: string
        }
    ]
}