
import { useState, useEffect } from 'react';
import { Search, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <nav 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 px-6 py-4 transition-all duration-300 ease-in-out",
        isScrolled 
          ? "bg-white/70 backdrop-blur-md shadow-sm"
          : "bg-transparent"
      )}
    >
      <div className="container mx-auto">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="h-10 w-10 rounded-md bg-gov-blue flex items-center justify-center">
              <span className="text-white font-display font-bold text-lg">G</span>
            </div>
            <span className={cn(
              "font-display font-semibold text-xl transition-colors",
              isScrolled ? "text-gray-900" : "text-white"
            )}>GovSchemes</span>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <a href="#" className={cn(
              "font-medium hover:text-gov-blue link-animation",
              isScrolled ? "text-gray-700" : "text-white"
            )}>Home</a>
            <a href="#" className={cn(
              "font-medium hover:text-gov-blue link-animation",
              isScrolled ? "text-gray-700" : "text-white"
            )}>Schemes</a>
            <a href="#" className={cn(
              "font-medium hover:text-gov-blue link-animation",
              isScrolled ? "text-gray-700" : "text-white"
            )}>Eligibility</a>
            <a href="#" className={cn(
              "font-medium hover:text-gov-blue link-animation",
              isScrolled ? "text-gray-700" : "text-white"
            )}>Resources</a>
            <a href="#" className={cn(
              "font-medium hover:text-gov-blue link-animation",
              isScrolled ? "text-gray-700" : "text-white"
            )}>Contact</a>
          </div>
          
          <div className="hidden md:flex items-center space-x-4">
            <button className={cn(
              "p-2 rounded-full transition-colors",
              isScrolled ? "hover:bg-gray-100 text-gray-700" : "hover:bg-white/10 text-white"
            )}>
              <Search className="h-5 w-5" />
            </button>
            <Button className="button-animation bg-gov-blue text-white hover:bg-gov-blue/90">
              Log In
            </Button>
          </div>
          
          <button 
            className={cn(
              "md:hidden p-2 rounded-full transition-colors",
              isScrolled ? "hover:bg-gray-100 text-gray-700" : "hover:bg-white/10 text-white"
            )}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
        
        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow-lg rounded-b-2xl mt-1 p-5 animate-slide-up">
            <div className="flex flex-col space-y-4">
              <a href="#" className="font-medium text-gray-700 hover:text-gov-blue px-2 py-2 rounded-md hover:bg-gray-50 transition-colors">Home</a>
              <a href="#" className="font-medium text-gray-700 hover:text-gov-blue px-2 py-2 rounded-md hover:bg-gray-50 transition-colors">Schemes</a>
              <a href="#" className="font-medium text-gray-700 hover:text-gov-blue px-2 py-2 rounded-md hover:bg-gray-50 transition-colors">Eligibility</a>
              <a href="#" className="font-medium text-gray-700 hover:text-gov-blue px-2 py-2 rounded-md hover:bg-gray-50 transition-colors">Resources</a>
              <a href="#" className="font-medium text-gray-700 hover:text-gov-blue px-2 py-2 rounded-md hover:bg-gray-50 transition-colors">Contact</a>
              <Button className="w-full button-animation bg-gov-blue text-white hover:bg-gov-blue/90">
                Log In
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
