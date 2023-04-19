import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import heroesReducer from "../reducers/heroesReducer";
import filtersReducer from "../reducers/filtersReducer";

const rootReducer = combineReducers({
  heroes: heroesReducer,
  filters: filtersReducer,
});

// const enhancer =
//   (createStore) =>
//   (...args) => {
//     const store = createStore(...args);

//     const oldDispatch = store.dispatch;
//     store.dispatch = (action) => {
//       if (typeof action === "string") {
//         return oldDispatch({
//           type: action,
//         });
//       }
//       return oldDispatch(action);
//     };
//     return store;
//   };

// тотже функционал, что и в enhancer:
const stringMiddleware = () => (next) => (action) => {
  if (typeof action === "string") {
    return next({
      type: action,
    });
  }
  return next(action);
};

const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(stringMiddleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )

  // compose(
  //   enhancer,
  //   window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  // )
);

export default store;
