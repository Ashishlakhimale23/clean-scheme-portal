
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, ChevronRight, Book, Home, Heart, GraduationCap, Briefcase, Leaf, Landmark } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { 
  Pagination, 
  PaginationContent, 
  PaginationItem, 
  PaginationLink, 
  PaginationNext, 
  PaginationPrevious 
} from '@/components/ui/pagination';

// Mock data for schemes
const allSchemes = [
  {
    id: "pm-kisan-samman-nidhi",
    title: "PM Kisan Samman Nidhi",
    category: "Agriculture",
    eligibility: "Small and marginal farmers with landholding up to 2 hectares",
    benefit: "₹6,000 per year as direct income support in three installments",
    icon: <Leaf className="h-5 w-5 text-green-600" />,
    color: "#16a34a",
    deadline: "Open throughout the year",
    ministry: "Ministry of Agriculture & Farmers Welfare"
  },
  {
    id: "national-education-scholarship",
    title: "National Education Scholarship",
    category: "Education",
    eligibility: "Students from economically weaker sections with annual family income less than ₹2.5 lakh",
    benefit: "Full tuition fee waiver and monthly stipend of ₹2,500",
    icon: <GraduationCap className="h-5 w-5 text-blue-600" />,
    color: "#2563eb",
    deadline: "September 30, 2023",
    ministry: "Ministry of Education"
  },
  {
    id: "pm-awas-yojana",
    title: "PM Awas Yojana",
    category: "Housing",
    eligibility: "Houseless people and those living in kutcha/dilapidated houses",
    benefit: "Financial assistance up to ₹1.5 lakh for construction of pucca house",
    icon: <Home className="h-5 w-5 text-orange-600" />,
    color: "#ea580c",
    deadline: "December 31, 2023",
    ministry: "Ministry of Housing and Urban Affairs"
  },
  {
    id: "ayushman-bharat",
    title: "Ayushman Bharat",
    category: "Healthcare",
    eligibility: "Poor and vulnerable families as per SECC database",
    benefit: "Health coverage up to ₹5 lakh per family per year for secondary and tertiary care",
    icon: <Heart className="h-5 w-5 text-rose-600" />,
    color: "#e11d48",
    deadline: "Open throughout the year",
    ministry: "Ministry of Health and Family Welfare"
  },
  {
    id: "startup-india-seed-fund",
    title: "Startup India Seed Fund",
    category: "Entrepreneurship",
    eligibility: "Early stage startups with innovative ideas and scalable business models",
    benefit: "Seed funding up to ₹25 lakh and mentorship support",
    icon: <Briefcase className="h-5 w-5 text-purple-600" />,
    color: "#9333ea",
    deadline: "March 31, 2024",
    ministry: "Ministry of Commerce and Industry"
  },
  {
    id: "digital-india-skill-development",
    title: "Digital India Skill Development",
    category: "Skill Development",
    eligibility: "Unemployed youth between 18-35 years",
    benefit: "Free training in digital skills and job placement assistance",
    icon: <Book className="h-5 w-5 text-indigo-600" />,
    color: "#4f46e5",
    deadline: "Monthly intake",
    ministry: "Ministry of Electronics and Information Technology"
  },
  {
    id: "jan-dhan-yojana",
    title: "Jan Dhan Yojana",
    category: "Financial",
    eligibility: "Any Indian citizen without a bank account",
    benefit: "Zero-balance bank account with RuPay debit card and ₹1 lakh accident insurance cover",
    icon: <Landmark className="h-5 w-5 text-indigo-600" />,
    color: "#4f46e5",
    deadline: "Open throughout the year",
    ministry: "Ministry of Finance"
  },
  {
    id: "mudra-loan-scheme",
    title: "MUDRA Loan Scheme",
    category: "Financial",
    eligibility: "Small entrepreneurs and businesses",
    benefit: "Loans up to ₹10 lakh without collateral for small business setup",
    icon: <Landmark className="h-5 w-5 text-indigo-600" />,
    color: "#4f46e5",
    deadline: "Open throughout the year",
    ministry: "Ministry of Finance"
  },
  {
    id: "kisan-credit-card",
    title: "Kisan Credit Card",
    category: "Agriculture",
    eligibility: "All farmers, tenant farmers, sharecroppers, and self-help groups",
    benefit: "Short-term credit for cultivation and other farm needs at subsidized interest rates",
    icon: <Leaf className="h-5 w-5 text-green-600" />,
    color: "#16a34a",
    deadline: "Open throughout the year",
    ministry: "Ministry of Agriculture & Farmers Welfare"
  },
  {
    id: "national-health-mission",
    title: "National Health Mission",
    category: "Healthcare",
    eligibility: "All citizens, with focus on rural areas and vulnerable sections",
    benefit: "Free healthcare services, maternal and child health programs",
    icon: <Heart className="h-5 w-5 text-rose-600" />,
    color: "#e11d48",
    deadline: "Open throughout the year",
    ministry: "Ministry of Health and Family Welfare"
  },
  {
    id: "mid-day-meal-scheme",
    title: "Mid-Day Meal Scheme",
    category: "Education",
    eligibility: "Children studying in Classes I-VIII in government schools",
    benefit: "Free hot cooked meal to school children to enhance enrollment and attendance",
    icon: <GraduationCap className="h-5 w-5 text-blue-600" />,
    color: "#2563eb",
    deadline: "School academic year",
    ministry: "Ministry of Education"
  },
  {
    id: "national-social-assistance-program",
    title: "National Social Assistance Program",
    category: "Social Welfare",
    eligibility: "Elderly persons, widows, and persons with disabilities living below poverty line",
    benefit: "Monthly pension ranging from ₹200 to ₹500",
    icon: <Heart className="h-5 w-5 text-rose-600" />,
    color: "#e11d48",
    deadline: "Open throughout the year",
    ministry: "Ministry of Rural Development"
  }
];

