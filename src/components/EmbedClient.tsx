'use client'

import { useRouter } from "next/navigation"

import {motion} from 'motion/react';
import { useState } from "react";
import { BotIcon, CheckIcon, CopyIcon,  CrossIcon } from "lucide-react";
import toast from "react-hot-toast";

const EmbedClient = ({ownerId}:{ownerId:string}) => {

  const router = useRouter();
  const [copy,setCopy] = useState(false)

  const embedCode = `
   <script 
      src=${process.env.NEXT_PUBLIC_BASE_URL}/chatbot.js
      data-owner-id = ${ownerId}>
    </script>
  `

  const copyCode = ()=>{
    navigator.clipboard.writeText(embedCode)
    setCopy(true)
    toast.success('copied to clipboard.')
    setTimeout(()=>setCopy(false),3000)

  }
  

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900">

        <div className="sticky top-0 z-50 backdrop-blur-xl bg-white border-b border-zinc-200">

            <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">

                 <div onClick={()=>router.push('/')} className='text-lg font-semibold tracking-tight cursor-pointer'>
                      Support  <span className='text-zinc-400'>AI</span>
                </div>

                <button onClick={()=>router.push('/dashboard')}
                 className="px-5 py-2 rounded-lg text-white text-sm font-medium bg-black hover:bg-zinc-800 transition-all disabled:opacity-50 flex items-center justify-center cursor-pointer"    
                >Back to Dashboard</button>

            </div>

        </div>

        <div className="flex items-center justify-center px-4 py-10">

            <motion.div
            initial={{opacity:0,y:30}}
            animate={{opacity:1,y:0}}
            transition={{duration:0.5}}
            className="max-w-4xl w-full bg-white rounded-xl shadow-2xl p-10"
            >

                <motion.h1 
                 initial={{opacity:0,y:25}}
                 animate={{opacity:1,y:0}}
                 transition={{duration:0.6}}
                 className="text-2xl font-semibold mb-2">Embed Chatbot
                 </motion.h1>

                 <motion.p
                 initial={{opacity:1,y:35}}
                 animate={{opacity:1,y:0}}
                 transition={{duration:0.7}}
                 className="text-sm font-medium text-zinc-700">Copy and paste this code before <code> &lt;/body&gt; </code> </motion.p>

                 <div
                 className="relative bg-zinc-900 text-zinc-100 font-medium rounded-xl p-4 text-sm mt-4 mb-6"
                 >
                    <pre>
                        {embedCode}
                    </pre>

                    <button className="absolute top-3 right-3 bg-white rounded-xl py-1.5 px-3 text-zinc-900 hover:bg-zinc-200 transition"
                    onClick={copyCode}
                    >
                      
                       <div className="inline-flex items-center gap-2 ">
                          { 

                            !copy ? <CopyIcon className="size-4"/> : <CheckIcon className="size-4"/>
                          }
                          <span>
                            {copy ? 'copied':'copy'}
                          </span>
                       </div>    
                    
                    </button>

                 </div>

                 <div>

                    <h2 className="text-lg font-medium text-zinc-800 mb-1.5">Steps to follow</h2>

                    <ol className="space-y-2 text-sm text-zinc-600 list-decimal list-inside">
                        <li>Copy the embed script</li>
                        <li>Paste it before closing the body tag</li>
                        <li>Reload your webpage</li>
                    </ol>

                  </div>

                  <div className="mt-12">

                    <h2 className="text-lg font-semibold mb-1">Live Preview</h2>
                    <p className="text-sm text-zinc-500 font-medium mb-6">This is how your chatbot will appear on your webpage</p>

                    <div className="rounded-xl border border-zinc-300 bg-white shadow-md overflow-hidden">

                        <div className="flex items-center gap-2 px-4 h-10 border-b border-b-zinc-300 bg-zinc-100">

                            <span className="size-2.5 rounded-full bg-red-400"/>
                            <span className="size-2.5 rounded-full bg-yellow-400"/>
                            <span className="size-2.5 rounded-full bg-green-400"/>
                            <span className="text-xs text-zinc-600 ml-5">Your-website.com</span>
                        </div>

                        <div className="relative text-zinc-500 text-sm h-64 sm:h-72 p-6">

                            Here is your webpage

                            <div className="absolute rounded-xl w-72 bottom-19 right-7 border border-zinc-300 shadow-xl bg-white overflow-hidden">
                              <div className="flex  text-white text-xs items-center justify-between px-4 py-3 bg-black">
                                    <span className="font-medium text-[14px]">Customer Support</span>
                                    <span className="text-[18px] text-white leading-1">✕</span>
                              </div>

                              <div className="p-3 space-y-5 bg-zinc-100">
                                <div className="bg-zinc-200 font-medium text-zinc-800 text-xs rounded-lg w-fit py-3 px-2.5">
                                    Hi! How can i help you ? 
                                </div>
                                <div className="bg-black text-white font-medium text-xs rounded-lg w-fit py-3 px-2.5 ml-auto w-fit">
                                   What is the return policy ?
                                </div>

                              </div>
                            

                           </div>

                           <motion.div
                            animate={{y:[0,-8,0]}}
                            transition={{repeat:Infinity,duration:2}}
                            className="absolute  bottom-5 right-6 shadow-2xl cursor-pointer rounded-full size-14 flex bg-black text-white items-center justify-center"
                            >
                                <BotIcon className="size-8 text-white"/>
                            </motion.div>


                        </div>

                        
                    </div>

                  </div>



            </motion.div>

        </div>
      
    </div>
  )
}

export default EmbedClient
