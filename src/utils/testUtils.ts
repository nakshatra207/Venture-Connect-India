
// Test utilities for InvestBridge application
// Provides helper functions for testing components and Firebase operations

export const mockFirebaseUser = {
  uid: 'test-user-123',
  email: 'test@example.com',
  displayName: 'Test User'
};

export const mockInvestorData = {
  id: 'investor-1',
  name: 'John Investor',
  email: 'john@investor.com',
  investmentRange: '$10K - $50K',
  sectors: ['Technology', 'Healthcare'],
  createdAt: new Date()
};

export const mockBusinessData = {
  id: 'business-1',
  title: 'Tech Startup',
  description: 'Revolutionary AI platform',
  fundingRequired: 100000,
  sector: 'Technology',
  ownerEmail: 'owner@startup.com',
  createdAt: new Date()
};

// Helper function to simulate async operations in tests
export const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Mock data generators
export const generateMockProposals = (count: number) => {
  return Array.from({ length: count }, (_, index) => ({
    id: `proposal-${index + 1}`,
    title: `Business Proposal ${index + 1}`,
    description: `Description for proposal ${index + 1}`,
    fundingRequired: (index + 1) * 50000,
    sector: ['Technology', 'Healthcare', 'Finance'][index % 3],
    createdAt: new Date()
  }));
};

export const generateMockInvestors = (count: number) => {
  return Array.from({ length: count }, (_, index) => ({
    id: `investor-${index + 1}`,
    name: `Investor ${index + 1}`,
    email: `investor${index + 1}@example.com`,
    investmentRange: ['$10K-$50K', '$50K-$100K', '$100K+'][index % 3],
    sectors: [['Technology'], ['Healthcare'], ['Finance']][index % 3],
    createdAt: new Date()
  }));
};
