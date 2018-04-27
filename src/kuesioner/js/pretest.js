var pretest = [];

// initialisasi pertanyaan pretest
for (var i = 0; i < 14; i++) {
    pretest[i] = { 'html': '', 'enabled': '', 'answer': '' };
}

pretest[0].html = `
    <div id="p0" class="tab form-group">
        <div class="form-control" style="height: 100%">
            <p style="margin-bottom: 7pt;">Kapan terakhir Anda membuat kode program atau memprogram ?</p>
            <select name="p0" class="form-control" onchange="checkLastBahasaPem(this);" required>
                <option value="" selected disabled>Silahkan Pilih</option>
                <option value="today">Hari ini</option>
                <option value="yesterday">Kemarin</option>
                <option value="2past">2 hari yang lalu</option>
                <option value="3past">lebih dari 3 hari yang lalu</option>
                <option value="no">Belum pernah memprogram</option>
            </select>
        </div>
    </div>
`;
pretest[0].enabled = true;

pretest[1].html = `
    <div class="tab form-group">
        <div class="form-control" style="height: 100%">
            <p style="margin-bottom: 7pt;">Bahasa Pemrograman apa yang terakhir kali Anda gunakan ?</p>
            <select name="bahasaPem" class="form-control" onchange="checkRateBhsPem(this);">
                <option value="" selected disabled>Pilih Bahasa Pemrograman</option>
                <option value="ada">Ada</option>
                <option value="cpp">C/C++</option>
                <option value="go">Go Lang</option>
                <option value="java">Java</option>
                <option value="js">JavaScript</option>
                <option value="py">Python</option>
                <option value="rb">Ruby</option>
                <option value="no">Lainnya</option>
            </select>
        </div>
    </div>
`;
pretest[1].enabled = true;

pretest[2].html = `
    <div class="tab form-group">
        <div class="form-control" style="height: 100%">
            <p style="margin-bottom: 7pt;">Menurut penilaian Anda, secara keseluruhan berapa tingkat kemahiran Anda dalam memprogram C/C++ ?</p>
            <div class="row">
                <div class="col-md-12 col-xs-12 rating">
                    <input id="starRateTeoriGraf5" name="starRateTeoriGraf" type="radio" value="5" class="radio-btn hide" onclick="checkRateTeoriGraf(this);"/>
                    <label for="starRateTeoriGraf5">☆</label>
                    <input id="starRateTeoriGraf4" name="starRateTeoriGraf" type="radio" value="4" class="radio-btn hide" onclick="checkRateTeoriGraf(this);"/>
                    <label for="starRateTeoriGraf4">☆</label>
                    <input id="starRateTeoriGraf3" name="starRateTeoriGraf" type="radio" value="3" class="radio-btn hide" onclick="checkRateTeoriGraf(this);"/>
                    <label for="starRateTeoriGraf3">☆</label>
                    <input id="starRateTeoriGraf2" name="starRateTeoriGraf" type="radio" value="2" class="radio-btn hide" onclick="checkRateTeoriGraf(this);"/>
                    <label for="starRateTeoriGraf2">☆</label>
                    <input id="starRateTeoriGraf1" name="starRateTeoriGraf" type="radio" value="1" class="radio-btn hide" onclick="checkRateTeoriGraf(this);"/>
                    <label for="starRateTeoriGraf1">☆</label>
                    <div class="clear"></div>
                </div>
            </div>
        </div>
    </div>
`;
pretest[2].enabled = true;

