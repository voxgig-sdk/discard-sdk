package core

type DiscardError struct {
	IsDiscardError bool
	Sdk              string
	Code             string
	Msg              string
	Ctx              *Context
	Result           any
	Spec             any
}

func NewDiscardError(code string, msg string, ctx *Context) *DiscardError {
	return &DiscardError{
		IsDiscardError: true,
		Sdk:              "Discard",
		Code:             code,
		Msg:              msg,
		Ctx:              ctx,
	}
}

func (e *DiscardError) Error() string {
	return e.Msg
}
