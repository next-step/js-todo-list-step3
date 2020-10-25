const UseMiddleWare = async(middleware, handler) => {
  try {
    await middleware();
    return await handler();
  } catch (error) {
    alert(error.message);
  }
};

export default UseMiddleWare;