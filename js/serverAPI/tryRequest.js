export async function tryRequest(
  action,
  actionParameter,
  validation,
  validationParameter,
  message = ""
) {
  try {
    const requestResult = await action(actionParameter);
    if (!validation(requestResult, validationParameter))
      throw new Error(message);
    else return requestResult;
  } catch (error) {
    alert(`Operation not successful: ${error}`);
    return null;
  }
}
