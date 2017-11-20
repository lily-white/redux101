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

const { combineReducers } = Redux;


const todoApp = combineReducers({
  todos,
  visibilityFilter
})

const { createStore} = Redux;
const store = createStore(todoApp);
const { Component } = React;

const FilterLink = ({filter, children, currentFilter}) => {
  if(filter === currentFilter) {
    return <span>{children}</span>;
  }
  return <a href='#'
            onClick= { e => {
                      console.log(filter);
                e.preventDefault();
                store.dispatch({
                      type: 'SET_VISIBILITY_FILTER',
                      filter
                });
            }}>
            {children}
         </a>
}

const getVisibleTodos = (todos, filter) => {
  switch(filter){
    case 'SHOW_ALL':
      return todos;
    case 'SHOW_ACTIVE':
      return todos.filter(t => !t.completed);
    case 'SHOW_COMPLETED':
      return todos.filter(t => t.completed);
  }
}

const Todo = ({
  completed,
  text,
  onClick
}) => {
  return <li onClick={ onClick }
             style={{
                   textDecoration: completed?
                   'line-through' : 'none'
                 }}>
            {text}
          </li>
}

const TodoList = ({
  todos,
  onTodoClick
}) => (
  <ul>
    {todos.map( todo =>
                   <Todo key = {todo.id}
                         {...todo}
                         onClick = { () => onTodoClick(todo.id)}  />
              )
    }
  </ul>
)
let nextTodoId = 0;
class TodoApp extends Component {
  render() {
    const {todos, visibilityFilter} = this.props;
    const visibileTodos = getVisibleTodos(todos, visibilityFilter);
    return (<div>
            <input ref={node => this.input = node } />
        <button onClick={ () => {
                         store.dispatch({
                           type: 'ADD_TODO',
                           text: this.input.value,
                           id: nextTodoId++
                         });
                         this.input.value = '';
                        }}>
         add
        </button>
        <TodoList todos = {visibileTodos}
                  onTodoClick = { (id) => {
                                   store.dispatch({
                                     type: 'TOGGLE_TODO',
                                     id: id
                                   })
                                }} />
        <p>
          Show:{' '}
          <FilterLink
            filter='SHOW_ALL'
            currentFilter = {visibilityFilter}>all</FilterLink>
          {' '}
          <FilterLink
            filter='SHOW_ACTIVE'
            currentFilter = {visibilityFilter}>active</FilterLink>
          {' '}
          <FilterLink
            filter='SHOW_COMPLETED'
            currentFilter = {visibilityFilter}>completed</FilterLink>
        </p>
        </div>);
  }
}

const render = () => {
  ReactDOM.render(
    <TodoApp
    {...store.getState()}/>,
    document.getElementById('root')
  );
};

store.subscribe(render);
render();