pretest[3].html = `
    <div class="tab form-group">
        <div class="form-control" style="height: 100%">
            <p style="margin-bottom: 7pt;">Menurut penilaian Anda, secara keseluruhan berapa tingkat kemahiran Anda dalam memprogram {{bahasa yang dipilih}} ?</p>
            <div class="row">
                <div class="col-md-12 col-xs-12 rating">
                    <input id="starRateTeoriGraf5" name="starRateTeoriGraf" type="radio" value="5" class="radio-btn hide" onclick="checkRateTeoriGraf(this);"/>
                    <label for="starRateTeoriGraf5">☆</label>
                    <input id="starRateTeoriGraf4" name="starRateTeoriGraf" type="radio" value="4" class="radio-btn hide" onclick="checkRateTeoriGraf(this);"/>
                    <label for="starRateTeoriGraf4">☆</label>
                    <input id="starRateTeoriGraf3" name="starRateTeoriGraf" type="radio" value="3" class="radio-btn hide" onclick="checkRateTeoriGraf(this);"/>
                    <label for="starRateTeoriGraf3">☆</label>
                    <input id="starRateTeoriGraf2" name="starRateTeoriGraf" type="radio" value="2" class="radio-btn hide" onclick="checkRateTeoriGraf(this);"/>
                    <label for="starRateTeoriGraf2">☆</label>
                    <input id="starRateTeoriGraf1" name="starRateTeoriGraf" type="radio" value="1" class="radio-btn hide" onclick="checkRateTeoriGraf(this);"/>
                    <label for="starRateTeoriGraf1">☆</label>
                    <div class="clear"></div>
                </div>
            </div>
        </div>
    </div>
`;
pretest[3].enabled = true;

pretest[4].html = `
    <div class="tab form-group">
        <div class="form-control" style="height: 100%">
            <p style="margin-bottom: 7pt;">Apakah Anda pernah belajar Pemrograman Struktur Data ? (seperti penggunaan <i>Array</i>, <i>Struct</i>, atau <i>Pointer</i>).</p>
            <div class="row">
                <div class="col-md-1 col-xs-1" style="padding:0;margin-left:13px;padding-left:13px;"><input style="display: block;width: 100%;height: 23px;" name="pemGraf" value="y" type="radio" required onclick="showFormEverCodeStrukturData(this);"></div>
                <div class="col-md-10 col-xs-10" style="padding-left:0;">Ya, Pernah</div>
            </div>
            <div class="row">
                <div class="col-md-1 col-xs-1" style="padding:0;margin-left:13px;padding-left:13px;"><input style="display: block;width: 100%;height: 23px;" name="pemGraf" value="t" type="radio" required onclick="showFormEverCodeStrukturData(this);"></div>
                <div class="col-md-10 col-xs-10" style="padding-left:0;">Tidak Pernah</div>
            </div>
            <div class="row">
                <div class="col-md-1 col-xs-1" style="padding:0;margin-left:13px;padding-left:13px;"><input style="display: block;width: 100%;height: 23px;" name="pemGraf" value="n" type="radio" required onclick="showFormEverCodeStrukturData(this);"></div>
                <div class="col-md-10 col-xs-10" style="padding-left:0;">Lupa/Tidak Tahu</div>
            </div>
        </div>
    </div>
`;
pretest[4].enabled = true;

pretest[5].html = `
    <div class="tab form-group">
        <div class="form-control" style="height: 100%">
            <p style="margin-bottom: 7pt;">Kapan terakhir Anda membuat kode program struktur data ?</p>
            <select name="p5" class="form-control">
                <option value="" selected disabled>Silahkan Pilih</option>
                <option value="today">Hari ini</option>
                <option value="yesterday">Kemarin</option>
                <option value="2past">2 hari yang lalu</option>
                <option value="3past">lebih dari 3 hari yang lalu</option>
            </select>
        </div>
    </div>
`;
pretest[5].enabled = true;

pretest[6].html = `
    <div class="tab form-group">
        <div class="form-control" style="height: 100%">
            <p style="margin-bottom: 7pt;">Kode program tentang apa yang Anda buat ?</p>
            <textarea class="form-control" name="p6"></textarea>
        </div>
    </div>
`;
pretest[6].enabled = true;

