import axios from 'axios'

//ACTION TYPE
const GET_NAMES = 'GET_NAMES'

//ACTION CREATOR
const gotNames = names => ({
  type: GET_NAMES,
  names
})

//THUNK CREATOR
export const fetchNames = () => {
  return async dispatch => {
    try {
      const {data} = await axios.get('/api/names')
      dispatch(gotNames(data))
    } catch (err) {
      console.error(err)
    }
  }
}

const initialState = []

//REDUCER
export default function(state = initialState, action) {
  switch (action.type) {
    case GET_NAMES:
      return action.names
    default:
      return state
  }
}
