import React from 'react'

type Title= {
    full_name: string
  }
  
  
   async function MetaTitle(title: string):Promise<Title>{
    const res = await fetch(`https://api.github.com/repos/vercel/${title}`)
    return res.json()
  
  } 
  
  export async function generateMetaData({params}:{params : {title: string}}) {
    const data = await MetaTitle(params.title)
  
      return{
        title : data.full_name,
      }
  }
  
  export default async function DynamicRouting({params}:{params:{title: string}}){
    const repo = await MetaTitle(params.title)
    return (
      <div>
          Name: {repo.full_name}
      </div>
    )
  }
  