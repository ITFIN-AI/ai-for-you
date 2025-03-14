import { Playfair_Display } from 'next/font/google';
import { Code, Lightbulb, Workflow, Zap } from 'lucide-react';

const playfair = Playfair_Display({ 
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500'],
  style: ['normal'],
});

interface FeatureCardProps {
  title: string;
  icon: React.ReactNode;
  bgColor: string;
  iconColor: string;
}

function FeatureCard({ title, icon, bgColor, iconColor }: FeatureCardProps) {
  return (
    <div className="flex flex-col items-center p-8 rounded-lg bg-white shadow-lg hover:shadow-xl transition-shadow">
      <div className={`${bgColor} w-20 h-20 rounded-lg flex items-center justify-center mb-6`}>
        <div className={`${iconColor} w-10 h-10`}>
          {icon}
        </div>
      </div>
      <h3 className="text-xl font-semibold mb-3 text-center">{title}</h3>
    </div>
  );
}

export default function Features() {
  return (
    <section id="features" className="py-20 px-6 md:px-12 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <h2 className={`${playfair.className} text-3xl md:text-4xl font-bold text-center mb-16`}>
          Key Features
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <FeatureCard 
            title="AI-Powered Solutions" 
            icon={<Zap className="w-full h-full" />}
            bgColor="bg-pink-500"
            iconColor="text-white"
          />
          <FeatureCard 
            title="Custom Automation" 
            icon={<Code className="w-full h-full" />}
            bgColor="bg-gray-200"
            iconColor="text-indigo-600"
          />
          <FeatureCard 
            title="Workflow Optimization" 
            icon={<Workflow className="w-full h-full" />}
            bgColor="bg-gray-200"
            iconColor="text-blue-600"
          />
          <FeatureCard 
            title="Innovative Ideas" 
            icon={<Lightbulb className="w-full h-full" />}
            bgColor="bg-indigo-500"
            iconColor="text-white"
          />
        </div>
        
        <div className="text-center mt-12 text-gray-600">
          Image inspired by Freepik
        </div>
      </div>
    </section>
  );
} 