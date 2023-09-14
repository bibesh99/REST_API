import { NextResponse } from "next/server";

const API_KEY:string = process.env.DATA_API_KEY as string

const DATA_SOURCE_URL = "https://jsonplaceholder.typicode.com/todos"

export async function GET() {
    const res = await fetch(DATA_SOURCE_URL)
    const todos: Todo[] = await res.json()

    return NextResponse.json(todos)
}


export async function DELETE(request : Request) {
        const {id}: Partial<Todo> = await request.json()

        if (!id) return NextResponse.json({'message': "Todo id is required!"})

        await fetch(`${DATA_SOURCE_URL}/${id}`,{
            method: 'DELETE',
            headers:{
                'Content-Type': "application/json",
                'API-key': API_KEY
            }
        })

        return NextResponse.json({'message':`Todo ${id} is deleted`})
}
export async function POST(request : Request) {
        const {userId,title}: Partial<Todo> = await request.json()

        if (!userId || !title) return NextResponse.json({'message': "Missing required Data"})

        const res = await fetch(DATA_SOURCE_URL,{
            method: 'POST',
            headers:{
                'Content-Type': "application/json",
                'API-key': API_KEY
            },
            body: JSON.stringify({
                userId,title,completed: false,
            })
        })

        const newTodo:Todo = await res.json()

        return NextResponse.json(newTodo)
}
export async function PUT(request : Request) {
        const {userId,id,title,completed}: Todo = await request.json()

        if (!userId || !title || !id || typeof(completed) !== 'boolean') return NextResponse.json({'message': "Missing required Data"})

        const res = await fetch(`${DATA_SOURCE_URL}/${id}`,{
            method: 'PUT',
            headers:{
                'Content-Type': "application/json",
                'API-key': API_KEY
            },
            body: JSON.stringify({
                userId,title,completed,
            })
        })

        const updatedTodo:Todo = await res.json()

        return NextResponse.json(updatedTodo)
}