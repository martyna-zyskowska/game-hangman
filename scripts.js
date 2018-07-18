var phrase = ["Fortuna kołem się toczy",
              "Bez pracy nie ma kołaczy",
              "Nosił wilk razy kilka ponieśli i wilka",
              "Czego Jaś się nie nauczy tego Jan nie będzie umiał"];

var random_phrase = Math.floor(Math.random()*phrase.length);
if(random_phrase > phrase.length-1) random_phrase = 1;

var sentence = phrase[random_phrase];
sentence = sentence.toUpperCase(); 

var numberOfLetters = sentence.length;
var fail = "0";

var yes = new Audio("yes.wav");
var no = new Audio("no.wav");

var sentence1 = ""; //hidden sentence

//changing sentence to dashes and spaces
for (i=0; i<numberOfLetters; i++) {
    if (sentence.charAt(i)==" ") sentence1 = sentence1 + " ";
    else sentence1 = sentence1 + "-";
}

//Where and when the sentence should appear
function show_sentence() {
    document.getElementById("game-sentence").innerHTML = sentence1;
}

//The function will start during the onload
window.onload = start;

var letters = new Array(35) //New array with 35 letters

letters[0] = "A";
letters[1] = "Ą";
letters[2] = "B";
letters[3] = "C";
letters[4] = "Ć";
letters[5] = "D";
letters[6] = "E";
letters[7] = "Ę";
letters[8] = "F";
letters[9] = "G";
letters[10] = "H";
letters[11] = "I";
letters[12] = "J";
letters[13] = "K";
letters[14] = "L";
letters[15] = "Ł";
letters[16] = "M";
letters[17] = "N";
letters[18] = "Ń";
letters[19] = "O";
letters[20] = "Ó";
letters[21] = "P";
letters[22] = "Q";
letters[23] = "R";
letters[24] = "S";
letters[25] = "Ś";
letters[26] = "T";
letters[27] = "U";
letters[28] = "V";
letters[29] = "W";
letters[30] = "X";
letters[31] = "Y";
letters[32] = "Z";
letters[33] = "Ź";
letters[34] = "Ż";

function start() {
    var divContent = ""; //place of alphabet

    //loop that will work 35 times
    for (i=0; i<=34; i++) {
        var element = "lett" + i; //creating IDs for particular letters (lett1, lett2, etc)
        divContent = divContent + '<div class="letter" onclick="sprawdz('+i+')" id="'+element+'">'+letters[i]+'</div>'; // div with letters creation
        if ((i+1) % 7==0) divContent = divContent + '<div style="clear:both;"></div>'; // clear:both every 7 letter to start a new row of letters
    }

    document.getElementById("game-alphabet").innerHTML = divContent;
    show_sentence();
}

String.prototype.ustawZnak = function(miejsce, znak) {
    if(miejsce > this.length - 1) return this.toString();
    else return this.substr(0, miejsce) + znak + this.substr(miejsce + 1);
}

//to check if the letter was selected previosly
function sprawdz(nr) { //looking for letters in the sentence
    var trafiona = false;

    for(i=0; i<numberOfLetters; i++) {
        if (sentence.charAt(i) == letters[nr]) {
            sentence1 = sentence1.ustawZnak(i,letters[nr]);
            trafiona = true;
        }
    }
    
    if(trafiona == true) { //changes on the board if success
        yes.play();
        var element = "lett" + nr;
        document.getElementById(element).style.background = "#003300";
        document.getElementById(element).style.color = "#00C000";
        document.getElementById(element).style.border = "3px solid #00C000";
        document.getElementById(element).style.cursor = "default";
        show_sentence();
    }
    else {
        no.play();
        var element = "lett" + nr; //changes on the board if failed
        document.getElementById(element).style.background = "#330000";
        document.getElementById(element).style.color = "#C00000";
        document.getElementById(element).style.border = "3px solid #C00000";
        document.getElementById(element).style.cursor = "default";
        document.getElementById(element).setAttribute("onclick",";");

        //failure
        fail++;
        var obraz = "img/s" + fail + ".jpg";
        document.getElementById("game-attempts").innerHTML = '<img src="'+obraz+'" alt="" />'
    }

    //win
    if (sentence == sentence1) 
    document.getElementById("game-alphabet").innerHTML = "Wygrana! Hasło odgadnięte: "+sentence+
    '<br><br><span class="reset" onclick="location.reload()">JESZCZE RAZ?</span>'

    //loose
    if (fail>=9)
    document.getElementById("game-alphabet").innerHTML = "Przegrana! Hasło prawidłowe: "+sentence+
    '<br><br><span class="reset" onclick="location.reload()">JESZCZE RAZ?</span>'
}