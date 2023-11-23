import React,{useEffect,useState} from 'react'
import { Layout } from '../components/Layout/Layout'

const HomePage = () => {
  const [loginUser, setLoginUser] = useState("");

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setLoginUser(user);
    }
  }, []);
  return (
    
        <Layout className="flex min-h-screen flex-col items-center justify-between p-24">
               <h1 className="text-4xl text-center font-bold">Hi, {loginUser && loginUser.name} .</h1>
        </Layout>
        
  )
}

export default HomePage