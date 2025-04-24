
import HeroSection from "@/components/HeroSection";
import QuickAccess from "@/components/QuickAccess";
import AnnouncementCard from "@/components/AnnouncementCard";
import EventCard from "@/components/EventCard";
import IssueCard from "@/components/IssueCard";
import { useAnnouncements, useEvents, useIssues } from "@/lib/api";
import { Link } from "react-router-dom";
import { Skeleton } from "@/components/ui/skeleton";

const Index = () => {
  const { data: announcements, isLoading: loadingAnnouncements } = useAnnouncements();
  const { data: events, isLoading: loadingEvents } = useEvents();
  const { data: issues, isLoading: loadingIssues } = useIssues();
  
  return (
    <div className="space-y-8">
      <HeroSection />
      <QuickAccess />

      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold">Latest News</h2>
          <Link to="/announcements" className="text-civic-blue hover:underline">
            View all
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {loadingAnnouncements ? (
            Array(3)
              .fill(null)
              .map((_, i) => (
                <div key={i} className="space-y-3">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-24 w-full" />
                  <div className="flex justify-between">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-4 w-16" />
                  </div>
                </div>
              ))
          ) : announcements?.slice(0, 3).map((announcement) => (
            <AnnouncementCard key={announcement.id} announcement={announcement} />
          ))}
        </div>
      </section>

      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold">Upcoming Events</h2>
          <Link to="/events" className="text-civic-blue hover:underline">
            View all
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {loadingEvents ? (
            Array(2)
              .fill(null)
              .map((_, i) => (
                <div key={i} className="space-y-3">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-24 w-full" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                  </div>
                </div>
              ))
          ) : events?.slice(0, 2).map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </section>

      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold">Recent Issues</h2>
          <Link to="/issues" className="text-civic-blue hover:underline">
            View all
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {loadingIssues ? (
            Array(3)
              .fill(null)
              .map((_, i) => (
                <div key={i} className="space-y-3">
                  <div className="flex justify-between">
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-4 w-24" />
                  </div>
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-20 w-full" />
                  <div className="flex justify-between">
                    <Skeleton className="h-4 w-28" />
                    <Skeleton className="h-4 w-16" />
                  </div>
                </div>
              ))
          ) : issues?.slice(0, 3).map((issue) => (
            <IssueCard key={issue.id} issue={issue} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Index;
