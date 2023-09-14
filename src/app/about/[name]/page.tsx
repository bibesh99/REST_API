import { data } from 'autoprefixer'
import type { Metadata } from 'next'

type Repository ={
  id: string,
  name: string,
  full_name: string,

}

 async function MetaTitle(name: string):Promise<Repository>{
  const res = await fetch(`https://api.github.com/repos/vercel/${name}`)

  return res.json()

} 

export async function generateMetaData({
  params,
}:{
  params : {name: string};
}) {
  const repo = await MetaTitle(params.name)

    return{
      title : repo.full_name,
    }
}

export default async function DynamicRouting({params}:{
  params:{name: string}}){
  const repo = await MetaTitle(params.name)
  return (
    <div>
        Name: {repo.full_name}
    </div>
  )
}
