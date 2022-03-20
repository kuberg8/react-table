function generateData(length = 10000) {
  const start = new Date(2012, 0, 1);
  const end = new Date();

  return [...new Array(length)].map(() => ({
    name: (Math.random() + 1).toString(36).substring(7),
    age: Math.floor(Math.random() * 100),
    date: new Date(
      start.getTime() + Math.random() * (end.getTime() - start.getTime())
    ).toLocaleDateString("ru-RU"),
  }));
}

function debounce(func, wait, immediate) {
  var timeout;
  return function () {
    var context = this,
      args = arguments;
    var later = function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

export { generateData, debounce };
