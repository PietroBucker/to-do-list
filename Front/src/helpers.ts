import React from "react"
import { TasksResponse } from "./interface"
import { log } from "console"
type reactDispatch<T> = React.Dispatch<React.SetStateAction<T>>

export function getTasks(setData:reactDispatch<TasksResponse[]>, setLoading:reactDispatch<boolean>){
    fetch('https://to-do-list-zvcz.vercel.app/tasks/')
            .then(response => response.json())
            .then(json => setData(json))
            .then(() => setLoading(false))
    
}

export const saveTask = async (data:TasksResponse, setMessage:reactDispatch<string>) => {


    const response = await fetch('https://to-do-list-zvcz.vercel.app/tasks/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    const json = await response.json()
    if (json.error) {
        setMessage(json.error)
    }
    else {
        setMessage('Tarefa salva com sucesso')
    }

}

export const editTask = async (data:TasksResponse, id:number ,setMessage:reactDispatch<string>) => {
    const response = await fetch(`https://to-do-list-zvcz.vercel.app/tasks/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })

    const json = await response.json()
    if (json.error) {
        setMessage(json.error)
    }
    else {
        
        setMessage('Tarefa salva com sucesso')
    }
}



export const deleteTask = async (id:number, loading:reactDispatch<boolean>) => {
    const response = await fetch(`https://to-do-list-zvcz.vercel.app/tasks/${id}`, {
      method: 'DELETE',
    })
    const json = await response.json()
    if (json.error) {
      console.log(json.error)
    }
    loading(true)
  }

export function filterData(data:TasksResponse[], search:string){
    const response = data?.filter((item) => {
        return item.task_name.includes(search)
        || item.limit_date.includes(search)
        || String(item.cost).includes(search)
    })

    return response
}
