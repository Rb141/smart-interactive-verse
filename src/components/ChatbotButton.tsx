
import { useState } from "react";
import { MessageSquare, X, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface ChatMessage {
  id: number;
  content: string;
  sender: "user" | "bot";
  timestamp: Date;
}

const LANGUAGES = [
  { code: "en", name: "English" },
  { code: "es", name: "Spanish" },
  { code: "fr", name: "French" },
  { code: "de", name: "German" },
  { code: "zh", name: "Chinese" },
];

const ChatbotButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 1,
      content:
        "👋 Hello! I'm your CivicSphere assistant. How can I help you today?",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [language, setLanguage] = useState("en");
  const { toast } = useToast();
  
  const toggleChat = () => {
    setIsOpen(!isOpen);
  };
  
  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!message.trim()) return;
    
    // Add user message
    const userMessage: ChatMessage = {
      id: messages.length + 1,
      content: message,
      sender: "user",
      timestamp: new Date(),
    };
    
    setMessages([...messages, userMessage]);
    setMessage("");
    
    // Simulate AI response
    setTimeout(() => {
      // Use AI to generate response based on user query
      const aiResponses: { [key: string]: string } = {
        en: getBotResponse(message),
        es: `[Español] ${getBotResponse(message)}`,
        fr: `[Français] ${getBotResponse(message)}`,
        de: `[Deutsch] ${getBotResponse(message)}`,
        zh: `[中文] ${getBotResponse(message)}`,
      };
      
      const botMessage: ChatMessage = {
        id: messages.length + 2,
        content: aiResponses[language],
        sender: "bot",
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, botMessage]);
    }, 1000);
  };
  
  // Simple response generation based on keywords
  const getBotResponse = (query: string) => {
    const lowerQuery = query.toLowerCase();
    
    if (lowerQuery.includes("event") || lowerQuery.includes("events")) {
      return "You can find all community events on our Events page. The next upcoming event is the Community Clean-up Day on April 12th at Riverside Park.";
    } else if (
      lowerQuery.includes("report") ||
      lowerQuery.includes("issue") ||
      lowerQuery.includes("problem")
    ) {
      return "To report an issue, click the 'Report an Issue' button on the homepage or go to the Issues page. Your report will be sent to the appropriate department.";
    } else if (
      lowerQuery.includes("contact") ||
      lowerQuery.includes("phone") ||
      lowerQuery.includes("email")
    ) {
      return "You can find contact information for city departments and officials on our Leaders and Organizations pages. For general inquiries, contact info@civicsphere.org or call (555) 123-4567.";
    } else if (
      lowerQuery.includes("hours") ||
      lowerQuery.includes("open") ||
      lowerQuery.includes("schedule")
    ) {
      return "City Hall is open Monday to Friday, 8:00 AM to 5:00 PM. The Community Center has extended hours until 9:00 PM on weekdays and is now open on Sundays from 12:00 PM to 5:00 PM.";
    } else if (
      lowerQuery.includes("hello") ||
      lowerQuery.includes("hi") ||
      lowerQuery.includes("hey")
    ) {
      return "Hello there! How can I assist you with CivicSphere today?";
    } else {
      return "I'd be happy to help with that. You can find more information on our website, or contact us directly at info@civicsphere.org for specific questions.";
    }
  };
  
  const changeLanguage = (lang: string) => {
    setLanguage(lang);
    toast({
      title: "Language Changed",
      description: `Chatbot language set to ${
        LANGUAGES.find((l) => l.code === lang)?.name || lang
      }`,
    });
    
    // Add system message about language change
    const langMessage: ChatMessage = {
      id: messages.length + 1,
      content: `Language changed to ${
        LANGUAGES.find((l) => l.code === lang)?.name || lang
      }`,
      sender: "bot",
      timestamp: new Date(),
    };
    
    setMessages([...messages, langMessage]);
  };
  
  return (
    <>
      <Button
        className="fixed bottom-6 right-6 rounded-full h-14 w-14 shadow-lg"
        onClick={toggleChat}
      >
        {isOpen ? (
          <X className="h-6 w-6" />
        ) : (
          <MessageSquare className="h-6 w-6" />
        )}
      </Button>
      
      {isOpen && (
        <Card className="fixed bottom-24 right-6 w-80 sm:w-96 shadow-lg border-gray-200 animate-fade-in">
          <CardHeader className="bg-civic-blue text-white p-4 rounded-t-lg">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">Community Assistant</h3>
              <Tabs defaultValue={language} className="w-fit">
                <TabsList className="bg-blue-700">
                  {LANGUAGES.slice(0, 3).map((lang) => (
                    <TabsTrigger
                      key={lang.code}
                      value={lang.code}
                      onClick={() => changeLanguage(lang.code)}
                      className="data-[state=active]:bg-blue-800 text-xs"
                    >
                      {lang.code.toUpperCase()}
                    </TabsTrigger>
                  ))}
                  <TabsTrigger
                    value="more"
                    className="data-[state=active]:bg-blue-800"
                  >
                    <Globe size={16} />
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <ScrollArea className="h-80 p-4">
              <div className="flex flex-col gap-3">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${
                      msg.sender === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`rounded-lg p-3 max-w-[80%] ${
                        msg.sender === "user"
                          ? "bg-civic-blue text-white"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      <p className="text-sm">{msg.content}</p>
                      <p className="text-xs mt-1 opacity-70">
                        {msg.timestamp.toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
          <CardFooter className="p-2">
            <form onSubmit={handleSend} className="w-full flex gap-2">
              <Input
                placeholder="Type your message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="flex-1"
              />
              <Button type="submit" size="sm">
                Send
              </Button>
            </form>
          </CardFooter>
        </Card>
      )}
    </>
  );
};

export default ChatbotButton;
