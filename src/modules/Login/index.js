import axios from 'axios'
import R from 'ramda'
import {createAction} from 'redux-actions'
import {loggedIn} from './../Auth'

const LOGIN_SENDING = 'modules/Login/SENDING'
const LOGIN_SUCCESS = 'modules/Login/SUCCESS'
const LOGIN_ERROR =  'modules/Login/ERROR'

const loginSending = createAction(LOGIN_SENDING)
const loginError   = createAction(LOGIN_ERROR)
const loginSuccess = createAction(LOGIN_SUCCESS)

const initialState = {
    text        : null,
    sending    : false
}

export default (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_SENDING:
            return {...state,
                    text        : "Wait for it...",
                    sending     : true
                    }
        case LOGIN_SUCCESS:
            return {...state,
                    text        : null,
                    sending     : false
                  }
        case LOGIN_ERROR:
          return {...state,
                  text        : action.payload.msg,
                  sending     : false
                }
      default:
        return state;
    }
}

export const sendFormLogin = (values, dispatch) => {

    dispatch(loginSending())

    axios.post('/api/login', values)
    .then(res => {
        const {type, payload} = res.data

        if (R.equals(type, LOGIN_SUCCESS)) {
            dispatch(loginSuccess())
            return dispatch(loggedIn(payload.token))
        }

        return dispatch(res.data)
    })
    .catch(err => {
        dispatch(loginError({msg : 'Error'}))
        console.log(err)
    })
}
