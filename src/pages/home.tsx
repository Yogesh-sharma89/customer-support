"use client";
import Navbar from "@/components/navbar";
import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { useRouter } from "next/navigation";

const Homepage = ({ email }: { email: string| null }) => {
  const [open, setOpen] = useState(false);
  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (divRef.current && !divRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleLogin = () => {
    window.location.href = "/api/auth/login";
  };

  const router = useRouter()

  const features = [
  {
    title: 'Plug and Play',
    desc: 'Add the chatbot to your website instantly using a simple script tag.'
  },
  {
    title: 'Admin Controlled',
    desc: 'You stay in full control of what the AI knows and how it responds.'
  },
  {
    title: 'Trained on Your Data',
    desc: 'Answers are generated using your own business knowledge, not generic AI.'
  },
  {
    title: 'Instant Responses',
    desc: 'Provide real-time answers to your customers, 24/7 without delays.'
  },
  {
    title: 'Secure by Design',
    desc: 'Your data is protected with enterprise-grade security and privacy.'
  },
  {
    title: 'Easy Customization',
    desc: 'Match the chatbot’s appearance and behavior to your brand in minutes.'
  }
];


  return (
    <div
      className="min-h-screen bg-linear-to-br from-white to-zinc-50 tex-zinc-900 overflow-x-hidden"
      ref={divRef}
    >
      <Navbar email={email} open={open} setOpen={setOpen} />
      <div className="pt-30 pb-25 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
          <motion.div className="">
            <motion.h1 className="text-4xl md:text-5xl font-semibold leading-tight flex flex-col">
              <motion.span
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                className="text-transparent bg-clip-text bg-linear-to-tr from-blue-600 via-cyan-500 to-teal-400"
              >
                AI Customer Support
              </motion.span>

              <motion.span
                className="text-transparent bg-clip-text bg-linear-to-r from-zinc-600 via-blue-400 to-cyan-400

"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1 }}
              >
                Built for Modern Websites
              </motion.span>
            </motion.h1>
            <motion.p
              className="mt-6 text-lg max-w-lg text-zinc-600 font-medium"
              initial={{ opacity: 0, x: -70 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.1 }}
            >
              Add a powerful AI chatbot to your website in minutes. Deliver
              instant, accurate answers trained on your business knowledge.
            </motion.p>
            <div className="mt-10 flex items-center gap-8">
              {email ? (
                <button className="px-7 py-2.5 rounded-xl font-medium bg-black text-white hover:bg-zinc-800 disabled:opacity-50"
                onClick={()=>router.push('/dashboard')}
                >
                  Dashboard
                </button>
              ) : (
                <button
                  className="px-7 py-2.5 rounded-xl font-medium bg-black text-white hover:bg-zinc-800 disabled:opacity-50"
                  onClick={handleLogin}
                >
                  Get started
                </button>
              )}
              <a href="#feature" className="px-7 py-2.5 rounded-xl font-medium text-zinc-700 border border-zinc-300 bg-zinc-100 hover:bg-zinc-200 transition">
                Learn more
              </a>
            </div>
          </motion.div>

          <motion.div
          className="relative"
          initial={{opacity:0,scale:0.9}}
          animate={{opacity:1,scale:1}}
          transition={{duration:0.6,delay:0.2}}
          >

            <div className="rounded-2xl bg-white shadow-2xl border border-zinc-200 p-6">
                <div className="text-sm text-zinc-600 mb-3">Live chat preview</div>

                <div className="space-y-4">

                    <div className="bg-zinc-100 rounded-lg px-5 w-fit ml-auto text-left py-2 text-sm">
                      Do you offer cash on delivery?
                    </div>

                    <div className="text-sm text-white bg-black px-5 py-2 rounded-lg  w-fit ">
                     yes , cash on delivery is available
                    </div>

                    <div>

                    </div>

                </div>

               <motion.div
                animate={{y:[0,-12,0]}}
                transition={{repeat:Infinity,duration:3}}
                className="absolute -bottom-6 -right-4 rounded-full size-14 flex bg-black text-white items-center justify-center"
               >
                   🗨️
                </motion.div>

            </div>

          </motion.div>

        </div>
      </div>
      <section id="feature" className="bg-zinc-100 py-25 px-6 border-t border-zinc-200">
        <div className="max-w-6xl mx-auto">

            <motion.h1 className="text-3xl font-semibold text-center"
            initial={{opacity:0,y:30}}
            whileInView={{opacity:1,y:0}}
            transition={{duration:0.65}}
            >
                Why Businesses Choose <span className="text-transparent bg-clip-text bg-linear-to-tr from-blue-600 via-cyan-500 to-teal-400">Support AI</span>
            </motion.h1>

            <div className="mt-15 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 md:gap-10">

              {
                features.map((item,i)=>(
                    <motion.div key={item.title}
                    className="bg-white  p-8 rounded-2xl shadow-xl border border-zinc-200"
                    initial={{
                        opacity:0,
                        y:30
                    }}
                    whileInView={{opacity:1,y:0}}
                    transition={{delay:i*0.2,duration:0.5}}
                    >

                      <h2 className="text-lg font-medium">
                        {item.title}
                      </h2>
                      <p className="text-sm mt-3 text-zinc-600">{item.desc}</p>

                    </motion.div>
                ))
              }

            </div>

        </div>
      </section>
      <footer className="py-10 text-center text-lg font-medium text-zinc-600">
        <p>&copy; {new Date().getFullYear()} Support AI . All rights reserved</p>
      </footer>
    </div>
  );
};

export default Homepage;
