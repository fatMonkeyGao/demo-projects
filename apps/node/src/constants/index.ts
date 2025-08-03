// HTTP 状态码
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
} as const;

// 错误消息
export const ERROR_MESSAGES = {
  USER_NOT_FOUND: "用户未找到",
  INVALID_PARAMS: "参数无效",
  MISSING_REQUIRED_FIELDS: "缺少必填字段",
  INTERNAL_ERROR: "服务器内部错误",
  ROUTE_NOT_FOUND: "接口不存在",
  NAME_EMAIL_REQUIRED: "姓名和邮箱是必填项",
} as const;

// 成功消息
export const SUCCESS_MESSAGES = {
  USER_CREATED: "用户创建成功",
  USER_UPDATED: "用户更新成功",
  USER_DELETED: "用户删除成功",
} as const;

// API 配置
export const API_CONFIG = {
  DEFAULT_PAGE_SIZE: 10,
  MAX_PAGE_SIZE: 100,
} as const;
