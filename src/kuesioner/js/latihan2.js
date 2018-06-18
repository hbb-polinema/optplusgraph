function saveToDB(jwb, id_soal) {
    console.log(id_soal + ' jwb: ' + jwb);
    $.ajax({
        type: "POST",
        url: "ajax_request/latihan2.php",
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
function latihan2NextBtn(currentQuestion) {
    var valid = true;
    var nextBtn = document.getElementById('nextBtn');

    switch (currentQuestion) {
        case 1:
            if (document.getElementById('answerP1').value != '') {
                saveToDB(document.getElementById('answerP1').value, 50);
            } else {
                document.getElementById('p1').className += ' invalid';
                valid = false;
            }

            // go to SUBMIT
            if (valid) {
                saveToDB("finish", 0);
                // FINISH Latihan 2
                alert('Jawaban Latihan 2 Berhasil Disimpan!');
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