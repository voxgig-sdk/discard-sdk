# frozen_string_literal: true

# Typed models for the Discard SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Member types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Ruby types are unenforced; these YARD
# annotations document the shapes. Do not edit by hand.

# AiChat entity data model.
#
# @!attribute [rw] context
#   @return [Array, nil]
#
# @!attribute [rw] message
#   @return [String]
#
# @!attribute [rw] response
#   @return [String, nil]
#
# @!attribute [rw] status
#   @return [String, nil]
#
# @!attribute [rw] timestamp
#   @return [String, nil]
AiChat = Struct.new(
  :context,
  :message,
  :response,
  :status,
  :timestamp,
  keyword_init: true
)

# Match filter for AiChat#create (any subset of AiChat fields).
#
# @!attribute [rw] context
#   @return [Array, nil]
#
# @!attribute [rw] message
#   @return [String, nil]
#
# @!attribute [rw] response
#   @return [String, nil]
#
# @!attribute [rw] status
#   @return [String, nil]
#
# @!attribute [rw] timestamp
#   @return [String, nil]
AiChatCreateData = Struct.new(
  :context,
  :message,
  :response,
  :status,
  :timestamp,
  keyword_init: true
)

# Test entity data model.
#
# @!attribute [rw] data
#   @return [Hash, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] message
#   @return [String, nil]
#
# @!attribute [rw] received
#   @return [Hash, nil]
#
# @!attribute [rw] status
#   @return [String, nil]
#
# @!attribute [rw] timestamp
#   @return [String, nil]
#
# @!attribute [rw] update
#   @return [Hash, nil]
Test = Struct.new(
  :data,
  :id,
  :message,
  :received,
  :status,
  :timestamp,
  :update,
  keyword_init: true
)

# Match filter for Test#load (any subset of Test fields).
#
# @!attribute [rw] data
#   @return [Hash, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] message
#   @return [String, nil]
#
# @!attribute [rw] received
#   @return [Hash, nil]
#
# @!attribute [rw] status
#   @return [String, nil]
#
# @!attribute [rw] timestamp
#   @return [String, nil]
#
# @!attribute [rw] update
#   @return [Hash, nil]
TestLoadMatch = Struct.new(
  :data,
  :id,
  :message,
  :received,
  :status,
  :timestamp,
  :update,
  keyword_init: true
)

# Match filter for Test#create (any subset of Test fields).
#
# @!attribute [rw] data
#   @return [Hash, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] message
#   @return [String, nil]
#
# @!attribute [rw] received
#   @return [Hash, nil]
#
# @!attribute [rw] status
#   @return [String, nil]
#
# @!attribute [rw] timestamp
#   @return [String, nil]
#
# @!attribute [rw] update
#   @return [Hash, nil]
TestCreateData = Struct.new(
  :data,
  :id,
  :message,
  :received,
  :status,
  :timestamp,
  :update,
  keyword_init: true
)

# Match filter for Test#update (any subset of Test fields).
#
# @!attribute [rw] data
#   @return [Hash, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] message
#   @return [String, nil]
#
# @!attribute [rw] received
#   @return [Hash, nil]
#
# @!attribute [rw] status
#   @return [String, nil]
#
# @!attribute [rw] timestamp
#   @return [String, nil]
#
# @!attribute [rw] update
#   @return [Hash, nil]
TestUpdateData = Struct.new(
  :data,
  :id,
  :message,
  :received,
  :status,
  :timestamp,
  :update,
  keyword_init: true
)

# Match filter for Test#remove (any subset of Test fields).
#
# @!attribute [rw] data
#   @return [Hash, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] message
#   @return [String, nil]
#
# @!attribute [rw] received
#   @return [Hash, nil]
#
# @!attribute [rw] status
#   @return [String, nil]
#
# @!attribute [rw] timestamp
#   @return [String, nil]
#
# @!attribute [rw] update
#   @return [Hash, nil]
TestRemoveMatch = Struct.new(
  :data,
  :id,
  :message,
  :received,
  :status,
  :timestamp,
  :update,
  keyword_init: true
)

# Testing entity data model.
#
# @!attribute [rw] data
#   @return [Hash, nil]
#
# @!attribute [rw] filename
#   @return [String, nil]
#
# @!attribute [rw] message
#   @return [String, nil]
#
# @!attribute [rw] size
#   @return [Integer, nil]
#
# @!attribute [rw] status
#   @return [String, nil]
#
# @!attribute [rw] timestamp
#   @return [String, nil]
Testing = Struct.new(
  :data,
  :filename,
  :message,
  :size,
  :status,
  :timestamp,
  keyword_init: true
)

# Match filter for Testing#load (any subset of Testing fields).
#
# @!attribute [rw] data
#   @return [Hash, nil]
#
# @!attribute [rw] filename
#   @return [String, nil]
#
# @!attribute [rw] message
#   @return [String, nil]
#
# @!attribute [rw] size
#   @return [Integer, nil]
#
# @!attribute [rw] status
#   @return [String, nil]
#
# @!attribute [rw] timestamp
#   @return [String, nil]
TestingLoadMatch = Struct.new(
  :data,
  :filename,
  :message,
  :size,
  :status,
  :timestamp,
  keyword_init: true
)

# Match filter for Testing#create (any subset of Testing fields).
#
# @!attribute [rw] data
#   @return [Hash, nil]
#
# @!attribute [rw] filename
#   @return [String, nil]
#
# @!attribute [rw] message
#   @return [String, nil]
#
# @!attribute [rw] size
#   @return [Integer, nil]
#
# @!attribute [rw] status
#   @return [String, nil]
#
# @!attribute [rw] timestamp
#   @return [String, nil]
TestingCreateData = Struct.new(
  :data,
  :filename,
  :message,
  :size,
  :status,
  :timestamp,
  keyword_init: true
)

