
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { motion } from "framer-motion";
import { ArrowRight, Calendar, MapPin, Users } from "lucide-react";

const HeroSection = () => {
  const today = new Date();
  const formattedDate = format(today, "EEEE, MMMM d, yyyy");
  
  const stats = [
    { icon: Users, label: "Active Citizens", value: "5,234+" },
    { icon: Calendar, label: "Monthly Events", value: "50+" },
    { icon: MapPin, label: "Local Issues Resolved", value: "1,200+" },
  ];
  
  return (
    <section className="relative overflow-hidden rounded-lg bg-gradient-to-r from-civic-blue to-blue-600 text-white">
      <div className="absolute inset-0 bg-grid-white/[0.1] [mask-image:linear-gradient(0deg,white,transparent)]" />
      
      <div className="relative p-8 sm:p-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            Welcome to CivicSphere
          </h1>
          <p className="text-xl opacity-90 mb-6 max-w-2xl">
            Your centralized platform for local information, community engagement, 
            and neighborhood transformation. Together, we build a better community.
          </p>
          <p className="text-lg opacity-80 mb-8">{formattedDate}</p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white/10 backdrop-blur-sm rounded-lg p-4"
            >
              <stat.icon className="w-8 h-8 mb-2 opacity-80" />
              <h3 className="text-2xl font-bold">{stat.value}</h3>
              <p className="text-sm opacity-80">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        <div className="flex flex-wrap gap-4">
          <Button
            asChild
            size="lg"
            className="bg-civic-orange hover:bg-orange-600 text-white font-medium px-6"
          >
            <Link to="/report-issue" className="flex items-center gap-2">
              Report an Issue
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="bg-white text-civic-blue hover:bg-gray-100 font-medium px-6"
          >
            <Link to="/events">View Events</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
