import '@testing-library/jest-dom';

// Mock localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn()
};
// Mock localStorage for testing
global.localStorage = localStorageMock;

// Mock fetch
global.fetch = jest.fn();

// Mock IntersectionObserver for testing 
global.IntersectionObserver = class IntersectionObserver {
  constructor() {}
  observe() {}
  unobserve() {}
  disconnect() {}
};
