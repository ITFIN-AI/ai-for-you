import Link from 'next/link';

export default function Header() {
  return (
    <header className="w-full py-4 px-6 md:px-12 flex items-center justify-between bg-transparent absolute top-0 left-0 z-10">
      <div className="flex items-center">
        <Link href="/" className="text-2xl font-bold text-white">
          AI for You
        </Link>
      </div>
      <nav className="hidden md:flex space-x-6">
  
      </nav>
    </header>
  );
} 