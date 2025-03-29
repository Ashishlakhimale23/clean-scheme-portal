
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, User, FileText, Bell, BarChart2, Settings, HelpCircle, LogOut 
} from 'lucide-react';
import { cn } from '@/lib/utils';

const DashboardSidebar = () => {
  const location = useLocation();
  
  const menuItems = [
    { icon: Home, label: 'Dashboard', path: '/dashboard' },
    { icon: User, label: 'My Profile', path: '/profile' },
    { icon: FileText, label: 'My Applications', path: '/applications' },
    { icon: Bell, label: 'Notifications', path: '/notifications' },
    { icon: BarChart2, label: 'Reports', path: '/reports' },
    { icon: Settings, label: 'Settings', path: '/settings' },
    { icon: HelpCircle, label: 'Help & Support', path: '/support' },
  ];
  
  return (
    <div className="w-full lg:w-64 bg-white rounded-xl shadow-sm border border-gray-100 p-4 h-auto lg:sticky lg:top-28">
      <div className="flex items-center p-2 mb-6">
        <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
          <User className="h-5 w-5 text-gov-blue" />
        </div>
        <div className="ml-3">
          <p className="font-medium">Anuj Singh</p>
          <p className="text-xs text-gray-500">anuj.singh@example.com</p>
        </div>
      </div>
      
      <nav className="space-y-1">
        {menuItems.map((item, index) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={index}
              to={item.path}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                isActive
                  ? "bg-gov-blue text-white"
                  : "text-gray-700 hover:bg-gray-100"
              )}
            >
              <item.icon className="h-5 w-5" />
              {item.label}
            </Link>
          );
        })}
        
        <div className="pt-4 mt-4 border-t border-gray-200">
          <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition-colors">
            <LogOut className="h-5 w-5" />
            Sign Out
          </button>
        </div>
      </nav>
    </div>
  );
};

export default DashboardSidebar;
