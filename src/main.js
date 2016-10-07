import Rx from 'rxjs/Rx';

console.log(d3);
import 'rxjs/operator/map';
import startLoop from './startloop';
import getPlaybackRate  from './getPlaybackRate';
let mouseMoveEvent = Rx.Observable.fromEvent(document, 'mousemove')
    .map(evt => ({
        rate1: getPlaybackRate(evt.x),
        rate2: getPlaybackRate(evt.y)
    }));


mouseMoveEvent.subscribe(evt => {
    document.getElementById("stats").innerHTML = `
    <p>
      <span>Rate 1: </span> ${evt.rate1}
    </p>
    <p>
      <span>Rate 2: </span> ${evt.rate2}
    </p>
  `
})


const audioContext = new AudioContext();

fetch('bowhill-trimmed.wav')
    .then(response => response.arrayBuffer())
    .then(buffer => audioContext.decodeAudioData(buffer))
    .then(audioBuffer => {
        let loop1 = startLoop(audioContext, audioBuffer, -1, 1);
        let loop2 = startLoop(audioContext, audioBuffer, -1, 1);
        mouseMoveEvent.subscribe(e => {
            loop1.playbackRate.value = e.rate1;
            loop2.playbackRate.value = e.rate2;
        });
    });

let drawChart = (evt) => {
    let data = [evt.rate1, evt.rate2];
    console.log(data);
    let bar = d3.select("#chart");

    bar
        .selectAll("div")
        .remove()
        .data(data)
        .enter().append("div")
        .style("width", function (d) { return d * 100 + "px"; })
        //.text(function (d) { return d; });

     
   
}

mouseMoveEvent.throttleTime(100).subscribe(evt => drawChart(evt));