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
        document.getElementById("formPostTest").submit();
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

function submitPostTest() {
    document.getElementById("formPostTest").submit();
}

/**
 * 
 * @param {soal saat ini} currentQuestion
 */
function postTest(currentQuestion) {
    var valid = true;
    var nextBtn = document.getElementById('nextBtn');
    var sisaSoal = document.getElementById("sisaSoal");

    switch (currentQuestion) {
        case 1:
            if (document.getElementById('answerP1').value != '') {
                // valid = true
            } else {
                document.getElementById('p1').className += ' invalid';
                valid = false;
            }

            // go to p2
            if (valid) {
                nextBtn.setAttribute('onclick', 'postTest(2)');
                sisaSoal.textContent = '3';
            }
            break;
        case 2:
            if (document.getElementById('answerP2').value != '') {
                // valid = true
            } else {
                document.getElementById('p2').className += ' invalid';
                valid = false;
            }

            // go to p3
            if (valid) {
                nextBtn.setAttribute('onclick', 'postTest(3)');
                sisaSoal.textContent = '2';
            }
            break;
        case 3:
            if (document.getElementById('answerP3').value != '') {
                // valid = true
            } else {
                document.getElementById('p3').className += ' invalid';
                valid = false;
            }

            // go to p3
            if (valid) {
                nextBtn.value = 'Simpan';
                nextBtn.setAttribute('onclick', 'postTest(4)');
                sisaSoal.textContent = '1';
            }
            break;
        case 4:
            if (document.getElementById('answerP4').value != '') {
                // valid = true
            } else {
                document.getElementById('p4').className += ' invalid';
                valid = false;
            }

            // go to SUBMIT
            if (valid) {
                // FINISH Post-Test
                submitPostTest();
            }
            break;
    }

    if (valid) nextForm(1);

    return valid;
}