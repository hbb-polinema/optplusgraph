/*var code = ace.edit("editor-c");
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
});*/

function saveToDB(jwb, id_soal) {
    console.log(id_soal + ' jwb: ' + jwb);
    $.ajax({
        type: "POST",
        url: "ajax_request/latihan1.php",
        data: "id_soal=" + id_soal + "&jwb=" + jwb,
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
 * @param {soal sekarang} currentQuestion
 */
function latihan1NextBtn(currentQuestion) {
    var valid = true;
    var nextBtn = document.getElementById('nextBtn');

    var iframe = document.getElementById("OPT");
    var viz = iframe.contentWindow.document.getElementsById("vizLayoutTdSecond");

    switch (currentQuestion) {
        case 1:
            if (document.getElementById('answerP1').value != '') {
                if (viz != null) {
                    saveToDB(document.getElementById('answerP1').value, 49);
                } else {
                    valid = false;
                    console.log('viz: ' + viz);
                    alert("Silakan gunakan kakas OPT terlebih dahulu untuk menjawab soal!");
                }
            } else {
                document.getElementById('p1').className += ' invalid';
                valid = false;
            }

            // go to SUBMIT
            if (valid) {
                saveToDB("finish", 0);
                // FINISH Latihan 1
                alert('Jawaban Latihan 1 Berhasil Disimpan!');
                window.close();
            }
            break;
    }

    if (valid) nextForm(1);

    return valid;
}

function checkAnswer(val) {
    var answer = val.value;

    if (answer != '') {
        document.getElementById('nextBtn').style.display = 'block';
    }
}