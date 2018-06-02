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
                sisaPertanyaan.textContent = '7';
            }
            break;
        case 2:
            if (document.getElementById('answerP2-a').checked) {
                saveToDB("a", 2);
            } else if (document.getElementById('answerP2-b').checked) {
                saveToDB("b", 2);
            } else if (document.getElementById('answerP2-c').checked) {
                saveToDB("c", 2);
            } else if (document.getElementById('answerP2-d').checked) {
                saveToDB("d", 2);
            } else if (document.getElementById('answerP2-e').checked) {
                saveToDB("e", 2);
            } else {
                document.getElementById('p2').className += ' invalid';
                valid = false;
            }

            // go to p3
            if (valid) {
                nextBtn.setAttribute('onclick', 'preTest(3)');
                sisaPertanyaan.textContent = '6';
            }
            break;
        case 3:
            if (document.getElementById('answerP3-a').checked) {
                saveToDB("a", 3);
            } else if (document.getElementById('answerP3-b').checked) {
                saveToDB("b", 3);
            } else if (document.getElementById('answerP3-c').checked) {
                saveToDB("c", 3);
            } else if (document.getElementById('answerP3-d').checked) {
                saveToDB("d", 3);
            } else if (document.getElementById('answerP3-e').checked) {
                saveToDB("e", 3);
            } else {
                document.getElementById('p3').className += ' invalid';
                valid = false;
            }

            // go to p4
            if (valid) {
                nextBtn.setAttribute('onclick', 'preTest(4)');
                sisaPertanyaan.textContent = '5';
            }
            break;
        case 4:
            if (document.getElementById('answerP4-a').checked) {
                saveToDB("a", 4);
            } else if (document.getElementById('answerP4-b').checked) {
                saveToDB("b", 4);
            } else if (document.getElementById('answerP4-c').checked) {
                saveToDB("c", 4);
            } else if (document.getElementById('answerP4-d').checked) {
                saveToDB("d", 4);
            } else if (document.getElementById('answerP4-e').checked) {
                saveToDB("e", 4);
            } else {
                document.getElementById('p4').className += ' invalid';
                valid = false;
            }

            // go to p5
            if (valid) {
                nextBtn.setAttribute('onclick', 'preTest(5)');
                sisaPertanyaan.textContent = '4';
            }
            break;
        case 5:
            if (document.getElementById('answerP5').value != '') {
                saveToDB(document.getElementById('answerP5').value, 5);
            } else {
                document.getElementById('p5').className += ' invalid';
                valid = false;
            }

            // go to p6
            if (valid) {
                nextBtn.setAttribute('onclick', 'preTest(6)');
                sisaPertanyaan.textContent = '3';
            }
            break;
        case 6:
            if (document.getElementById('answerP6').value != '') {
                saveToDB(document.getElementById('answerP6').value, 6);
            } else {
                document.getElementById('p6').className += ' invalid';
                valid = false;
            }

            // go to p7
            if (valid) {
                nextBtn.setAttribute('onclick', 'preTest(7)');
                sisaPertanyaan.textContent = '2';
            }
            break;
        case 7:
            if (document.getElementById('answerP7').value != '') {
                saveToDB(document.getElementById('answerP7').value, 7);
            } else {
                document.getElementById('p7').className += ' invalid';
                valid = false;
            }

            // go to p8
            if (valid) {
                nextBtn.value = 'Simpan';
                nextBtn.setAttribute('onclick', 'preTest(8)');
                sisaPertanyaan.textContent = '1';
            }
            break;
        case 8:
            if (document.getElementById('answerP8').value != '') {
                saveToDB(document.getElementById('answerP8').value, 8);
                if (document.getElementById('pC').value != '') {
                    saveToDB(document.getElementById('pC').value, 81);
                }
                if (document.getElementById('lastpC').value != '') {
                    saveToDB(document.getElementById('lastpC').value, 82);
                }
            } else {
                document.getElementById('p8').className += ' invalid';
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