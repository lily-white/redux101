const todo = {
  id: 0,
  text: 'learn redux',
  completed: false
}

const toggleTodo = (todo) => {
//   return Object.assign({}, todo, {
//     completed: !todo.complete
//   });
  return {
    ...todo,
    completed: !todo.completed
  };
}

console.log(toggleTodo(todo));