import throttle from "lodash.throttle"

const iframe = document.querySelector('iframe')
console.log(iframe)

const player = new Vimeo.Player(iframe);
const PLAY_KEY="videoplayer-current-time"
player.on('timeupdate', throttle(onPlayTimer, 1000));

function onPlayTimer(data) {
    localStorage.setItem(PLAY_KEY, JSON.stringify(data))
    console.log(data.seconds)
}

const savedTime = localStorage.getItem(PLAY_KEY)
const parseTime = JSON.parse(savedTime)
console.log(parseTime)

player.setCurrentTime(parseTime.seconds)
 
