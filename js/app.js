let songs = [{
    name:"Dazed and Confused - Ruel",
    src:"song/Dazed And Confused.mp3",
    duration:"03:11",
    },

    {
        name:"Lost in Japan - Shawn Mendes",
        src:"song/L.mp3",
        duration:"03:21",
    },

    {
        name:"Death Of A Bachelor - Panic at the Disco",
        src:"song/D.mp3",
        duration:"03:23",
    },

    {
        name:"Not Thinking Bout you - Ruel",
        src:"song/N.mp3",
        duration:"03:08",
    },

    {
        name:"Fight Back - NetFlex",
        src:"song/f.mp3",
        duration:"03:20",
    },

    {
        name:"High Hope - Panic at the Disco",
        src:"song/h.mp3",
        duration:"03:10",
    },

    {
        name:"Sayonara No Natsu - Aoi Teshima",
        src:"song/Saya.mp3",
        duration:"05:23",
    },
]

let list = document.querySelectorAll(".list__song")
let playBtn = document.querySelector(".player__btn--play")
let pauseBtn = document.querySelector(".player__btn--pause")
let name = document.querySelector(".player__name")
let totalTime = document.querySelector(".player__duration--end")
let progress = document.getElementById("player__duration--bar")
let volume = document.querySelector(".player__volume--bar")
let volumeBar = document.querySelector(".player__volume")
let shuffleBtn = document.querySelector('.player__shuffle')
let song = new Audio()
let counter = 0
let app = {
    init:function(){
        shuffle()
        play()
        pause()
        updateTime()
        nextSong()
        volumeChange()
    }
}
//default
// volume.style.width = (song.volume)*100 +"%"
volumeBar.value = song.volume*100
list[counter].classList.add("color")
totalTime.innerText =  songs[counter].duration
//play the song
let play = () =>{
    song.src = songs[counter].src
    playBtn.addEventListener("click",()=>{
        totalTime.innerText =  songs[counter].duration
        name.innerText = songs[counter].name
        playBtn.style.display="none"
        pauseBtn.style.display="block"
        song.play()
    })
}
//shuffle playlist
let shuffle = () =>{
    shuffleBtn.addEventListener('click',()=>{
        removeColor()
        let random = Math.floor(Math.random()*songs.length)
        if (random === counter) {
            random = Math.floor(Math.random()*songs.length)
        }
        song.src = songs[random].src
        totalTime.innerText =  songs[random].duration
        name.innerText = songs[random].name
        list[random].classList.add("color")
        playBtn.style.display="none"
        pauseBtn.style.display="block"
        song.play()
        counter = random
    })
}
// auto move to next song if the previous song ended
let nextSong = () =>{
    song.addEventListener("ended",()=>{
        removeColor()
        counter++
        if(counter>songs.length-1){
            counter = 0
        }
        list[counter].classList.add("color")
        song.src = songs[counter].src
        totalTime.innerText =  songs[counter].duration
        name.innerText = songs[counter].name
        song.play()
    })
}

//next btn
let nextBtn = document.querySelector(".player__btn--next")
nextBtn.addEventListener("click",()=>{
    counter++
    removeColor()
    if(counter>songs.length-1){
        counter = 0
    }
    list[counter].classList.add("color")
    song.src = songs[counter].src
    totalTime.innerText =  songs[counter].duration
    name.innerText = songs[counter].name
    playBtn.style.display="none"
    pauseBtn.style.display="block"
    song.play()
})

//prev btn
let prevBtn = document.querySelector(".player__btn--prev")
prevBtn.addEventListener("click",()=>{
    removeColor()
    counter--
    if(counter<0){
        counter = songs.length-1
    }
    list[counter].classList.add("color")
    song.src = songs[counter].src
    totalTime.innerText =  songs[counter].duration
    name.innerText = songs[counter].name
    playBtn.style.display="none"
    pauseBtn.style.display="block"
    song.play()
})

// pause the song
let pause = () =>{
    pauseBtn.addEventListener( "click", ()=>{
        playBtn.style.display = "block"
        pauseBtn.style.display = "none"
        song.pause()
    })
}

//min,sec < 10 will add 0
let checkTime = (i) =>{
    if(i<10){
        i = "0"+ i
    }
    return i
}

//change time
let changeTime =(e)=>{
    let positionClicked = e.offsetX
    let progressWidth = progress.clientWidth
    // console.log(positionClicked);
    // console.log(progressWidth);
    // console.log(song.duration);
    song.currentTime = (positionClicked/progressWidth)*song.duration
}
progress.addEventListener("click",changeTime)

//get the current time of the song
let updateTime =()=>{
    let currentT = document.querySelector(".player__duration--start")
    let bar = document.querySelector(".player__bar--progress")
    song.addEventListener("timeupdate",()=>{
        let minute = Math.floor(song.currentTime / 60)
        let second = Math.floor(song.currentTime % 60)
        // let hour = Math.floor(song.currentTime / 3600)
        minute = checkTime(minute)
        second = checkTime(second)
        bar.style.width= (song.currentTime/song.duration)*100+"%"
        currentT.innerText = minute +":"+ second
    })
}

//making a list
let length = list.length
for (let i = 0; i < length; i++) {
    lists = list[i];
    lists.addEventListener("click",()=>{
        removeColor()
        list[i].style.transitionDuration="0.3s"
        list[i].classList.add("color")
        counter = i
        song.src = songs[counter].src
        totalTime.innerText =  songs[counter].duration
        name.innerText = songs[counter].name
        playBtn.style.display="none"
        pauseBtn.style.display="block"
        song.play()
        })
}

//remove list color
let removeColor = () =>{
    list.forEach(lists =>{
        lists.classList.remove("color")
    })
}

//Volume change
function volumeChange() {
    volumeBar.addEventListener("change",(attr)=>{
        // let target = parseInt(attr.offsetX) 
        // console.log(target);
        // let percentage = parseInt(target/volumeBar.clientWidth)
        // console.log(percentage);
        // song.volume= percentage*1
        // console.log(song.volume.toFixed(1));
        // volumeBar.value = (song.volume.toFixed(1))*100+"%"
        let target = volumeBar.value
        let percentage = (target/volumeBar.clientWidth)
        song.volume = percentage
    })
} 
app.init()