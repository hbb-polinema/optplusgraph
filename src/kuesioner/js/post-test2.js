$(document).ready(function() {
    var divTimer = document.getElementById("timer");
    timer(25, 0, divTimer);
});
/**
 * Fungsi untuk tab pertanyaan post-test
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
        nextBtn.value = "Simpan";
    } else {
        nextBtn.value = "Lanjut";
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
        document.getElementById("formPostTest2").submit();
        return false;
    }
    // Otherwise, display the correct tab:
    showTab(currentTab);
}

function validateForm() {
    // This function deals with validation of the form fields
    var x, y, i, valid = true;
    x = document.getElementsByClassName("tab");
    y = x[currentTab].getElementsByTagName("input");
    // A loop that checks every input field in the current tab:
    for (i = 0; i < y.length; i++) {
        // If a field is empty...
        if (y[i].value == "") {
            // add an "invalid" class to the field:
            y[i].className += " invalid";
            // and set the current valid status to false
            valid = false;
        }
    }

    return valid; // return the valid status
}

function saveToDB(jwb, id_soal) {
    var time = 'menit ' + _MIN + ':detik ' + _SEC;
    console.log(id_soal + ' jwb: ' + jwb + '-' + time);
    $.ajax({
        type: "POST",
        url: "ajax_request/post-test2.php",
        data: "id_soal=" + id_soal + "&jwb=" + jwb + "&time=" + time,
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

function updateTahap(tahap) {
    $.ajax({
        type: "POST",
        url: "ajax_request/simulasi.php",
        data: "tahap=" + tahap,
        cache: false,
        success: function(result) {
            if (result == 'sukses') {
                console.log('sukses pindah tahap');
            } else {
                console.log(result);
            }
        },
        error: function(xhr, status, error) {
            console.log('Terjadi koneksi galat: ' + status);
        }
    });
}

/**
 * 
 * @param {soal saat ini} currentQuestion
 */
function postTest2(currentQuestion) {
    var valid = true;
    var nextBtn = document.getElementById('nextBtn');
    var sisaSoal = document.getElementById("sisaSoal");

    switch (currentQuestion) {
        case 1:
            if (document.getElementById('answerP1').value != '') {
                saveToDB(document.getElementById('answerP1').value, 42);
            } else {
                document.getElementById('p1').className += ' invalid';
                valid = false;
            }

            // go to p2
            if (valid) {
                nextBtn.setAttribute('onclick', 'postTest2(2)');
                sisaSoal.textContent = '4';
            }
            break;
        case 2:
            if (document.getElementById('answerP2').value != '') {
                saveToDB(document.getElementById('answerP2').value, 43);
            } else {
                document.getElementById('p2').className += ' invalid';
                valid = false;
            }

            // go to p3
            if (valid) {
                nextBtn.setAttribute('onclick', 'postTest2(3)');
                sisaSoal.textContent = '3';
            }
            break;
        case 3:
            if (document.getElementById('answerP3').value != '') {
                saveToDB(document.getElementById('answerP3').value, 44);
            } else {
                document.getElementById('p3').className += ' invalid';
                valid = false;
            }

            // go to p4
            if (valid) {
                nextBtn.setAttribute('onclick', 'postTest2(4)');
                sisaSoal.textContent = '2';
            }
            break;
        case 4:
            if (document.getElementById('answerP4').value != '') {
                saveToDB(document.getElementById('answerP4').value, 45);
            } else {
                document.getElementById('p4').className += ' invalid';
                valid = false;
            }

            // go to p5
            if (valid) {
                nextBtn.value = 'Simpan';
                nextBtn.setAttribute('onclick', 'postTest2(5)');
                sisaSoal.textContent = '1';
            }
            break;
        case 5:
            if (document.getElementById('answerP5').value != '') {
                saveToDB(document.getElementById('answerP5').value, 46);
                if (document.getElementById('answerP5a').value != '') {
                    saveToDB(document.getElementById('answerP5a').value, 46);
                }
            } else {
                document.getElementById('p5').className += ' invalid';
                valid = false;
            }

            // go to SUBMIT
            if (valid) {
                // FINISH Post-Test2, next to Selesai
                alert('Post-tes 2 Berhasil disimpan!');
                updateTahap('selesai.php');
                window.location.href = 'selesai.php';
            }
            break;
    }

    if (valid) nextForm(1);

    return valid;
}