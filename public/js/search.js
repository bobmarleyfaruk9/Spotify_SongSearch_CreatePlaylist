function getSong() {
  let songName = document.getElementById('song').value
  if(songName === '') {
      return alert('Please enter a song name')
  }
  let songDiv = document.getElementById('songInfo')
  songDiv.innerHTML = ''

  let xhr = new XMLHttpRequest()

  xhr.onreadystatechange = () => {
      if (xhr.readyState == 4 && xhr.status == 200) {
          let response = JSON.parse(xhr.responseText)
          SearchResults(response,songName)
      }
  }
  xhr.open('GET', `/search?term=${songName}`, true)
  xhr.send()  
}

function SearchResults(songInfo,user_input) {

  //Header for songs matching
  let header = document.getElementById("matched_header");

  header.removeAttribute("hidden");
  header.innerHTML = `
    <h1>Songs matching: ${user_input} </h1>
    `
  //Clear the table before showing the new results
  const table = document.getElementById("SearchTable");
  table.innerHTML=""
  
  for(let i=0; i<20; i++){
    //Get the necessary information from the json sent from the server
    let song_name = songInfo.tracks.items[i].name
    let artist_name = songInfo.tracks.items[i].artists["0"].name
    let img_url = songInfo.tracks.items[i].album.images["0"].url

    //Create the table
    let newRow = document.createElement("tr")
    let artist_cell = document.createElement("td")
    let img_src = document.createElement("img")
    let song_cell = document.createElement("td")
    let img_cell = document.createElement("td")
    let add_to_playlist = document.createElement("button")


    //Img adjusting
    img_src.src=img_url
    img_src.width=50
    img_cell.appendChild(img_src)

    //Set the cells
    artist_cell.innerText = artist_name
    song_cell.innerText = song_name
    add_to_playlist.type = 'button';
    add_to_playlist.innerHTML = '+';

    //Append
    newRow.appendChild(add_to_playlist)
    newRow.appendChild(song_cell)
    newRow.appendChild(artist_cell)
    newRow.appendChild(img_cell)


    table.appendChild(newRow)

    add_to_playlist.onclick = function() {
      CreatePlaylist(song_name,artist_name,img_url)
  };
  }
}

const ENTER=13

function handleKeyUp(event) {
event.preventDefault()
 if (event.keyCode === ENTER) {
    document.getElementById("submit_button").click()
}
}


document.addEventListener('DOMContentLoaded', function() {
document.getElementById('submit_button').addEventListener('click', getSong)

//add key handler for the document as a whole, not separate elements.
document.addEventListener('keyup', handleKeyUp)

})