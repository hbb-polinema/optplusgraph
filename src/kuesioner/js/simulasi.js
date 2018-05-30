/**
 * Fungsi untuk tab Simulasi
 * author: Habibie Ed Dien (habibie.tk@gmail.com)
 */

var currentTab = 0; // Current tab is set to be the first tab (0)
showTab(currentTab); // Display the crurrent tab

function showTab(n) {
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

function nextForm(n) {
    // This function will figure out which tab to display
    var x = document.getElementsByClassName("tab");
    // Hide the current tab:
    x[currentTab].style.display = "none";
    // Increase or decrease the current tab by 1:
    currentTab = currentTab + n;
    // if you have reached the end of the form...
    if (currentTab >= x.length) {
        // ... the form gets submitted:
        //document.getElementById("formPreTest").submit();
        return false;
    }
    // Otherwise, display the correct tab:
    showTab(currentTab);
}

/**
 * 
 * @param {tab saat ini} currentTab
 */
function simulasi(currentTab) {
    var valid = true;
    var nextBtn = document.getElementById('nextBtn');

    if (valid) nextForm(1);

    return valid;
}

function simulasiOPT() {
    var opt = window.open(
        "http://localhost/opt/", // http://codeviz.tk/opt/
        "_blank",
        "toolbar=no,scrollbars=yes,resizable=yes,fullscreen=yes");
}

function simulasiCodeViz() {
    var codeviz = window.open(
        "http://localhost/codeviz/", // http://codeviz.tk/codeviz/
        "_blank",
        "toolbar=no,scrollbars=yes,resizable=yes,fullscreen=yes");
}