const todo = (state, action) => {
  switch(action.type){
    case 'ADD_TODO':
      return {
          id: action.id,
          text: action.text,
          completed: false
        };
    case 'TOGGLE_TODO':
        if(state.id !== action.id){
          return state;
        }
        return {
          ...state,
          completed: !state.completed
        };
    default:
      return state;
  }
}
const todos = (state=[], action) => {
  switch(action.type){
    case 'ADD_TODO':
      return [
        ...state,
        todo(state, action)
      ];
    case 'TOGGLE_TODO':
      return state.map( t => todo(t, action));
    default:
      return state;
  }
}

const visibilityFilter = (state= 'SHOW_ALL', action) => {
  switch(action.type){
    case 'SET_VISIBILITY_FILTER':
      return action.filter;
    default:
      return state;
  }
}
// const todoApp = (state={}, action) => {
//   return {
//     todos: todos(state.todos, action),
//     visibilityFilter: visibilityFilter(state.visibilityFilter, action)
//   }
// }

const { combineReducers } = Redux;

const todoApp = combineReducers({
  todos,
  visibilityFilter
});

const { createStore} = Redux;
const store = createStore(todoApp);

store.dispatch( {
  type: 'ADD_TODO',
  id: 0,
  text: 'learn react'
})
console.log('dispatch');
console.log(store.getState());
console.log('-------');

store.dispatch( {
  type: 'ADD_TODO',
  id: 1,
  text: 'learn redux'
})

console.log('dispatch');
console.log(store.getState());
console.log('-------');

store.dispatch( {
  type: 'TOGGLE_TODO',
  id: 1
})

console.log('dispatch');
console.log(store.getState());
console.log('-------');

store.dispatch( {
  type: 'SET_VISIBILITY_FILTER',
  filter: 'SHOW_COMPLETED'
})

console.log('dispatch');
console.log(store.getState());
console.log('-------');