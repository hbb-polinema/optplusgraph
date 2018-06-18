$(document).ready(function() {
    var divTimer = document.getElementById("timer");
    timer(15, 0, divTimer);
});

function saveToDB(jwb, id_soal) {
    var time = 'menit ' + _MIN + ':detik ' + _SEC;
    console.log(id_soal + ' jwb: ' + jwb + '-' + time);
    $.ajax({
        type: "POST",
        url: "ajax_request/simulasi1sesi1.php",
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

/**
 * 
 * @param {soal sekarang} currentQuestion
 */
function simulasi1sesi1NextBtn(currentQuestion) {
    var valid = true;

    switch (currentQuestion) {
        case 1:
            if (document.getElementById('answerP1').value != '') {
                saveToDB(document.getElementById('answerP1').value, 17);
            } else {
                document.getElementById('p1').className += ' invalid';
                valid = false;
            }
            break;
        case 2:
            if (document.getElementById('answerP2').value != '') {
                saveToDB(document.getElementById('answerP2').value, 20);
            } else {
                document.getElementById('p2').className += ' invalid';
                valid = false;
            }
            break;
        case 3:
            if (document.getElementById('answerP3').value != '') {
                saveToDB(document.getElementById('answerP3').value, 21);
            } else {
                document.getElementById('p3').className += ' invalid';
                valid = false;
            }

            // go to SUBMIT
            if (valid) {
                saveToDB("finish", 0);
                // FINISH Simulasi 1 OPT
                alert('Jawaban Simulasi 1-OPT Berhasil Disimpan!');
                window.close();
            }
            break;
    }

    if (valid) nextForm(1);

    return valid;
}

function checkAnswer(val, q) {
    var answer = val.value;

    if (answer != '') {
        if (q == 1) document.getElementById('nextBtn1').style.display = 'block';
        else if (q == 2) document.getElementById('nextBtn2').style.display = 'block';
        else if (q == 3) document.getElementById('nextBtn3').style.display = 'block';
    }
}