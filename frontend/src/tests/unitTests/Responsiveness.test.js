import { render } from '@testing-library/react';
import App from '../../App';

test('renders correctly on mobile screen size', () => {
  window.innerWidth = 375; // iPhone X width
  render(<App />);
  // Add assertions for elements that should be visible/hidden on mobile
}); 