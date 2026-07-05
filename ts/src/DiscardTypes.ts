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
  received?: Record<string, any>
  status?: string
  timestamp?: string
  update?: Record<string, any>
}

export interface TestLoadMatch {
  data?: Record<string, any>
  id: string
  message?: string
  received?: Record<string, any>
  status?: string
  timestamp?: string
  update?: Record<string, any>
}

export interface TestCreateData {
  data?: Record<string, any>
  id?: string
  message?: string
  received?: Record<string, any>
  status?: string
  timestamp?: string
  update?: Record<string, any>
}

export interface TestUpdateData {
  data?: Record<string, any>
  id?: string
  message?: string
  received?: Record<string, any>
  status?: string
  timestamp?: string
  update?: Record<string, any>
}

export interface TestRemoveMatch {
  data?: Record<string, any>
  id: string
  message?: string
  received?: Record<string, any>
  status?: string
  timestamp?: string
  update?: Record<string, any>
}

export interface Testing {
  data?: Record<string, any>
  filename?: string
  message?: string
  size?: number
  status?: string
  timestamp?: string
}

export interface TestingLoadMatch {
  data?: Record<string, any>
  filename?: string
  message?: string
  size?: number
  status?: string
  timestamp?: string
}

export interface TestingCreateData {
  data?: Record<string, any>
  filename?: string
  message?: string
  size?: number
  status?: string
  timestamp?: string
}

