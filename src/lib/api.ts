
import { useQuery } from "@tanstack/react-query";

// Types for our data
export interface Announcement {
  id: string;
  title: string;
  content: string;
  category: string;
  department: string;
  date: string;
  verified: boolean;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  category: string;
  startDate: string;
  endDate: string;
  location: string;
  organizer: string;
}

export interface Issue {
  id: string;
  title: string;
  description: string;
  category: string;
  location: string;
  status: "In Progress" | "Reported" | "Resolved";
  reportedBy: string;
  reportDate: string;
}

export interface Leader {
  id: string;
  name: string;
  title: string;
  organization: string;
  email: string;
  phone: string;
  bio: string;
  imageUrl: string;
}

export interface Organization {
  id: string;
  name: string;
  category: string;
  description: string;
  website: string;
  email: string;
  phone: string;
  address: string;
  logoUrl: string;
}

export interface Resource {
  id: string;
  title: string;
  description: string;
  category: string;
  url: string;
  contactName: string;
  contactEmail: string;
  contactPhone: string;
}

// Mock data - in a real app, this would be fetched from an API
const announcements: Announcement[] = [
  {
    id: "1",
    title: "Water Main Repairs Scheduled",
    content:
      "Water service will be temporarily interrupted on Oak Street between 5th and 7th Avenue on Monday from 9AM to 3PM due to necessary repairs.",
    category: "Infrastructure",
    department: "Public Works Department",
    date: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
    verified: true,
  },
  {
    id: "2",
    title: "New Community Center Hours",
    content:
      "Beginning April 15th, the Community Center will extend its hours to 9PM on weekdays and will also be open on Sundays from 12PM to 5PM.",
    category: "Community",
    department: "Parks & Recreation Department",
    date: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
    verified: true,
  },
  {
    id: "3",
    title: "Property Tax Deadline Approaching",
    content:
      "Reminder: The second installment of property taxes is due by April 30th. Payments can be made online or at the County Administration Building.",
    category: "Government",
    department: "County Treasurer",
    date: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
    verified: true,
  },
  {
    id: "4",
    title: "New Recycling Guidelines",
    content:
      "Starting May 1st, plastic bags will no longer be accepted in recycling bins. Please use paper bags or place recyclables directly in your bin.",
    category: "Environment",
    department: "Sanitation Department",
    date: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    verified: false,
  },
  {
    id: "5",
    title: "Summer Camp Registration Open",
    content:
      "Registration for summer camps is now open! Programs available for ages 5-15. Early bird discount ends May 15th.",
    category: "Community",
    department: "Parks & Recreation Department",
    date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    verified: true,
  },
];

const events: Event[] = [
  {
    id: "1",
    title: "Community Clean-up Day",
    description:
      "Join us for our monthly clean-up day at Riverside Park. Gloves and trash bags will be provided. Refreshments served afterward.",
    category: "Environment",
    startDate: "2025-04-12T09:00:00",
    endDate: "2025-04-12T12:00:00",
    location: "Riverside Park",
    organizer: "Green Earth Organization",
  },
  {
    id: "2",
    title: "Town Hall Meeting",
    description:
      "Discuss upcoming infrastructure projects and community development plans with city officials and council members.",
    category: "Government",
    startDate: "2025-04-15T18:30:00",
    endDate: "2025-04-15T20:30:00",
    location: "City Hall, Main Conference Room",
    organizer: "Mayor's Office",
  },
  {
    id: "3",
    title: "Farmers Market Opening",
    description:
      "Season opening of our local farmers market with fresh produce, crafts, and food trucks.",
    category: "Community",
    startDate: "2025-04-20T08:00:00",
    endDate: "2025-04-20T13:00:00",
    location: "Downtown Square",
    organizer: "Local Farmers Association",
  },
  {
    id: "4",
    title: "Free Health Screenings",
    description:
      "Free health screenings including blood pressure, cholesterol, and glucose tests. No appointment necessary.",
    category: "Health",
    startDate: "2025-04-25T10:00:00",
    endDate: "2025-04-25T16:00:00",
    location: "Community Center, Room 120",
    organizer: "City Health Department",
  },
  {
    id: "5",
    title: "Youth Sports Sign-up",
    description:
      "Registration for youth summer sports leagues: baseball, soccer, and basketball. Ages 5-16.",
    category: "Sports",
    startDate: "2025-04-27T09:00:00",
    endDate: "2025-04-27T14:00:00",
    location: "Sports Complex",
    organizer: "Youth Sports Association",
  },
];

