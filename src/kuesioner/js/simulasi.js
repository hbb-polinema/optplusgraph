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

function updateTahap(tahap) {
    $.ajax({
        type: "POST",
        url: "ajax_request/simulasi.php",
        data: "tahap=" + tahap,
        cache: false,
        success: function(result) {
            if (result == 'sukses') {
                console.log('sukses simpan jawaban ke DB');
            } else {
                console.log(result);
            }
        },
        error: function(xhr, status, error) {
            console.log('Terjadi koneksi galat: ' + status);
        }
    });
}


function simulasiNextBtn(nextStep, cond) {
    var valid = true;
    var nextBtn = document.getElementById('nextBtn');

    if (valid) {
        nextForm(1);

        if (currentTab == cond) {
            // FINISH go to post-test
            alert('Jawaban Simulasi Berhasil Disimpan!');
            updateTahap(nextStep);
            window.location.href = nextStep;
        }
    }

    return valid;
}

var _MainDomain = "http://localhost"; // http://codeviz.tk/

function simulasiOPT() {
    var opt = window.open(
        _MainDomain + "/opt/", // http://codeviz.tk/opt/
        "_blank",
        "toolbar=no,scrollbars=yes,resizable=yes,fullscreen=yes");
}

function simulasiCodeViz() {
    var codeviz = window.open(
        _MainDomain + "/codeviz/", // http://codeviz.tk/codeviz/
        "_blank",
        "toolbar=no,scrollbars=yes,resizable=yes,fullscreen=yes");
}

function Latihan1() {
    var latihan1 = window.open(
        _MainDomain + ":3000/latihan1.php", // http://codeviz.tk/survei/latihan1.php
        "_blank",
        "toolbar=no,scrollbars=yes,resizable=yes,fullscreen=no");
}

function Latihan2() {
    var latihan2 = window.open(
        _MainDomain + ":3000/latihan2.php", // http://codeviz.tk/survei/latihan2.php
        "_blank",
        "toolbar=no,scrollbars=yes,resizable=yes,fullscreen=no");
}

function simulasi1sesi1() {
    var S1se1 = window.open(
        _MainDomain + ":3000/simulasi1sesi1.php", // http://codeviz.tk/survei/simulasi1sesi1.php
        "_blank",
        "toolbar=no,scrollbars=yes,resizable=yes,fullscreen=no");
}

function simulasi1sesi2() {
    var S1se2 = window.open(
        _MainDomain + ":3000/simulasi1sesi2.php", // http://codeviz.tk/survei/simulasi1sesi2.php
        "_blank",
        "toolbar=no,scrollbars=yes,resizable=yes,fullscreen=no");
}

function simulasi2sesi1() {
    var S2se1 = window.open(
        _MainDomain + ":3000/simulasi2sesi1.php", // http://codeviz.tk/survei/simulasi2sesi1.php
        "_blank",
        "toolbar=no,scrollbars=yes,resizable=yes,fullscreen=no");
}

function simulasi2sesi2() {
    var S2se2 = window.open(
        _MainDomain + ":3000/simulasi2sesi2.php", // http://codeviz.tk/survei/simulasi2sesi2.php
        "_blank",
        "toolbar=no,scrollbars=yes,resizable=yes,fullscreen=no");
}