import React, { useState, useRef } from "react";

const UploadBox = ({ onUpload }) => {
    const [dragging, setDragging] = useState(false);
    const fileInputRef = useRef(null);

    const handleDragOver = (e) => {
        e.preventDefault();
        setDragging(true);
    };

    const handleDragLeave = () => {
        setDragging(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setDragging(false);
        const file = e.dataTransfer.files[0];
        if (file && file.type.startsWith("image/")) {
            onUpload(file);
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            onUpload(file);
        }
    };

    return (
        <div
            className="relative group cursor-pointer w-full max-w-2xl mx-auto px-4 my-8"
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
        >
            {/* Main Container */}
            <div className={`
                relative flex flex-col items-center justify-center
                p-12 md:p-16 rounded-[2.5rem] overflow-hidden
                backdrop-blur-3xl bg-zinc-950/40
                transition-all duration-500 ease-out border
                ${dragging ? 'scale-[1.02] border-blue-400/50 bg-zinc-900/60' : 'border-white/5 hover:border-white/10 hover:scale-[1.01] hover:bg-zinc-900/40'}
            `}>

                <svg className="absolute inset-0 w-full h-full pointer-events-none rounded-[2.5rem]" xmlns="http://www.w3.org/2000/svg">
                    <rect
                        width="100%" height="100%" rx="40"
                        fill="none" stroke={dragging ? "rgba(96, 165, 250, 0.6)" : "rgba(255,255,255,0.15)"}
                        strokeWidth="2" strokeDasharray="12 12"
                        strokeLinecap="round"
                        className={`transition-all duration-500`}
                    />
                </svg>

                {dragging && (
                    <div className="absolute top-0 left-0 w-full h-1 bg-blue-500 shadow-[0_0_20px_5px_rgba(59,130,246,0.8)] animate-scan pointer-events-none z-20"></div>
                )}

                <div className="relative z-10 flex flex-col items-center gap-6">
                    {/* Icon Container with multiple rings */}
                    <div className="relative flex items-center justify-center mb-2">
                        <div className={`
                            relative z-10 flex items-center justify-center w-20 h-20 rounded-2xl md:w-24 md:h-24
                            backdrop-blur-xl border transition-all duration-500 overflow-hidden shadow-2xl
                            ${dragging ? 'bg-blue-500/20 text-blue-300 scale-110 border-blue-400/50' : 'bg-white/5 text-white/60 border-white/10 group-hover:text-white group-hover:bg-white/10 group-hover:-translate-y-2 group-hover:border-white/20'}
                        `}>
                            <div className="absolute inset-0 bg-linear-to-tr from-blue-500/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                            <svg className={`w-10 h-10 md:w-12 md:h-12 relative z-10 transition-transform duration-500 ${dragging ? 'scale-110 translate-y-[-2px]' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                            </svg>
                        </div>
                    </div>

                    <div className="space-y-3 text-center">
                        <h3 className={`text-2xl md:text-3xl font-bold tracking-tight transition-all duration-300 ${dragging ? 'text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-cyan-300 scale-105' : 'text-white'}`}>
                            {dragging ? "Release to Analyze" : "Upload your image"}
                        </h3>
                        <p className="text-sm md:text-base text-gray-400 max-w-sm mx-auto">
                            Drag and drop your file here, or <span className="text-blue-400 font-medium group-hover:text-blue-300 transition-colors">browse</span> to choose a file
                        </p>
                    </div>

                    <div className="flex gap-3 items-center flex-wrap justify-center mt-2 opacity-80 group-hover:opacity-100 transition-opacity">
                        {['PNG', 'JPG', 'JPEG', 'WEBP'].map(ext => (
                            <span key={ext} className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-[11px] font-semibold tracking-wider text-gray-400 group-hover:border-white/30 group-hover:text-gray-300 transition-all duration-300 hover:bg-white/10">
                                {ext}
                            </span>
                        ))}
                    </div>
                </div>

                <input
                    type="file"
                    ref={fileInputRef}
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                />
            </div>
        </div>
    );
};

export default UploadBox;