const issues: Issue[] = [
  {
    id: "1",
    title: "Pothole on Maple Street",
    description:
      "Large pothole at the intersection of Maple and Oak streets causing hazards for drivers.",
    category: "Roads",
    location: "Maple St & Oak St",
    status: "In Progress",
    reportedBy: "John Doe",
    reportDate: new Date(Date.now() - 21 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "2",
    title: "Broken Playground Equipment",
    description:
      "The slide at Riverside Park playground is damaged and unsafe for children to use.",
    category: "Parks",
    location: "Riverside Park",
    status: "Reported",
    reportedBy: "Jane Smith",
    reportDate: new Date(Date.now() - 21 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "3",
    title: "Street Light Out",
    description:
      "Street light not working on Cedar Avenue between 5th and 6th streets. Area is very dark at night.",
    category: "Street Lighting",
    location: "Cedar Ave",
    status: "Resolved",
    reportedBy: "Michael Brown",
    reportDate: new Date(Date.now() - 28 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "4",
    title: "Graffiti on Public Building",
    description:
      "Graffiti on the west wall of the library building. Approximately 3 feet by 5 feet in size.",
    category: "Vandalism",
    location: "Public Library, 500 Main St",
    status: "Reported",
    reportedBy: "Sarah Johnson",
    reportDate: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "5",
    title: "Flooding on Pine Street",
    description:
      "After heavy rain, water accumulates at the corner of Pine and 3rd streets, making it difficult for pedestrians and vehicles.",
    category: "Drainage",
    location: "Pine St & 3rd St",
    status: "In Progress",
    reportedBy: "Robert Wilson",
    reportDate: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
  },
];

const leaders: Leader[] = [
  {
    id: "1",
    name: "Mayor Jennifer Adams",
    title: "Mayor",
    organization: "City of Cityville",
    email: "mayor@cityville.gov",
    phone: "(555) 123-4567",
    bio: "Jennifer Adams has served as Mayor since 2021. Her focus is on sustainable urban development, public safety, and community engagement.",
    imageUrl: "/placeholder.svg",
  },
  {
    id: "2",
    name: "David Martinez",
    title: "City Council President",
    organization: "City Council",
    email: "dmartinez@cityville.gov",
    phone: "(555) 234-5678",
    bio: "David has represented District 3 for two terms and was elected Council President in 2023. He champions affordable housing and small business support.",
    imageUrl: "/placeholder.svg",
  },
  {
    id: "3",
    name: "Dr. Sarah Chen",
    title: "School Board President",
    organization: "Cityville School District",
    email: "schen@cityvilleschools.edu",
    phone: "(555) 345-6789",
    bio: "With a Ph.D. in Education Policy and 15 years as an educator, Dr. Chen leads initiatives to improve educational outcomes and equity across the district.",
    imageUrl: "/placeholder.svg",
  },
  {
    id: "4",
    name: "Marcus Johnson",
    title: "Police Chief",
    organization: "Cityville Police Department",
    email: "mjohnson@cityvillepd.gov",
    phone: "(555) 456-7890",
    bio: "Chief Johnson has served in law enforcement for 25 years and emphasizes community policing, officer training, and public safety education.",
    imageUrl: "/placeholder.svg",
  },
  {
    id: "5",
    name: "Patricia Okafor",
    title: "Community Foundation Director",
    organization: "Cityville Community Foundation",
    email: "pokafor@cityvillefoundation.org",
    phone: "(555) 567-8901",
    bio: "Patricia directs grant programs that have distributed over $2 million to local initiatives in education, arts, and community development.",
    imageUrl: "/placeholder.svg",
  },
];

const organizations: Organization[] = [
  {
    id: "1",
    name: "Green Earth Organization",
    category: "Environmental",
    description:
      "Dedicated to environmental conservation and sustainability through education and direct action in our community.",
    website: "www.greenearthorg.org",
    email: "info@greenearthorg.org",
    phone: "(555) 987-6543",
    address: "123 Forest Lane, Cityville",
    logoUrl: "/placeholder.svg",
  },
  {
    id: "2",
    name: "Cityville Business Association",
    category: "Business",
    description:
      "Supporting local businesses and economic growth through networking, advocacy, and community partnership.",
    website: "www.cityvilleBA.org",
    email: "members@cityvilleBA.org",
    phone: "(555) 876-5432",
    address: "500 Commerce Drive, Cityville",
    logoUrl: "/placeholder.svg",
  },
  {
    id: "3",
    name: "Arts for All",
    category: "Cultural",
    description:
      "Promoting accessible arts education and cultural events to enrich community life and foster creative expression.",
    website: "www.artsforall.org",
    email: "create@artsforall.org",
    phone: "(555) 765-4321",
    address: "250 Gallery Way, Cityville",
    logoUrl: "/placeholder.svg",
  },
  {
    id: "4",
    name: "Youth Sports Association",
    category: "Sports & Recreation",
    description:
      "Organizing inclusive sports programs that build skills, teamwork, and healthy habits for children ages 5-18.",
    website: "www.cityvilleyouthsports.org",
    email: "programs@cityvilleyouthsports.org",
    phone: "(555) 654-3210",
    address: "750 Stadium Road, Cityville",
    logoUrl: "/placeholder.svg",
  },
  {
    id: "5",
    name: "Community Action Network",
    category: "Civic",
    description:
      "Grassroots organization addressing economic inequality, housing access, and social justice through advocacy and direct service.",
    website: "www.communityactionnet.org",
    email: "connect@communityactionnet.org",
    phone: "(555) 543-2109",
    address: "300 Justice Avenue, Cityville",
    logoUrl: "/placeholder.svg",
  },
];

const resources: Resource[] = [
  {
    id: "1",
    title: "Emergency Services Guide",
    description:
      "Comprehensive guide to local emergency services including contact information, locations, and when to use each service.",
    category: "Emergency",
    url: "www.cityville.gov/emergency",
    contactName: "Emergency Management Office",
    contactEmail: "emergency@cityville.gov",
    contactPhone: "(555) 911-0000",
  },
  {
    id: "2",
    title: "Business Startup Toolkit",
    description:
      "Resources for entrepreneurs including permit information, financing options, and business planning templates.",
    category: "Business",
    url: "www.cityville.gov/business-toolkit",
    contactName: "Economic Development Office",
    contactEmail: "econdev@cityville.gov",
    contactPhone: "(555) 789-0123",
  },
  {
    id: "3",
    title: "Senior Services Directory",
    description:
      "Complete listing of programs, services, and resources available to seniors including healthcare, housing, and social activities.",
    category: "Seniors",
    url: "www.cityville.gov/senior-services",
    contactName: "Department of Aging",
    contactEmail: "aging@cityville.gov",
    contactPhone: "(555) 456-7890",
  },
  {
    id: "4",
    title: "Parks and Recreation Map",
    description:
      "Interactive map of all parks, trails, facilities, and recreation programs with schedules and reservation information.",
    category: "Recreation",
    url: "www.cityville.gov/parks-map",
    contactName: "Parks Department",
    contactEmail: "parks@cityville.gov",
    contactPhone: "(555) 123-4567",
  },
  {
    id: "5",
    title: "Community Calendar",
    description:
      "Comprehensive calendar of community events, public meetings, and important dates for the city.",
    category: "Community",
    url: "www.cityville.gov/calendar",
    contactName: "City Clerk's Office",
    contactEmail: "cityclerk@cityville.gov",
    contactPhone: "(555) 234-5678",
  },
];

// API functions for fetching data
const fetchAnnouncements = async (): Promise<Announcement[]> => {
  // In a real app, this would be a fetch call to an API
  return new Promise((resolve) => {
    setTimeout(() => resolve(announcements), 500);
  });
};

const fetchEvents = async (): Promise<Event[]> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(events), 500);
  });
};

