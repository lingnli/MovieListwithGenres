//宣告
const genreslist = document.querySelector('[data-genreslist]')
const movielist = document.querySelector('[data-movielist]')
const navbar = document.querySelector('.navbar')
const base_url = 'https://movie-list.alphacamp.io/api/v1/movies'
const photo_url = 'https://movie-list.alphacamp.io/posters/'
const genresDataList = {
  "1": "Action",
  "2": "Adventure",
  "3": "Animation",
  "4": "Comedy",
  "5": "Crime",
  "6": "Documentary",
  "7": "Drama",
  "8": "Family",
  "9": "Fantasy",
  "10": "History",
  "11": "Horror",
  "12": "Music",
  "13": "Mystery",
  "14": "Romance",
  "15": "Science Fiction",
  "16": "TV Movie",
  "17": "Thriller",
  "18": "War",
  "19": "Western"
}


//執行addGenresList
addGenresList(genresDataList)

//串接顯示所有資料=預設頁面
axios
  .get(base_url)
  .then(response => {
    console.log(response.data.results)
    let movies = response.data.results
    addMoviesCard(movies)
  })

//監聽navbar home
navbar.addEventListener('click', event => {
  axios
    .get(base_url)
    .then(response => {
      console.log(response.data.results)
      let movies = response.data.results
      addMoviesCard(movies)
    })
})

//監聽genres類別
genreslist.addEventListener('click', event => {
  if (event.target.classList.contains("nav-link")) {
    console.log(event.target.innerText)

    axios
      .get(base_url)
      .then(response => {
        localStorage.clear()//清空上一次儲存的localStorage
        let movies = response.data.results
        addGenres(event.target.innerText, movies)
      })
  }
})


//function
//產生genres列表
function addGenresList(list) {
  let htmlContent = ''
  for (let i = 1; i < 20; i++) {
    htmlContent += `
    <li class="nav-item">
      <a class="nav-link" data-toggle="pill" href="#">${list[i]}</a>
    </li>
    `
  }
  genreslist.innerHTML = htmlContent
}
//產生movies card
function addMoviesCard(data) {
  let htmlContent = ''
  for (let i = 0; i < data.length; i++) {
    htmlContent += `
    <div class="card m-2" style="width: 14rem;">
      <img class="card-img-top" src="${photo_url}${data[i].image}" alt="Card image cap">
      <div class="card-body">
        <p class="card-text text-center card-title">${data[i].title}</p>
    `
    for (let j = 0; j < data[i].genres.length; j++) {
      htmlContent += `
    <div class="btn btn-success" style="font-size:5px; padding:2px;">
    ${genresDataList[data[i].genres[j]]}    
    </div>
    `
    }

    htmlContent += `
      </div>
    </div>
    `
  }
  movielist.innerHTML = htmlContent
}

//showGenres功能
function addGenres(genres, movies) {
  //將特定genres電影丟到localstorage
  const list = JSON.parse(localStorage.getItem('genresMovies')) || []
  for (let i = 0; i < movies.length; i++) {
    for (let j = 0; j < movies[i].genres.length; j++) {
      if (genresDataList[movies[i].genres[j]] === genres) {
        let movie = movies[i]
        list.push(movie)
      }
    }
  }
  localStorage.setItem('genresMovies', JSON.stringify(list))
  let data = JSON.parse(localStorage.getItem('genresMovies')) || []
  addMoviesCard(data)
}