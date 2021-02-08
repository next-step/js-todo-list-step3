export function animationToggler(target) {
  let isLoading = false;
  const targetLI = target.closest("li.todo-list-item");
  const viewDiv = targetLI.children.item(0);
  const animationDiv = targetLI.children.item(1);

  return () => {
    isLoading = !isLoading;
    if (isLoading) {
      viewDiv.style.display = "none";
      animationDiv.style.display = "";
    } else {
      viewDiv.style.display = "";
      animationDiv.style.display = "none";
    }
  };
}
