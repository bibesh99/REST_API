import Link from "next/link"

type Repository ={
  id: string,
  name: string,
  full_name: string,

}

type Time = {
  datetime: string
}

export default async function Page() {
  const res = await fetch('https://api.github.com/repos/vercel/next.js')
  const data:Repository = await res.json()

  const date = await fetch('https://worldtimeapi.org/api/timezone/America/Chicago',
  { next: {
        revalidate: 5,
  } },
  // {
  //   cache: 'no-store'
  // }
  
  )
  const currentDateTime:Time = await date.json()


  return (
    <main>
       <Link href="/about" >About Page</Link>  
       <h1>{data.full_name}</h1> 
       <h1>{currentDateTime.datetime}</h1>   
    </main>
  )
}