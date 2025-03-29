
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ArrowLeft, FileText, Calendar, User, Building, CheckCircle, 
  AlertCircle, Clock, Info, Download, MessageSquare
} from 'lucide-react';
import DashboardSidebar from '../components/DashboardSidebar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/components/ui/use-toast';

// Mock application detail data
const getMockApplication = (id: string) => {
  return {
    id,
    schemeName: 'PM Kisan Samman Nidhi',
    status: 'approved',
    dateApplied: '2023-06-15',
    reference: 'PMKSN-2023-45678',
    category: 'Agriculture',
    description: 'Financial assistance to all landholding farmers\' families in the country.',
    amount: '₹6,000 per year',
    timeline: [
      { date: '2023-06-15', status: 'Application Submitted', description: 'Your application has been successfully submitted.' },
      { date: '2023-06-22', status: 'Document Verification', description: 'Your documents are being verified by our team.' },
      { date: '2023-07-05', status: 'Field Verification', description: 'A field officer visited to verify your details.' },
      { date: '2023-07-20', status: 'Application Approved', description: 'Congratulations! Your application has been approved.' }
    ],
    documents: [
      { name: 'Aadhaar Card', status: 'verified' },
      { name: 'Land Records', status: 'verified' },
      { name: 'Bank Account Details', status: 'verified' },
      { name: 'Income Certificate', status: 'verified' }
    ],
    disbursements: [
      { date: '2023-08-01', amount: '₹2,000', status: 'completed', transactionId: 'TXN123456' },
      { date: '2023-12-01', amount: '₹2,000', status: 'scheduled' },
      { date: '2024-04-01', amount: '₹2,000', status: 'scheduled' }
    ],
    contactPerson: {
      name: 'Rajesh Kumar',
      designation: 'District Agriculture Officer',
      phone: '+91 9876543210',
      email: 'dao.district@gov.in'
    }
  };
};

const statusStyles = {
  approved: 'bg-green-100 text-green-800',
  pending: 'bg-yellow-100 text-yellow-800',
  under_review: 'bg-blue-100 text-blue-800',
  rejected: 'bg-red-100 text-red-800',
  verified: 'bg-green-100 text-green-800',
  completed: 'bg-green-100 text-green-800',
  scheduled: 'bg-blue-100 text-blue-800'
};

