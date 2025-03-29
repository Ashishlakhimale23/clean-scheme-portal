
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { 
  Bell, Search, Filter, Star, Clock, CheckCircle2, AlertCircle, User, FileText
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import DashboardSidebar from '@/components/DashboardSidebar';

const Dashboard = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeTab, setActiveTab] = useState("recommended");
  const { toast } = useToast();
  
  useEffect(() => {
    // Simulate loading user data
    setTimeout(() => {
      setIsLoaded(true);
      toast({
        title: "Welcome back!",
        description: "You have 3 new scheme recommendations",
      });
    }, 1000);
  }, [toast]);
  
  const recommendedSchemes = [
    {
      id: "pm-kisan-samman-nidhi",
      title: "PM Kisan Samman Nidhi",
      category: "Agriculture",
      eligibility: "Small and marginal farmers with landholding up to 2 hectares",
      benefit: "₹6,000 per year as direct income support in three installments",
      status: "Eligible",
      deadline: "December 31, 2023",
    },
    {
      id: "national-pension-scheme",
      title: "National Pension Scheme",
      category: "Financial",
      eligibility: "Indian citizens between 18-65 years",
      benefit: "Tax benefits and pension after retirement",
      status: "Eligible",
      deadline: "Open throughout the year",
    },
    {
      id: "sukanya-samriddhi-yojana",
      title: "Sukanya Samriddhi Yojana",
      category: "Financial",
      eligibility: "Parents of girl child below 10 years",
      benefit: "8.4% interest rate and tax benefits under section 80C",
      status: "Eligible",
      deadline: "Open throughout the year",
    },
  ];
  
  const appliedSchemes = [
    {
      id: "pm-awas-yojana",
      title: "PM Awas Yojana",
      category: "Housing",
      appliedOn: "October 10, 2023",
      status: "Under Review",
      lastUpdated: "October 15, 2023",
    },
    {
      id: "ayushman-bharat",
      title: "Ayushman Bharat",
      category: "Healthcare",
      appliedOn: "September 5, 2023",
      status: "Approved",
      lastUpdated: "September 20, 2023",
    },
  ];
  
  const savedSchemes = [
    {
      id: "startup-india-seed-fund",
      title: "Startup India Seed Fund",
      category: "Entrepreneurship",
      savedOn: "November 1, 2023",
      deadline: "December 15, 2023",
    },
    {
      id: "digital-india-skill-development",
      title: "Digital India Skill Development",
      category: "Skill Development",
      savedOn: "October 25, 2023",
      deadline: "January 31, 2024",
    },
    {
      id: "jan-dhan-yojana",
      title: "Jan Dhan Yojana",
      category: "Financial",
      savedOn: "October 20, 2023",
      deadline: "Open throughout the year",
    },
  ];
  
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16 flex-1">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <DashboardSidebar />
          
          {/* Main Content */}
          <div className="flex-1">
            {/* Welcome Banner */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
              <div className="flex items-start justify-between">
                <div>
                  <h1 className="text-2xl font-bold font-display mb-2">Welcome back, Anuj</h1>
                  <p className="text-gray-600">
                    Here's what's happening with your government schemes
                  </p>
                </div>
                <div className="relative">
                  <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors">
                    <Bell className="h-5 w-5 text-gray-600" />
                    <span className="absolute top-0 right-0 h-3 w-3 bg-red-500 rounded-full"></span>
                  </button>
                </div>
              </div>
              
              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                <div className="bg-blue-50 rounded-lg p-4">
                  <div className="text-blue-600 mb-2 font-semibold">Eligible Schemes</div>
                  <div className="text-2xl font-bold">12</div>
                </div>
                <div className="bg-green-50 rounded-lg p-4">
                  <div className="text-green-600 mb-2 font-semibold">Applied</div>
                  <div className="text-2xl font-bold">2</div>
                </div>
                <div className="bg-purple-50 rounded-lg p-4">
                  <div className="text-purple-600 mb-2 font-semibold">Approved</div>
                  <div className="text-2xl font-bold">1</div>
                </div>
                <div className="bg-amber-50 rounded-lg p-4">
                  <div className="text-amber-600 mb-2 font-semibold">Saved</div>
                  <div className="text-2xl font-bold">3</div>
                </div>
              </div>
            </div>
            
            {/* Search and Filter */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  placeholder="Search for schemes"
                  className="pl-10"
                />
              </div>
              <div className="flex gap-3">
                <Select>
                  <SelectTrigger className="w-[140px]">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="agriculture">Agriculture</SelectItem>
                    <SelectItem value="education">Education</SelectItem>
                    <SelectItem value="healthcare">Healthcare</SelectItem>
                    <SelectItem value="housing">Housing</SelectItem>
                    <SelectItem value="financial">Financial</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" className="flex items-center gap-2">
                  <Filter className="h-4 w-4" />
                  Filter
                </Button>
              </div>
            </div>
            
            {/* Tabs */}
            <Tabs defaultValue="recommended" className="w-full" onValueChange={setActiveTab}>
              <TabsList className="grid grid-cols-3 mb-8">
                <TabsTrigger value="recommended">Recommended</TabsTrigger>
                <TabsTrigger value="applied">Applied</TabsTrigger>
                <TabsTrigger value="saved">Saved</TabsTrigger>
              </TabsList>
              
              <TabsContent value="recommended">
                <div className="space-y-4">
                  {recommendedSchemes.map((scheme) => (
                    <div 
                      key={scheme.id}
                      className="bg-white rounded-lg shadow-sm border border-gray-100 p-5 transition-all hover:shadow-md"
                    >
                      <div className="flex flex-col md:flex-row md:items-center justify-between">
                        <div>
                          <Link to={`/scheme/${scheme.id}`} className="block">
                            <h3 className="text-lg font-semibold hover:text-gov-blue transition-colors">{scheme.title}</h3>
                          </Link>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
                              {scheme.category}
                            </span>
                            <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded flex items-center gap-1">
                              <CheckCircle2 className="h-3 w-3" /> {scheme.status}
                            </span>
                          </div>
                          <div className="mt-3 text-sm text-gray-600">
                            <div className="mb-1"><strong>Eligibility:</strong> {scheme.eligibility}</div>
                            <div><strong>Benefit:</strong> {scheme.benefit}</div>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-3 mt-4 md:mt-0">
                          <div className="text-sm text-gray-500 flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            <span>Deadline: {scheme.deadline}</span>
                          </div>
                          <Link to={`/scheme/${scheme.id}`}>
                            <Button>Apply Now</Button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="applied">
                <div className="space-y-4">
                  {appliedSchemes.map((scheme) => (
                    <div 
                      key={scheme.id}
                      className="bg-white rounded-lg shadow-sm border border-gray-100 p-5 transition-all hover:shadow-md"
                    >
                      <div className="flex flex-col md:flex-row md:items-center justify-between">
                        <div>
                          <Link to={`/scheme/${scheme.id}`} className="block">
                            <h3 className="text-lg font-semibold hover:text-gov-blue transition-colors">{scheme.title}</h3>
                          </Link>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
                              {scheme.category}
                            </span>
                            {scheme.status === "Approved" ? (
                              <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded flex items-center gap-1">
                                <CheckCircle2 className="h-3 w-3" /> {scheme.status}
                              </span>
                            ) : (
                              <span className="bg-amber-100 text-amber-800 text-xs font-medium px-2.5 py-0.5 rounded flex items-center gap-1">
                                <Clock className="h-3 w-3" /> {scheme.status}
                              </span>
                            )}
                          </div>
                          <div className="mt-3 text-sm text-gray-600">
                            <div className="mb-1"><strong>Applied On:</strong> {scheme.appliedOn}</div>
                            <div><strong>Last Updated:</strong> {scheme.lastUpdated}</div>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-3 mt-4 md:mt-0">
                          <Link to={`/scheme/${scheme.id}`}>
                            <Button variant="outline">View Details</Button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="saved">
                <div className="space-y-4">
                  {savedSchemes.map((scheme) => (
                    <div 
                      key={scheme.id}
                      className="bg-white rounded-lg shadow-sm border border-gray-100 p-5 transition-all hover:shadow-md"
                    >
                      <div className="flex flex-col md:flex-row md:items-center justify-between">
                        <div>
                          <Link to={`/scheme/${scheme.id}`} className="block">
                            <h3 className="text-lg font-semibold hover:text-gov-blue transition-colors">{scheme.title}</h3>
                          </Link>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
                              {scheme.category}
                            </span>
                            <span className="bg-purple-100 text-purple-800 text-xs font-medium px-2.5 py-0.5 rounded flex items-center gap-1">
                              <Star className="h-3 w-3" /> Saved
                            </span>
                          </div>
                          <div className="mt-3 text-sm text-gray-600">
                            <div className="mb-1"><strong>Saved On:</strong> {scheme.savedOn}</div>
                            <div><strong>Deadline:</strong> {scheme.deadline}</div>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-3 mt-4 md:mt-0">
                          <Link to={`/scheme/${scheme.id}`}>
                            <Button>Apply Now</Button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Dashboard;
