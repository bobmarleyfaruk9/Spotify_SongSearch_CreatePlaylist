function PlayListUp(row){
    const table = document.getElementById("PlaylistTable");
    var children = table.children;
  
    for (var i = 0; i < children.length; i++) {
      if(children[i]===row && i!=0 &&i!=1){
        //Simply change the location of the song
        table.insertBefore(children[i],children[i-1])
        break;
      }
    }
  }
function PlayListDown(row){
    const table = document.getElementById("PlaylistTable");
    var children = table.children;
  
    for (var i = 0; i < children.length; i++) {
      if(children[i]===row && i<children.length-1){
        //Simply change the location of the song
        table.insertBefore(children[i],children[i+2])
        break;
      }
    }
}
  
function CreatePlaylist(song_name,artist_name,img_url){
    let header = document.getElementById("playlist_header");
  
    header.removeAttribute("hidden");
    header.innerHTML = `
      <h1>Playlist</h1>
      `
    //Create the table
    const table = document.getElementById("PlaylistTable");
  
    let newRow = document.createElement("tr")
    let artist_cell = document.createElement("td")
    let img_src = document.createElement("img")
    let song_cell = document.createElement("td")
    let img_cell = document.createElement("td")
    let up_button = document.createElement("button")
    let down_button = document.createElement("button")
    let remove_button = document.createElement("button")
  
  
    //Img adjusting
    img_src.src=img_url
    img_src.width=50
    img_cell.appendChild(img_src)
  
    artist_cell.innerText = artist_name
    song_cell.innerText = song_name
  
    remove_button.type = 'button'
    up_button.type = 'button'
    down_button.type = 'button'
  
    //Emoji codes for the playlist buttons
    up_button.innerHTML = '&#128070'
    down_button.innerHTML = '&#128071'
    remove_button.innerHTML = '-'
  
    //Append the buttons
    newRow.appendChild(remove_button)
    newRow.appendChild(up_button)
    newRow.appendChild(down_button)
  
    //Append the cells
    newRow.appendChild(song_cell)
    newRow.appendChild(artist_cell)
    newRow.appendChild(img_cell)
  
    table.appendChild(newRow)
    
    remove_button.onclick = function() {
      table.removeChild(newRow)
    }
    up_button.onclick = function(){
      PlayListUp(newRow)
    }
    down_button.onclick = function(){
      PlayListDown(newRow)
    }
  
}