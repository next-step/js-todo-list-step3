'use strict';

export const saveData = (dataName, data) => {
  localStorage.setItem(dataName, JSON.stringify(data));
};

export const getData = dataName => {
  const loadedData = localStorage.getItem(dataName);
  const parsedData = JSON.parse(loadedData);
  if (!parsedData) return;
  return parsedData;
};
