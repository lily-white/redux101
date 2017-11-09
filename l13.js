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

console.log(todos([], {
  type: 'ADD_TODO',
  id: 0,
  text: 'learn redux'
}))

const state = [
  {
    id: 0,
    text: 'learn react',
    completed: false
  },
  {
    id: 1,
    text: 'learn redux',
    completed: false
  }
]
console.log(todos(state,{
  type: 'TOGGLE_TODO',
  id: 0
}))