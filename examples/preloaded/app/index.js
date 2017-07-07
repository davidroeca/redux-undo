import React from 'react'
import { createStore, combineReducers } from 'redux'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import undoable, { ActionCreators } from 'redux-undo'

const initialTestState = {
  greeting: 'hello'
}

const test = (state = initialTestState, action) => {
  switch(action.type) {
    case 'UPDATED':
      return {
        ...state,
        ...action.values
      }
    default:
      return state
  }
}

const undoableTest = undoable(test, {
  debug: true
})

const reducer = combineReducers({
  test: undoableTest
})

const initialState = {
  test: {
    present: {...initialTestState},
    past: [],
    future: []
  }
}

const enhancer = window.devToolsExtension ? window.devToolsExtension() : x => x

const store = createStore(
  reducer,
  initialState,
  enhancer
)

render(
  <Provider store={store}>
    <div/>
  </Provider>,
  document.getElementById('root')
)

const actions = [
  {
    type: 'UPDATED',
    values: {place: 'oz'}
  },
  {
    type: 'UPDATED',
    values: {noPlace: 'like home'}
  },
  ActionCreators.undo(),
  ActionCreators.undo(),
  ActionCreators.redo(),
  {
    type: 'UPDATED',
    values: {ooh: 'ah'}
  },
  {
    type: '@@redux-undo/INIT'
  }
]

for (let action of actions) {
  store.dispatch(action)
}
