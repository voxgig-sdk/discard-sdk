// Typed models for the Discard SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.

export interface AiChat {
  context?: any[]
  message: string
  response?: string
  status?: string
  timestamp?: string
}

export interface AiChatCreateData {
  context?: any[]
  message: string
  response?: string
  status?: string
  timestamp?: string
}

export interface Test {
  data?: Record<string, any>
  id?: string
  message?: string
  status?: string
  timestamp?: string
  updates?: Record<string, any>
}

export interface TestLoadMatch {
  data?: Record<string, any>
  id: string
  message?: string
  status?: string
  timestamp?: string
  updates?: Record<string, any>
}

export interface TestCreateData {
  data?: Record<string, any>
  id?: string
  message?: string
  status?: string
  timestamp?: string
  updates?: Record<string, any>
}

export interface TestUpdateData {
  data?: Record<string, any>
  id?: string
  message?: string
  status?: string
  timestamp?: string
  updates?: Record<string, any>
}

export interface TestRemoveMatch {
  id?: string
}

export interface Testing {
  active_endpoints?: number
  filename?: string
  inactive_endpoints?: number
  message?: string
  period?: string
  size?: number
  status?: string
  timestamp?: string
  total_requests?: number
}

export interface TestingLoadMatch {
  period?: string
}

export interface TestingCreateData {
  active_endpoints?: number
  filename?: string
  inactive_endpoints?: number
  message?: string
  period?: string
  size?: number
  status?: string
  timestamp?: string
  total_requests?: number
}

