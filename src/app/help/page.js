"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { 
  HelpCircle, 
  BookOpen, 
  Gamepad2, 
  AlertTriangle, 
  Mail, 
  MessageCircle, 
  Search,
  ChevronDown,
  ChevronRight,
  Crown,
  Shield,
  Eye,
  Swords,
  Users,
  Trophy,
  Clock,
  Star,
  Info,
  ExternalLink
} from "lucide-react";

const faqData = [
  {
    category: "Getting Started",
    questions: [
      {
        q: "How do I create an account?",
        a: "You can sign in with your Google account or play as a guest. Click the 'Continue with Google' button on the authentication screen to create a permanent account, or enter a name to play as a guest."
      },
      {
        q: "What's the difference between guest and authenticated users?",
        a: "Authenticated users can save their progress, view detailed statistics, and access leaderboards. Guest users have temporary sessions that don't persist after closing the browser."
      },
      {
        q: "How do I join a game?",
        a: "Browse available rooms on the home page and click 'Join' on any room with available slots. You can also create your own room by clicking 'Create Room'."
      }
    ]
  },
  {
    category: "Gameplay",
    questions: [
      {
        q: "What is Raja Mantri Chor Sipahi?",
        a: "It's a classic Indian strategy game for 4 players where each player gets a secret role: Raja (King), Mantri (Minister), Chor (Thief), or Sipahi (Soldier). The goal varies by role."
      },
      {
        q: "How do I win the game?",
        a: "Victory depends on your role: Raja wins by avoiding the Chor, Mantri wins by helping the Raja, Chor wins by staying hidden, and Sipahi wins by correctly identifying the Chor."
      },
      {
        q: "Can I play with friends?",
        a: "Yes! Create a private room and share the room code with your friends. They can join using the code directly."
      }
    ]
  },
  {
    category: "Technical",
    questions: [
      {
        q: "The game won't load. What should I do?",
        a: "Try refreshing the page, clearing your browser cache, or checking your internet connection. If the problem persists, contact support."
      },
      {
        q: "I'm experiencing lag or connection issues",
        a: "Ensure you have a stable internet connection. The game works best with modern browsers like Chrome, Firefox, or Safari."
      },
      {
        q: "Can I play on mobile devices?",
        a: "Yes! The game is fully responsive and works on smartphones and tablets. For the best experience, use landscape mode on mobile devices."
      }
    ]
  }
];

const gameRoles = [
  {
    name: "Raja",
    icon: Crown,
    color: "text-yellow-600",
    bgColor: "bg-yellow-50 border-yellow-200",
    description: "The King must avoid being caught by the Chor",
    objective: "Stay hidden from the Chor and trust your Mantri",
    tips: ["Work with your Mantri", "Be cautious of suspicious players", "Don't reveal your identity too early"]
  },
  {
    name: "Mantri", 
    icon: Shield,
    color: "text-blue-600",
    bgColor: "bg-blue-50 border-blue-200",
    description: "The Minister protects and assists the Raja",
    objective: "Help the Raja win and avoid the Chor",
    tips: ["Identify the Raja early", "Protect the Raja from suspicion", "Mislead the Sipahi if needed"]
  },
  {
    name: "Chor",
    icon: Eye,
    color: "text-red-600", 
    bgColor: "bg-red-50 border-red-200",
    description: "The Thief must identify and catch the Raja",
    objective: "Find and successfully target the Raja",
    tips: ["Observe player behavior", "Blend in with other players", "Strike at the right moment"]
  },
  {
    name: "Sipahi",
    icon: Swords,
    color: "text-green-600",
    bgColor: "bg-green-50 border-green-200", 
    description: "The Soldier must identify and catch the Chor",
    objective: "Correctly guess who the Chor is",
    tips: ["Watch for suspicious behavior", "Analyze player interactions", "Make your guess wisely"]
  }
];

