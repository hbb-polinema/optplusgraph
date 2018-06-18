/**
 * Fungsi untuk tab pertanyaan pretest
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
        document.getElementById("formPreTest").submit();
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

function submitPretest() {
    //document.getElementById("formPreTest").submit();
    window.location.href = 'simulasi.php';
    alert('Jawaban Pretest Berhasil Disimpan!');
}

function clearInvalid(i) {
    var P = document.getElementById('p' + i);
    P.className = P.className.replace('invalid', '');
}

function bahasaPem(val) {
    var bahasa = val.value;

    if (bahasa == 'y') {
        document.getElementById('programC').style.display = 'block';
    } else if (bahasa == 't') {
        document.getElementById('programC').style.display = 'none';
        document.getElementById('lastC').style.display = 'none';
    } else if (bahasa == 'a') {
        document.getElementById('lastC').style.display = 'block';
    } else if (bahasa == 'b' || bahasa == 'c') {
        document.getElementById('lastC').style.display = 'none';
    }
}

function saveToDB(val, q) {
    console.log(q + ' jwb: ' + val);
    $.ajax({
        type: "POST",
        url: "ajax_request/pretest.php",
        data: "q=" + q + "&jwb=" + val,
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

/**
 * 
 * @param {*pertanyaan saat ini} currentQuestion
 */
function preTest(currentQuestion) {
    var valid = true;
    var nextBtn = document.getElementById('nextBtn');
    var sisaPertanyaan = document.getElementById("sisaPertanyaan");

    switch (currentQuestion) {
        case 1:
            if (document.getElementById('answerP1-a').checked) {
                saveToDB("a", 1);
            } else if (document.getElementById('answerP1-b').checked) {
                saveToDB("b", 1);
            } else if (document.getElementById('answerP1-c').checked) {
                saveToDB("c", 1);
            } else if (document.getElementById('answerP1-d').checked) {
                saveToDB("d", 1);
            } else if (document.getElementById('answerP1-e').checked) {
                saveToDB("e", 1);
            } else {
                document.getElementById('p1').className += ' invalid';
                valid = false;
            }

            // go to p2
            if (valid) {
                nextBtn.setAttribute('onclick', 'preTest(2)');
                sisaPertanyaan.textContent = '3';
            }
            break;
        case 2:
            if (document.getElementById('answerP2-a').checked) {
                saveToDB("a", 47);
            } else if (document.getElementById('answerP2-b').checked) {
                saveToDB("b", 47);
            } else if (document.getElementById('answerP2-c').checked) {
                saveToDB("c", 47);
            } else if (document.getElementById('answerP2-d').checked) {
                saveToDB("d", 47);
            } else if (document.getElementById('answerP2-e').checked) {
                saveToDB("e", 47);
            } else {
                document.getElementById('p2').className += ' invalid';
                valid = false;
            }

            // go to p3
            if (valid) {
                nextBtn.setAttribute('onclick', 'preTest(3)');
                sisaPertanyaan.textContent = '2';
            }
            break;
        case 3:
            if (document.getElementById('answerP3').value != '') {
                saveToDB(document.getElementById('answerP3').value, 48);
            } else {
                document.getElementById('p3').className += ' invalid';
                valid = false;
            }

            // go to p4
            if (valid) {
                nextBtn.value = 'Simpan';
                nextBtn.setAttribute('onclick', 'preTest(4)');
                sisaPertanyaan.textContent = '1';
            }
            break;
        case 4:
            if (document.getElementById('answerP4').value != '') {
                saveToDB(document.getElementById('answerP4').value, 8);
                if (document.getElementById('pC').value != '') {
                    saveToDB(document.getElementById('pC').value, 81);
                }
                if (document.getElementById('lastpC').value != '') {
                    saveToDB(document.getElementById('lastpC').value, 82);
                }
            } else {
                document.getElementById('p4').className += ' invalid';
                valid = false;
            }

            // go to SUBMIT
            if (valid) {
                saveToDB('finish', 0);
                // FINISH Pre-test
                submitPretest();
            }
            break;
    }

    if (valid) nextForm(1);

    return valid;
}

/**
 * soal pretest yang sudah dijawab dan tersimpan dalam DB, tidak dapat diakses lagi (tidak bisa dijawab lagi).
 * TODO: SELECT id_responden FROM responden WHERE kode_unik = $_SESSION['kode_unik']
 * SELECT 
 */