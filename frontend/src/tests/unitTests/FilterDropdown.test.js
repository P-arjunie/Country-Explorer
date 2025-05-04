import FilterDropdown from '../../components/Dropdown';
import { render, screen, fireEvent } from '@testing-library/react';

//test the filter dropdown
test('calls onRegionChange when selected', () => {
  //mock the onRegionChange function
  const mockFilter = jest.fn();
  //mock the regions
  const regions = ['Asia', 'Europe'];
  //render the filter dropdown
  render(<FilterDropdown regions={regions} selectedRegion="" onRegionChange={mockFilter} />);
  //fire the change event
  fireEvent.change(screen.getByRole('combobox'), { target: { value: 'Asia' } });
  //expect the onRegionChange function to have been called
  expect(mockFilter).toHaveBeenCalled();
});