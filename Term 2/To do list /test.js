
const tikcets = [
    {
      task: "task 1",
      color: "lightpink",
      id: 12345
    },
    {
        task: "task 1",
        color: "lightpink",
        id: 12345
      },
      {
        task: "task 1",
        color: "lightpink",
        id: 12345
      },
      {
        task: "task 1",
        color: "lightpink",
        id: 12345
      },
  ];
  



localStorage.setItem('NewMovies' , JSON.stringify(movies))

// JSON.stringify()
const moviesFromLS = localStorage.getItem('myMovies')

console.log(moviesFromLS) // JSON

const movieObjs = JSON.parse(movies)

console.log(movieObjs) // JS code 