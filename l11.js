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
    default:
      return state;
  }
}

console.log(todos([], {
  type: 'ADD_TODO',
  id: 0,
  text: 'learn redux'
}))