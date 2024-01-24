import { render, fireEvent, waitFor } from '@testing-library/react';

// Component
import SearchComponent from '..';

jest.useFakeTimers();

describe('SearchComponent', () => {
  it('should render correctly', () => {
    const { getByPlaceholderText } = render(
      <SearchComponent onChange={() => {}} />
    );
    const inputElement = getByPlaceholderText('Search...');

    expect(inputElement).toBeInTheDocument();
  });

  it('should toggle input visibility on search icon click', () => {
    const { getByRole, getByTestId } = render(
      <SearchComponent onChange={() => {}} />
    );
    const searchIcon = getByTestId('search-icon');
    const inputElement = getByTestId('search-input');

    fireEvent.click(searchIcon);
    expect(inputElement).toHaveClass('w-52 border border-fill-link');

    fireEvent.click(searchIcon);
    expect(inputElement).toHaveClass('w-0 border-transparent');
  });

  it('should debounce input changes and call onChange after timeout', async () => {
    const onChangeMock = jest.fn();
    const { getByPlaceholderText } = render(
      <SearchComponent onChange={onChangeMock} />
    );
    const inputElement = getByPlaceholderText('Search...');

    // Type 'test' in the input
    fireEvent.change(inputElement, { target: { value: 't' } });
    fireEvent.change(inputElement, { target: { value: 'te' } });
    fireEvent.change(inputElement, { target: { value: 'tes' } });
    fireEvent.change(inputElement, { target: { value: 'test' } });

    // Fast-forward time by 1000ms (timeout duration)
    jest.advanceTimersByTime(1000);

    // Wait for the debounced onChange to be called
    await waitFor(() => {
      expect(onChangeMock).toHaveBeenCalledWith('test');
    });
  });

  it('should hide input when clicked outside', () => {
    const { getByRole, getByTestId } = render(
      <SearchComponent onChange={() => {}} />
    );
    const searchIcon = getByTestId('search-icon');
    const inputElement = getByTestId('search-input');

    fireEvent.click(searchIcon); // Show input
    fireEvent.click(document.body); // Click outside to hide input

    expect(inputElement).toHaveClass('w-0 border-transparent');
  });
});
