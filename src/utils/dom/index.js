const validationTodoContents = (contents) => {
  if (!contents) {
    return false
  }
  return contents.trim().length >= 2
}
const validationUserName = (name) => {
  if (!name) {
    return false
  }

  return name.trim().length >= 2
}
export { validationTodoContents, validationUserName }
