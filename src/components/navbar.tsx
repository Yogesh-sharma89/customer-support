'use client'
import {AnimatePresence, motion} from 'motion/react'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { useState } from 'react'
import { Loader2Icon } from 'lucide-react'
const Navbar = ({email,open,setOpen}:{email:string,open:boolean,setOpen:(val:boolean)=>void}) => {

     const router = useRouter();
     const [loading,setLoading] = useState(false);

    const handleLogin =()=>{
        setLoading(true)
     
       window.location.href='/api/auth/login'
  
    }

    const firstLetter = email && email[0].toUpperCase();

    
  
   const handleLogout = async()=>{
     try{

        await axios.get('/api/auth/logout')

        router.push('/')
        toast.success('Logout successfully')

     }catch(err){
        console.log("error in logout function : "+err)
     }
   }

  
    

  return (
    <motion.div
     initial={{y:-100}}
     animate={{y:0}}
     transition={{duration:0.7}}
      className='fixed z-50 top-0 left-0 w-full bg-white/70 backdrop-blur-xl border-b border-zinc-100'
    >
        <div className='max-w-6xl mx-auto px-10 h-16 flex items-center justify-between'>

            <div onClick={()=>router.push('/')} className='text-lg font-semibold tracking-tight cursor-pointer'>
              Support  <span className='text-zinc-400'>AI</span>
            </div>

            { email ? 
            <div className='relative'>

                <button
                onClick={()=>setOpen(!open)}
                className='size-10 cursor-pointer rounded-full flex items-center justify-center bg-zinc-800 text-white font-semibold hover:scale-105 transition'
                >
                    <span>{firstLetter}</span>
              
                </button>

                {
                    open && 
                    <AnimatePresence>
                        <motion.div
                        initial={{opacity:0,y:-6}}
                        animate={{opacity:1,y:0}}
                        transition={{duration:0.3}}
                        className='absolute right-1 mt-4 w-44 rounded-xl bg-white shadow-xl border border-zinc-200 overflow-hidden'
                        >
                            
                            <button
                             onClick={()=>router.push('/dashboard')}
                            className='w-full text-left px-2.5 py-2 mb-1.5 text-sm hover:bg-zinc-100'
                            >Dashboard</button>
                            <button
                            onClick={handleLogout}
                            className='w-full  text-red-500 text-left px-2.5 py-2  text-sm hover:bg-zinc-100'
                            >Logout</button>

                        </motion.div>
                    </AnimatePresence>
                }

            </div>
            :
            <motion.button
             onClick={handleLogin}
             disabled={loading}
             className='px-5 py-2 rounded-full disabled:cursor-not-allowed text-white text-sm font-medium bg-black hover:bg-zinc-800 transition-all disabled:opacity-50 flex items-center justify-center cursor-pointer'
            >
                
              {
                loading ? 
                <div className='inline-flex items-center gap-2 '>
                    <Loader2Icon className='size-5 animate-spin'/>
                    <span>Logging...</span>

                </div>:
                <span>Login</span>
              }
            </motion.button>}

        </div>
      
    </motion.div>
  )
}

export default Navbar
