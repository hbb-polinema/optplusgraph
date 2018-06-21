/**
 * Fungsi untuk tab Simulasi
 * author: Habibie Ed Dien (habibie.tk@gmail.com)
 */
var currentTab = 0; // Current tab is set to be the first tab (0)

$(document).ready(function() {
    goTop();
    showTab(currentTab); // Display the crurrent tab
});

function goTop() {
    $('html, body').animate({
        scrollTop: $('html').offset().top
    }, 500);
    return false;
}

function showTab(n) {
    // This function will display the specified tab of the form...
    var x = document.getElementsByClassName("tab");
    var nextBtn = document.getElementById("nextBtn");
    x[n].style.display = "block";
    //... and fix the Previous/Next buttons:    
    if (nextBtn == null) return;

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
        url: "ajax_request/tahap.php",
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
        goTop();
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

var _MainDomain = "http://localhost:3000"; // http://codeviz.tk/
var _OPT;
var _CODEVIZ;
var _TIME = 15 * 60 * 1000; // 15 menit 0 detik
var _S1S1;

function simulasiOPT() {
    _OPT = window.open(
        "http://localhost/opt/", // http://codeviz.tk/opt/
        "_blank",
        "toolbar=no,scrollbars=yes,resizable=yes,top=0,left=0,width=800,height=600");
}

function simulasiCodeViz() {
    _CODEVIZ = window.open(
        "http://localhost/codeviz/", // http://codeviz.tk/codeviz/
        "_blank",
        "toolbar=no,scrollbars=yes,resizable=yes,top=0,left=0,width=1115,height=715");
}

function _DESTROY_OPT() {
    _OPT.close();
}

function _DESTROY_CODEVIZ() {
    _CODEVIZ.close();
}

function Latihan1() {
    var latihan1 = window.open(
        _MainDomain + "/latihan1.php", // http://codeviz.tk/survei/latihan1.php
        "_blank",
        "toolbar=no,scrollbars=yes,resizable=yes,fullscreen=yes");

    $(latihan1).on("beforeunload", function() {
        alert("Do you really want to close?");
    });
}

function Latihan2() {
    var latihan2 = window.open(
        _MainDomain + "/latihan2.php", // http://codeviz.tk/survei/latihan2.php
        "_blank",
        "toolbar=no,scrollbars=yes,resizable=yes,fullscreen=yes");
}

function simulasi1sesi1() {
    var S1se1 = window.open(
        _MainDomain + "/simulasi1sesi1.php", // http://codeviz.tk/survei/simulasi1sesi1.php
        "_blank",
        "toolbar=no,scrollbars=yes,resizable=yes,fullscreen=yes");

    _S1S1 = setTimeout(function() {
        S1se1.close();
        document.getElementById('s1s1').innerHTML = "";
    }, _TIME);
}

function simulasi1sesi2() {
    var S1se2 = window.open(
        _MainDomain + "/simulasi1sesi2.php", // http://codeviz.tk/survei/simulasi1sesi2.php
        "_blank",
        "toolbar=no,scrollbars=yes,resizable=yes,fullscreen=yes");

    setTimeout(function() {
        S1se2.close();
        document.getElementById('s1s2').innerHTML = "";
    }, _TIME);
}

function simulasi2sesi1() {
    var S2se1 = window.open(
        _MainDomain + "/simulasi2sesi1.php", // http://codeviz.tk/survei/simulasi2sesi1.php
        "_blank",
        "toolbar=no,scrollbars=yes,resizable=yes,fullscreen=yes");

    setTimeout(function() {
        S2se1.close();
        document.getElementById('s2s1').innerHTML = "";
    }, _TIME);
}

function simulasi2sesi2() {
    var S2se2 = window.open(
        _MainDomain + "/simulasi2sesi2.php", // http://codeviz.tk/survei/simulasi2sesi2.php
        "_blank",
        "toolbar=no,scrollbars=yes,resizable=yes,fullscreen=yes");

    setTimeout(function() {
        S2se2.close();
        document.getElementById('s2s2').innerHTML = "";
    }, _TIME);
}