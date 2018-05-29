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

function checkAnswerP7(val){
    var nextBtn = document.getElementById('nextBtn');
    var sisaPertanyaan = document.getElementById('sisaPertanyaan');
    var answerP7 = val.value;

    if(answerP7 !== ''){
        if(answerP7 == 'y'){
            sisaPertanyaan.textContent = '6';
            nextBtn.value = 'Lanjut';
            nextBtn.setAttribute('onclick', 'preTest(7)');
        } else if (answerP7 == 't' || answerP7 == 'n'){
            sisaPertanyaan.textContent = '0';
            nextBtn.value = 'Simpan';
            nextBtn.setAttribute('onclick', 'submitPretest()');
        }
    }
}

function checkAnswerP12(val){
    var nextBtn = document.getElementById('nextBtn');
    var sisaPertanyaan = document.getElementById('sisaPertanyaan');

    if (document.getElementById('answerP12-five').checked) {
        // go to FINISH
        sisaPertanyaan.textContent = '0';
        nextBtn.value = 'Simpan';
        nextBtn.setAttribute('onclick', 'submitPretest()');
    } else {
        // go to P13
        sisaPertanyaan.textContent = '1';
        nextBtn.value = 'Lanjut';
        nextBtn.setAttribute('onclick', 'preTest(12)');
    }
}

function submitPretest(){
    document.getElementById("formPreTest").submit();
}

