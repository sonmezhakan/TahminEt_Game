//Değişkenler
var seviye = 0;
var hak = 0;
var suankiSeviye;
var randomNumber;
var timerActive = false;
var startActive = false;
var countDown;
var second;

const alertSuccessMessage = "Tahmin Doğru! Bir Üst Seviyeye Geçtiniz!";
const alertErrorMessage = "Tahmin Hatalı!";
const alertTimeMessage = "Süre Doldu!";

const bttnTahminEt = document.getElementById("tahminEt");
const inputText = document.getElementById("girilenDeger");
const h1RandomNumber = document.getElementById("rastgeleSayi");
const h1Level = document.getElementById("level");
const h1TahminHakki = document.getElementById("hak");
const htmlAlertSuccess = document.getElementById("success");
const htmlAlertError = document.getElementById("error");

var seviyeler = [
  { seviye: 1, tahminHakki: 2, maxDeger: 5, sure: 10 },
  { seviye: 2, tahminHakki: 3, maxDeger: 10, sure: 15 },
  { seviye: 3, tahminHakki: 4, maxDeger: 15, sure: 20 },
  { seviye: 4, tahminHakki: 5, maxDeger: 20, sure: 25 },
  { seviye: 5, tahminHakki: 6, maxDeger: 25, sure: 30 },
];

function StartGame() {
  seviye = 0;
  SeviyeBelirle(seviye);
  HakBelirle(suankiSeviye.tahminHakki);
  RandomNumber();
  second = suankiSeviye.sure;
  timerActive = false;
  startActive = true;
  getTimer();
}

function getTimer() {
  if (!timerActive) {
    timerActive = true;

    second = suankiSeviye.sure + 1;
    let timerElement = document.getElementById("timer");
    let timerHeader = document.getElementById("timerHeader");

    countDown = setInterval(function () {
      second--;
      if (second <= 5) {
        timerHeader.className = "card-header bg-danger text-white";
      } else {
        timerHeader.className = "card-header";
      }

      timerElement.innerHTML = `<h1 class="text-center">${second}</h1>`;

      if (second <= 0) {
        Alert(false, alertTimeMessage);
        timerActive = true;
        startActive = false;
        clearInterval(countDown);
      }
    }, 1000);
  }
}

function RandomNumber() {
  randomNumber = Math.floor(Math.random() * suankiSeviye.maxDeger) + 1;
  console.log(randomNumber);
}

function TahminEt() {
  if (startActive) {
    if (hak >= 1) {
      if (parseInt(inputText.value) == randomNumber) {
        h1RandomNumber.innerText = randomNumber;
        SeviyeArttır();
        Alert(true, alertSuccessMessage);
      } else {
        hak--;
        if (hak <= 0) {
          timerActive = true;
          startActive = false;
          clearInterval(countDown);
        }
        HakBelirle(hak);
        Alert(false, alertErrorMessage);
      }
    } else {
      timerActive = true;
      startActive = false;
      clearInterval(countDown);
    }
  }
}

function SeviyeBelirle(level) {
  suankiSeviye = seviyeler[level];
  h1Level.innerText = suankiSeviye.seviye;
}

function SeviyeArttır() {
  seviye++;
  SeviyeBelirle(seviye);
  RandomNumber();
  second = suankiSeviye.sure;

  hak = suankiSeviye.tahminHakki;
  HakBelirle(hak);
}

function HakBelirle(tahHak) {
  hak = tahHak;
  h1TahminHakki.innerText = tahHak;
}

function Alert(bool, message) {
  if (bool == true) {
    htmlAlertSuccess.innerText = message;
    htmlAlertSuccess.style = "display:block;";
    htmlAlertError.style = "display:none;";
  } else {
    htmlAlertError.innerText = message;
    htmlAlertSuccess.style = "display:none;";
    htmlAlertError.style = "display:block;";
  }
}