pretest[7].html = `
    <div class="tab form-group">
        <div class="form-control" style="height: 100%">
            <p style="margin-bottom: 7pt;">Apakah Anda pernah belajar <b>teori</b> tentang Struktur Data Graf ?</p>
            <div class="row">
                <div class="col-md-1 col-xs-1" style="padding:0;margin-left:13px;padding-left:13px;"><input style="display: block;width: 100%;height: 23px;" name="graf" value="y" type="radio" required onclick="checkLastTeoriGraf(this);"></div>
                <div class="col-md-10 col-xs-10" style="padding-left:0;">Ya, Pernah</div>
            </div>
            <div class="row">
                <div class="col-md-1 col-xs-1" style="padding:0;margin-left:13px;padding-left:13px;"><input style="display: block;width: 100%;height: 23px;" name="graf" value="t" type="radio" required onclick="checkLastTeoriGraf(this);"></div>
                <div class="col-md-10 col-xs-10" style="padding-left:0;">Tidak Pernah</div>
            </div>
            <div class="row">
                <div class="col-md-1 col-xs-1" style="padding:0;margin-left:13px;padding-left:13px;"><input style="display: block;width: 100%;height: 23px;" name="graf" value="n" type="radio" required onclick="checkLastTeoriGraf(this);"></div>
                <div class="col-md-10 col-xs-10" style="padding-left:0;">Lupa/Tidak Tahu</div>
            </div>
        </div>
    </div>
`;
pretest[7].enabled = true;

pretest[8].html = `
    <div class="tab form-group">
        <div class="form-control" style="height: 100%">
            <p style="margin-bottom: 7pt;">Kapan terakhir Anda belajar teori tentang Struktur Data Graf ?</p>
            <select name="lastTeoriGraf" class="form-control">
                <option value="" selected disabled>Silahkan Pilih</option>
                <option value="today">Hari ini</option>
                <option value="yesterday">Kemarin</option>
                <option value="2past">2 hari yang lalu</option>
                <option value="3past">lebih dari 3 hari yang lalu</option>
            </select>
        </div>
    </div>
`;
pretest[8].enabled = true;

pretest[9].html = `
    <div class="tab form-group">
        <div class="form-control" style="height: 100%">
            <p style="margin-bottom: 7pt;">Teori Graf apa saja yang pernah Anda pelajari ?</p>
            <textarea class="form-control" name="p9"></textarea>
        </div>
    </div>
`;
pretest[9].enabled = true;

pretest[10].html = `
    <div class="tab form-group">
        <div class="form-control" style="height: 100%">
            <p style="margin-bottom: 7pt;">Di antara semua teori tersebut, mana yang paling Anda paham ?</p>
            <textarea class="form-control" name="p10"></textarea>
        </div>
    </div>
`;
pretest[10].enabled = true;

pretest[11].html = `
    <div class="tab form-group">
        <div class="form-control" style="height: 100%">
            <p style="margin-bottom: 7pt;">Di antara semua teori tersebut, mana yang paling Anda tidak paham ?</p>
            <textarea class="form-control" name="p11"></textarea>
        </div>
    </div>
`;
pretest[11].enabled = true;

pretest[12].html = `
    <div class="tab form-group">
        <div class="form-control" style="height: 100%">
            <p style="margin-bottom: 7pt;">Menurut penilaian Anda, berapa tingkat pemahaman Anda tentang teori graf secara keseluruhan ?</p>
            <div class="row">
                <div class="col-md-12 col-xs-12 rating">
                    <input id="starRateTeoriGraf5" name="starRateTeoriGraf" type="radio" value="5" class="radio-btn hide" onclick="checkRateTeoriGraf(this);"/>
                    <label for="starRateTeoriGraf5">☆</label>
                    <input id="starRateTeoriGraf4" name="starRateTeoriGraf" type="radio" value="4" class="radio-btn hide" onclick="checkRateTeoriGraf(this);"/>
                    <label for="starRateTeoriGraf4">☆</label>
                    <input id="starRateTeoriGraf3" name="starRateTeoriGraf" type="radio" value="3" class="radio-btn hide" onclick="checkRateTeoriGraf(this);"/>
                    <label for="starRateTeoriGraf3">☆</label>
                    <input id="starRateTeoriGraf2" name="starRateTeoriGraf" type="radio" value="2" class="radio-btn hide" onclick="checkRateTeoriGraf(this);"/>
                    <label for="starRateTeoriGraf2">☆</label>
                    <input id="starRateTeoriGraf1" name="starRateTeoriGraf" type="radio" value="1" class="radio-btn hide" onclick="checkRateTeoriGraf(this);"/>
                    <label for="starRateTeoriGraf1">☆</label>
                    <div class="clear"></div>
                </div>
            </div>
        </div>
    </div>
`;
pretest[12].enabled = true;

