export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="py-8 px-6 md:px-12 bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="mb-4 md:mb-0">
          <h3 className="text-xl font-bold">AI for You</h3>
          <p className="text-gray-400 mt-1">Automating your workflow with AI</p>
        </div>
        
        <div className="text-gray-400 text-sm">
          &copy; {currentYear} AI for You. All rights reserved.
        </div>
      </div>
    </footer>
  );
} 