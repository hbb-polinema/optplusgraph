var code = ace.edit("code");
code.setOptions({
    mode: "ace/mode/c_cpp",
    wrap: true,
    readOnly: true,
    useSoftTabs: true,
    minLines: 17,
    maxLines: 333,
    newLineMode: "unix",
    tabSize: 4,
    useWorker: false,
    foldStyle: "manual",
    showPrintMargin: false,
    behavioursEnabled: false
});

$(document).ready(function() {
    var divTimer = document.getElementById("timer");
    timer(5, 0, divTimer);
});

function saveToDB(jwb, id_soal) {
    var time = 'menit ' + _MIN + ':detik ' + _SEC;
    console.log(id_soal + ' jwb: ' + jwb + '-' + time);
    $.ajax({
        type: "POST",
        url: "ajax_request/post-test.php",
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
        url: "ajax_request/tahap.php",
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
function postTest(currentQuestion) {
    var valid = true;

    switch (currentQuestion) {
        case 1:
            if (document.getElementById('answerP1').value != '') {
                saveToDB(document.getElementById('answerP1').value, 27);
            } else {
                document.getElementById('p1').className += ' invalid';
                valid = false;
            }

            // go to SUBMIT
            if (valid) {
                // FINISH Post-Test, next to simulasi2
                saveToDB('finish', 0);
                alert('Post-tes 1 Berhasil disimpan!');
                window.location.href = 'simulasi2.php';
            }
            break;
    }

    return valid;
}

function checkAnswer(val) {
    var answer = val.value;

    if (answer != '') {
        document.getElementById('nextBtn').style.display = 'block';
    }
}