const BrowseSchemes = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredSchemes, setFilteredSchemes] = useState(allSchemes);
  const { toast } = useToast();
  
  const schemesPerPage = 5;
  
  useEffect(() => {
    // Simulate loading data
    setTimeout(() => {
      setIsLoaded(true);
      toast({
        title: "Schemes loaded",
        description: `${allSchemes.length} schemes available to browse`,
      });
    }, 1000);
  }, [toast]);
  
  useEffect(() => {
    // Filter schemes based on search query and category
    let filtered = allSchemes;
    
    if (searchQuery) {
      filtered = filtered.filter(scheme => 
        scheme.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        scheme.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        scheme.eligibility.toLowerCase().includes(searchQuery.toLowerCase()) ||
        scheme.benefit.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    if (selectedCategory) {
      filtered = filtered.filter(scheme => 
        scheme.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }
    
    setFilteredSchemes(filtered);
    setCurrentPage(1); // Reset to first page when filters change
  }, [searchQuery, selectedCategory]);
  
  // Get current schemes for pagination
  const indexOfLastScheme = currentPage * schemesPerPage;
  const indexOfFirstScheme = indexOfLastScheme - schemesPerPage;
  const currentSchemes = filteredSchemes.slice(indexOfFirstScheme, indexOfLastScheme);
  const totalPages = Math.ceil(filteredSchemes.length / schemesPerPage);
  
  // Category options for filtering
  const categoryOptions = [
    { value: "", label: "All Categories" },
    { value: "agriculture", label: "Agriculture" },
    { value: "education", label: "Education" },
    { value: "healthcare", label: "Healthcare" },
    { value: "housing", label: "Housing" },
    { value: "entrepreneurship", label: "Entrepreneurship" },
    { value: "skill development", label: "Skill Development" },
    { value: "financial", label: "Financial" },
    { value: "social welfare", label: "Social Welfare" }
  ];
  
  // Get icon by category
  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case "agriculture":
        return <Leaf className="h-4 w-4 text-green-600" />;
      case "education":
        return <GraduationCap className="h-4 w-4 text-blue-600" />;
      case "healthcare":
        return <Heart className="h-4 w-4 text-rose-600" />;
      case "housing":
        return <Home className="h-4 w-4 text-orange-600" />;
      case "entrepreneurship":
        return <Briefcase className="h-4 w-4 text-purple-600" />;
      case "skill development":
        return <Book className="h-4 w-4 text-indigo-600" />;
      case "financial":
        return <Landmark className="h-4 w-4 text-indigo-600" />;
      default:
        return <Book className="h-4 w-4 text-gray-600" />;
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16 flex-1">
        <div className="max-w-4xl mx-auto">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold font-display mb-2">Browse All Schemes</h1>
            <p className="text-gray-600">
              Discover government schemes available across various sectors
            </p>
          </div>
          
          {/* Search and Filter */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  placeholder="Search for schemes by name, category, eligibility..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-full md:w-[180px]">
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  {categoryOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button 
                variant="outline" 
                className="flex items-center gap-2"
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("");
                }}
              >
                Reset Filters
              </Button>
            </div>
            
            {/* Results summary */}
            <div className="mt-4 text-sm text-gray-600">
              {isLoaded ? `Showing ${currentSchemes.length} of ${filteredSchemes.length} schemes` : "Loading schemes..."}
            </div>
          </div>
          
          {/* Schemes List */}
          <div className="space-y-4">
            {currentSchemes.map((scheme) => (
              <div 
                key={scheme.id}
                className="bg-white rounded-lg shadow-sm border border-gray-100 p-5 transition-all hover:shadow-md"
              >
                <div className="flex flex-col gap-4">
                  <div className="flex justify-between">
                    <Badge 
                      className="flex items-center gap-1" 
                      style={{ backgroundColor: `${scheme.color}20`, color: scheme.color }}
                    >
                      {getCategoryIcon(scheme.category)}
                      {scheme.category}
                    </Badge>
                    <div className="text-sm text-gray-500">
                      Deadline: {scheme.deadline}
                    </div>
                  </div>
                  
                  <Link to={`/scheme/${scheme.id}`} className="block">
                    <h2 className="text-xl font-semibold hover:text-gov-blue transition-colors">
                      {scheme.title}
                    </h2>
                  </Link>
                  
                  <div className="text-sm text-gray-500">
                    {scheme.ministry}
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h3 className="text-sm font-medium text-gray-700">Eligibility</h3>
                      <p className="text-sm text-gray-600 mt-1">{scheme.eligibility}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-700">Benefit</h3>
                      <p className="text-sm text-gray-600 mt-1">{scheme.benefit}</p>
                    </div>
                  </div>
                  
                  <div className="flex justify-end">
                    <Link to={`/scheme/${scheme.id}`}>
                      <Button className="flex items-center gap-1">
                        View Details
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
            
            {/* Empty state */}
            {filteredSchemes.length === 0 && isLoaded && (
              <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-8 text-center">
                <h3 className="text-lg font-medium text-gray-700 mb-2">No schemes found</h3>
                <p className="text-gray-600 mb-4">
                  Try adjusting your search or filter criteria
                </p>
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedCategory("");
                  }}
                >
                  Reset Filters
                </Button>
              </div>
            )}
            
            {/* Loading state */}
            {!isLoaded && (
              <div className="space-y-4">
                {[...Array(3)].map((_, index) => (
                  <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-100 p-5 animate-pulse">
                    <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
                    <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2 mb-6"></div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <div className="h-4 bg-gray-200 rounded w-1/3 mb-2"></div>
                        <div className="h-3 bg-gray-200 rounded w-full"></div>
                      </div>
                      <div>
                        <div className="h-4 bg-gray-200 rounded w-1/3 mb-2"></div>
                        <div className="h-3 bg-gray-200 rounded w-full"></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          {/* Pagination */}
          {filteredSchemes.length > 0 && (
            <Pagination className="mt-8">
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious 
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                  />
                </PaginationItem>
                
                {[...Array(totalPages)].map((_, index) => (
                  <PaginationItem key={index}>
                    <PaginationLink
                      isActive={currentPage === index + 1}
                      onClick={() => setCurrentPage(index + 1)}
                    >
                      {index + 1}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                
                <PaginationItem>
                  <PaginationNext 
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          )}
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default BrowseSchemes;
