import React, { useState } from "react";
import {
  Building2,
  Users,
  Package,
  Settings,
  DollarSign,
  ChevronDown,
  Briefcase,
  Scale,
  Database,
  UserCog,
  HardHat,
  Ruler,
  PenTool,
  ClipboardList,
  ShoppingCart,
  Palette,
  Wrench,
  ClipboardCheck,
  HardDrive,
  Cpu,
  Zap,
  Droplet,
  Wind,
  User,
  Shield,
  Calculator,
  Truck,
  Hammer,
  Paintbrush,
  Activity,
  Gauge,
  Menu,
  X,
  LayoutDashboard,
  ChevronRight
} from "lucide-react";

// Icon mapping for different roles
const roleIcons = {
  "Admin": Shield,
  "Advocate": Scale,
  "Data Entry Operator": Database,
  "Office Boy": UserCog,
  "Planning Engineer": Ruler,
  "QS": ClipboardList,
  "Designer": PenTool,
  "Storekeeper / Purchaser": ShoppingCart,
  "Purchasers": Truck,
  "PM & Coordinator": ClipboardCheck,
  "Civil & Electrical Engineers": HardHat,
  "Civil Sub Engineer": HardHat,
  "Painters": Paintbrush,
  "Mason": Hammer,
  "Welders": Activity,
  "Carpenters": Hammer,
  "Helpers": User,
  "Labours": User,
  "Electrical Sub Engineer": Zap,
  "HVAC": Wind,
  "IT": Cpu,
  "Electrical": Zap,
  "Plumbing": Droplet,
  "Technician": Wrench,
  "Helper": User,
  "Electrician": Zap,
  "Plumber": Droplet,
  "Accountant": Calculator,
  "MEP": Gauge
};

// Department configuration with unified yellow/gold theme
const departments = {
  admin: {
    title: "Admin, HR & Legal",
    icon: Users,
    color: "yellow",
    bgGradient: "from-amber-500 to-yellow-600",
    roles: ["Admin", "Advocate", "Data Entry Operator", "Office Boy"],
    subRoles: {}
  },
  procurement: {
    title: "Procurement & Design",
    icon: Package,
    color: "yellow",
    bgGradient: "from-amber-500 to-yellow-600",
    roles: ["Planning Engineer", "QS", "Designer"],
    subRoles: {
      "QS": ["Storekeeper / Purchaser", "Purchasers"]
    }
  },
  operation: {
    title: "Operation",
    icon: Settings,
    color: "yellow",
    bgGradient: "from-amber-500 to-yellow-600",
    roles: ["PM & Coordinator", "Civil & Electrical Engineers", "MEP"],
    subRoles: {
      "Civil & Electrical Engineers": {
        "Civil Sub Engineer": ["Painters", "Mason", "Welders", "Carpenters", "Helpers", "Labours"],
        "Electrical Sub Engineer": {
          "HVAC": ["Technician", "Helper"],
          "IT": ["Technician", "Helper"],
          "Electrical": ["Electrician", "Helper"],
          "Plumbing": ["Plumber", "Helper"]
        }
      }
    }
  },
  finance: {
    title: "Accounting & Finance",
    icon: DollarSign,
    color: "yellow",
    bgGradient: "from-amber-500 to-yellow-600",
    roles: ["Accountant"],
    subRoles: {
      "Accountant": ["Data Entry Operator"]
    }
  }
};

