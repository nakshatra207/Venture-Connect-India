
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TrendingUp, Search, Filter, Eye, Heart, MessageCircle, BarChart3, Users, DollarSign, Calendar } from "lucide-react";
import { useNavigate } from "react-router-dom";

const InvestorDashboard = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  // Mock data for business proposals
  const businessProposals = [
    {
      id: 1,
      companyName: "GreenTech Solutions",
      category: "Technology",
      fundingNeeded: "₹25 Lakhs",
      description: "Sustainable energy solutions for urban homes using solar technology and IoT integration.",
      stage: "Seed",
      location: "Bangalore",
      founder: "Priya Sharma",
      equity: "15%",
      roi: "25%",
      liked: false
    },
    {
      id: 2,
      companyName: "HealthCare Plus",
      category: "Healthcare",
      fundingNeeded: "₹50 Lakhs",
      description: "Telemedicine platform connecting rural patients with city doctors through AI-powered diagnostics.",
      stage: "Series A",
      location: "Mumbai",
      founder: "Dr. Rajesh Kumar",
      equity: "20%",
      roi: "30%",
      liked: true
    },
    {
      id: 3,
      companyName: "AgriSmart",
      category: "Agriculture",
      fundingNeeded: "₹15 Lakhs",
      description: "Smart farming solutions using drones and sensors for crop monitoring and optimization.",
      stage: "Pre-seed",
      location: "Pune",
      founder: "Amit Patel",
      equity: "12%",
      roi: "22%",
      liked: false
    }
  ];

  const stats = [
    { title: "Total Investments", value: "₹2.5 Cr", icon: DollarSign, change: "+12%" },
    { title: "Active Deals", value: "8", icon: BarChart3, change: "+3" },
    { title: "Portfolio Companies", value: "12", icon: Users, change: "+2" },
    { title: "This Month", value: "₹45 L", icon: Calendar, change: "+18%" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-green-600 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">InvestBridge</h1>
          </div>
          <div className="flex items-center space-x-4">
            <Badge variant="secondary" className="bg-blue-100 text-blue-800">Investor</Badge>
            <Button variant="ghost" onClick={() => navigate('/')}>Logout</Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back, Investor!</h2>
          <p className="text-gray-600">Discover your next investment opportunity</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                    <p className="text-sm text-green-600">{stat.change}</p>
                  </div>
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <stat.icon className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content */}
        <Tabs defaultValue="discover" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="discover">Discover</TabsTrigger>
            <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
            <TabsTrigger value="messages">Messages</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="discover" className="space-y-6">
            {/* Search and Filter */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Search className="w-5 h-5 mr-2" />
                  Discover Business Opportunities
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex space-x-4">
                  <div className="flex-1">
                    <Input
                      placeholder="Search companies, categories, or keywords..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <Button variant="outline">
                    <Filter className="w-4 h-4 mr-2" />
                    Filters
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Business Proposals */}
            <div className="grid gap-6">
              {businessProposals.map((proposal) => (
                <Card key={proposal.id} className="hover:shadow-lg transition-all duration-300">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-xl">{proposal.companyName}</CardTitle>
                        <CardDescription className="flex items-center space-x-4 mt-1">
                          <Badge variant="outline">{proposal.category}</Badge>
                          <span>{proposal.location}</span>
                          <span>•</span>
                          <span>Founded by {proposal.founder}</span>
                        </CardDescription>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button variant="ghost" size="sm">
                          <Heart className={`w-4 h-4 ${proposal.liked ? 'fill-red-500 text-red-500' : ''}`} />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <MessageCircle className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">{proposal.description}</p>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                      <div className="text-center p-3 bg-blue-50 rounded-lg">
                        <p className="text-sm text-gray-600">Funding Needed</p>
                        <p className="font-semibold text-blue-600">{proposal.fundingNeeded}</p>
                      </div>
                      <div className="text-center p-3 bg-green-50 rounded-lg">
                        <p className="text-sm text-gray-600">Equity Offered</p>
                        <p className="font-semibold text-green-600">{proposal.equity}</p>
                      </div>
                      <div className="text-center p-3 bg-purple-50 rounded-lg">
                        <p className="text-sm text-gray-600">Expected ROI</p>
                        <p className="font-semibold text-purple-600">{proposal.roi}</p>
                      </div>
                      <div className="text-center p-3 bg-orange-50 rounded-lg">
                        <p className="text-sm text-gray-600">Stage</p>
                        <p className="font-semibold text-orange-600">{proposal.stage}</p>
                      </div>
                    </div>

                    <div className="flex space-x-3">
                      <Button className="flex-1 bg-blue-600 hover:bg-blue-700">
                        <Eye className="w-4 h-4 mr-2" />
                        View Details
                      </Button>
                      <Button variant="outline" className="flex-1">
                        Connect
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="portfolio">
            <Card>
              <CardHeader>
                <CardTitle>Your Investment Portfolio</CardTitle>
                <CardDescription>Track your investments and their performance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <BarChart3 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Portfolio Analytics</h3>
                  <p className="text-gray-600 mb-4">Your investment portfolio will be displayed here</p>
                  <Button>View Detailed Analytics</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="messages">
            <Card>
              <CardHeader>
                <CardTitle>Messages</CardTitle>
                <CardDescription>Communication with entrepreneurs and advisors</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <MessageCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No New Messages</h3>
                  <p className="text-gray-600">Start conversations with entrepreneurs to begin building relationships</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics">
            <Card>
              <CardHeader>
                <CardTitle>Investment Analytics</CardTitle>
                <CardDescription>Detailed insights into your investment performance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <TrendingUp className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Advanced Analytics</h3>
                  <p className="text-gray-600 mb-4">Comprehensive investment analytics and reporting</p>
                  <Button>Generate Report</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default InvestorDashboard;
