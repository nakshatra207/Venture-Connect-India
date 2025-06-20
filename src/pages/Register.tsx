
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { TrendingUp, ArrowLeft, Users, Briefcase } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const Register = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { toast } = useToast();
  const userType = searchParams.get('type') || 'investor';
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    userType: userType,
    // Investor specific
    investmentRange: '',
    preferredSectors: '',
    experience: '',
    // Business specific
    companyName: '',
    businessCategory: '',
    fundingNeeded: '',
    businessDescription: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match",
        variant: "destructive"
      });
      return;
    }

    // Simulate registration success
    toast({
      title: "Registration Successful!",
      description: "Welcome to InvestBridge. Please check your email for verification.",
    });

    // Navigate to dashboard based on user type
    setTimeout(() => {
      navigate(formData.userType === 'investor' ? '/investor-dashboard' : '/business-dashboard');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-green-600 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">InvestBridge</h1>
          </div>
          <Button variant="ghost" onClick={() => navigate('/')}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
        </div>
      </header>

      <div className="py-12 px-4">
        <div className="container mx-auto max-w-2xl">
          <Card className="shadow-lg">
            <CardHeader className="text-center">
              <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${
                userType === 'investor' ? 'bg-blue-100' : 'bg-green-100'
              }`}>
                {userType === 'investor' ? 
                  <TrendingUp className={`w-8 h-8 ${userType === 'investor' ? 'text-blue-600' : 'text-green-600'}`} /> :
                  <Users className={`w-8 h-8 ${userType === 'investor' ? 'text-blue-600' : 'text-green-600'}`} />
                }
              </div>
              <CardTitle className="text-2xl">
                {userType === 'investor' ? 'Join as Investor' : 'Join as Entrepreneur'}
              </CardTitle>
              <CardDescription>
                {userType === 'investor' 
                  ? 'Discover and invest in promising business opportunities'
                  : 'Pitch your ideas and connect with potential investors'
                }
              </CardDescription>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* User Type Selection */}
                <div className="grid grid-cols-2 gap-4">
                  <Button
                    type="button"
                    variant={userType === 'investor' ? 'default' : 'outline'}
                    onClick={() => handleInputChange('userType', 'investor')}
                    className="h-12"
                  >
                    <TrendingUp className="w-4 h-4 mr-2" />
                    Investor
                  </Button>
                  <Button
                    type="button"
                    variant={userType === 'business' ? 'default' : 'outline'}
                    onClick={() => handleInputChange('userType', 'business')}
                    className="h-12"
                  >
                    <Briefcase className="w-4 h-4 mr-2" />
                    Entrepreneur
                  </Button>
                </div>

                {/* Basic Information */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      value={formData.password}
                      onChange={(e) => handleInputChange('password', e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    value={formData.confirmPassword}
                    onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                    required
                  />
                </div>

                {/* Investor Specific Fields */}
                {formData.userType === 'investor' && (
                  <>
                    <div>
                      <Label htmlFor="investmentRange">Investment Range</Label>
                      <Select onValueChange={(value) => handleInputChange('investmentRange', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select investment range" />
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
                      <Label htmlFor="preferredSectors">Preferred Investment Sectors</Label>
                      <Input
                        id="preferredSectors"
                        value={formData.preferredSectors}
                        onChange={(e) => handleInputChange('preferredSectors', e.target.value)}
                        placeholder="e.g., Technology, Healthcare, Finance"
                      />
                    </div>

                    <div>
                      <Label htmlFor="experience">Investment Experience</Label>
                      <Select onValueChange={(value) => handleInputChange('experience', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select your experience level" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="beginner">Beginner (0-2 years)</SelectItem>
                          <SelectItem value="intermediate">Intermediate (2-5 years)</SelectItem>
                          <SelectItem value="experienced">Experienced (5+ years)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </>
                )}

                {/* Business Specific Fields */}
                {formData.userType === 'business' && (
                  <>
                    <div>
                      <Label htmlFor="companyName">Company Name</Label>
                      <Input
                        id="companyName"
                        value={formData.companyName}
                        onChange={(e) => handleInputChange('companyName', e.target.value)}
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="businessCategory">Business Category</Label>
                      <Select onValueChange={(value) => handleInputChange('businessCategory', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select business category" />
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

                    <div>
                      <Label htmlFor="fundingNeeded">Funding Required</Label>
                      <Select onValueChange={(value) => handleInputChange('fundingNeeded', value)}>
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
                      <Label htmlFor="businessDescription">Business Description</Label>
                      <Textarea
                        id="businessDescription"
                        value={formData.businessDescription}
                        onChange={(e) => handleInputChange('businessDescription', e.target.value)}
                        placeholder="Briefly describe your business idea or company"
                        rows={4}
                      />
                    </div>
                  </>
                )}

                <Button 
                  type="submit" 
                  className={`w-full ${
                    formData.userType === 'investor' 
                      ? 'bg-blue-600 hover:bg-blue-700' 
                      : 'bg-green-600 hover:bg-green-700'
                  }`}
                >
                  Create Account
                </Button>

                <div className="text-center">
                  <p className="text-sm text-gray-600">
                    Already have an account?{' '}
                    <Button variant="link" onClick={() => navigate('/login')} className="p-0">
                      Login here
                    </Button>
                  </p>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Register;
