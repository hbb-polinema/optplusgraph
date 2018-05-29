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

function submitPostTest(){
    document.getElementById("formPostTest").submit();
}

/**
 * 
 * @param {*pertanyaan saat ini} currentQuestion
 */
function postTest(currentQuestion) {
    var valid = true;
    var nextBtn = document.getElementById('nextBtn');
    var sisaPertanyaan = document.getElementById("sisaPertanyaan");

    switch (currentQuestion) {
        case 0:
            var answerP0 = document.getElementById('answerP0').value;

            if (answerP0.length > 10){
                // go to p1
                nextBtn.setAttribute('onclick','postTest(1)');
                sisaPertanyaan.textContent = '11';
            } else if (answerP0.length == 0 || answerP0.length < 10){
                document.getElementById('p0').className += ' invalid';
                valid = false;
            }
            break;
        case 1:
            var answerP1 = document.getElementById('answerP1').value;

            if (answerP1 !== '') {
                if (answerP1 == 'y') {
                    // y --> go to P2
                    nextBtn.setAttribute('onclick', 'postTest(2)');
                    sisaPertanyaan.textContent = '10';
                } else if (answerP1 == 't' || answerP1 == 'n') {
                    // t or n --> go to P4
                    var p = document.getElementById('p2');
                    p.parentNode.removeChild(p);
                    p = document.getElementById('p3');
                    p.parentNode.removeChild(p);
                    nextBtn.setAttribute('onclick', 'postTest(4)');
                    sisaPertanyaan.textContent = '9';
                }
            } else if (answerP1 == '') {
                document.getElementById('p1').className += ' invalid';
                valid = false;
            }
            break;
        case 2:
            if(document.getElementById('answerP2').value != ''){
                // valid = true
            } else {
                document.getElementById('p2').className += ' invalid';
                valid = false;
            }

            // go to p3
            if(valid){
                nextBtn.setAttribute('onclick', 'postTest(3)');
                sisaPertanyaan.textContent = '9';
            }
            break;
        case 3:
            if (document.getElementById('answerP3-five').checked){
                // valid = true
            } else if (document.getElementById('answerP3-four').checked){
                // valid = true
            } else if (document.getElementById('answerP3-three').checked){
                // valid = true
            } else if (document.getElementById('answerP3-two').checked){
                // valid = true
            } else if (document.getElementById('answerP3-one').checked){
                // valid = true
            } else {
                document.getElementById('p3').className += ' invalid';
                valid = false;
            }

            // go to p4
            if (valid) {
                nextBtn.setAttribute('onclick', 'postTest(4)');
                sisaPertanyaan.textContent = '8';
            }
            break;
        case 4:
            var answerP4 = document.getElementById('answerP4').value;

            if (answerP4 !== '') {
                if (answerP4 == 'y') {
                    // y --> go to P5
                    nextBtn.setAttribute('onclick', 'postTest(5)');
                    sisaPertanyaan.textContent = '8';
                } else if (answerP4 == 't' || answerP4 == 'n') {
                    // t or n --> go to P7
                    var p = document.getElementById('p5');
                    p.parentNode.removeChild(p);
                    
                    nextBtn.setAttribute('onclick', 'postTest(6)');
                    sisaPertanyaan.textContent = '7';
                }
            } else if (answerP4 == '') {
                document.getElementById('p4').className += ' invalid';
                valid = false;
            }
            break;
        case 5:
            var answerP5 = document.getElementById('answerP5').value;

            if (answerP5 !== '') {
                // go to p6
                nextBtn.setAttribute('onclick','postTest(6)');
                sisaPertanyaan.textContent = '7';

            } else if(answerP5 == ''){ // validate form if blank
                document.getElementById('p5').className += ' invalid';
                valid = false;
            }
            break;
        case 6:
            var answerP6 = document.getElementById('answerP6').value;

            if (answerP6 != ''){
                // go to p7
                nextBtn.setAttribute('onclick','postTest(7)');
                sisaPertanyaan.textContent = '6';
            } else if (answerP6 == ''){
                document.getElementById('p6').className += ' invalid';
                valid = false;
            }
            break;
        case 7:
            var answerP7 = document.getElementById('answerP7').value;

            if (answerP7 !== '' && answerP7.length > 5) {
                // go to p7
                nextBtn.setAttribute('onclick','postTest(8)');
                sisaPertanyaan.textContent = '5';
            } else if (answerP7 == '' || answerP7.length < 5) {
                document.getElementById('p7').className += ' invalid';
                valid = false;
            }
            break;
        case 8:
            var answerP8 = document.getElementById('answerP8').value;

            if (answerP8 !== '') {
                // go to p9
                nextBtn.setAttribute('onclick', 'postTest(9)');
                sisaPertanyaan.textContent = '5';
            } else if (answerP8 == '') { // validate form if blank
                document.getElementById('p8').className += ' invalid';
                valid = false;
            }
            break;
        case 9:
            if (document.getElementById('answerP9-five').checked){
                // valid = true
            } else if (document.getElementById('answerP9-four').checked){
                // valid = true
            } else if (document.getElementById('answerP9-three').checked){
                // valid = true
            } else if (document.getElementById('answerP9-two').checked){
                // valid = true
            } else if (document.getElementById('answerP9-one').checked){
                // valid = true
            } else {
                document.getElementById('p9').className += ' invalid';
                valid = false;
            }

            // go to p10
            if (valid) {
                nextBtn.setAttribute('onclick', 'postTest(10)');
                sisaPertanyaan.textContent = '4';
            }
            break;
        case 10:
            var answerP10 = document.getElementById('answerP10').value;

            if (answerP10 !== '') {
                if (answerP10 == 'y') {
                    // y --> go to p11
                    var p = document.getElementById('p12'); // remove p12
                    p.parentNode.removeChild(p);
                    nextBtn.value = 'Simpan';
                    nextBtn.setAttribute('onclick', 'postTest(11)');
                    sisaPertanyaan.textContent = '0';
                } else if (answerP10 == 't' || answerP10 == 'n') {
                    // t or n --> go to p12
                    var p = document.getElementById('p11'); // remove p11
                    p.parentNode.removeChild(p);
                    nextBtn.value = 'Simpan';
                    nextBtn.setAttribute('onclick', 'postTest(12)');
                    sisaPertanyaan.textContent = '0';
                }
            } else if (answerP10 == '') {
                document.getElementById('p10').className += ' invalid';
                valid = false;
            }
            break;
        case 11:
            var answerP11 = document.getElementById('answerP11').value;

            if (answerP11.length > 10) {
                // FINISH            
                submitPostTest();
            } else if (answerP11.length == 0 || answerP11.length < 10) {
                document.getElementById('p11').className += ' invalid';
                valid = false;
            }
            break;
        case 12:
            var answerP12 = document.getElementById('answerP12').value;

            if (answerP12.length > 10) {
                // FINISH            
                submitPostTest();
            } else if (answerP12.length == 0 || answerP12.length < 10) {
                document.getElementById('p12').className += ' invalid';
                valid = false;
            }
            break;
    }

    if(valid) nextForm(1);
    
    return valid;
}