import React from "react";

const Result = ({ result, onReset, previewUrl }) => {
    if (!result) return null;

    const { prediction, confidence } = result;
    const isReal = prediction.toUpperCase() === "REAL";


    return (
        <div className="w-full max-w-2xl mx-auto glass-morphism rounded-2xl md:rounded-3xl overflow-hidden animate-float">
            <div className="flex flex-col md:flex-row h-full">
                {/* Image Preview Side */}
                <div className="w-full md:w-1/2 relative bg-black/40 p-3 md:p-4">
                    <img
                        src={previewUrl}
                        alt="Analyzed"
                        className="w-full h-auto object-contain rounded-xl md:rounded-2xl shadow-2xl border border-white/5"
                    />
                    <div className="absolute top-6 right-6 md:top-8 md:right-8">
                        <div className={`px-3 py-1 md:px-4 md:py-1.5 rounded-full border backdrop-blur-md text-[10px] md:text-xs font-bold uppercase tracking-widest ${isReal ? "bg-green-500/20 border-green-500/50 text-green-400" : "bg-red-500/20 border-red-500/50 text-red-400"
                            }`}>
                            Candidate
                        </div>
                    </div>

                    {result.shap_url && (
                        <div className="mt-4 md:mt-6 animate-in fade-in slide-in-from-bottom-2 duration-1000 delay-700">
                            <h3 className="text-white/40 text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] mb-3">Model Interpretability (SHAP)</h3>
                            <div className="relative group/shap">
                                <img
                                    src={result.shap_url}
                                    alt="SHAP Explanation"
                                    className="w-full h-auto rounded-xl border border-white/10 bg-black/30 shadow-2xl group-hover/shap:border-blue-500/30 transition-all duration-500"
                                />
                                <div className="mt-2 text-[10px] md:text-[11px] text-zinc-400 italic leading-snug p-2 rounded-lg bg-white/5 border border-white/5">
                                    Feature attribution heatmap. Highlights area of interest used by the AI to make this decision.
                                 </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Analysis Results Side */}
                <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col justify-between space-y-6 md:space-y-0 text-left">
                    <div>
                        {result.face_crop_url ? (
                            <div className="flex justify-between items-start mb-4 md:mb-6 animate-in fade-in duration-500">
                                <div>
                                    <h3 className="text-white/40 text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] mb-1">Detection Result</h3>
                                    <h2 className={`text-3xl md:text-4xl font-black ${isReal ? "text-green-500" : "text-red-500"}`}>
                                        {prediction}
                                    </h2>
                                </div>
                                <div className="text-right">
                                    <h3 className="text-white/40 text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] mb-1">Confidence</h3>
                                    <h2 className="text-2xl md:text-3xl font-black text-white">{confidence}%</h2>
                                </div>
                            </div>
                        ) : (
                            <div className="mb-6 p-4 rounded-xl bg-orange-500/10 border border-orange-500/20 text-orange-400">
                                <p className="text-xs font-bold uppercase tracking-widest flex items-center gap-2">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                                    Warning: Low Detection Fidelity
                                </p>
                                <p className="text-[11px] opacity-70 mt-1 leading-relaxed">
                                    Our MTCNN engine could not isolate a human face. Results may be unreliable for this media type.
                                </p>
                            </div>
                        )}


                        <div className="space-y-4 md:space-y-6">
                            <div className={`mt-2 px-3 py-1.5 rounded-lg border flex items-center gap-2 text-[10px] md:text-xs font-bold uppercase tracking-wider ${result.face_crop_url ? "bg-blue-500/10 border-blue-500/20 text-blue-400" : "bg-zinc-500/10 border-white/10 text-zinc-500"
                                }`}>
                                <div className={`w-1.5 h-1.5 rounded-full ${result.face_crop_url ? "bg-blue-500 animate-pulse" : "bg-zinc-600"}`}></div>
                                {result.face_crop_url ? "System: Face Detected" : "System: No face detected"}
                            </div>


                            {result.face_crop_url && (
                                <div className="animate-in fade-in duration-700 delay-200">
                                    <div className="flex justify-between mb-2">
                                        <span className="text-[10px] md:text-xs font-medium text-white/50">Probabilistic Mapping</span>
                                        <span className={`text-[10px] md:text-xs font-bold ${isReal ? "text-green-400" : "text-red-400"}`}>
                                            {isReal ? "Authentic" : "Synthesized"}
                                        </span>
                                    </div>
                                    <div className="w-full bg-white/5 rounded-full h-2 overflow-hidden border border-white/5 p-px">
                                        <div
                                            className={`h-full rounded-full transition-all duration-1000 ease-out ${isReal ? "bg-linear-to-r from-green-600 to-emerald-400" : "bg-linear-to-r from-red-600 to-rose-400"
                                                }`}
                                            style={{ width: `${confidence}%` }}
                                        ></div>
                                    </div>
                                </div>
                            )}

                            {result.description && (
                                <div className="mt-8 pt-6 border-t border-white/5 animate-in fade-in slide-in-from-bottom-2 duration-1000 delay-500">
                                    <h3 className="text-white/40 text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] mb-3">AI Image Context</h3>
                                    <p className="text-sm md:text-base text-zinc-300 italic leading-relaxed border-l-2 border-blue-500/30 pl-4 bg-blue-500/5 py-3 rounded-r-xl">
                                        "{result.description}"
                                    </p>
                                </div>
                            )}


                        </div>
                    </div>

                    <button
                        onClick={onReset}
                        className="mt-4 md:mt-8 group w-full bg-white/5 border border-white/10 hover:border-white/20 hover:bg-white/10 text-white font-bold py-3 md:py-4 rounded-xl md:rounded-2xl transition-all duration-300 flex items-center justify-center gap-2 md:gap-3"
                    >
                        <svg className="w-4 h-4 md:w-5 md:h-5 group-hover:rotate-180 transition-transform duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                        </svg>
                        Scan Another
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Result;