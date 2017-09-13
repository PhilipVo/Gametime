/**********************************************		
										MODES
-----------------------------------------------
0 - loading
1 - logged in
2 - logged out
3 - new user
 **********************************************/

const session = (state = { id: undefined, mode: 0 }, action) => {
	switch (action.type) {
		case 'LOGIN':
			return {
				id: action.id,
				mode: 1
			};
		case 'LOGOUT':
			return {
				id: undefined,
				mode: 2
			};
		case 'REGISTER':
			return {
				id: undefined,
				mode: 3
			};
		case 'SET_ID':
			return {
				...state,
				id: action.id
			};
		case 'SET_MODE':
			return {
				...state,
				mode: action.mode
			};
		default:
			return state;
	}
}

export default session;