/**
 * Fungsi untuk tab Simulasi
 * author: Habibie Ed Dien (habibie.tk@gmail.com)
 */

var soal = 0; // Current tab is set to be the first tab (0)
showSoal(soal); // Display the crurrent tab

function showSoal(n) {
    // This function will display the specified tab of the form...
    var x = document.getElementsByClassName("tab");
    var nextBtn = document.getElementById("nextBtn");
    x[n].style.display = "block";
    //... and fix the Previous/Next buttons:    
    if (n == (x.length - 1)) {
        nextBtn.value = "Selesai";
    } else {
        nextBtn.value = "Soal Berikutnya";
    }
}

function nextSoal(n) {
    // This function will figure out which tab to display
    var x = document.getElementsByClassName("tab");
    // Hide the current tab:
    x[soal].style.display = "none";
    // Increase or decrease the current tab by 1:
    soal = soal + n;
    // if you have reached the end of the form...
    if (soal >= x.length) {
        // ... the form gets submitted:
        //document.getElementById("formPreTest").submit();
        return false;
    }
    // Otherwise, display the correct tab:
    showSoal(soal);
}

/**
 * 
 * @param {tab saat ini} soal
 */
function simulasi1S1() {
    var valid = true;
    var nextBtn = document.getElementById('nextBtn');

    if (valid) nextSoal(1);

    return valid;
}

var _MainDomain = "http://localhost"; // http://codeviz.tk/

function simulasiOPT() {
    var opt = window.open(
        _MainDomain + "/opt/", // http://codeviz.tk/opt/
        "_blank",
        "toolbar=no,scrollbars=yes,resizable=yes,fullscreen=yes");
}