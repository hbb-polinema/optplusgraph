/**
 * Fungsi untuk tab pertanyaan
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
    document.getElementById("formPreTest").submit();
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

/**
 * 
 * @param {pertanyaan saat ini} currentQuestion
 */
function selesai(currentQuestion) {
    var valid = true;
    var nextBtn = document.getElementById('nextBtn');
    var sisaPertanyaan = document.getElementById("sisaPertanyaan");

    switch (currentQuestion) {
        case 1:
            if (document.getElementById('answerP1-a').checked) {
                // valid = true
            } else if (document.getElementById('answerP1-b').checked) {
                // valid = true
            } else if (document.getElementById('answerP1-c').checked) {
                // valid = true
            } else if (document.getElementById('answerP1-d').checked) {
                // valid = true
            } else if (document.getElementById('answerP1-e').checked) {
                // valid = true
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
                // valid = true
            } else if (document.getElementById('answerP2-b').checked) {
                // valid = true
            } else if (document.getElementById('answerP2-c').checked) {
                // valid = true
            } else if (document.getElementById('answerP2-d').checked) {
                // valid = true
            } else if (document.getElementById('answerP2-e').checked) {
                // valid = true
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
                // valid = true
            } else if (document.getElementById('answerP3-b').checked) {
                // valid = true
            } else if (document.getElementById('answerP3-c').checked) {
                // valid = true
            } else if (document.getElementById('answerP3-d').checked) {
                // valid = true
            } else if (document.getElementById('answerP3-e').checked) {
                // valid = true
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
                // valid = true
            } else if (document.getElementById('answerP4-b').checked) {
                // valid = true
            } else if (document.getElementById('answerP4-c').checked) {
                // valid = true
            } else if (document.getElementById('answerP4-d').checked) {
                // valid = true
            } else if (document.getElementById('answerP4-e').checked) {
                // valid = true
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
                // valid = true
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
                // valid = true
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
                // valid = true
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
                // valid = true
            } else {
                document.getElementById('p8').className += ' invalid';
                valid = false;
            }

            // go to SUBMIT
            if (valid) {
                // FINISH Pre-test
                submitPretest();
            }
            break;
    }

    if (valid) nextForm(1);

    return valid;
}