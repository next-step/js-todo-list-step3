export const enum HttpMethod {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE',
}

export const enum PriorityType {
  NONE,
  PRIMARY,
  SECONDARY
}

export const enum FilterType {
  ALL = 'all',
  PRIORITY = 'priority',
  ACTIVE = 'active',
  COMPLETED = 'completed',
}
