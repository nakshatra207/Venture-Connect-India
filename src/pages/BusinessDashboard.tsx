
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { TrendingUp, Plus, Eye, MessageCircle, BarChart3, Users, DollarSign, Calendar, FileText, Lightbulb } from "lucide-react";
import { useNavigate } from "react-router-dom";

const BusinessDashboard = () => {
  const navigate = useNavigate();
  const [showCreateProposal, setShowCreateProposal] = useState(false);

  const [proposalData, setProposalData] = useState({
    title: '',
    category: '',
    fundingAmount: '',
    equity: '',
    description: '',
    businessModel: '',
    marketSize: '',
    competition: '',
    useOfFunds: ''
  });

  // Mock data for user's proposals
  const myProposals = [
    {
      id: 1,
      title: "GreenTech Solar Solutions",
      category: "Technology",
      fundingNeeded: "₹25 Lakhs",
      equity: "15%",
      status: "Active",
      views: 145,
      interests: 12,
      messages: 8,
      dateCreated: "2024-01-15"
    },
    {
      id: 2,
      title: "Smart Agriculture Platform",
      category: "Agriculture",
      fundingNeeded: "₹40 Lakhs",
      equity: "20%",
      status: "Under Review",
      views: 89,
      interests: 6,
      messages: 3,
      dateCreated: "2024-01-10"
    }
  ];

  const stats = [
    { title: "Proposal Views", value: "234", icon: Eye, change: "+23%" },
    { title: "Investor Interest", value: "18", icon: Users, change: "+5" },
    { title: "Active Proposals", value: "2", icon: FileText, change: "0" },
    { title: "Messages", value: "11", icon: MessageCircle, change: "+7" }
  ];

  const handleInputChange = (field: string, value: string) => {
    setProposalData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmitProposal = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle proposal submission
    setShowCreateProposal(false);
    // Reset form
    setProposalData({
      title: '',
      category: '',
      fundingAmount: '',
      equity: '',
      description: '',
      businessModel: '',
      marketSize: '',
      competition: '',
      useOfFunds: ''
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-green-600 to-blue-600 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">InvestBridge</h1>
          </div>
          <div className="flex items-center space-x-4">
            <Badge variant="secondary" className="bg-green-100 text-green-800">Entrepreneur</Badge>
            <Button variant="ghost" onClick={() => navigate('/')}>Logout</Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back, Entrepreneur!</h2>
            <p className="text-gray-600">Manage your proposals and connect with investors</p>
          </div>
          <Dialog open={showCreateProposal} onOpenChange={setShowCreateProposal}>
            <DialogTrigger asChild>
              <Button className="bg-green-600 hover:bg-green-700">
                <Plus className="w-4 h-4 mr-2" />
                Create Proposal
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Create New Business Proposal</DialogTitle>
                <DialogDescription>
                  Present your business idea to potential investors
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmitProposal} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="title">Business Title</Label>
                    <Input
                      id="title"
                      value={proposalData.title}
                      onChange={(e) => handleInputChange('title', e.target.value)}
                      placeholder="Your business name or idea title"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="category">Category</Label>
                    <Select onValueChange={(value) => handleInputChange('category', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="technology">Technology</SelectItem>
                        <SelectItem value="healthcare">Healthcare</SelectItem>
                        <SelectItem value="finance">Finance</SelectItem>
                        <SelectItem value="retail">Retail</SelectItem>
                        <SelectItem value="manufacturing">Manufacturing</SelectItem>
                        <SelectItem value="agriculture">Agriculture</SelectItem>
                        <SelectItem value="education">Education</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="fundingAmount">Funding Required</Label>
                    <Select onValueChange={(value) => handleInputChange('fundingAmount', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select funding amount" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1-5">₹1 - 5 Lakhs</SelectItem>
                        <SelectItem value="5-25">₹5 - 25 Lakhs</SelectItem>
                        <SelectItem value="25-100">₹25 Lakhs - 1 Crore</SelectItem>
                        <SelectItem value="100-500">₹1 - 5 Crores</SelectItem>
                        <SelectItem value="500+">₹5+ Crores</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="equity">Equity Offered (%)</Label>
                    <Input
                      id="equity"
                      type="number"
                      value={proposalData.equity}
                      onChange={(e) => handleInputChange('equity', e.target.value)}
                      placeholder="e.g., 15"
                      min="1"
                      max="100"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="description">Business Description</Label>
                  <Textarea
                    id="description"
                    value={proposalData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    placeholder="Describe your business idea, problem it solves, and target market"
                    rows={4}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="businessModel">Business Model</Label>
                  <Textarea
                    id="businessModel"
                    value={proposalData.businessModel}
                    onChange={(e) => handleInputChange('businessModel', e.target.value)}
                    placeholder="Explain how your business will make money"
                    rows={3}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="marketSize">Market Size</Label>
                    <Textarea
                      id="marketSize"
                      value={proposalData.marketSize}
                      onChange={(e) => handleInputChange('marketSize', e.target.value)}
                      placeholder="Describe your target market size and opportunity"
                      rows={3}
                    />
                  </div>
                  <div>
                    <Label htmlFor="competition">Competition Analysis</Label>
                    <Textarea
                      id="competition"
                      value={proposalData.competition}
                      onChange={(e) => handleInputChange('competition', e.target.value)}
                      placeholder="Who are your competitors and what's your advantage?"
                      rows={3}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="useOfFunds">Use of Funds</Label>
                  <Textarea
                    id="useOfFunds"
                    value={proposalData.useOfFunds}
                    onChange={(e) => handleInputChange('useOfFunds', e.target.value)}
                    placeholder="How will you use the investment money?"
                    rows={3}
                  />
                </div>

                <div className="flex justify-end space-x-4">
                  <Button type="button" variant="outline" onClick={() => setShowCreateProposal(false)}>
                    Cancel
                  </Button>
                  <Button type="submit" className="bg-green-600 hover:bg-green-700">
                    Create Proposal
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
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
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <stat.icon className="w-6 h-6 text-green-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content */}
        <Tabs defaultValue="proposals" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="proposals">My Proposals</TabsTrigger>
            <TabsTrigger value="investors">Investors</TabsTrigger>
            <TabsTrigger value="messages">Messages</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="proposals" className="space-y-6">
            <div className="grid gap-6">
              {myProposals.map((proposal) => (
                <Card key={proposal.id} className="hover:shadow-lg transition-all duration-300">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-xl">{proposal.title}</CardTitle>
                        <CardDescription className="flex items-center space-x-4 mt-1">
                          <Badge variant="outline">{proposal.category}</Badge>
                          <Badge variant={proposal.status === 'Active' ? 'default' : 'secondary'}>
                            {proposal.status}
                          </Badge>
                          <span>Created on {new Date(proposal.dateCreated).toLocaleDateString()}</span>
                        </CardDescription>
                      </div>
                      <Button variant="ghost" size="sm">
                        <Eye className="w-4 h-4 mr-2" />
                        Edit
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                      <div className="text-center p-3 bg-green-50 rounded-lg">
                        <p className="text-sm text-gray-600">Funding Needed</p>
                        <p className="font-semibold text-green-600">{proposal.fundingNeeded}</p>
                      </div>
                      <div className="text-center p-3 bg-blue-50 rounded-lg">
                        <p className="text-sm text-gray-600">Equity Offered</p>
                        <p className="font-semibold text-blue-600">{proposal.equity}</p>
                      </div>
                      <div className="text-center p-3 bg-purple-50 rounded-lg">
                        <p className="text-sm text-gray-600">Total Views</p>
                        <p className="font-semibold text-purple-600">{proposal.views}</p>
                      </div>
                      <div className="text-center p-3 bg-orange-50 rounded-lg">
                        <p className="text-sm text-gray-600">Interests</p>
                        <p className="font-semibold text-orange-600">{proposal.interests}</p>
                      </div>
                    </div>

                    <div className="flex justify-between items-center">
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <span>{proposal.views} views</span>
                        <span>•</span>
                        <span>{proposal.interests} interested investors</span>
                        <span>•</span>
                        <span>{proposal.messages} messages</span>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          <MessageCircle className="w-4 h-4 mr-2" />
                          Messages
                        </Button>
                        <Button size="sm" className="bg-green-600 hover:bg-green-700">
                          View Details
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="investors">
            <Card>
              <CardHeader>
                <CardTitle>Connect with Investors</CardTitle>
                <CardDescription>Browse and connect with potential investors</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Investor Network</h3>
                  <p className="text-gray-600 mb-4">Browse investor profiles and connect with potential partners</p>
                  <Button>Browse Investors</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="messages">
            <Card>
              <CardHeader>
                <CardTitle>Messages</CardTitle>
                <CardDescription>Communication with investors and advisors</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <MessageCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No New Messages</h3>
                  <p className="text-gray-600">Messages from interested investors will appear here</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics">
            <Card>
              <CardHeader>
                <CardTitle>Proposal Analytics</CardTitle>
                <CardDescription>Track the performance of your business proposals</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <BarChart3 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Proposal Performance</h3>
                  <p className="text-gray-600 mb-4">Detailed analytics on views, interests, and engagement</p>
                  <Button>View Analytics</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default BusinessDashboard;