const ApplicationDetails = () => {
  const { applicationId } = useParams<{ applicationId: string }>();
  const [application, setApplication] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  
  useEffect(() => {
    // Simulate API call to fetch application details
    const fetchApplicationDetails = () => {
      setTimeout(() => {
        if (applicationId) {
          const appData = getMockApplication(applicationId);
          setApplication(appData);
        }
        setLoading(false);
      }, 800);
    };
    
    fetchApplicationDetails();
  }, [applicationId]);
  
  const handleDownloadCertificate = () => {
    toast({
      title: "Certificate Download",
      description: "Approval certificate has been downloaded successfully.",
      duration: 3000,
    });
  };
  
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 pb-12">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col lg:flex-row gap-6">
            <DashboardSidebar />
            <div className="flex-1 flex items-center justify-center">
              <div className="w-8 h-8 border-4 border-gray-300 border-t-gov-blue rounded-full animate-spin"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  if (!application) {
    return (
      <div className="min-h-screen bg-gray-50 pb-12">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col lg:flex-row gap-6">
            <DashboardSidebar />
            <div className="flex-1">
              <Card className="border-dashed border-2 border-gray-300 bg-white">
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <AlertCircle className="h-12 w-12 text-red-500 mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-1">Application Not Found</h3>
                  <p className="text-gray-500 text-center mb-4">The application you're looking for doesn't exist or you don't have access to it.</p>
                  <Link
                    to="/applications"
                    className="bg-gov-blue text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
                  >
                    Back to Applications
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-6">
          <DashboardSidebar />
          
          <div className="flex-1">
            <div className="mb-6">
              <Link to="/applications" className="inline-flex items-center text-gov-blue hover:text-blue-700 mb-4">
                <ArrowLeft className="h-4 w-4 mr-1" />
                Back to Applications
              </Link>
              
              <div className="flex flex-col md:flex-row md:items-center justify-between">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900 mb-1">{application.schemeName}</h1>
                  <div className="flex items-center text-gray-600">
                    <p>Reference: {application.reference}</p>
                    <span className="mx-2">•</span>
                    <p>Applied on: {application.dateApplied}</p>
                  </div>
                </div>
                <Badge 
                  className={`mt-2 md:mt-0 ${statusStyles[application.status as keyof typeof statusStyles]}`}
                >
                  {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                </Badge>
              </div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-md flex items-center">
                    <FileText className="h-4 w-4 mr-2" />
                    Scheme Details
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm mb-3">{application.description}</p>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Category:</span>
                      <span className="font-medium">{application.category}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Benefit Amount:</span>
                      <span className="font-medium">{application.amount}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-md flex items-center">
                    <User className="h-4 w-4 mr-2" />
                    Contact Person
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Name:</span>
                      <span className="font-medium">{application.contactPerson.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Designation:</span>
                      <span className="font-medium">{application.contactPerson.designation}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Phone:</span>
                      <span className="font-medium">{application.contactPerson.phone}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Email:</span>
                      <span className="font-medium">{application.contactPerson.email}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-md flex items-center">
                    <Info className="h-4 w-4 mr-2" />
                    Actions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {application.status === 'approved' && (
                      <Button 
                        className="w-full flex items-center justify-center"
                        onClick={handleDownloadCertificate}
                      >
                        <Download className="h-4 w-4 mr-2" />
                        Download Certificate
                      </Button>
                    )}
                    <Button 
                      variant="outline" 
                      className="w-full flex items-center justify-center"
                    >
                      <MessageSquare className="h-4 w-4 mr-2" />
                      Contact Support
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="grid grid-cols-1 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Clock className="h-5 w-5 mr-2" />
                    Application Timeline
                  </CardTitle>
                  <CardDescription>Track the progress of your application</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {application.timeline.map((event: any, index: number) => (
                      <div key={index} className="relative pl-8">
                        {index !== application.timeline.length - 1 && (
                          <div className="absolute left-3 top-3 h-full w-0.5 bg-gray-200"></div>
                        )}
                        <div className="absolute left-0 top-1 h-6 w-6 rounded-full bg-gov-blue flex items-center justify-center">
                          <CheckCircle className="h-4 w-4 text-white" />
                        </div>
                        <div>
                          <h4 className="font-medium">{event.status}</h4>
                          <p className="text-sm text-gray-500 mb-1">{event.date}</p>
                          <p className="text-sm">{event.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-md">
                      Document Verification
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {application.documents.map((doc: any, index: number) => (
                        <div key={index} className="flex items-center justify-between">
                          <span>{doc.name}</span>
                          <Badge className={statusStyles[doc.status as keyof typeof statusStyles]}>
                            {doc.status.charAt(0).toUpperCase() + doc.status.slice(1)}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="text-md">
                      Benefit Disbursements
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {application.disbursements.map((disbursement: any, index: number) => (
                        <div key={index} className="p-3 bg-gray-50 rounded-lg">
                          <div className="flex justify-between items-center mb-1">
                            <span className="font-medium">{disbursement.amount}</span>
                            <Badge className={statusStyles[disbursement.status as keyof typeof statusStyles]}>
                              {disbursement.status.charAt(0).toUpperCase() + disbursement.status.slice(1)}
                            </Badge>
                          </div>
                          <div className="text-sm text-gray-500 flex justify-between">
                            <span>{disbursement.date}</span>
                            {disbursement.transactionId && (
                              <span>Txn: {disbursement.transactionId}</span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicationDetails;