export default function HelpPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [openFaq, setOpenFaq] = useState({});

  const filteredFAQ = faqData.map(category => ({
    ...category,
    questions: category.questions.filter(
      item => 
        item.q.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.a.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(category => category.questions.length > 0);

  const toggleFaq = (categoryIndex, questionIndex) => {
    const key = `${categoryIndex}-${questionIndex}`;
    setOpenFaq(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {/* Header */}
      <div className="mb-8 text-center">
        <div className="flex items-center justify-center space-x-3 mb-4">
          <div className="p-3 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl text-white">
            <HelpCircle className="w-6 h-6" />
          </div>
          <h1 className="text-3xl font-bangers text-gray-800 tracking-wide">Help Center</h1>
        </div>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Everything you need to know about playing Raja Mantri Chor Sipahi online
        </p>
      </div>

      <Tabs defaultValue="faq" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="faq" className="flex items-center space-x-2">
            <HelpCircle className="w-4 h-4" />
            <span>FAQ</span>
          </TabsTrigger>
          <TabsTrigger value="gameplay" className="flex items-center space-x-2">
            <Gamepad2 className="w-4 h-4" />
            <span>Gameplay</span>
          </TabsTrigger>
          <TabsTrigger value="troubleshooting" className="flex items-center space-x-2">
            <AlertTriangle className="w-4 h-4" />
            <span>Troubleshooting</span>
          </TabsTrigger>
          <TabsTrigger value="contact" className="flex items-center space-x-2">
            <Mail className="w-4 h-4" />
            <span>Contact</span>
          </TabsTrigger>
        </TabsList>

        {/* FAQ Tab */}
        <TabsContent value="faq">
          <div className="space-y-6">
            {/* Search */}
            <Card>
              <CardContent className="pt-6">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Search frequently asked questions..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </CardContent>
            </Card>

            {/* FAQ Categories */}
            {filteredFAQ.map((category, categoryIndex) => (
              <Card key={category.category}>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <BookOpen className="w-5 h-5 text-purple-600" />
                    <span>{category.category}</span>
                    <Badge variant="secondary">{category.questions.length}</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {category.questions.map((item, questionIndex) => (
                      <Collapsible
                        key={questionIndex}
                        open={openFaq[`${categoryIndex}-${questionIndex}`]}
                        onOpenChange={() => toggleFaq(categoryIndex, questionIndex)}
                      >
                        <CollapsibleTrigger className="flex items-center justify-between w-full p-3 text-left bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
                          <span className="font-medium text-gray-900">{item.q}</span>
                          {openFaq[`${categoryIndex}-${questionIndex}`] ? (
                            <ChevronDown className="w-4 h-4 text-gray-500" />
                          ) : (
                            <ChevronRight className="w-4 h-4 text-gray-500" />
                          )}
                        </CollapsibleTrigger>
                        <CollapsibleContent className="px-3 py-2">
                          <p className="text-gray-700">{item.a}</p>
                        </CollapsibleContent>
                      </Collapsible>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}

            {filteredFAQ.length === 0 && searchTerm && (
              <Card>
                <CardContent className="text-center py-8">
                  <HelpCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No results found</h3>
                  <p className="text-gray-500">
                    Try adjusting your search terms or browse the categories below.
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>

        {/* Gameplay Tab */}
        <TabsContent value="gameplay">
          <div className="space-y-6">
            {/* Game Overview */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Gamepad2 className="w-5 h-5 text-purple-600" />
                  <span>Game Overview</span>
                </CardTitle>
                <CardDescription>
                  Learn the basics of Raja Mantri Chor Sipahi
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Users className="w-4 h-4 text-blue-600" />
                      <span className="font-medium">Players:</span>
                      <span>4 players required</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4 text-green-600" />
                      <span className="font-medium">Duration:</span>
                      <span>5-15 minutes per round</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Trophy className="w-4 h-4 text-yellow-600" />
                      <span className="font-medium">Difficulty:</span>
                      <span>Easy to learn, strategic to master</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Star className="w-4 h-4 text-purple-600" />
                      <span className="font-medium">Type:</span>
                      <span>Social deduction game</span>
                    </div>
                  </div>
                </div>
                
                <Separator />
                
                <div>
                  <h4 className="font-medium mb-2">How to Play:</h4>
                  <ol className="list-decimal list-inside space-y-1 text-gray-700">
                    <li>Each player receives a secret role</li>
                    <li>Players interact and observe each other</li>
                    <li>The Sipahi makes a guess about the Chor</li>
                    <li>Points are awarded based on role objectives</li>
                    <li>Multiple rounds can be played</li>
                  </ol>
                </div>
              </CardContent>
            </Card>

            {/* Roles Guide */}
            <Card>
              <CardHeader>
                <CardTitle>Player Roles</CardTitle>
                <CardDescription>
                  Each role has unique objectives and strategies
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {gameRoles.map((role) => (
                    <div key={role.name} className={`p-4 border rounded-lg ${role.bgColor}`}>
                      <div className="flex items-center space-x-3 mb-3">
                        <role.icon className={`w-6 h-6 ${role.color}`} />
                        <h3 className={`font-bold text-lg ${role.color}`}>{role.name}</h3>
                      </div>
                      <p className="text-gray-700 mb-3">{role.description}</p>
                      <div className="space-y-2">
                        <div>
                          <span className="font-medium text-gray-900">Objective: </span>
                          <span className="text-gray-700">{role.objective}</span>
                        </div>
                        <div>
                          <span className="font-medium text-gray-900">Tips:</span>
                          <ul className="list-disc list-inside text-sm text-gray-600 mt-1">
                            {role.tips.map((tip, index) => (
                              <li key={index}>{tip}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Game Flow */}
            <Card>
              <CardHeader>
                <CardTitle>Game Flow</CardTitle>
                <CardDescription>
                  Step-by-step breakdown of a typical game
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { step: 1, title: "Room Setup", desc: "Players join a room and mark themselves as ready" },
                    { step: 2, title: "Role Assignment", desc: "Each player secretly receives one of the four roles" },
                    { step: 3, title: "Discussion Phase", desc: "Players interact and try to achieve their objectives" },
                    { step: 4, title: "Sipahi's Guess", desc: "The Sipahi makes their guess about who the Chor is" },
                    { step: 5, title: "Reveal & Scoring", desc: "Roles are revealed and points are awarded" },
                    { step: 6, title: "Next Round", desc: "Optional: Start a new round with shuffled roles" }
                  ].map((phase) => (
                    <div key={phase.step} className="flex items-start space-x-4">
                      <div className="flex-shrink-0 w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                        {phase.step}
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">{phase.title}</h4>
                        <p className="text-gray-600 text-sm">{phase.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Troubleshooting Tab */}
        <TabsContent value="troubleshooting">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <AlertTriangle className="w-5 h-5 text-orange-600" />
                  <span>Common Issues</span>
                </CardTitle>
                <CardDescription>
                  Solutions to frequently encountered problems
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {[
                  {
                    issue: "Game won't load or shows error",
                    solutions: [
                      "Refresh the page (Ctrl+R or Cmd+R)",
                      "Clear browser cache and cookies",
                      "Try a different browser (Chrome, Firefox, Safari)",
                      "Check your internet connection",
                      "Disable browser extensions temporarily"
                    ]
                  },
                  {
                    issue: "Can't connect to multiplayer games",
                    solutions: [
                      "Ensure you're signed in or have entered a guest name",
                      "Check if your firewall is blocking the connection",
                      "Try switching to a different network",
                      "Make sure JavaScript is enabled",
                      "Contact support if issues persist"
                    ]
                  },
                  {
                    issue: "Audio not working",
                    solutions: [
                      "Check your device volume settings",
                      "Ensure browser has permission to play audio",
                      "Try unmuting and refreshing the page",
                      "Check audio settings in the Settings page",
                      "Test with a different browser"
                    ]
                  },
                  {
                    issue: "Mobile display issues",
                    solutions: [
                      "Rotate to landscape mode for better experience",
                      "Zoom out if interface elements are cut off",
                      "Close other browser tabs to free up memory",
                      "Update your mobile browser",
                      "Clear browser cache on mobile"
                    ]
                  }
                ].map((item, index) => (
                  <div key={index} className="border-l-4 border-orange-500 pl-4">
                    <h4 className="font-medium text-gray-900 mb-2">{item.issue}</h4>
                    <ul className="space-y-1">
                      {item.solutions.map((solution, i) => (
                        <li key={i} className="flex items-start space-x-2">
                          <span className="w-1.5 h-1.5 bg-orange-500 rounded-full mt-2 flex-shrink-0"></span>
                          <span className="text-gray-700 text-sm">{solution}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>System Requirements</CardTitle>
                <CardDescription>
                  Minimum requirements for optimal gameplay
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium mb-3">Desktop/Laptop</h4>
                    <ul className="space-y-2 text-sm text-gray-700">
                      <li>• Modern web browser (Chrome 80+, Firefox 75+, Safari 13+)</li>
                      <li>• Stable internet connection (1 Mbps minimum)</li>
                      <li>• JavaScript enabled</li>
                      <li>• 2GB RAM recommended</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium mb-3">Mobile</h4>
                    <ul className="space-y-2 text-sm text-gray-700">
                      <li>• iOS 12+ or Android 8+</li>
                      <li>• Updated mobile browser</li>
                      <li>• Stable Wi-Fi or mobile data</li>
                      <li>• Landscape orientation recommended</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Contact Tab */}
        <TabsContent value="contact">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Mail className="w-5 h-5 text-purple-600" />
                  <span>Get in Touch</span>
                </CardTitle>
                <CardDescription>
                  Need help? We're here to assist you
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="p-4 border border-gray-200 rounded-lg">
                      <div className="flex items-center space-x-3 mb-2">
                        <Mail className="w-5 h-5 text-blue-600" />
                        <h4 className="font-medium">Email Support</h4>
                      </div>
                      <p className="text-gray-600 text-sm mb-3">
                        Send us an email for detailed assistance
                      </p>
                      <Button className="w-full" variant="outline">
                        <ExternalLink className="w-4 h-4 mr-2" />
                        support@rmcs.game
                      </Button>
                    </div>

                    <div className="p-4 border border-gray-200 rounded-lg">
                      <div className="flex items-center space-x-3 mb-2">
                        <MessageCircle className="w-5 h-5 text-green-600" />
                        <h4 className="font-medium">Live Chat</h4>
                      </div>
                      <p className="text-gray-600 text-sm mb-3">
                        Chat with our support team in real-time
                      </p>
                      <Button className="w-full" variant="outline">
                        <MessageCircle className="w-4 h-4 mr-2" />
                        Start Chat
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                      <h4 className="font-medium text-blue-900 mb-2">Response Times</h4>
                      <ul className="text-sm text-blue-800 space-y-1">
                        <li>• Live Chat: Immediate during business hours</li>
                        <li>• Email: Within 24 hours</li>
                        <li>• Critical Issues: Within 2 hours</li>
                      </ul>
                    </div>

                    <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                      <h4 className="font-medium text-green-900 mb-2">Support Hours</h4>
                      <ul className="text-sm text-green-800 space-y-1">
                        <li>• Monday - Friday: 9 AM - 6 PM IST</li>
                        <li>• Saturday: 10 AM - 4 PM IST</li>
                        <li>• Sunday: Closed</li>
                        <li>• Emergency support available 24/7</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Report a Bug</CardTitle>
                <CardDescription>
                  Help us improve by reporting issues
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <div className="flex items-start space-x-3">
                    <Info className="w-5 h-5 text-yellow-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-yellow-900 mb-2">
                        When reporting a bug, please include:
                      </h4>
                      <ul className="text-sm text-yellow-800 space-y-1">
                        <li>• Detailed description of the issue</li>
                        <li>• Steps to reproduce the problem</li>
                        <li>• Your browser and device information</li>
                        <li>• Screenshot or video if applicable</li>
                        <li>• Your account type (guest or authenticated)</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
} 