const fetchIssues = async (): Promise<Issue[]> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(issues), 500);
  });
};

const fetchLeaders = async (): Promise<Leader[]> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(leaders), 500);
  });
};

const fetchOrganizations = async (): Promise<Organization[]> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(organizations), 500);
  });
};

const fetchResources = async (): Promise<Resource[]> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(resources), 500);
  });
};

// Submit a new issue
export const submitIssue = async (issueData: Omit<Issue, "id" | "reportDate" | "status">) => {
  // In a real app, this would send data to the backend
  console.log("Submitting issue:", issueData);
  const newIssue: Issue = {
    ...issueData,
    id: `new-${Date.now()}`,
    reportDate: new Date().toISOString(),
    status: "Reported",
  };
  
  // Simulate API call
  return new Promise<Issue>((resolve) => {
    setTimeout(() => resolve(newIssue), 1000);
  });
};

// React Query hooks
export const useAnnouncements = () => {
  return useQuery({
    queryKey: ["announcements"],
    queryFn: fetchAnnouncements,
  });
};

export const useEvents = () => {
  return useQuery({
    queryKey: ["events"],
    queryFn: fetchEvents,
  });
};

export const useIssues = () => {
  return useQuery({
    queryKey: ["issues"],
    queryFn: fetchIssues,
  });
};

export const useLeaders = () => {
  return useQuery({
    queryKey: ["leaders"],
    queryFn: fetchLeaders,
  });
};

export const useOrganizations = () => {
  return useQuery({
    queryKey: ["organizations"],
    queryFn: fetchOrganizations,
  });
};

export const useResources = () => {
  return useQuery({
    queryKey: ["resources"],
    queryFn: fetchResources,
  });
};
