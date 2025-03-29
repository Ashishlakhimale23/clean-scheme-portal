
import { useState } from 'react';
import { Link } from 'react-router-dom';
import DashboardSidebar from '../components/DashboardSidebar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/use-toast';
import { FileText, AlertCircle } from 'lucide-react';

// Mock application data
const mockApplications = [
  {
    id: '1',
    schemeName: 'PM Kisan Samman Nidhi',
    status: 'approved',
    dateApplied: '2023-06-15',
    reference: 'PMKSN-2023-45678',
    category: 'Agriculture'
  },
  {
    id: '2',
    schemeName: 'National Scholarship Portal',
    status: 'pending',
    dateApplied: '2023-07-22',
    reference: 'NSP-2023-98765',
    category: 'Education'
  },
  {
    id: '3',
    schemeName: 'Startup India Seed Fund',
    status: 'rejected',
    dateApplied: '2023-05-10',
    reference: 'SISF-2023-12345',
    category: 'Business',
    rejectionReason: 'Incomplete documentation'
  },
  {
    id: '4',
    schemeName: 'PM Awas Yojana',
    status: 'under_review',
    dateApplied: '2023-08-05',
    reference: 'PMAY-2023-78901',
    category: 'Housing'
  }
];

const statusStyles = {
  approved: 'bg-green-100 text-green-800',
  pending: 'bg-yellow-100 text-yellow-800',
  under_review: 'bg-blue-100 text-blue-800',
  rejected: 'bg-red-100 text-red-800'
};

const statusLabels = {
  approved: 'Approved',
  pending: 'Pending',
  under_review: 'Under Review',
  rejected: 'Rejected'
};

const Applications = () => {
  const [applications] = useState(mockApplications);
  const { toast } = useToast();

  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-6">
          <DashboardSidebar />
          
          <div className="flex-1">
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-gray-900 mb-2">My Applications</h1>
              <p className="text-gray-600">Track the status of all your scheme applications</p>
            </div>
            
            {applications.length === 0 ? (
              <Card className="border-dashed border-2 border-gray-300 bg-white">
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <FileText className="h-12 w-12 text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-1">No applications yet</h3>
                  <p className="text-gray-500 text-center mb-4">You haven't applied to any government schemes yet.</p>
                  <Link
                    to="/schemes"
                    className="bg-gov-blue text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
                  >
                    Browse Schemes
                  </Link>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {applications.map((application) => (
                  <Card key={application.id} className="bg-white hover:shadow-md transition-shadow">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-lg">{application.schemeName}</CardTitle>
                          <CardDescription>Applied on: {application.dateApplied}</CardDescription>
                        </div>
                        <Badge className={statusStyles[application.status as keyof typeof statusStyles]}>
                          {statusLabels[application.status as keyof typeof statusLabels]}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-gray-500">Reference Number</p>
                          <p className="font-medium">{application.reference}</p>
                        </div>
                        <div>
                          <p className="text-gray-500">Category</p>
                          <p className="font-medium">{application.category}</p>
                        </div>
                      </div>
                      
                      {application.status === 'rejected' && (
                        <div className="mt-4 flex items-start bg-red-50 p-3 rounded-md">
                          <AlertCircle className="h-5 w-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
                          <div>
                            <p className="font-medium text-red-800">Application Rejected</p>
                            <p className="text-red-700">{application.rejectionReason}</p>
                          </div>
                        </div>
                      )}
                      
                      <div className="mt-4 flex justify-end">
                        <Link
                          to={`/application/${application.id}`}
                          className="text-gov-blue hover:text-blue-700 font-medium text-sm"
                        >
                          View Details
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Applications;