pretest[13].html = `
    <div class="tab form-group">
        <div class="form-control" style="height: 100%">
            <p style="margin-bottom: 7pt;">Mohon jelaskan dengan rinci mengapa Anda merasa kurang dalam memahami teori graf ? Bagian mana yang menjadi kesulitan ?</p>
            <textarea class="form-control" name="p13"></textarea>
        </div>
    </div>
`;
pretest[13].enabled = true;

/**
 * Fungsi untuk tab pertanyaan
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
    //... and run a function that will display the correct step indicator:
    //fixStepIndicator(n)
}

function nextForm(n) {
    // This function will figure out which tab to display
    var x = document.getElementsByClassName("tab");
    document.getElementById("sisaPertanyaan").innerHTML = 'Sisa Pertanyaan: <b>' + x.length + '</b>';
    // Exit the function if any field in the current tab is invalid:
    if (n == 1 && !validateForm()) return false;
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
    // If the valid status is true, mark the step as finished and valid:
    if (valid) {
        //document.getElementsByClassName("step")[currentTab].className += " finish";
    }
    return valid; // return the valid status
}

function fixStepIndicator(n) {
    // This function removes the "active" class of all steps...
    var i, x = document.getElementsByClassName("step");
    for (i = 0; i < x.length; i++) {
        x[i].className = x[i].className.replace(" active", "");
    }
    //... and adds the "active" class on the current step:
    x[n].className += " active";
}

function checkLastBahasaPem(e) {
    var lastBhsPem = e.value;

    if (lastBhsPem !== 'no' && lastBhsPem !== '') {
        document.getElementById('bahasaPem').style.display = 'block';

        var titleBahasaPem = document.getElementById('titleBahasaPem');
        var title = 'Bahasa Pemrograman apa yang terakhir kali Anda gunakan ';

        if (lastBhsPem === 'today') {
            titleBahasaPem.textContent = title + 'hari ini ?';
        } else if (lastBhsPem === 'yesterday') {
            titleBahasaPem.textContent = title + 'kemarin ?';
        } else if (lastBhsPem === '2past') {
            titleBahasaPem.textContent = title + '2 hari yang lalu ?';
        } else if (lastBhsPem === '3past') {
            titleBahasaPem.textContent = title + 'lebih dari 3 hari yang lalu ?';
        }

    } else {
        document.getElementById('bahasaPem').style.display = 'none';
    }
}

function checkRateBhsPem(e) {
    var bahasa = e.value;
    var isCpp = false;

    if (bahasa !== 'no' && bahasa !== '') {
        document.getElementById('ratePem').style.display = 'block';
        var titleRateBhs = document.getElementById('titleRateBhs');
        var title = 'Menurut penilaian Anda, secara keseluruhan berapa tingkat kemahiran Anda dalam memprogram menggunakan bahasa ';

        if (bahasa === 'ada') {
            title = title + '<b>Ada</b> ?';
        } else if (bahasa === 'cpp') {
            isCpp = true;
            title = title + '<b>C/C++</b> ?';
        } else if (bahasa === 'go') {
            title = title + '<b>Go Lang</b> ?';
        } else if (bahasa === 'java') {
            title = title + '<b>Java</b> ?';
        } else if (bahasa === 'js') {
            title = title + '<b>JavaScript</b> ?';
        } else if (bahasa === 'py') {
            title = title + '<b>Python</b> ?';
        } else if (bahasa === 'rb') {
            title = title + '<b>Ruby</b> ?';
        }

        titleRateBhs.innerHTML = title;

        if (!isCpp) {
            document.getElementById('ratePemCpp').style.display = 'block';
        } else {
            document.getElementById('ratePemCpp').style.display = 'none';
        }

    } else {
        document.getElementById('ratePem').style.display = 'none';
    }
}

function checkLastTeoriGraf(e) {
    if (e.value === 'y') {
        document.getElementById('formLastTeoriGraf').style.display = 'block';
        document.getElementById('formRateTeoriGraf').style.display = 'block';
        document.getElementById('formTentangTeoriGraf').style.display = 'block';
    } else {
        document.getElementById('formLastTeoriGraf').style.display = 'none';
        document.getElementById('formRateTeoriGraf').style.display = 'none';
        document.getElementById('formTentangTeoriGraf').style.display = 'none';
    }
}

function checkRateTeoriGraf(e) {
    if (e.value === '5') {
        document.getElementById('formRinciTeoriGraf').style.display = 'none';
    } else {
        document.getElementById('formRinciTeoriGraf').style.display = 'block';
    }
}

function showFormEverCodeStrukturData(e) {
    if (e.value === 'y') {
        document.getElementById('formEverCodeStrukturData').style.display = 'block';
    } else {
        document.getElementById('formEverCodeStrukturData').style.display = 'none';
        document.getElementById('formLastPemStrukturData').style.display = 'none';
        document.getElementById('formWhatCode').style.display = 'none';
    }
}

function showFormLastPemStrukData(e) {
    if (e.value === 'y') {
        document.getElementById('formLastPemStrukturData').style.display = 'block';
        document.getElementById('formWhatCode').style.display = 'block';
    } else {
        document.getElementById('formLastPemStrukturData').style.display = 'none';
        document.getElementById('formWhatCode').style.display = 'none';
    }
}

var formPretest = document.getElementById('formPreTest');
/*formPretest.innerHTML = '';
for (var i = 0; i < pretest.length; i++) {
    formPretest.innerHTML += pretest[i].html;
}*/