function clearInvalid(i){
    var P = document.getElementById('p'+i);
    P.className = P.className.replace('invalid','');
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
        case 0:
            var answerP0 = document.getElementById('answerP0').value;

            if (answerP0 !== 'no' && answerP0 !== '') {
                var title = 'Bahasa Pemrograman apa yang terakhir kali Anda gunakan ';
                var p1title = document.getElementById('p1title');

                if (answerP0 === 'today') {
                    title += '<b>hari ini</b> ?';
                    p1title.innerHTML = title;
                } else if (answerP0 === 'yesterday') {
                    title += '<b>kemarin</b> ?';
                    p1title.innerHTML = title;
                } else if (answerP0 === '2past') {
                    title += '<b>2 hari yang lalu</b> ?';
                    p1title.innerHTML = title;
                } else if (answerP0 === '3past') {
                    title += '<b>lebih dari 3 hari yang lalu</b> ?';
                    p1title.innerHTML = title;
                }
                // go to p1
                sisaPertanyaan.textContent = "13";
                nextBtn.setAttribute('onclick','preTest(1)');

            } else if(answerP0 == 'no') {
                // remove p1 - p6
                for(var i = 1; i <= 6; i++){
                    var p = document.getElementById('p'+i);
                    p.parentNode.removeChild(p);
                }
                // go to p7
                sisaPertanyaan.textContent = '7';
                nextBtn.setAttribute('onclick','preTest(7)');
            } else if(answerP0 == ''){ // validate form if blank
                document.getElementById('p0').className += ' invalid';
                valid = false;
            }
            break;
        case 1:
            var answerP1 = document.getElementById('answerP1').value;

            if (answerP1 !== 'no' && answerP1 !== '') {
                var title = 'Menurut penilaian Anda, secara keseluruhan berapa tingkat kemahiran Anda dalam memprogram menggunakan bahasa ';
                var p2title = document.getElementById('p2title');
                var goToP2 = true;

                if (answerP1 === 'ada') {
                    title += '<b>Ada</b> ?';
                    p2title.innerHTML = title;
                } else if (answerP1 === 'cpp') {
                    var p2 = document.getElementById('p2');
                    p2.parentNode.removeChild(p2);
                    // go to p3
                    nextBtn.setAttribute('onclick', 'preTest(3)');
                    sisaPertanyaan.textContent = '11';
                    goToP2 = false;
                } else if (answerP1 === 'go') {
                    title += '<b>Go</b> ?';
                    p2title.innerHTML = title;
                } else if (answerP1 === 'java') {
                    title += '<b>Java</b> ?';
                    p2title.innerHTML = title;
                } else if (answerP1 === 'js') {
                    title += '<b>JavaScript</b> ?';
                    p2title.innerHTML = title;
                } else if (answerP1 === 'py') {
                    title += '<b>Python</b> ?';
                    p2title.innerHTML = title;
                } else if (answerP1 === 'rb') {
                    title += '<b>Ruby</b> ?';
                    p2title.innerHTML = title;
                }
                
                if (goToP2){
                    // go to p2
                    nextBtn.setAttribute('onclick', 'preTest(2)');
                    sisaPertanyaan.textContent = '11';
                }
                
            } else if(answerP1 == 'no') {
                // remove p1 - p6
                for(var i = 1; i <= 6; i++){
                    var p = document.getElementById('p'+i);
                    p.parentNode.removeChild(p);
                }
                // go to p7
                nextBtn.setAttribute('onclick','preTest(7)');
                sisaPertanyaan.textContent = '7';
            } else if(answerP1 == ''){ // validate form if blank
                document.getElementById('p1').className += ' invalid';
                valid = false;
            }
            break;
        case 2:
            if(document.getElementById('answerP2-five').checked){
                // valid = true
            } else if(document.getElementById('answerP2-four').checked){
                // valid = true
            } else if(document.getElementById('answerP2-three').checked){
                // valid = true
            } else if(document.getElementById('answerP2-two').checked){
                // valid = true
            } else if(document.getElementById('answerP2-one').checked){
                // valid = true
            } else {
                document.getElementById('p2').className += ' invalid';
                valid = false;
            }

            // go to p3
            if(valid){
                nextBtn.setAttribute('onclick', 'preTest(3)');
                sisaPertanyaan.textContent = '10';
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
                nextBtn.setAttribute('onclick', 'preTest(4)');
                sisaPertanyaan.textContent = '9';
            }
            break;
        case 4:
            var answerP4 = document.getElementById('answerP4').value;

            if (answerP4 !== '') {
                if (answerP4 == 'y') {
                    // y --> go to P5
                    nextBtn.setAttribute('onclick', 'preTest(5)');
                    sisaPertanyaan.textContent = '8';
                } else if (answerP4 == 't' || answerP4 == 'n') {
                    // t or n --> go to P7
                    var p = document.getElementById('p5');
                    p.parentNode.removeChild(p);
                    p = document.getElementById('p6');
                    p.parentNode.removeChild(p);
                    nextBtn.setAttribute('onclick', 'preTest(7)');
                    sisaPertanyaan.textContent = '7';
                }
            } else if (answerP4 == '') {
                document.getElementById('p4').className += ' invalid';
                valid = false;
            }
            break;
        case 5:
            var answerP5 = document.getElementById('answerP5').value;

            if (answerP5 !== 'no' && answerP5 !== '') {
                var title = 'Kode program <b>Struktur Data</b> tentang apa yang Anda buat ';
                var p1title = document.getElementById('p6title');

                if (answerP5 === 'today') {
                    title += '<b>hari ini</b> ?';
                    p1title.innerHTML = title;
                } else if (answerP5 === 'yesterday') {
                    title += '<b>kemarin</b> ?';
                    p1title.innerHTML = title;
                } else if (answerP5 === '2past') {
                    title += '<b>2 hari yang lalu</b> ?';
                    p1title.innerHTML = title;
                } else if (answerP5 === '3past') {
                    title += '<b>lebih dari 3 hari yang lalu</b> ?';
                    p1title.innerHTML = title;
                }
                // go to p6
                nextBtn.setAttribute('onclick','preTest(6)');
                sisaPertanyaan.textContent = '7';

            } else if(answerP5 == 'no') {
                // remove p6
                var p = document.getElementById('p6');
                    p.parentNode.removeChild(p);
                
                // go to p7
                nextBtn.setAttribute('onclick','preTest(7)');
                sisaPertanyaan.textContent = '7';
            } else if(answerP5 == ''){ // validate form if blank
                document.getElementById('p5').className += ' invalid';
                valid = false;
            }
            break;
        case 6:
            var answerP6 = document.getElementById('answerP6').value;

            if (answerP6.length > 10){
                // go to p7
                nextBtn.setAttribute('onclick','preTest(7)');
                sisaPertanyaan.textContent = '7';
            } else if (answerP6.length == 0 || answerP6.length < 10){
                document.getElementById('p6').className += ' invalid';
                valid = false;
            }
            break;
        case 7:
            var answerP7 = document.getElementById('answerP7').value;

            if (answerP7 !== '') {
                if (answerP7 == 'y') {
                    // y --> go to P8
                    nextBtn.setAttribute('onclick', 'preTest(8)');
                    sisaPertanyaan.textContent = '6';
                } else if (answerP7 == 't' || answerP7 == 'n') {
                    // remove p8 - p13
                    for (var i = 8; i <= 13; i++) {
                        var p = document.getElementById('p' + i);
                        p.parentNode.removeChild(p);
                    }
                    // go to submit btn or FINISH
                }
            } else if (answerP7 == '') {
                document.getElementById('p7').className += ' invalid';
                valid = false;
            }
            break;
        case 8:
            var answerP8 = document.getElementById('answerP8').value;

            if (answerP8 !== '') {
                // go to p9
                nextBtn.setAttribute('onclick', 'preTest(9)');
                sisaPertanyaan.textContent = '5';
            } else if (answerP8 == '') { // validate form if blank
                document.getElementById('p8').className += ' invalid';
                valid = false;
            }
            break;
        case 9:
            var answerP9 = document.getElementById('answerP9').value;

            if (answerP9.length > 10) {
                // go to p10
                nextBtn.setAttribute('onclick', 'preTest(10)');
                sisaPertanyaan.textContent = '4';
            } else if (answerP9.length == 0 || answerP9.length < 10) {
                document.getElementById('p9').className += ' invalid';
                valid = false;
            }
            break;
        case 10:
            var answerP10 = document.getElementById('answerP10').value;

            if (answerP10.length > 10) {
                // go to p11
                nextBtn.setAttribute('onclick', 'preTest(11)');
                sisaPertanyaan.textContent = '3';
            } else if (answerP10.length == 0 || answerP10.length < 10) {
                document.getElementById('p10').className += ' invalid';
                valid = false;
            }
            break;
        case 11:
            var answerP11 = document.getElementById('answerP11').value;

            if (answerP11.length > 10) {
                // go to p12
                nextBtn.setAttribute('onclick', 'preTest(12)');
                sisaPertanyaan.textContent = '2';
            } else if (answerP11.length == 0 || answerP11.length < 10) {
                document.getElementById('p11').className += ' invalid';
                valid = false;
            }
            break;
        case 12:
            if (document.getElementById('answerP12-five').checked){
                // go to FINISH
            } else if (document.getElementById('answerP12-four').checked){
                // valid = true
            } else if (document.getElementById('answerP12-three').checked){
                // valid = true
            } else if (document.getElementById('answerP12-two').checked){
                // valid = true
            } else if (document.getElementById('answerP12-one').checked){
                // valid = true
            } else {
                document.getElementById('p12').className += ' invalid';
                valid = false;
            }

            // go to p13
            if (valid) {
                sisaPertanyaan.textContent = '0';
                nextBtn.value = 'Simpan';
                nextBtn.setAttribute('onclick', 'preTest(13)');
            }
            break;
        case 13:
            var answerP13 = document.getElementById('answerP13').value;

            if (answerP13.length > 10) {
                // FINISH            
                submitPretest();
            } else if (answerP13.length == 0 || answerP13.length < 10) {
                document.getElementById('p13').className += ' invalid';
                valid = false;
            }
            break;
    }

    if(valid) nextForm(1);
    
    return valid;
}