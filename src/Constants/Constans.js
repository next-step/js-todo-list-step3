const GET = 'GET';
const POST = 'POST';
const PUT = 'PUT';
const DELETE = 'DELETE';
const NONE_TEMPLATE = `
<select class="chip select">
  <option value="0" selected>순위</option>
  <option value="1">1순위</option>
  <option value="2">2순위</option>
</select>
`;
const FIRST_TEMPLATE = `<span class="chip primary">1순위</span>`;
const SECOND_TEMPLATE = `<span class="chip secondary">2순위</span>`;
const ALL = 'all';
const ACTIVE = 'active';
const COMPLETED = 'completed';
const ESC = 'Esc';
const ESCAPE = 'Escape';
const ENTER = 'Enter';

const CONSTANT = {
  GET,
  POST,
  PUT,
  DELETE,
  NONE_TEMPLATE,
  FIRST_TEMPLATE,
  SECOND_TEMPLATE,
  ALL,
  ACTIVE,
  COMPLETED,
  ESC,
  ESCAPE,
  ENTER,
};

export default CONSTANT;
