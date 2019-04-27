import axios from 'axios'

// ACTION TYPE
const ADD_NAME = 'ADD_NAME'

// ACTION CREATOR
// scaffolding for what thunk will do
const addNameToStore = name => ({type: ADD_NAME, name})

// THUNK CREATOR
// speaks to backend, grabs data, and dispatches action creator with that data, and sends it all to the reducer
export const createName = name => {
  return async dispatch => {
    try {
      const {data} = await axios.post('/api/names/', name)
      dispatch(addNameToStore(data))
    } catch (err) {
      console.error(err)
    }
  }
}

// initial state
const initialState = {}

// REDUCER
// changes the state in the store
export default function(state = initialState, action) {
  switch (action.type) {
    case ADD_NAME:
      return action.name
    default:
      return state
  }
}
