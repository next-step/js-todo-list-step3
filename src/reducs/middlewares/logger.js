const logger = store => dispatch => action => {
  console.log(`%c type ${action.type}`, 'color:lime');
  dispatch(action);
  console.log(store.getState());
};

export default logger;
