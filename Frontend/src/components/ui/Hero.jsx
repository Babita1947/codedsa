import React from 'react'
import { Link } from 'react-router';
const Hero = () => {
    return (
        <div className="relative isolate px-6 lg:px-8">
            {/* Background Shape 1 */}
            <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80" aria-hidden="true">
                <div 
                    className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
                    style={{clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)'}}
                ></div>
            </div>

            <div className="mx-auto max-w-2xl sm:py-32 md:py-52">
                {/* Announcement */}
                <div className="hidden sm:mb-8 sm:flex sm:justify-center">
                    <div className="relative rounded-full px-3 py-1 text-sm/6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
                        Get started with our  and start solving problems.
                        <a href="#" className="font-semibold text-primary">
                            <span className="absolute inset-0" aria-hidden="true"></span> 
                            Learn more
                            <span aria-hidden="true">&rarr;</span>
                        </a>
                    </div>
                </div>

                {/* Main Hero Content */}
                <div className="text-center">
                    <h1 className="text-5xl font-semibold tracking-tight text-gray-900 sm:text-7xl">
                        Master Coding Challenges with Our Platform
                    </h1>
                    <p className="mt-8 text-lg font-medium text-gray-500 sm:text-xl">
                        Solve problems, track progress, and challenge yourself with coding exercises across various topics and difficulty levels.
                    </p>
                    <div className="mt-10 flex items-center justify-center gap-x-6">
                        <Link to="/signup" className="rounded-md bg-primary px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">
                            Get Started
                        </Link>
                        <Link to="/about" className="text-sm/6 font-semibold text-gray-900">
                            Learn More 
                            <span aria-hidden="true">→</span>
                        </Link>
                    </div>
                </div>
            </div>

            {/* Background Shape 2 */}
            <div className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]" aria-hidden="true">
                <div 
                    className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
                    style={{clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)'}}
                ></div>
            </div>
        </div>
    )
}

export default Hero;