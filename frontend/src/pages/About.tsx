import Navbar from "@/components/Navbar"
import { motion } from "framer-motion"


const About = () => {

    return(
        <>  
            <Navbar/>
            <section className="bg-gradient-to-br from-purple-7 00 via-blue-400 to-green-500  py-[6%]">
                <motion.div 
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="container mx-auto px-6 lg:px-20">
                {/* Título */}
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold text-gray-800 mb-4">About Us</h2>
                        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                            We are a team of passionate individuals committed to delivering the best products and services to our customers.
                        </p>
                </div>

                {/* Conteú do com imagem e texto */}
                <div className="flex flex-col lg:flex-row items-center gap-12">
                {/* Imagem */}
                <div className="lg:w-1/2">
                    <img
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbuFI0ggshYjvA3bWM3Uml49LVkIVWgcfzyg&s"
                        alt="Foto Japinha"
                        className="rounded-xl shadow-lg w-full"
                    />
                </div>

                    {/* Texto */}
                    <div className="lg:w-1/2">
                        <h3 className="text-2xl font-semibold text-gray-800 mb-4">Our Mission</h3>
                            <p className="text-gray-600 mb-6">
                                Our mission is to create innovative solutions that improve lives and make everyday tasks easier. We believe in quality, integrity, and customer satisfaction.
                            </p>
                        <h3 className="text-2xl font-semibold text-gray-800 mb-4">Our Values</h3>
                            <ul className="list-disc list-inside text-gray-600 space-y-2">
                                <li>Customer First</li>
                                <li>Innovation & Creativity</li>
                                <li>Integrity & Transparency</li>
                                <li>Continuous Improvement</li>
                            </ul>
                        </div>
                    </div>
                </motion.div>
            </section>
            <section>

            </section>
        </>
    )

}

export default About