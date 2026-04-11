import React from 'react'

const About = () => {
    return (
        <div className="container mx-auto px-4 py-20 max-w-4xl">
            <div className="space-y-12 animate-in fade-in slide-in-from-bottom-5 duration-700">
                <div className="space-y-4">
                    <h1 className="text-4xl md:text-6xl font-black text-white">About the <span className="text-gradient">Model.</span></h1>
                    <p className="text-xl text-white/50 font-medium leading-relaxed">
                        DeepShield is a high-precision deepfake detection system leveraging the Residual Network (ResNet-50) architecture to identify subtle artifacts in synthesized media.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="glass-morphism p-8 rounded-3xl space-y-4">
                        <h3 className="text-xl font-bold text-white">Neural Architecture</h3>
                        <p className="text-white/40 leading-relaxed text-sm">
                            DeepShield utilizes a <span className="text-blue-400 font-semibold">ResNet-50</span> backbone pretrained on ImageNet. For optimal performance, we unfroze the final two residual blocks (Layer 3 and Layer 4) and appended a custom classification head featuring a <span className="text-zinc-300 font-medium">0.5 Dropout layer</span> to prevent overfitting.
                        </p>
                    </div>
                    <div className="glass-morphism p-8 rounded-3xl space-y-4">
                        <h3 className="text-xl font-bold text-white">Training Dataset</h3>
                        <p className="text-white/40 leading-relaxed text-sm">
                            The engine was trained on a massive dataset of <span className="text-blue-400 font-semibold">140,002 images</span> spanning multiple generation methods. We employed class-weighted CrossEntropyLoss to maintain high sensitivity across both "Fake" and "Real" classes during the 15-epoch training cycle.
                        </p>
                    </div>
                </div>

                <div className="glass-morphism p-8 md:p-12 rounded-3xl space-y-8 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
                        <svg className="w-32 h-32" fill="currentColor" viewBox="0 0 24 24"><path d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
                        <div>
                            <h4 className="text-white/40 text-[10px] uppercase tracking-[0.2em] font-bold mb-2">Test Accuracy</h4>
                            <h2 className="text-4xl font-black text-white">87.59%</h2>
                        </div>
                        <div>
                            <h4 className="text-white/40 text-[10px] uppercase tracking-[0.2em] font-bold mb-2">Recall (Fake)</h4>
                            <h2 className="text-4xl font-black text-green-500">98%</h2>
                        </div>
                        <div>
                            <h4 className="text-white/40 text-[10px] uppercase tracking-[0.2em] font-bold mb-2">Precision (Real)</h4>
                            <h2 className="text-4xl font-black text-blue-400">97%</h2>
                        </div>
                    </div>

                    <div className="space-y-4 border-t border-white/5 pt-8">
                        <h2 className="text-2xl font-bold text-white">Advanced Preprocessing</h2>
                        <p className="text-white/40 leading-relaxed text-sm max-w-2xl">
                            Our pipeline integrates <span className="text-zinc-200">MTCNN (Multi-task Cascaded Convolutional Networks)</span> for adaptive face detection. Each detected face is normalized using ImageNet statistics and resized to a 224x224 tensor, ensuring that model inference focuses purely on high-fidelity facial features rather than background noise.
                        </p>
                    </div>

                    <div className="flex gap-4">
                        <div className="bg-white/5 border border-white/10 px-6 py-3 rounded-xl flex items-center gap-3">
                            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                            <span className="text-sm text-white/60 font-medium tracking-tight">System Status: Active</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default About
