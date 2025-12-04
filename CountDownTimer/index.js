//audio variables 
const audio=new AudioContext();
const audioelement=document.querySelector('audio');
const track=audio.createMediaElementSource(audioelement);
track.connect(audio.destination);
//timer variables
let time;
const timer = document.querySelector(".time");
const inputTime = document.querySelector("#timeInput");

//notification variables
let permissionStatus = false;
const img = "./logo.png";
const text = `Timer is over`;

function startCountDown() {
  clearInterval(time);
  timer.style.fontSize = "15vh";

  Notification.requestPermission().then((result) => {
    if (result == "granted") {
      permissionStatus = true;
    }
    let givenTime = parseInt(inputTime.value);

    if (isNaN(givenTime) || givenTime <= 0) {
      alert("Input Valid Time please");
    } else {
      timer.innerHTML = givenTime + "s";
      time = setInterval(() => {
        givenTime--;
        timer.innerHTML = givenTime + "s";

        if (givenTime <= 0) {
          clearInterval(time);
          timer.style.fontSize = "3em";
          timer.innerHTML = "Time out";

          if (permissionStatus) {
            const notification = new Notification("Time is up!", {
              body: text,
              icon: img,
            });
            audioelement.play()
            setTimeout(() => {
              notification.close();
            }, 5000);
          }
        }
      }, 1000);
    }
  });
}
