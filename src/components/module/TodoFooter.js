/*@jsx Reilly.createElement*/
import Reilly from 'reilly';
import { FilterList, ToggleAll, DeleteAll, TodoCount } from 'components';

function TodoFooter(props) {
  const { length, onDeleteAll, mode, onChangMode } = props;

  return (
    <div className="count-container">
      <TodoCount length={length} />
      <FilterList mode={mode} onChangMode={onChangMode} />
      <ToggleAll />
      <DeleteAll onDeleteAll={onDeleteAll} />
    </div>
  );
}

export default TodoFooter;
