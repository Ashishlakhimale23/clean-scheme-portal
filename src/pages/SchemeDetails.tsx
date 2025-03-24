
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronLeft, Calendar, MapPin, Users, Check, ExternalLink, Clock, FileText, AlertCircle, Download, Info } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Checkbox } from '@/components/ui/checkbox';

// Mock data for scheme details
const schemeData = {
  "pm-kisan-samman-nidhi": {
    title: "PM Kisan Samman Nidhi",
    category: "Agriculture",
    shortDescription: "Direct income support of ₹6,000 per year for small and marginal farmers.",
    description: "The Pradhan Mantri Kisan Samman Nidhi (PM-KISAN) is a Central Sector scheme with 100% funding from Government of India. Under the scheme, an income support of ₹6,000 per year is provided to all landholding farmer families across the country in three equal installments of ₹2,000 every four months.",
    eligibility: [
      "Small and marginal farmers across India with cultivable landholding up to 2 hectares",
      "The benefit will be provided to the farmer family and defined as husband, wife and minor children",
      "State/UT Government and UT administration will identify the farmers who are eligible for support as per scheme guidelines",
      "Excluded categories include institutional landholders, farmer families holding constitutional posts, professionals, etc."
    ],
    benefit: "₹6,000 per year as direct income support in three installments",
    documents: [
      "Aadhaar Card",
      "Land Records/Papers",
      "Bank Account Details",
      "Passport Size Photograph",
      "Caste Certificate (if applicable)"
    ],
    applicationProcess: "Application can be submitted online through PM Kisan portal or through Common Service Centers. Farmers can also apply through Agriculture Department offices in their respective districts.",
    deadline: "Ongoing scheme with quarterly payments",
    website: "https://pmkisan.gov.in/",
    department: "Department of Agriculture, Cooperation & Farmers Welfare",
    contact: "Toll-Free Number: 1800-11-5526",
    color: "#16a34a",
    faqs: [
      {
        question: "How is the amount distributed?",
        answer: "The amount of ₹6,000 per year is paid in three equal installments of ₹2,000 each, every four months."
      },
      {
        question: "Can landless laborers apply for this scheme?",
        answer: "No, only farmers with landholding up to 2 hectares are eligible under the scheme."
      },
      {
        question: "How can I check my application status?",
        answer: "You can check your application status on the PM-KISAN portal (pmkisan.gov.in) by entering your Aadhaar number or account number."
      }
    ]
  },
  "national-education-scholarship": {
    title: "National Education Scholarship",
    category: "Education",
    shortDescription: "Financial assistance to meritorious students from economically weaker sections.",
    description: "The National Education Scholarship aims to provide financial assistance to meritorious students from economically weaker sections to enable them to pursue higher education. The scholarship covers tuition fees and provides a monthly stipend for educational expenses.",
    eligibility: [
      "Students from families with annual income less than ₹2.5 lakh",
      "Minimum 70% marks in qualifying examination",
      "Enrolled in recognized institutions in India",
      "Not receiving any other scholarship for the same purpose"
    ],
    benefit: "Full tuition fee waiver and monthly stipend of ₹2,500",
    documents: [
      "Income Certificate",
      "Mark Sheets of Previous Examination",
      "Aadhaar Card",
      "Bank Account Details",
      "Institution Verification Form",
      "Domicile Certificate"
    ],
    applicationProcess: "Applications can be submitted online through the National Scholarship Portal. Students need to register, fill in the application form, upload required documents, and submit for verification.",
    deadline: "Usually between August and October each year",
    website: "https://scholarships.gov.in/",
    department: "Ministry of Education",
    contact: "Email: help-scholarships@gov.in",
    color: "#2563eb",
    faqs: [
      {
        question: "Is this scholarship available for all courses?",
        answer: "Yes, it's available for recognized undergraduate and postgraduate courses in arts, science, commerce, engineering, medicine, etc."
      },
      {
        question: "How is the scholarship amount disbursed?",
        answer: "The scholarship amount is directly transferred to the beneficiary's bank account through Direct Benefit Transfer (DBT)."
      },
      {
        question: "Can I renew the scholarship for next academic year?",
        answer: "Yes, the scholarship can be renewed based on satisfactory academic performance (minimum 60% marks) in the previous year."
      }
    ]
  }
};

