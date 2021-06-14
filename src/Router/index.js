const initialRoutes = ($target) => {
  window.addEventListener('hashchange', (e) => {
    console.log(e);
    return renderHTML($target, getHashRoute());
  });
};

const getHashRoute = () => {};

const renderHTML = () => {
  console.log('render');
};

export { initialRoutes };
