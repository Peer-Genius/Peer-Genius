Quick start/reminders:

Redux actions in `Peer Genius` are either flux standard actions or `thunk`s.

Flux standard actions are actions that follow the structure of
```typescript
interface Action {
	type: string,
	payload: any,
	meta: any,
	error: boolean
}
```

In the case of `Peer Genius`, the restriction on structure is slightly loosened in that `error` can be anything.

`thunk`s are functions used as redux actions. Their signature is `async (dispatch, getState) => any`.