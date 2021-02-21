/*@jsx Reilly.createElement*/
import Reilly from 'reilly';
import { FILTER_STATUS, FILTER_NAMES } from 'utils';
import { FilterButton } from 'components';

function FilterList({ mode, onChangMode }) {
  return (
    <ul className="filters">
      {Object.values(FILTER_STATUS).map((name, i) => (
        <li key={i}>
          <FilterButton
            name={name}
            mode={mode}
            onChangMode={onChangMode}
            content={FILTER_NAMES.get(name)}
          />
        </li>
      ))}
    </ul>
  );
}

export default FilterList;
