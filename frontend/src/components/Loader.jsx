import React from "react";

const Loader = () => {
    return (
        <div className="relative flex items-center justify-center">
            <div className="w-24 h-24 border-2 border-blue-500/20 rounded-full"></div>

            <div className="absolute w-16 h-16 border-t-2 border-r-2 border-blue-500 rounded-full animate-spin"></div>

            <div className="absolute w-2 h-2 bg-blue-400 rounded-full shadow-[0_0_15px_rgba(59,130,246,0.5)]"></div>

            <div className="absolute -top-4 w-1 h-32 bg-linear-to-b from-transparent via-blue-500/50 to-transparent left-12 animate-[pulse_2s_infinite]"></div>
        </div>
    );
};

export default Loader;