const SchemeDetails = () => {
  const { schemeId } = useParams<{ schemeId: string }>();
  const [scheme, setScheme] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [eligibilityCheck, setEligibilityCheck] = useState<Record<string, boolean>>({});
  const [isEligible, setIsEligible] = useState<boolean | null>(null);
  
  useEffect(() => {
    // Simulate API call to fetch scheme details
    setTimeout(() => {
      if (schemeId && schemeData[schemeId as keyof typeof schemeData]) {
        const data = schemeData[schemeId as keyof typeof schemeData];
        setScheme(data);
        
        // Initialize eligibility checkboxes
        const initialEligibility: Record<string, boolean> = {};
        data.eligibility.forEach((_: string, index: number) => {
          initialEligibility[index] = false;
        });
        setEligibilityCheck(initialEligibility);
      }
      setIsLoading(false);
    }, 800);
  }, [schemeId]);
  
  // Check if user is eligible based on selected criteria
  useEffect(() => {
    if (Object.keys(eligibilityCheck).length === 0) return;
    
    const allChecked = Object.values(eligibilityCheck).every(value => value === true);
    setIsEligible(allChecked);
  }, [eligibilityCheck]);
  
  const handleEligibilityChange = (index: string, checked: boolean) => {
    setEligibilityCheck(prev => ({
      ...prev,
      [index]: checked
    }));
  };
  
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white to-blue-50/50">
        <Navbar />
        <div className="container mx-auto pt-32 pb-20 px-6 flex items-center justify-center">
          <div className="animate-pulse flex flex-col items-center">
            <div className="h-8 w-64 bg-gray-200 rounded mb-4"></div>
            <div className="h-4 w-48 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }
  
  if (!scheme) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white to-blue-50/50">
        <Navbar />
        <div className="container mx-auto pt-32 pb-20 px-6 text-center">
          <h1 className="text-3xl font-bold mb-4">Scheme Not Found</h1>
          <p className="text-gray-600 mb-8">The scheme you are looking for does not exist or has been removed.</p>
          <Link to="/">
            <Button>
              <ChevronLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50/50">
      <Navbar />
      
      <div className="container mx-auto pt-32 pb-20 px-6">
        {/* Breadcrumb */}
        <div className="mb-6">
          <Link to="/" className="text-sm text-gray-600 hover:text-gov-blue inline-flex items-center">
            <ChevronLeft className="h-3 w-3 mr-1" />
            Back to all schemes
          </Link>
        </div>
        
        {/* Header */}
        <div className="mb-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <span 
                className="inline-block px-3 py-1 rounded-full text-xs font-medium mb-3"
                style={{ backgroundColor: `${scheme.color}20`, color: scheme.color }}
              >
                {scheme.category}
              </span>
              <h1 className="text-3xl md:text-4xl font-bold font-display">{scheme.title}</h1>
            </div>
            
            <div className="flex gap-3">
              <Button 
                variant="outline" 
                className="flex items-center gap-2"
                asChild
              >
                <a href={scheme.website} target="_blank" rel="noopener noreferrer">
                  <FileText className="h-4 w-4" />
                  Official Site
                </a>
              </Button>
              
              <Dialog>
                <DialogTrigger asChild>
                  <Button 
                    className="bg-gov-blue hover:bg-gov-blue/90"
                  >
                    Apply Now
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>Apply for {scheme.title}</DialogTitle>
                  </DialogHeader>
                  <div className="p-4 border rounded-md bg-blue-50/50 mb-4">
                    <p className="text-sm text-blue-700 flex items-start gap-2">
                      <Info className="h-4 w-4 mt-0.5 flex-shrink-0" />
                      <span>You'll be redirected to the official government portal to complete your application.</span>
                    </p>
                  </div>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <h3 className="text-sm font-medium">Required Documents</h3>
                      <ul className="text-sm text-gray-600 space-y-2">
                        {scheme.documents.map((doc: string, i: number) => (
                          <li key={i} className="flex items-start gap-2">
                            <Check className="h-4 w-4 text-green-500 mt-0.5" />
                            {doc}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="pt-2">
                      <Button 
                        className="w-full bg-gov-blue hover:bg-gov-blue/90"
                        asChild
                      >
                        <a href={scheme.website} target="_blank" rel="noopener noreferrer">
                          Proceed to Application
                          <ExternalLink className="ml-2 h-4 w-4" />
                        </a>
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
          
          <p className="text-lg text-gray-700 max-w-3xl">{scheme.shortDescription}</p>
        </div>
        
        {/* Scheme details tabs */}
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="mb-8">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="eligibility">Eligibility</TabsTrigger>
            <TabsTrigger value="application">Application</TabsTrigger>
            <TabsTrigger value="faqs">FAQs</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="glass-card p-6">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-full" style={{ backgroundColor: `${scheme.color}20` }}>
                    <Calendar className="h-5 w-5" style={{ color: scheme.color }} />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Deadline</h3>
                    <p className="font-medium">{scheme.deadline}</p>
                  </div>
                </div>
              </div>
              
              <div className="glass-card p-6">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-full" style={{ backgroundColor: `${scheme.color}20` }}>
                    <MapPin className="h-5 w-5" style={{ color: scheme.color }} />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Department</h3>
                    <p className="font-medium">{scheme.department}</p>
                  </div>
                </div>
              </div>
              
              <div className="glass-card p-6">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-full" style={{ backgroundColor: `${scheme.color}20` }}>
                    <Users className="h-5 w-5" style={{ color: scheme.color }} />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Contact</h3>
                    <p className="font-medium">{scheme.contact}</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="glass-card p-6 space-y-4">
              <h2 className="text-xl font-bold">About this Scheme</h2>
              <p className="text-gray-700">{scheme.description}</p>
              
              <div className="pt-2">
                <h3 className="text-lg font-medium mb-3">Benefits</h3>
                <div className="p-4 bg-green-50 rounded-lg border border-green-100">
                  <p className="text-green-800 flex items-start gap-2">
                    <Check className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>{scheme.benefit}</span>
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="eligibility" className="space-y-8">
            <div className="glass-card p-6 space-y-6">
              <h2 className="text-xl font-bold">Eligibility Criteria</h2>
              <ul className="space-y-3">
                {scheme.eligibility.map((criterion: string, index: number) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="p-1 rounded-full bg-blue-100 mt-0.5">
                      <Check className="h-4 w-4 text-blue-600" />
                    </div>
                    <span className="text-gray-700">{criterion}</span>
                  </li>
                ))}
              </ul>
              
              <div className="pt-4">
                <h3 className="text-lg font-medium mb-4">Check Your Eligibility</h3>
                <div className="p-5 border rounded-lg bg-gray-50 space-y-4">
                  <p className="text-sm text-gray-600">Select all criteria that apply to you:</p>
                  
                  <div className="space-y-3">
                    {scheme.eligibility.map((criterion: string, index: number) => (
                      <div key={index} className="flex items-start space-x-2">
                        <Checkbox 
                          id={`criterion-${index}`} 
                          checked={eligibilityCheck[index] || false}
                          onCheckedChange={(checked) => handleEligibilityChange(String(index), checked as boolean)}
                        />
                        <label 
                          htmlFor={`criterion-${index}`} 
                          className="text-sm leading-tight text-gray-700 cursor-pointer"
                        >
                          {criterion}
                        </label>
                      </div>
                    ))}
                  </div>
                  
                  {isEligible !== null && (
                    <div className={`p-3 rounded-lg ${isEligible ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'} flex items-center gap-2 text-sm`}>
                      {isEligible ? (
                        <>
                          <Check className="h-4 w-4" />
                          <span>Great! You appear to be eligible for this scheme.</span>
                        </>
                      ) : (
                        <>
                          <AlertCircle className="h-4 w-4" />
                          <span>You may not be eligible for this scheme based on the criteria you selected.</span>
                        </>
                      )}
                    </div>
                  )}
                </div>
              </div>
              
              <div className="pt-2">
                <h3 className="text-lg font-medium mb-3">Required Documents</h3>
                <ul className="space-y-2">
                  {scheme.documents.map((doc: string, i: number) => (
                    <li key={i} className="flex items-center gap-2 text-gray-700">
                      <FileText className="h-4 w-4 text-gray-500" />
                      {doc}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="application" className="space-y-8">
            <div className="glass-card p-6 space-y-6">
              <h2 className="text-xl font-bold">Application Process</h2>
              <p className="text-gray-700">{scheme.applicationProcess}</p>
              
              <div className="pt-2 space-y-4">
                <h3 className="text-lg font-medium">Application Timeline</h3>
                <div className="flex items-center gap-2 text-gray-700">
                  <Clock className="h-5 w-5 text-blue-600" />
                  <span>Deadline: {scheme.deadline}</span>
                </div>
                
                <div className="pt-4">
                  <Button 
                    className="bg-gov-blue hover:bg-gov-blue/90"
                    asChild
                  >
                    <a href={scheme.website} target="_blank" rel="noopener noreferrer">
                      Apply Now
                      <ExternalLink className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                </div>
              </div>
            </div>
            
            <div className="glass-card p-6 space-y-4">
              <h2 className="text-xl font-bold">Application Resources</h2>
              <div className="space-y-3">
                <a href="#" className="flex items-center gap-2 p-3 bg-gray-50 hover:bg-gray-100 rounded-lg border transition-colors">
                  <Download className="h-5 w-5 text-gray-600" />
                  <span className="text-gray-800">Download Application Form (PDF)</span>
                </a>
                <a href="#" className="flex items-center gap-2 p-3 bg-gray-50 hover:bg-gray-100 rounded-lg border transition-colors">
                  <Download className="h-5 w-5 text-gray-600" />
                  <span className="text-gray-800">Document Checklist (PDF)</span>
                </a>
                <a href="#" className="flex items-center gap-2 p-3 bg-gray-50 hover:bg-gray-100 rounded-lg border transition-colors">
                  <FileText className="h-5 w-5 text-gray-600" />
                  <span className="text-gray-800">Application Guidelines</span>
                </a>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="faqs" className="space-y-8">
            <div className="glass-card p-6 space-y-6">
              <h2 className="text-xl font-bold">Frequently Asked Questions</h2>
              <div className="space-y-5">
                {scheme.faqs.map((faq: any, index: number) => (
                  <div key={index} className="border-b border-gray-200 pb-5 last:border-0 last:pb-0">
                    <h3 className="text-lg font-medium mb-2">{faq.question}</h3>
                    <p className="text-gray-700">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="p-6 bg-blue-50 rounded-lg border border-blue-100">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h3 className="text-lg font-medium text-blue-800 mb-1">Still have questions?</h3>
                  <p className="text-blue-700">Contact the help desk for more information</p>
                </div>
                <Button 
                  variant="outline" 
                  className="bg-white hover:bg-blue-50"
                >
                  Contact Support
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
      
      <Footer />
    </div>
  );
};

export default SchemeDetails;