/**
 * 
 * @param {*pertanyaan saat ini} currentQuestion 
 * @param {*jawaban dari pertanyaan saat ini untuk diproses pada pertanyaan berikutnya} answer 
 */
function preTest(currentQuestion, nextQuestion, answer, nextBtn) {

    switch (currentQuestion) {
        case 1:
            var lastBhsPem = answer.value;

            if (lastBhsPem !== 'no' && lastBhsPem !== '') {
                nextQuestion = 1;

                var title = 'Bahasa Pemrograman apa yang terakhir kali Anda gunakan ';

                if (lastBhsPem === 'today') {
                    title += 'hari ini ?';
                } else if (lastBhsPem === 'yesterday') {
                    title += 'kemarin ?';
                } else if (lastBhsPem === '2past') {
                    title += '2 hari yang lalu ?';
                } else if (lastBhsPem === '3past') {
                    title += 'lebih dari 3 hari yang lalu ?';
                }

                var pretest1 = `
                    <div class="tab form-group">
                        <div class="form-control" style="height: 100%">
                            <p style="margin-bottom: 7pt;">` + title + `</p>
                            <select name="bahasaPem" class="form-control" onchange="preTest(1, this, false);">
                                <option value="" selected disabled>Pilih Bahasa Pemrograman</option>
                                <option value="ada">Ada</option>
                                <option value="cpp">C/C++</option>
                                <option value="go">Go Lang</option>
                                <option value="java">Java</option>
                                <option value="js">JavaScript</option>
                                <option value="py">Python</option>
                                <option value="rb">Ruby</option>
                                <option value="no">Lainnya</option>
                            </select>
                        </div>
                    </div>`;

                formPretest.innerHTML += pretest1;

            } else {
                nextQuestion = 3;
            }
            break;
        case 2:

            break;
        case 3:

            break;
        case 4:

            break;
        case 5:

            break;
        case 6:

            break;
        case 7:

            break;
        case 8:

            break;
        case 9:

            break;
        case 10:

            break;
        case 11:

            break;
        case 12:

            break;
        case 13:

            break;
        case 14:

            break;
        default:
            break;
    }

    // jika tombol button LANJUT di klik
    if (nextBtn) nextForm(1);
    answer = 'answer' + nextQuestion;
    document.getElementById("nextBtn").setAttribute('onclick', 'preTest(nextQuestion,' + answer + ', true)');
}