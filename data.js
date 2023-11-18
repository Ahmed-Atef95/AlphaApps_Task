async function getData() {
    // Asynchronous operation
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([1, 2, 3]);
      }, 1000);
    });
  }
  
  module.exports = {
    getData
  };