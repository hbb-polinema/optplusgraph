$(document).ready(function() {
    var divTimer = document.getElementById("timer");
    timer(25, 0, divTimer);
});

function saveToDB(jwb, id_soal) {
    var time = 'menit ' + _MIN + ':detik ' + _SEC;
    console.log(id_soal + ' jwb: ' + jwb + '-' + time);
    $.ajax({
        type: "POST",
        url: "ajax_request/simulasi2sesi2.php",
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
function simulasi2sesi2NextBtn(currentQuestion) {
    var valid = true;
    var nextBtn = document.getElementById('nextBtn');

    switch (currentQuestion) {
        case 1:
            if (document.getElementById('answerP1').value != '') {
                saveToDB(document.getElementById('answerP1').value, 37);
            } else {
                document.getElementById('p1').className += ' invalid';
                valid = false;
            }

            // go to p2
            if (valid) {
                nextBtn.setAttribute('onclick', 'simulasi2sesi2NextBtn(2)');
            }
            break;
        case 2:
            if (document.getElementById('answerP2').value != '') {
                saveToDB(document.getElementById('answerP2').value, 38);
            } else {
                document.getElementById('p2').className += ' invalid';
                valid = false;
            }

            // go to p3
            if (valid) {
                nextBtn.setAttribute('onclick', 'simulasi2sesi2NextBtn(3)');
            }
            break;
        case 3:
            if (document.getElementById('answerP3').value != '') {
                saveToDB(document.getElementById('answerP3').value, 39);
            } else {
                document.getElementById('p3').className += ' invalid';
                valid = false;
            }

            // go to p4
            if (valid) {
                nextBtn.setAttribute('onclick', 'simulasi2sesi2NextBtn(4)');
            }
            break;
        case 4:
            if (document.getElementById('answerP4').value != '') {
                saveToDB(document.getElementById('answerP4').value, 40);
            } else {
                document.getElementById('p4').className += ' invalid';
                valid = false;
            }

            // go to p5
            if (valid) {
                nextBtn.setAttribute('onclick', 'simulasi2sesi2NextBtn(5)');
            }
            break;
        case 5:
            if (document.getElementById('answerP5').value != '') {
                saveToDB(document.getElementById('answerP5').value, 41);
            } else {
                document.getElementById('p5').className += ' invalid';
                valid = false;
            }

            // go to SUBMIT
            if (valid) {
                saveToDB("finish", 0);
                // FINISH Simulasi 2 Sesi 2
                alert('Jawaban Simulasi 2 Sesi 2 Berhasil Disimpan!');
                window.close();
            }
            break;
    }

    if (valid) nextForm(1);

    return valid;
}