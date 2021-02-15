export const showMessage = (string) => {
  if (!confirm(string)) {
    return;
  }
};
