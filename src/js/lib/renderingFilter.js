const filter = (items, filterType) => {
  const filtering = {
    active: () => {
      return items.filter((item) => {
        return !item.isCompleted;
      });
    },
    completed: () => {
      return items.filter((item) => {
        return item.isCompleted;
      });
    },
    all: () => {
      return items;
    },
    priority: () => {
      // let cloneItems = JSON.parse(JSON.stringify(items));

      let priority0 = [];
      let priority12 = [];

      items.forEach((item) => {
        if (item.priority === 0) {
          return priority0.push(item);
        }
        priority12.push(item);
      });

      priority12.sort((a, b) => {
        return a.priority - b.priority;
      });

      console.log(priority0);
      console.log(priority12);
      const priorityItems = priority12.concat(priority0);

      return priorityItems;
    },
  };

  return filtering[filterType]();
};

export { filter };
