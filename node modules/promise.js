const fetchData = new Promise((resolve, reject) => {
    const data = 'Fetched data';
    const success = true;
  
    if (success) {
      resolve(data); // Resolve the promise
    } else {
      reject('Error fetching data'); // Reject the promise
    }
  });
  
  fetchData
    .then((result) => console.log(result))
    .catch((error) => console.error(error));
