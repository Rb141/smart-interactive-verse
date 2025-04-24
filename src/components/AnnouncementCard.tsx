
import { Announcement } from "@/lib/api";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { format, parseISO } from "date-fns";
import { CheckCircle } from "lucide-react";

interface AnnouncementCardProps {
  announcement: Announcement;
}

const AnnouncementCard = ({ announcement }: AnnouncementCardProps) => {
  const date = parseISO(announcement.date);
  const formattedDate = format(date, "MMM d, yyyy");
  const weeksAgo = Math.floor(
    (new Date().getTime() - date.getTime()) / (1000 * 60 * 60 * 24 * 7)
  );
  
  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <Badge variant="outline" className="badge badge-blue">
            {announcement.category}
          </Badge>
          {announcement.verified && (
            <div className="flex items-center text-green-600">
              <CheckCircle size={16} className="mr-1" />
              <span className="text-xs">Verified</span>
            </div>
          )}
        </div>
        <h3 className="text-lg font-semibold mt-2">{announcement.title}</h3>
      </CardHeader>
      <CardContent className="pb-2">
        <p className="text-sm text-gray-600">{announcement.content}</p>
      </CardContent>
      <CardFooter className="flex justify-between pt-2 text-sm text-gray-500">
        <span>{announcement.department}</span>
        <span>{weeksAgo} weeks ago</span>
      </CardFooter>
    </Card>
  );
};

export default AnnouncementCard;
