import axios from 'axios'
import R from 'ramda'
import {createAction} from 'redux-actions'
import {loggedIn} from './../Auth'

const LOGIN_SENDING = 'modules/Login/LOGIN_SENDING'
const LOGIN_SUCCESS = 'modules/Login/LOGIN_SUCCESS'
const LOGIN_ERROR =  'modules/Login/LOGIN_ERROR'

const loginSending = createAction(LOGIN_SENDING)
const loginError   = createAction(LOGIN_ERROR)
const loginSuccess = createAction(LOGIN_SUCCESS)

const initialState = {
    text        : null,
    enviando    : false
}

export default (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_SENDING:
            return {...state,
                    text        : "Logando...",
                    enviando    : true
                    }
        case LOGIN_SUCCESS:
            return {...state,
                    text        : null,
                    enviando    : false
                  }
        case LOGIN_ERROR:
          return {...state,
                  text        : action.payload.msg,
                  enviando    : false
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
        dispatch(loginError({msg : 'Erro ao logar'}))
        console.log(err)
    })
}
