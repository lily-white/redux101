//add library https://cdn.bootcss.com/redux/3.7.2/redux.js
const counter = (state = 0, action) => {
  switch(action.type) {
    case 'INCREMENT' :
      return state + 1;
    case 'DECREMENT' :
      return state - 1;
    default:
      return state;
  }
}

const { createStore } = Redux;
const store = createStore(counter);

// console.log(store.getState());

// store.dispatch({ type: 'INCREMENT'});
// console.log(store.getState());

const render = () => {
  document.body.innerText = store.getState();
}
store.subscribe(render);
render();

document.addEventListener('click', () => {
  store.dispatch({ type: 'INCREMENT'});
})