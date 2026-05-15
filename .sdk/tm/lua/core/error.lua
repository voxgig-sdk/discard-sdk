-- Discard SDK error

local DiscardError = {}
DiscardError.__index = DiscardError


function DiscardError.new(code, msg, ctx)
  local self = setmetatable({}, DiscardError)
  self.is_sdk_error = true
  self.sdk = "Discard"
  self.code = code or ""
  self.msg = msg or ""
  self.ctx = ctx
  self.result = nil
  self.spec = nil
  return self
end


function DiscardError:error()
  return self.msg
end


function DiscardError:__tostring()
  return self.msg
end


return DiscardError
