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

export type AiChatCreateData = Partial<AiChat>

export interface Test {
  data?: Record<string, any>
  id?: string
  message?: string
  received?: Record<string, any>
  status?: string
  timestamp?: string
  update?: Record<string, any>
}

export type TestLoadMatch = Partial<Test>

export type TestCreateData = Partial<Test>

export type TestUpdateData = Partial<Test>

export type TestRemoveMatch = Partial<Test>

export interface Testing {
  data?: Record<string, any>
  filename?: string
  message?: string
  size?: number
  status?: string
  timestamp?: string
}

export type TestingLoadMatch = Partial<Testing>

export type TestingCreateData = Partial<Testing>