const AccordionItem = ({ 
  title, 
  icon: Icon, 
  children, 
  defaultOpen = false,
  color 
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  
  const getColorClasses = () => {
    // Unified yellow/gold theme
    return { 
      bg: "bg-amber-50", 
      text: "text-amber-600", 
      border: "border-amber-100", 
      hoverBg: "hover:bg-amber-50/50" 
    };
  };
  
  const colorClasses = getColorClasses();
  
  return (
    <div className="group bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 mb-4 overflow-hidden border border-gray-100">
      <button
        className="w-full px-4 sm:px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors duration-200"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-lg ${colorClasses.bg} transition-colors duration-200`}>
            <Icon className={`w-5 h-5 ${colorClasses.text}`} />
          </div>
          <span className="text-base sm:text-lg font-semibold text-gray-800">{title}</span>
        </div>
        <div className={`transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
          <ChevronDown className={`w-5 h-5 ${colorClasses.text}`} />
        </div>
      </button>
      
      <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-[2000px]' : 'max-h-0'}`}>
        <div className="px-4 sm:px-6 py-4 sm:py-6 bg-gray-50/30 border-t border-gray-100">
          {children}
        </div>
      </div>
    </div>
  );
};

const RoleCard = ({ title, icon: Icon, isSub = false }) => {
  const RoleIcon = roleIcons[title] || Icon || Building2;
  
  return (
    <div className={`group/role ${isSub ? 'bg-white' : 'bg-white'} rounded-lg shadow-sm hover:shadow-md transition-all duration-200 border border-gray-100 hover:border-amber-200 overflow-hidden`}>
      <div className="p-3 flex items-center gap-3">
        <div className={`p-1.5 rounded-lg ${isSub ? 'bg-amber-50 group-hover/role:bg-amber-100' : 'bg-gradient-to-br from-amber-500 to-yellow-500'} transition-colors duration-200`}>
          <RoleIcon className={`w-4 h-4 ${isSub ? 'text-amber-600' : 'text-white'}`} />
        </div>
        <span className={`font-medium ${isSub ? 'text-gray-600 text-sm' : 'text-gray-700 text-sm sm:text-base'}`}>
          {title}
        </span>
      </div>
    </div>
  );
};

const SubRoleGroup = ({ title, items, level = 1 }) => {
  const Icon = roleIcons[title] || Users;
  
  return (
    <div className={`relative ${level === 1 ? 'ml-0' : 'ml-3 sm:ml-6'} mt-4 first:mt-0`}>
      <div className="flex items-start gap-2 sm:gap-3">
        <div className="flex-shrink-0 mt-1">
          <div className="p-1.5 rounded-lg bg-amber-100">
            <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-600" />
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <div className="font-semibold text-gray-700 text-sm mb-3">{title}</div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3">
            {items.map((item, idx) => (
              <RoleCard key={idx} title={item} isSub={true} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const NestedSubRoles = ({ data, level = 1 }) => {
  return (
    <div className={`space-y-3 ${level > 1 ? 'ml-2 sm:ml-6 pl-2 sm:pl-4 border-l border-amber-200' : ''}`}>
      {Object.entries(data).map(([key, value]) => {
        if (Array.isArray(value)) {
          return <SubRoleGroup key={key} title={key} items={value} level={level} />;
        } else if (typeof value === 'object' && value !== null) {
          return (
            <div key={key} className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-0.5 h-5 bg-gradient-to-b from-amber-400 to-yellow-500 rounded-full"></div>
                <span className="font-semibold text-amber-700 text-xs sm:text-sm uppercase tracking-wide">{key}</span>
              </div>
              <NestedSubRoles data={value} level={level + 1} />
            </div>
          );
        }
        return null;
      })}
    </div>
  );
};

const CompanyHierarchy = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  // Track which accordions are open on mobile
  const [openMobileDepts, setOpenMobileDepts] = useState({});

  const deptKeys = Object.keys(departments);
  
  const toggleMobileDept = (key) => {
    setOpenMobileDepts(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };
  
  return (
    <div className="min-h-screen bg-gray-50">

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-3 sm:px-6 lg:px-8 py-6 sm:py-10">
        {/* Desktop View - All Accordions */}
        <div className="hidden lg:block space-y-4">
          {deptKeys.map((key) => {
            const dept = departments[key];
            return (
              <AccordionItem
                key={key}
                title={dept.title}
                icon={dept.icon}
                color="yellow"
                defaultOpen={false}
              >
                <div className="space-y-5">
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {dept.roles.map(role => {
                      const Icon = roleIcons[role] || Users;
                      return (
                        <RoleCard key={role} title={role} icon={Icon} />
                      );
                    })}
                  </div>
                  
                  {Object.keys(dept.subRoles).length > 0 && (
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-0.5 h-5 bg-gradient-to-b from-amber-400 to-yellow-500 rounded-full"></div>
                        <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                          Department Structure
                        </h3>
                      </div>
                      <NestedSubRoles data={dept.subRoles} />
                    </div>
                  )}
                </div>
              </AccordionItem>
            );
          })}
        </div>

        {/* Mobile View - Accordion Style (no separate page navigation) */}
        <div className="lg:hidden space-y-3">
          {deptKeys.map((key) => {
            const dept = departments[key];
            const isOpen = openMobileDepts[key];
            
            return (
              <div key={key} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <button
                  onClick={() => toggleMobileDept(key)}
                  className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-amber-100">
                      {React.createElement(dept.icon, { className: "w-5 h-5 text-amber-600" })}
                    </div>
                    <span className="font-semibold text-gray-800">{dept.title}</span>
                  </div>
                  <ChevronDown className={`w-5 h-5 text-amber-500 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                </button>
                
                <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-[1500px]' : 'max-h-0'}`}>
                  <div className="px-4 pb-4 space-y-4 border-t border-gray-100 pt-4">
                    {/* Core Roles */}
                    <div>
                      <div className="text-xs font-semibold text-amber-600 uppercase tracking-wider mb-2">Core Roles</div>
                      <div className="grid grid-cols-2 gap-2">
                        {dept.roles.map(role => {
                          const Icon = roleIcons[role] || Users;
                          return (
                            <RoleCard key={role} title={role} icon={Icon} />
                          );
                        })}
                      </div>
                    </div>
                    
                    {/* Sub Roles */}
                    {Object.keys(dept.subRoles).length > 0 && (
                      <div>
                        <div className="text-xs font-semibold text-amber-600 uppercase tracking-wider mb-2">Structure</div>
                        <NestedSubRoles data={dept.subRoles} />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
};

export default CompanyHierarchy;