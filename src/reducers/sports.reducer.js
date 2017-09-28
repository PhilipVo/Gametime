const sports = (state = {
	baseball: [],
	basketball: [],
	football: [],
	hockey: [],
	mma: [],
	nascar: [],
	soccer: []
}, action) => {
	switch (action.type) {
		case 'UPDATE_TEAMS':
			const _state = { ...state };
			_state[action.sport] = action.teams;
			return _state;
		default:
			return state;
	}
}

export default sports;