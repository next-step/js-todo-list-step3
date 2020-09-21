export const enum HttpMethod {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE',
}

export const enum PriorityTypes {
  NONE = 'NONE',
  FIRST = 'FIRST',
  SECOND = 'SECOND'
}

export const getPriorityChip = (priority: PriorityTypes) => {
  return priority === PriorityTypes.FIRST   ? 'primary' :
         priority === PriorityTypes.SECOND  ? 'secondary' :
         priority === PriorityTypes.NONE    ? 'none' :
         '';
}

export const enum FilterTypes {
  ALL = 'all',
  PRIORITY = 'priority',
  ACTIVE = 'active',
  COMPLETED = 'completed',
}

export const ONE_FRAME = 1000 / 60;
