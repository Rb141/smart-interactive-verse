
import { Event } from "@/lib/api";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { format, parseISO } from "date-fns";
import { Calendar, MapPin, Users } from "lucide-react";

interface EventCardProps {
  event: Event;
}

const EventCard = ({ event }: EventCardProps) => {
  const startDate = parseISO(event.startDate);
  const endDate = parseISO(event.endDate);
  
  const formattedDate = format(startDate, "MMM d, yyyy");
  const formattedStartTime = format(startDate, "h:mm a");
  const formattedEndTime = format(endDate, "h:mm a");
  
  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <Badge variant="outline" className="badge badge-green w-fit">
          {event.category}
        </Badge>
        <h3 className="text-lg font-semibold mt-2">{event.title}</h3>
      </CardHeader>
      <CardContent className="pb-2">
        <p className="text-sm text-gray-600 mb-4">{event.description}</p>
        
        <div className="space-y-2">
          <div className="flex items-center text-sm">
            <Calendar className="h-4 w-4 mr-2 text-gray-500" />
            <span>{formattedDate} at {formattedStartTime} - {formattedEndTime}</span>
          </div>
          
          <div className="flex items-center text-sm">
            <MapPin className="h-4 w-4 mr-2 text-gray-500" />
            <span>{event.location}</span>
          </div>
          
          <div className="flex items-center text-sm">
            <Users className="h-4 w-4 mr-2 text-gray-500" />
            <span>{event.organizer}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EventCard;
