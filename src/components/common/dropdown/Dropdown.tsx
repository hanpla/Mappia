'use client';

import EditDropdown from './EditDropdown';
import FilterDropdown from './FilterDropdown';
import SelectDropdown, { SelectOption } from './SelectDropdown';
import SortDropdown from './SortDropdown';

interface SelectProps {
  type: 'select';
  value?: string;
  onChange?: (value: string) => void;
  options: SelectOption[];
  placeholder?: string;
}

interface EditProps {
  type: 'edit';
  editUrl: string;
  onDelete: () => void;
  onEdit?: () => void;
  onClose?: () => void;
  className?: string;
}

interface FilterProps {
  type: 'filter';
  filterKey?: string;
}

interface SortProps {
  type: 'sort';
  sortKey?: string;
}

type DropdownProps = SelectProps | EditProps | FilterProps | SortProps;

export default function Dropdown(props: DropdownProps) {
  if (props.type === 'select') {
    const { value, onChange, options, placeholder } = props;
    return (
      <SelectDropdown
        value={value}
        onChange={onChange}
        options={options}
        placeholder={placeholder}
      />
    );
  }
  if (props.type === 'sort') {
    const { sortKey } = props;
    return <SortDropdown sortKey={sortKey} />;
  }
  if (props.type === 'filter') {
    const { filterKey } = props;
    return <FilterDropdown filterKey={filterKey} />;
  }
  if (props.type === 'edit') {
    const { editUrl, onDelete, onEdit, onClose, className } = props;
    return (
      <EditDropdown
        editUrl={editUrl}
        onDelete={onDelete}
        onEdit={onEdit}
        onClose={onClose}
        className={className}
      />
    );
  }
  return null;
}
