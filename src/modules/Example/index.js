import axios from 'axios'
import {createAction} from 'redux-actions'

const GITHUB_FETCHING = 'modules/Github/FETCHING'
const GITHUB_SUCCESS  = 'modules/Github/SUCCESS'
const GITHUB_ERROR    = 'modules/Github/ERROR'

export const githubFetching = createAction(GITHUB_FETCHING)
export const githubError    = createAction(GITHUB_ERROR)
export const githubSuccess  = createAction(GITHUB_SUCCESS)

const initialState = {
    fetching : false,
    user     : null
}

export default (state = initialState, action) => {
    switch (action.type) {
        case GITHUB_FETCHING:
            return {...state,
                    fetching     : true
                    }
        case GITHUB_SUCCESS:
            return {...state,
                    fetching     : false,
                    user         : action.payload.data
                  }
        case GITHUB_ERROR:
          return {...state,
                  fetching       : false
                }
      default:
        return state;
    }
}

export const getUserFromGithub = username => {
    return {
        type : [
            githubFetching,
            githubSuccess,
            githubError
        ],
        payload : {
            data : () => axios.get('https://api.github.com/users/' + username)
        }
    }
}
