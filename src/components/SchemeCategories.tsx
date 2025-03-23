
import { Book, Home, Heart, GraduationCap, Building, Briefcase, Users, Leaf, FileText, Landmark } from 'lucide-react';
import { SchemeCard } from './SchemeCard';

export const SchemeCategories = () => {
  const schemes = [
    {
      title: "PM Kisan Samman Nidhi",
      category: "Agriculture",
      eligibility: "Small and marginal farmers with landholding up to 2 hectares",
      benefit: "₹6,000 per year as direct income support in three installments",
      icon: <Leaf className="h-6 w-6 text-green-600" />,
      color: "#16a34a",
      delay: 100
    },
    {
      title: "National Education Scholarship",
      category: "Education",
      eligibility: "Students from economically weaker sections with annual family income less than ₹2.5 lakh",
      benefit: "Full tuition fee waiver and monthly stipend of ₹2,500",
      icon: <GraduationCap className="h-6 w-6 text-blue-600" />,
      color: "#2563eb",
      delay: 200
    },
    {
      title: "PM Awas Yojana",
      category: "Housing",
      eligibility: "Houseless people and those living in kutcha/dilapidated houses",
      benefit: "Financial assistance up to ₹1.5 lakh for construction of pucca house",
      icon: <Home className="h-6 w-6 text-orange-600" />,
      color: "#ea580c",
      delay: 300
    },
    {
      title: "Ayushman Bharat",
      category: "Healthcare",
      eligibility: "Poor and vulnerable families as per SECC database",
      benefit: "Health coverage up to ₹5 lakh per family per year for secondary and tertiary care",
      icon: <Heart className="h-6 w-6 text-rose-600" />,
      color: "#e11d48",
      delay: 400
    },
    {
      title: "Startup India Seed Fund",
      category: "Entrepreneurship",
      eligibility: "Early stage startups with innovative ideas and scalable business models",
      benefit: "Seed funding up to ₹25 lakh and mentorship support",
      icon: <Briefcase className="h-6 w-6 text-purple-600" />,
      color: "#9333ea",
      delay: 500
    },
    {
      title: "Digital India Skill Development",
      category: "Skill Development",
      eligibility: "Unemployed youth between 18-35 years",
      benefit: "Free training in digital skills and job placement assistance",
      icon: <FileText className="h-6 w-6 text-indigo-600" />,
      color: "#4f46e5",
      delay: 600
    },
  ];

  return (
    <section className="py-20 px-6 bg-gradient-to-b from-white to-blue-50/50">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold font-display mb-4">Popular Scheme Categories</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Browse through our most sought-after government schemes across various sectors designed to support and empower citizens
          </p>
        </div>
        
        {/* Category pills */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          <button className="px-5 py-2.5 rounded-full bg-gov-blue text-white flex items-center gap-2 transition-all hover:shadow-md">
            <Users className="h-4 w-4" />
            <span>All Schemes</span>
          </button>
          <button className="px-5 py-2.5 rounded-full bg-white border border-gray-200 text-gray-800 flex items-center gap-2 transition-all hover:border-gray-300 hover:shadow-sm">
            <Leaf className="h-4 w-4 text-green-600" />
            <span>Agriculture</span>
          </button>
          <button className="px-5 py-2.5 rounded-full bg-white border border-gray-200 text-gray-800 flex items-center gap-2 transition-all hover:border-gray-300 hover:shadow-sm">
            <GraduationCap className="h-4 w-4 text-blue-600" />
            <span>Education</span>
          </button>
          <button className="px-5 py-2.5 rounded-full bg-white border border-gray-200 text-gray-800 flex items-center gap-2 transition-all hover:border-gray-300 hover:shadow-sm">
            <Heart className="h-4 w-4 text-rose-600" />
            <span>Healthcare</span>
          </button>
          <button className="px-5 py-2.5 rounded-full bg-white border border-gray-200 text-gray-800 flex items-center gap-2 transition-all hover:border-gray-300 hover:shadow-sm">
            <Home className="h-4 w-4 text-orange-600" />
            <span>Housing</span>
          </button>
          <button className="px-5 py-2.5 rounded-full bg-white border border-gray-200 text-gray-800 flex items-center gap-2 transition-all hover:border-gray-300 hover:shadow-sm">
            <Briefcase className="h-4 w-4 text-purple-600" />
            <span>Employment</span>
          </button>
          <button className="px-5 py-2.5 rounded-full bg-white border border-gray-200 text-gray-800 flex items-center gap-2 transition-all hover:border-gray-300 hover:shadow-sm">
            <Landmark className="h-4 w-4 text-indigo-600" />
            <span>Financial</span>
          </button>
        </div>
        
        {/* Schemes grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {schemes.map((scheme, index) => (
            <SchemeCard key={index} {...scheme} />
          ))}
        </div>
        
        {/* View more button */}
        <div className="flex justify-center mt-12">
          <button className="flex items-center gap-2 px-8 py-3 rounded-full bg-white border border-gray-200 text-gray-800 transition-all hover:border-gray-300 hover:shadow-md button-animation">
            <span>View All Schemes</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
