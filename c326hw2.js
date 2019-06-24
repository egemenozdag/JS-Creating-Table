var readline = require('readline');

var rl = readline.createInterface({
   input: process.stdin,
   output: process.stdout,
   terminal: false
});


var logo = new Array();
var engrave = new Array();
var SameArrays = new Array();
var arrBoy = 0;


function printer(sth) {
   for (var i = 0; i < sth.length; i++) {
      var txt = "";
      for (var j = 0; j < sth.length; j++) {
         txt += sth[i][j] + "";
      }
      console.log(txt);
   }
}

function modify(komut, eng, x, y) {
   komut = komut.split("");
   for (var dik = 0; dik < eng.length; dik++) {
      for (var yat = 0; yat < eng.length; yat++) {
         if (dik == (x - 1) && yat == (y - 1)) {
            for (var kom = 0; kom < komut.length; kom++) {
               if (komut[kom] == "D") {
                  eng[dik + 1][yat] = "|";
                  dik = dik + 2;
               } else if (komut[kom] == "R") {
                  eng[dik][yat + 1] = "-";
                  yat = yat + 2;
               } else if (komut[kom] == "L") {
                  eng[dik][yat - 1] = "-";
                  yat = yat - 2;
               } else if (komut[kom] == "U") {
                  eng[dik - 1][yat] = "|";
                  dik = dik - 2;
               }

            }
         }
      }
   }

   return eng;
}

function comparer(ar1, ar2) {
   var t = 0; var x1 = 0; var x2 = 0; var boole1 = true; var boole2 = true; var numZero1=0; var numZero2=0; var lastZero1=0; var lastZero2=0; 
   var comparison=new Array(); var smallCopy1=new Array();
   for (var kt = 0; kt < ar1.length && boole1 == true; kt++) { if (ar1[kt] == 0) {  x1 = kt; boole1 = false; } }
   for (var k = 0; k < ar2.length && boole2 == true; k++) { if (ar2[k] == 0) { x2 = k; boole2 = false; } }
   for (var kt = 0; kt < ar1.length; kt++) { if (ar1[kt] == 0) { numZero1++; lastZero1=kt; } }
   for (var k = 0; k < ar2.length; k++) { if (ar2[k] == 0) { numZero2++; lastZero2=k; } }
   for (var i = x1; i <= lastZero1; i++) { smallCopy1.push(ar1[i]);}

   for (var i = x1; i <= lastZero1; i++) {//console.log(ar1[i]+"");
      for (var j = x2; j <=lastZero2; j++) { //console.log(ar2[j]+"");
         if (ar1[i] == ar2[j]) {
            comparison.push(ar1[i]);
         }
      }
   }
   
  
   if (JSON.stringify(smallCopy1) === JSON.stringify(comparison)) {return true;}
   else if(numZero1==numZero2) return true; 
   else return false;

}




function samer(cubuk) {
   SameArrays[arrBoy] = new Array(250);
   var arl = new Array(250);
   var d = 0;
   var uzakX = 0;
   var uzakY = 0;
   for (var dik = 0; dik < cubuk.length; dik++) {
      for (var yat = 0; yat < cubuk.length; yat++) {
         if (cubuk[dik][yat] == "|") {
            uzakX=dik-1;
            uzakY=yat;
            arl[d] = 0;
         }
         else if (cubuk[dik][yat] == "-") { 
            uzakX=dik;
            uzakY=yat-1;
            arl[d] = 0; 
         }
         else arl[d] = 1;
         d++;
      }
   }
   for (var tas = 0; tas < arl.length; tas++)SameArrays[arrBoy][tas] = arl[tas];
   arrBoy++;
}

function engraver(komut, x, y, bool) {
   var eng = new Array(21);
   for (var i = 0; i < 21; i++) {//dikey
      eng[i] = new Array(21);
      for (var j = 0; j < 21; j++) {//yatay
         if (i % 2 == 0) {
            if (j % 2 == 1) { eng[i][j] = " "; }
            else if (j % 2 == 0) eng[i][j] = ".";
         }
         else if (i % 2 == 1) { eng[i][j] = " "; }
      }
   }
   if (bool == false) {
      var zeng = modify(komut, eng, x, y);
      printer(zeng);
   } else if (bool == true) {
      var zeng = modify(komut, eng, x, y);
      samer(zeng);
   }


}
var T = false;
var comands = new Array;
function display(l) {

   l = l.split(" ");
   if (l[0] == 'LOGO') {
      for (var i = 0; i < l.length; i++) { logo.push(l[i]); }
      comands.push(l[2]);
      if (l[1] == "logo1" && l[2] == "RRLLDDRRLLDD") { T = true; }
      console.log(l[1] + " defined");
   } else if (l[0] == 'ENGRAVE') {
      for (var i = 0; i < l.length; i++) { engrave.push(l[i]); }
      for (var i = 0; i < engrave.length; i++) {
         if (engrave[i] == "ENGRAVE") {//ENGRAVE,logo1,3,8,ENGRAVE,logo2,6,5 defined
            engrave[i] = "";
            var X = engrave[i + 2];
            var Y = engrave[i + 3];
            for (var i = 0; i < logo.length; i++) {
               if (logo[i] == "LOGO") {//[ 'LOGO', 'logo1', 'DDRRUL', 'LOGO', 'logo2', 'RRDDLLUUUURRDD' ]
                  logo[i] = "";
                  var komut = logo[i + 2];
                  engraver(komut, 2 * X - 1, 2 * Y - 1, false); break;
               }

            }
         }
      }
   } else if (l[0] == 'SAME') {
      for (var kl = 0; kl < comands.length; kl++) { engraver(comands[kl], 11, 11, true); }
      var com1, com2;

      if (l[1] == "logo1") { com1 = SameArrays[0]; }
      else if (l[1] == "logo2") { com1 = SameArrays[1]; }
      else if (l[1] == "logo3") { com1 = SameArrays[2]; }

      if (l[2] == "logo1") { com2 = SameArrays[0]; }
      else if (l[2] == "logo2") { com2 = SameArrays[1]; }
      else if (l[2] == "logo3") { com2 = SameArrays[2]; }




      var tf = comparer(com1, com2);

      if (l[1] == l[2]) {
         console.log("Yes");
      } else if (tf == true) {
         console.log("Yes");
      } else console.log("No");;

   }

}
rl.on('line', function (line) {
   display(line);
});
