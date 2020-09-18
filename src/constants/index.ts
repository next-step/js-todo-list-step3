export const enum HttpMethod {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE',
}

export const enum PriorityTypes {
  NONE,
  PRIMARY,
  SECONDARY
}

export const priorityValueOf = (priority: 0 | 1 | 2) =>
  priority === 1 ? PriorityTypes.PRIMARY :
  priority === 2 ? PriorityTypes.SECONDARY :
  PriorityTypes.NONE

export const getPriorityChip = (priority: PriorityTypes) => {
  return priority === PriorityTypes.PRIMARY   ? 'primary' :
         priority === PriorityTypes.SECONDARY ? 'secondary' :
         priority === PriorityTypes.NONE      ? 'none' :
         '';
}

export const enum FilterTypes {
  ALL = 'all',
  PRIORITY = 'priority',
  ACTIVE = 'active',
  COMPLETED = 'completed',
}

export const ONE_FRAME = 1000 / 60;
