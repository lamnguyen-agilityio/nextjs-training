import { render, fireEvent, screen } from '@testing-library/react';

// Interfaces
import { Option } from '@/app/lib/interfaces';

// Components
import Dropdown from '..';

// Mocks data
const options: Option[] = [
  { value: 'value1', label: 'label 1' },
  { value: 'value2', label: 'label 2' },
];
const onChangeMock = jest.fn();

describe('Dropdown component', () => {
  it('should render with default value', () => {
    render(
      <Dropdown
        options={options}
        defaultValue="value1"
        label="Sort by"
        onChange={onChangeMock}
      />
    );

    expect(screen.getByText('value1')).toBeInTheDocument();
  });

  it('should toggle dropdown when clicked', () => {
    render(
      <Dropdown options={options} label="Sort by" onChange={onChangeMock} />
    );
    const dropdown = screen.getByText('Sort by:').parentElement;

    fireEvent.click(dropdown as HTMLElement);
    expect(screen.getByText('label 1')).toBeInTheDocument();

    fireEvent.click(dropdown as HTMLElement);
    expect(screen.queryByText('label 1')).not.toBeInTheDocument();
  });

  it('should render option when an option is selected', () => {
    render(
      <Dropdown options={options} label="Sort by" onChange={onChangeMock} />
    );
    const dropdown = screen.getByText('Sort by:').parentElement;

    fireEvent.click(dropdown as HTMLElement);
    expect(screen.getByText('label 1')).toBeInTheDocument();

    const DropdownElement = screen.getByText('label 1');
    fireEvent.click(DropdownElement);

    expect(screen.getByText('label 1')).toBeInTheDocument();
  });

  it('should call onChange when an option is selected', () => {
    render(
      <Dropdown options={options} label="Sort by" onChange={onChangeMock} />
    );
    const dropdown = screen.getByText('Sort by:').parentElement;

    fireEvent.click(dropdown as HTMLElement);
    fireEvent.click(screen.getByText('label 1'));

    expect(onChangeMock).toHaveBeenCalledWith('value1');
  });

  it('should not toggle dropdown when disabled', () => {
    render(
      <Dropdown
        options={options}
        label="Sort by"
        disabled
        onChange={onChangeMock}
      />
    );
    const dropdown = screen.getByText('Sort by:').parentElement;

    fireEvent.click(dropdown as HTMLElement);
    expect(screen.queryByText('label 1')).not.toBeInTheDocument();
  });

  it('should close dropdown when clicked outside', () => {
    render(
      <Dropdown options={options} label="Sort by" onChange={onChangeMock} />
    );
    const dropdown = screen.getByText('Sort by:').parentElement;

    fireEvent.click(dropdown as HTMLElement);
    expect(screen.getByText('label 1')).toBeInTheDocument();

    fireEvent.click(document.body);
    expect(screen.queryByText('label 1')).not.toBeInTheDocument();
  });
});
