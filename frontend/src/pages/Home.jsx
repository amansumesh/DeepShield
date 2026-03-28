import React, { useState, useEffect } from "react";
import UploadBox from "../components/UploadBox";
import Result from "./Result";
import Loader from "../components/Loader";

const Home = () => {
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    const [titleText, setTitleText] = useState("");
    const fullTitle = "Verify Digital Authenticity.";

    useEffect(() => {
        let index = 0;
        const interval = setInterval(() => {
            setTitleText(fullTitle.substring(0, index));
            index++;
            if (index > fullTitle.length) {
                clearInterval(interval);
            }
        }, 100);
        return () => clearInterval(interval);
    }, []);

    const handleUpload = async (file) => {
        setLoading(true);
        setResult(null);
        setPreviewUrl(URL.createObjectURL(file));

        const formData = new FormData();
        formData.append("file", file);

        try {
            const res = await fetch("http://127.0.0.1:8000/predict", {
                method: "POST",
                body: formData,
            });

            const data = await res.json();
            setResult(data);
        } catch (err) {
            console.error("Error uploading image:", err);
        } finally {
            setLoading(false);
        }
    };

    const handleReset = () => {
        setResult(null);
        setPreviewUrl(null);
        setLoading(false);
    };

    return (
        <div className="min-h-[70vh] flex flex-col items-center justify-center py-10 md:py-20 px-4 relative">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-80 md:h-[500px] bg-blue-600/10 blur-[80px] md:blur-[120px] rounded-full -z-10"></div>

            <div className="max-w-4xl w-full text-center space-y-8 md:space-y-12">
                {!result && !loading && (
                    <div className="space-y-6 md:space-y-8 animate-in fade-in slide-in-from-bottom-5 duration-1000">
                        <div className="flex justify-center">
                            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] md:text-xs font-bold uppercase tracking-[0.3em]">
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                                </span>
                                ResNet-50 Powered Detection
                            </span>
                        </div>
                        <h1 className="text-5xl md:text-8xl font-bold tracking-tight text-white leading-[1] min-h-[1.2em]">
                            {titleText.split(" ").map((word, i, arr) => (
                                <span key={i} className={i === arr.length - 1 ? "text-gradient-blue block md:inline" : "text-white inline-block mr-3 md:mr-4"}>
                                    {word}
                                </span>
                            ))}
                        </h1>
                        <p className="text-lg md:text-2xl text-zinc-400 max-w-3xl mx-auto font-light leading-relaxed px-4">
                            Harnessing advanced neural networks to safeguard digital integrity. <br className="hidden md:block" />
                            Detect manipulations with mathematical precision.
                        </p>
                    </div>
                )}


                <div className="relative z-10 w-full">
                    {loading ? (
                        <div className="flex flex-col items-center gap-6 md:gap-8 py-10 md:py-20">
                            <Loader />
                            <div className="space-y-2 md:space-y-3 px-4">
                                <h3 className="text-xl md:text-2xl font-bold text-white animate-pulse">Analyzing Pixels...</h3>
                                <p className="text-white/40 text-xs md:text-sm">Scanning for digital inconsistencies.</p>
                            </div>
                        </div>
                    ) : result ? (
                        <div className="animate-in zoom-in-95 duration-500 w-full">
                            <Result result={result} onReset={handleReset} previewUrl={previewUrl} />
                        </div>
                    ) : (
                        <UploadBox onUpload={handleUpload} />
                    )}
                </div>

                {!result && !loading && (
                    <div className="pt-8 md:pt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-8 text-left animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-300">
                        <div className="glass-morphism p-5 md:p-6 rounded-2xl group transition-all hover:border-white/20">
                            <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-400 mb-3 md:mb-4 group-hover:bg-blue-500 group-hover:text-white transition-colors">
                                <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                            </div>
                            <h4 className="text-white font-bold mb-1 md:mb-2 text-sm md:text-base">Real-time Detection</h4>
                            <p className="text-white/40 text-xs md:text-sm leading-relaxed">Instant GPU-accelerated processing.</p>
                        </div>
                        <div className="glass-morphism p-5 md:p-6 rounded-2xl group transition-all hover:border-white/20">
                            <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg bg-cyan-500/10 flex items-center justify-center text-cyan-400 mb-3 md:mb-4 group-hover:bg-cyan-500 group-hover:text-white transition-colors">
                                <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                            </div>
                            <h4 className="text-white font-bold mb-1 md:mb-2 text-sm md:text-base">Privacy First</h4>
                            <p className="text-white/40 text-xs md:text-sm leading-relaxed">Images analyzed in memory.</p>
                        </div>
                        <div className="glass-morphism p-5 md:p-6 rounded-2xl group transition-all hover:border-white/20 sm:col-span-2 md:col-span-1">
                            <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg bg-indigo-500/10 flex items-center justify-center text-indigo-400 mb-3 md:mb-4 group-hover:bg-indigo-500 group-hover:text-white transition-colors">
                                <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.628.285a2 2 0 01-1.96 0l-.628-.285a6 6 0 00-3.86-.517l-2.387.477a2 2 0 00-1.022.547l-1.16 1.16a2 2 0 000 2.828l1.16 1.16a2 2 0 001.022.547l2.387.477a6 6 0 003.86-.517l.628-.285a2 2 0 011.96 0l.628.285a6 6 0 003.86-.517l2.387-.477a2 2 0 001.022-.547l1.16-1.16a2 2 0 000-2.828l-1.16-1.16z" /></svg>
                            </div>
                            <h4 className="text-white font-bold mb-1 md:mb-2 text-sm md:text-base">ResNet-50</h4>
                            <p className="text-white/40 text-xs md:text-sm leading-relaxed">Hierarchical feature detection.</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Home;