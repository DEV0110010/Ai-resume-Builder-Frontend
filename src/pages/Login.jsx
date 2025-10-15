import { Lock, Mail, User2Icon } from 'lucide-react'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import api from "../configs/api";
import { useDispatch } from 'react-redux';
import { login } from '../app/features/authSlice';
import toast from 'react-hot-toast';

const Login = () => {
    const dispatch = useDispatch()
    const query = new URLSearchParams(window.location.search)
    const urlState = query.get('state')
    const [state, setState] = useState(urlState || "login")
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    })

    // This function remains unchanged
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const {data} = await api.post(`/api/users/${state}`,formData)
            dispatch(login(data))
            localStorage.setItem('token', data.token)
            toast.success(data.message)
        } catch (error) {
            toast.error(error?.response?.data?.message || error.message)
        }
    }

    // This function remains unchanged
    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const formVariants = {
        hidden: { opacity: 0, y: -50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeInOut" } },
    };
    
    // This variant is for the content inside the input container for a smooth fade
    const nameInputContentVariants = {
        hidden: { opacity: 0, y: -10 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
        exit: { opacity: 0, y: 10, transition: { duration: 0.2 } }
    };

    return (
        // Added the animated-gradient class for the background
        <div className='flex items-center justify-center min-h-screen animated-gradient'>
            <motion.form
                // Add framer-motion props for the entrance animation
                variants={formVariants}
                initial="hidden"
                animate="visible"
                onSubmit={handleSubmit}
                className="sm:w-[380px] w-full text-center border border-gray-300/60 rounded-2xl p-8 bg-white/90 backdrop-blur-sm shadow-2xl"
            >
                {/* Use AnimatePresence to handle text transitions */}
                <AnimatePresence mode="wait">
                    <motion.h1
                        key={state} // Key tells framer-motion this is a new element
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        transition={{ duration: 0.2 }}
                        className="text-gray-900 text-3xl font-medium"
                    >
                        {state === "login" ? "Welcome Back!" : "Create Account"}
                    </motion.h1>
                </AnimatePresence>

                <p className="text-gray-500 text-sm mt-2">Please {state === "login" ? "login" : "sign up"} to continue</p>
                
                {/* A container for all inputs to manage layout and spacing */}
                <div className="mt-6 space-y-4">
                    <AnimatePresence>
                        {state !== "login" && (
                            <motion.div
                                // The layout prop is key to a smooth size animation
                                layout
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.3, ease: "easeInOut" }}
                            >
                                <motion.div 
                                    variants={nameInputContentVariants} 
                                    initial="hidden" 
                                    animate="visible" 
                                    exit="exit"
                                    className="flex items-center w-full bg-white border border-gray-300/80 h-12 rounded-full overflow-hidden pl-6 gap-2 focus-within:ring-2 focus-within:ring-green-500 transition-all"
                                >
                                    <User2Icon size={16} color='#6B7280' />
                                    <input type="text" name="name" placeholder="Name" className="border-none outline-none ring-0 w-full bg-transparent" value={formData.name} onChange={handleChange} required />
                                </motion.div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <motion.div layout transition={{ duration: 0.3, ease: "easeInOut" }}>
                        <div className="flex items-center w-full bg-white border border-gray-300/80 h-12 rounded-full overflow-hidden pl-6 gap-2 focus-within:ring-2 focus-within:ring-green-500 transition-all">
                            <Mail size={13} color='#6B7280' />
                            <input type="email" name="email" placeholder="Email id" className="border-none outline-none ring-0 w-full bg-transparent" value={formData.email} onChange={handleChange} required />
                        </div>
                    </motion.div>

                    <motion.div layout transition={{ duration: 0.3, ease: "easeInOut" }}>
                        <div className="flex items-center w-full bg-white border border-gray-300/80 h-12 rounded-full overflow-hidden pl-6 gap-2 focus-within:ring-2 focus-within:ring-green-500 transition-all">
                            <Lock size={13} color='#6B7280' />
                            <input type="password" name="password" placeholder="Password" className="border-none outline-none ring-0 w-full bg-transparent" value={formData.password} onChange={handleChange} required />
                        </div>
                    </motion.div>
                </div>

                <AnimatePresence>
                {state === "login" && (
                     <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="mt-4 text-left text-green-500"
                    >
                        <button className="text-sm font-medium" type="button">Forget password?</button>
                    </motion.div>
                )}
                </AnimatePresence>

                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    type="submit"
                    className="mt-6 w-full h-11 rounded-full text-white bg-green-500 hover:opacity-90 transition-opacity font-semibold"
                >
                    {state === "login" ? "Login" : "Sign up"}
                </motion.button>

                <p className="text-gray-500 text-sm mt-4 mb-8">
                    {state === "login" ? "Don't have an account?" : "Already have an account?"}
                    <button
                        type="button"
                        onClick={() => setState(prev => prev === "login" ? "register" : "login")}
                        className="text-green-500 hover:underline font-medium ml-1"
                    >
                        Click here
                    </button>
                </p>
            </motion.form>
        </div>
    )
}

export default Login