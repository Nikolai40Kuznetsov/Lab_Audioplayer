track_1 = document.getElementById('track-1')
track_2 = document.getElementById('track-2')
track_3 = document.getElementById('track-3')
track_4 = document.getElementById('track-4')
track_5 = document.getElementById('track-5')
block_1 = document.getElementById("first-block")
buttons_div = document.getElementById("buttons-div")
next_track = document.getElementById("next-track")
previous_track = document.getElementById("previous-track")
mix = document.getElementById("mix")
tracks_array = [
    track_1_page = document.getElementById("track-1-page"),
    track_2_page = document.getElementById("track-2-page"),
    track_3_page = document.getElementById("track-3-page"),
    track_4_page = document.getElementById("track-4-page"),
    track_5_page = document.getElementById("track-5-page")
]
let current_page = 0


function go_on_1() {
    block_1.style.display = "none"
    current_page = 0
    tracks_array[current_page].style.display = "block"
    buttons_div.style.display = "block"
}

function go_on_2() {
    block_1.style.display = "none"
    current_page = 1
    tracks_array[current_page].style.display = "block"
    buttons_div.style.display = "block"
}

function go_on_3() {
    block_1.style.display = "none"
    current_page = 2
    tracks_array[current_page].style.display = "block"
    buttons_div.style.display = "block"
}

function go_on_4() {
    block_1.style.display = "none"
    current_page = 3
    tracks_array[current_page].style.display = "block"
    buttons_div.style.display = "block"
}

function go_on_5() {
    block_1.style.display = "none"
    current_page = 4
    tracks_array[current_page].style.display = "block"
    buttons_div.style.display = "block"
}

function go_next() {
    tracks_array[current_page].style.display = "none"
    current_page += 1
    if (current_page == 5)
    {
        current_page = 0
    }    
    tracks_array[current_page].style.display = "block"
}

function go_back() {
    tracks_array[current_page].style.display = "none"
    if (current_page == 0)
    {
        current_page = 4
    } 
    else {
        current_page -= 1
    }    
    tracks_array[current_page].style.display = "block"
}

function go_mix() {
    tracks_array[current_page].style.display = "none"
    current_page = Math.floor(Math.random() * 5)
    console.log(current_page)
    tracks_array[current_page].style.display = "block"
}

track_1.addEventListener("click", go_on_1)
track_2.addEventListener("click", go_on_2)
next_track.addEventListener("click", go_next)
previous_track.addEventListener("click", go_back)
mix.addEventListener("click", go_mix)