'use client'
import axios from 'axios';
import { Loader2Icon } from 'lucide-react';
import {motion} from 'motion/react'
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

const DashboardClient = ({ id }: { id: string }) => {

    const router = useRouter();

    const [businessName,setBusinessName]= useState('');
    const [supportEmail,setSupportEmail]= useState('');
    const [data,setData]= useState('');
    const [loading,setLoading] = useState(false)

    const handleSettings = async()=>{
      if(!businessName || !supportEmail || !data){
        toast.error('All fields are required')
        return;
      }
      try{
        setLoading(true)

        const result = await axios.post('/api/settings',{ownerId:id,businessName,supportEmail,data})
        console.log(result.data)
        setLoading(false)
        toast.success('Settings saved')
      }catch(err){
        console.log(`Error in handleSetting func  ${err}`)
        setLoading(false)
        toast.error('Failed to save')
      }
    }

    const handleClearData = ()=>{
      setBusinessName('')
      setSupportEmail('')
      setData('')
      setLoading(false)
      toast.success('Data cleared')
    }

    useEffect(()=>{
      
      const fetchData = async()=>{
          try{

            const {data} = await axios.post('/api/settings/get',{ownerId:id});

            setBusinessName(data.businessName);
            setSupportEmail(data.supportEmail);
            setData(data.data)

          }catch(err){
            console.log('Error while fetching business data : ',err)
            toast.error('Failed to get data')
          }
      }

      if(id){

        fetchData()
      }

      return ()=>{}
      
    },[id])
 
  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900">
      <motion.div
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.7 }}
        className="fixed z-50 top-0 left-0 w-full bg-white/70 backdrop-blur-xl border-b border-zinc-100"
      >
        <div className="max-w-6xl mx-auto px-10 h-16 flex items-center justify-between">
          <div onClick={()=>router.push('/')} className="text-lg font-semibold tracking-tight cursor-pointer">
            Support <span className="text-zinc-400">AI</span>
          </div>

          <button
          onClick={()=>router.push('/embed')}
          className='px-4 py-2 text-sm rounded-lg border border-zinc-300 transition hover:bg-zinc-100'
          >Embed Chatbot</button>

        </div>
      </motion.div>

      <div className='flex justify-center px-4 py-25'>
        <motion.div
         className='w-full max-w-3xl p-10 bg-white shadow-xl rounded-2xl'
        >

          <div className='mb-8'>
            <h1 className='text-2xl font-semibold'>
               Chatbot Settings
            </h1>
            <p className='text-sm text-zinc-500 mt-1 font-medium'>Manage your AI chatbot knowledge and business details.</p>
          </div>

          <div className='mb-8'>
            <h2 className='text-lg font-medium mb-4'>Business Details</h2>

            <div className='space-y-4'>

              <input
                className='w-full rounded-xl px-4 py-2 border border-zinc-300 text-sm focus:outline-none focus:ring-2 focus:ring-black/50'
                placeholder='Business name'
                type='text'
                value={businessName}
                onChange={(e)=>setBusinessName(e.target.value)}
                required
              />

              <input
                className='w-full rounded-xl px-4 py-2 border border-zinc-300 text-sm focus:outline-none focus:ring-2 focus:ring-black/50'
                placeholder='Support Email'
                type='text'
                value={supportEmail}
                onChange={(e)=>setSupportEmail(e.target.value)}
                required
              />

            </div>

          </div>

          <div className='mb-8'>
            <h2 className='text-lg font-medium mb-1'>Knowledge Base</h2>
            <p className='text-sm font-medium text-zinc-600'>Add your own business data here</p>

            <div className=' mt-4 space-y-4'>

              <textarea
                className='w-full rounded-xl min-h-10 h-40 overflow-y-auto   px-5 py-2.5 border border-zinc-300 text-sm focus:outline-none focus:ring-2 focus:ring-black/50'
                placeholder='Chatbot data'
                value={data}
                onChange={(e)=>setData(e.target.value)}
                required
              />

            </div>

          </div>

          <div className='flex items-center gap-5'>
            <motion.button
            whileHover={{scale:1.05}}
            disabled={loading}
            whileTap={{scale:0.95}}
            onClick={handleSettings}
            className='px-7 py-2.5 rounded-xl bg-black text-white font-medium text-sm hover:bg-zinc-700 transition disabled:opacity-60'
            >
             {
              loading ? 
              <div className='inline-flex items-center gap-2'>
                <Loader2Icon className='size-4 animate-spin'/>
                <span>Saving...</span>
              </div>
              :
              <span>Save</span>
             }

            </motion.button>

           {(businessName || supportEmail || data) &&   <motion.button
            onClick={handleClearData}
             whileHover={{scale:1.05}}
             whileTap={{scale:0.95}}
             className='px-5 py-2.5 rounded-xl bg-white border border-zinc-300 text-sm font-medium text-zinc-800 transition hover:bg-zinc-100 '
            >
              <span>Clear</span>

            </motion.button>}

          </div>

        </motion.div>
      </div>
    </div>
  );
};

export default DashboardClient;
