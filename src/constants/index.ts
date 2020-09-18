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

export const enum FilterTypes {
  ALL = 'all',
  PRIORITY = 'priority',
  ACTIVE = 'active',
  COMPLETED = 'completed',
}

export const ONE_FRAME = 1000 / 60;
