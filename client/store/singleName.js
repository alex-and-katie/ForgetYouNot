import axios from 'axios'

//ACTION TYPE
const GET_NAME = 'GET_NAME'

//ACTION CREATOR
const gotName = name => ({
  type: GET_NAME,
  name
})

//THUNK CREATOR
export const fetchName = id => {
  return async dispatch => {
    try {
      const {data} = await axios.get(`/api/names/${id}`)
      dispatch(gotName(data))
    } catch (err) {
      console.error(err)
    }
  }
}

const initialState = {}

//REDUCER
export default function(state = initialState, action) {
  switch (action.type) {
    case GET_NAME:
      return action.name
    default:
      return state
  }
}
