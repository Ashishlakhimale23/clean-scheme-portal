
import { useState } from 'react';
import { Search } from 'lucide-react';

export const SearchBar = () => {
  const [isFocused, setIsFocused] = useState(false);
  
  return (
    <div 
      className={`
        flex items-center w-full h-14 px-5 py-3 bg-white rounded-full border
        transition-all duration-300 ease-in-out 
        ${isFocused 
          ? 'shadow-lg border-gov-blue/30 ring-4 ring-gov-blue/10' 
          : 'shadow-card border-gray-200 hover:border-gray-300'
        }
      `}
    >
      <Search className="h-5 w-5 text-gray-500 mr-3" />
      <input 
        type="text" 
        placeholder="Search for schemes, benefits, or keywords..."
        className="flex-1 bg-transparent outline-none text-gray-800 placeholder:text-gray-400"
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
      <button className="ml-2 px-4 py-1.5 bg-gov-lightBlue text-white rounded-full text-sm font-medium transition-colors hover:bg-gov-blue">
        Search
      </button>
    </div>
  );
};
