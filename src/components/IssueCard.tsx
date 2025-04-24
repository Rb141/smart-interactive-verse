
import { Issue } from "@/lib/api";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { format, parseISO } from "date-fns";
import { AlertCircle, CheckCircle, Clock, MapPin } from "lucide-react";

interface IssueCardProps {
  issue: Issue;
}

const IssueCard = ({ issue }: IssueCardProps) => {
  const reportDate = parseISO(issue.reportDate);
  const weeksAgo = Math.floor(
    (new Date().getTime() - reportDate.getTime()) / (1000 * 60 * 60 * 24 * 7)
  );
  
  let statusIcon;
  let statusClass;
  
  switch (issue.status) {
    case "In Progress":
      statusIcon = <Clock className="h-4 w-4" />;
      statusClass = "badge-blue";
      break;
    case "Reported":
      statusIcon = <AlertCircle className="h-4 w-4" />;
      statusClass = "badge-yellow";
      break;
    case "Resolved":
      statusIcon = <CheckCircle className="h-4 w-4" />;
      statusClass = "badge-green";
      break;
    default:
      statusIcon = null;
      statusClass = "badge-gray";
  }
  
  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <Badge variant="outline" className="badge badge-gray">
            {issue.category}
          </Badge>
          <Badge variant="outline" className={`badge ${statusClass} flex items-center gap-1`}>
            {statusIcon}
            {issue.status}
          </Badge>
        </div>
        <h3 className="text-lg font-semibold mt-2">{issue.title}</h3>
      </CardHeader>
      <CardContent className="pb-2">
        <p className="text-sm text-gray-600 mb-2">{issue.description}</p>
        <div className="flex items-center text-sm text-gray-500">
          <MapPin className="h-4 w-4 mr-1" />
          <span>{issue.location}</span>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between pt-2 text-sm text-gray-500">
        <span>Reported by: {issue.reportedBy}</span>
        <span>{weeksAgo} weeks ago</span>
      </CardFooter>
    </Card>
  );
};

export default IssueCard;
