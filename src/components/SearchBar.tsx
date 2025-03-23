
import { useState } from 'react';
import { Sparkle, Search } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';

export const SearchBar = () => {
  const [isFocused, setIsFocused] = useState(false);
  const [searchText, setSearchText] = useState('');
  
  return (
    <div 
      className={cn(
        "flex items-center w-full h-14 px-5 py-3 bg-white rounded-full border",
        "transition-all duration-300 ease-in-out",
        isFocused 
          ? 'shadow-lg border-gov-blue/30 ring-4 ring-gov-blue/10' 
          : 'shadow-card border-gray-200 hover:border-gray-300'
      )}
    >
      <div className="flex items-center justify-center h-5 w-5 mr-3">
        {isFocused ? (
          <Search className="h-5 w-5 text-gov-blue animate-fade-in" />
        ) : (
          <Sparkle className="h-5 w-5 text-gov-blue animate-pulse" />
        )}
      </div>
      
      <div className="flex-1 relative">
        <Input
          type="text"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="w-full bg-transparent border-none shadow-none outline-none text-gray-800 placeholder:text-gray-400 focus-visible:ring-0 focus-visible:ring-offset-0 px-0 py-0 h-auto"
          placeholder="Search for schemes, benefits, or keywords..."
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
        
        {!isFocused && !searchText && (
          <div className="absolute inset-y-0 left-0 right-0 flex items-center justify-between pointer-events-none">
            <span className="text-gray-400">Discover government schemes...</span>
            <span className="text-xs text-gov-blue bg-gov-blue/10 px-2 py-1 rounded-full">Press / to search</span>
          </div>
        )}
      </div>
      
      <button className="ml-2 px-4 py-1.5 bg-gov-lightBlue text-white rounded-full text-sm font-medium transition-colors hover:bg-gov-blue">
        Search
      </button>
    </div>
  );
};
