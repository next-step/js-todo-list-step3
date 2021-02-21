/*@jsx Reilly.createElement*/
import Reilly from 'reilly';

function FilterButton({ name, mode, onChangMode, content }) {
  return (
    <a
      href={'#' + name}
      className={`${name} ${mode === name ? 'selected' : ''}`}
      onClick={onChangMode}
    >
      {content}
    </a>
  );
}

export default FilterButton;
