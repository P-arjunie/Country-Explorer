import SearchBar from '../../components/SearchBar';
import { render, screen, fireEvent } from '@testing-library/react';

//test the search bar
test('calls onSearch when input changes', () => {
  //mock the onSearch function
  const mockSearch = jest.fn();
  //render the search bar
  render(<SearchBar searchTerm="" onSearch={mockSearch} />);

  //fire the change event
  fireEvent.change(screen.getByPlaceholderText(/search for a country/i), {
    target: { value: 'India' },
  });
  //expect the onSearch function to have been called
  expect(mockSearch).toHaveBeenCalled();
});