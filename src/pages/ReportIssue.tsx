
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { submitIssue } from "@/lib/api";
import { useNavigate } from "react-router-dom";
import { MapPin } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CheckCircle } from "lucide-react";

const issueCategories = [
  "Roads",
  "Parks",
  "Street Lighting",
  "Waste Management",
  "Drainage",
  "Sidewalks",
  "Traffic Signs",
  "Public Facilities",
  "Vandalism",
  "Other",
];

const ReportIssue = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    location: "",
    reportedBy: "",
  });
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  
  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple validation
    if (!formData.title || !formData.description || !formData.category || !formData.location || !formData.reportedBy) {
      toast({
        title: "Missing information",
        description: "Please fill out all required fields.",
        variant: "destructive",
      });
      return;
    }
    
    try {
      setIsSubmitting(true);
      // Submit the issue
      await submitIssue(formData);
      
      // Show success state
      setIsSuccess(true);
      
      // Reset form
      setFormData({
        title: "",
        description: "",
        category: "",
        location: "",
        reportedBy: "",
      });
      
      toast({
        title: "Issue reported successfully",
        description: "Thank you for helping improve our community!",
      });
      
      // Redirect after a moment
      setTimeout(() => {
        navigate("/issues");
      }, 3000);
    } catch (error) {
      toast({
        title: "Error submitting issue",
        description: "There was a problem submitting your report. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  if (isSuccess) {
    return (
      <Card className="w-full max-w-xl mx-auto">
        <CardHeader className="bg-green-50">
          <div className="flex items-center gap-4">
            <div className="bg-green-100 p-3 rounded-full">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <div>
              <CardTitle>Issue Reported Successfully!</CardTitle>
              <CardDescription>Thank you for helping improve our community.</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          <p className="text-center mb-4">Your issue has been submitted and will be reviewed by our team.</p>
          <p className="text-center text-sm text-gray-500 mb-6">Redirecting to issues page...</p>
          <div className="flex justify-center">
            <Button onClick={() => navigate("/issues")}>View All Issues</Button>
          </div>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Report an Issue</h1>
        <p className="text-gray-600 mt-2">
          Help us improve our community by reporting issues or concerns.
        </p>
      </div>
      
      <Card>
        <form onSubmit={handleSubmit}>
          <CardHeader>
            <CardTitle>Issue Details</CardTitle>
            <CardDescription>
              Please provide as much information as possible about the issue.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                name="title"
                placeholder="Brief description of the issue"
                value={formData.title}
                onChange={handleInputChange}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select
                value={formData.category}
                onValueChange={(value) => handleSelectChange("category", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {issueCategories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                placeholder="Please describe the issue in detail"
                rows={4}
                value={formData.description}
                onChange={handleInputChange}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <div className="relative">
                <Input
                  id="location"
                  name="location"
                  placeholder="Street address or intersection"
                  value={formData.location}
                  onChange={handleInputChange}
                  className="pl-10"
                />
                <div className="absolute left-3 top-3 text-gray-400">
                  <MapPin size={16} />
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="reportedBy">Your Name</Label>
              <Input
                id="reportedBy"
                name="reportedBy"
                placeholder="Your name"
                value={formData.reportedBy}
                onChange={handleInputChange}
              />
              <p className="text-xs text-gray-500">
                Your name will be associated with this report.
              </p>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={() => navigate(-1)}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Submit Report"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default ReportIssue;
