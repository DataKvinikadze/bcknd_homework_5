// console.log("hello");

// 1) Create a Promise with a 50/50 Chance of Resolving or Rejecting
const Promisee = new Promise((resolve, reject) => {
  const random = Math.random() >= 0.5;
  setTimeout(() => {
    if (random) {
      resolve("Promise resolved!");
    } else {
      reject("Promise rejected!");
    }
  }, 1000);
});

// Fetch Data from Two Sources and Return the Faster Response: https://dummyjson.com/users and https://jsonplaceholder.typicode.com/users .
// Use either fetch or axios.

const fetchFaster = async () => {
  const response = await Promise.race([
    fetch("https://dummyjson.com/users"),
    fetch("https://jsonplaceholder.typicode.com/users"),
  ]);

  const data = await response.json();
  console.log(data);
};

fetchFaster();

// Write three promises that return arrays after different time intervals:
// Two should resolve successfully.
// One should reject.
// Merge the arrays from only the fulfilled promises.

const promise1 = new Promise((res, rej) => {
  setTimeout(() => {
    res([1, 2, 3]);
  }, 300);
});

const promise2 = new Promise((res, rej) => {
  setTimeout(() => {
    res([4, 5, 6]);
  }, 500);
});

const promise3 = new Promise((res, rej) => {
  setTimeout(() => {
    rej("rejected");
  }, 500);
});

const handlePromises = async () => {
  const results = await Promise.allSettled([promise1, promise2, promise3]);

  const fullfilledArray = results
    .filter((result) => result.status === "fulfilled")
    .map((result) => result.value)
    .flat();

  console.log(fullfilledArray);
};

handlePromises();

//  Use these APIs: https://fakestoreapi.com/users  and https://jsonplaceholder.typicode.com/users Fetch data from both endpoints and display the combined data only if both promises are fulfilled successfully.
const fetchCombinedData = async () => {
  const [data1, data2] = await Promise.all([
    fetch("https://fakestoreapi.com/users").then((response) => response.json()),
    fetch("https://jsonplaceholder.typicode.com/users").then((response) =>
      response.json()
    ),
  ]);

  const combinedData = [...data1, ...data2];
  console.log(combinedData);
};

fetchCombinedData();
