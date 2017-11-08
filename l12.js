const todos = (state=[], action) => {
  switch(action.type){
    case 'ADD_TODO':
      return [
        ...state,
        {
          id: action.id,
          text: action.text,
          completed: false
        }
      ];
    case 'TOGGLE_TODO':
      return state.map( todo => {
        if(todo.id !== action.id){
          return todo;
        }
        return {
          ...todo,
          completed: !todo.completed
        }
      });
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