import { Playfair_Display } from 'next/font/google';

const playfair = Playfair_Display({ 
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500', '700'],
  style: ['normal'],
});

export default function Hero() {
  return (
    <section className="relative w-full min-h-screen flex flex-col items-center justify-center text-center px-6 py-20 overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-purple-900 via-indigo-800 to-blue-900 -z-10"></div>
      <div className="absolute top-0 left-0 w-full h-full bg-dotted-grid -z-10"></div>
      
      {/* Decorative circles */}
      <div className="absolute top-[-10%] left-[-5%] w-[300px] h-[300px] rounded-full bg-purple-600/30 blur-3xl -z-10"></div>
      <div className="absolute bottom-[-10%] right-[-5%] w-[400px] h-[400px] rounded-full bg-blue-600/30 blur-3xl -z-10"></div>
      <div className="absolute top-[30%] right-[10%] w-[200px] h-[200px] rounded-full bg-indigo-500/20 blur-2xl -z-10"></div>
      
      {/* Content */}
      <h1 className={`${playfair.className} text-4xl md:text-5xl lg:text-7xl font-bold text-white mb-8 max-w-4xl`}>
        Share your idea
      </h1>
      <p className="text-xl md:text-2xl text-white/90 max-w-3xl mb-12">
        Tell me what You want to automate in your daily workflow and I will use AI to create this online tool for You
      </p>
      <button 
        id="get-started-btn"
        className="px-10 py-4 bg-white text-purple-900 font-medium rounded-full hover:bg-purple-100 transition-all shadow-lg transform hover:scale-105 duration-200 text-lg"
      >
        Get Started
      </button>
    </section>
  );
} 