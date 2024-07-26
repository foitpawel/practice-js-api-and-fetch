document.addEventListener('DOMContentLoaded', init);

async function init() {
  const divList = document.querySelectorAll('div');
  try {
    await setBordersSequentially(divList, ['red', 'blue', 'green'], setBorderColor);
    console.log('finish');
  } catch (error) {
    console.error('An error occurred:', error);
  }
}

async function setBordersSequentially(elements, colors, callback) {
  for (let i = 0; i < elements.length; i++) {
    await setBorderColorAsync(elements[i], colors[i], callback);
  }
}

function setBorderColor(element, color) {
  element.style.border = `3px solid ${color}`;
}

function setBorderColorAsync(element, color, callback) {
  return new Promise((resolve, reject) => {
    if (element && element instanceof HTMLElement) {
      setTimeout(() => {
        if (callback && typeof callback === 'function') {
          resolve(callback(element, color));
        }
      }, Math.random() * 3000);
    } else {
      const error = new Error('Parametr ~element~ musi być prawidłowym elementem DOM');
      if (callback && typeof callback === 'function') {
        callback(error);
      }
      reject(error);
    }
  });
}
