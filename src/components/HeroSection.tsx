
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";

const HeroSection = () => {
  const today = new Date();
  const formattedDate = format(today, "EEEE, MMMM d, yyyy");
  
  return (
    <section className="bg-civic-blue text-white rounded-lg overflow-hidden">
      <div className="p-8 sm:p-10">
        <h1 className="text-3xl sm:text-4xl font-bold mb-3">Welcome to CivicSphere</h1>
        <p className="text-xl opacity-90 mb-6">
          Your centralized source for local information, community updates, and
          neighborhood engagement.
        </p>
        <p className="text-lg opacity-80 mb-8">Today is {formattedDate}</p>
        <div className="flex flex-wrap gap-4">
          <Button
            asChild
            className="bg-civic-orange hover:bg-orange-600 text-white font-medium px-6"
          >
            <Link to="/report-issue">Report an Issue</Link>
          </Button>
          <Button
            asChild
            variant="outline"
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
