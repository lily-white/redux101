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

const Link = ({active, children, onClick}) => {
  if(active) {
    return <span>{children}</span>;
  }
  return <a href='#'
            onClick= { e => {
                e.preventDefault();
                onClick();
            }}>
            {children}
         </a>
}

class FilterLink extends Component {
  constructor(props) {
    super(props);
    this.state = {visibilityFilter: store.getState().visibilityFilter};
  }
  componentDidMount() {
    this.unsubscribe = store.subscribe( () =>
       this.setState({visibilityFilter: store.getState().visibilityFilter})
    )
//     console.log(this.unsubscribe)

  }

  componentWillMount() {
    console.log(this.unsubscribe);
//     this.unsubscribe();
  }

  render() {
    const props = this.props;
    const state = this.state;

    return <Link active={
                    props.filter === state.visibilityFilter
                 }
                 onClick = {
                   () => {
                     store.dispatch({
                       type: 'SET_VISIBILITY_FILTER',
                       filter: props.filter
                     })
                   }
                 }>
              {props.children}
            </Link>
  }
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

class VisibileTodoList extends Component {
  render() {
    const state = store.getState();

    return (
      <TodoList
        todos = {
          getVisibleTodos(
           state.todos,
           state.visibilityFilter
          )
        }
        onTodoClick = { (id) => {
          store.dispatch({
            type: 'TOGGLE_TODO',
            id: id
        })
      }} />
    );
  }
}

const AddTodo = () => {
  let input;

  return (<div>
            <input ref={node => input = node } />
            <button onClick= {
                 () => {
                   store.dispatch({
                     type: 'ADD_TODO',
                     text: input.value,
                     id: nextTodoId++
                   });
                   input.value = '';
                }
             } >
               add
             </button>

          </div>);
}

const Footer = () => (
  <p>
    Show:{' '}
    <FilterLink
      filter='SHOW_ALL'>
    all
    </FilterLink>
    {' '}
    <FilterLink
      filter='SHOW_ACTIVE'>
    active
    </FilterLink>
    {' '}
    <FilterLink
      filter='SHOW_COMPLETED'>
    completed
    </FilterLink>
  </p>
);

let nextTodoId = 0;
const TodoApp = () =>(
  <div>
    <AddTodo />
    <VisibileTodoList />
    <Footer />
 </div>
  );

const render = () => {
  ReactDOM.render(
    <TodoApp
    {...store.getState()}/>,
    document.getElementById('root')
  );
};

store.subscribe(render);
render();

