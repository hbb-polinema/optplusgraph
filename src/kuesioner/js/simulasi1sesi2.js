function saveToDB(jwb, id_soal) {
    console.log(id_soal + ' jwb: ' + jwb);
    $.ajax({
        type: "POST",
        url: "ajax_request/simulasi1sesi2.php",
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
function simulasi1sesi2NextBtn(currentQuestion) {
    var valid = true;
    var nextBtn = document.getElementById('nextBtn');

    switch (currentQuestion) {
        case 1:
            if (document.getElementById('answerP1').value != '') {
                saveToDB(document.getElementById('answerP1').value, 22);
            } else {
                document.getElementById('p1').className += ' invalid';
                valid = false;
            }

            // go to p2
            if (valid) {
                nextBtn.setAttribute('onclick', 'simulasi1sesi2NextBtn(2)');
            }
            break;
        case 2:
            if (document.getElementById('answerP2').value != '') {
                saveToDB(document.getElementById('answerP2').value, 23);
            } else {
                document.getElementById('p2').className += ' invalid';
                valid = false;
            }

            // go to p3
            if (valid) {
                nextBtn.setAttribute('onclick', 'simulasi1sesi2NextBtn(3)');
            }
            break;
        case 3:
            if (document.getElementById('answerP3').value != '') {
                saveToDB(document.getElementById('answerP3').value, 24);
            } else {
                document.getElementById('p3').className += ' invalid';
                valid = false;
            }

            // go to p4
            if (valid) {
                nextBtn.setAttribute('onclick', 'simulasi1sesi2NextBtn(4)');
            }
            break;
        case 4:
            if (document.getElementById('answerP4').value != '') {
                saveToDB(document.getElementById('answerP4').value, 25);
            } else {
                document.getElementById('p4').className += ' invalid';
                valid = false;
            }

            // go to p5
            if (valid) {
                nextBtn.setAttribute('onclick', 'simulasi1sesi2NextBtn(5)');
            }
            break;
        case 5:
            if (document.getElementById('answerP5').value != '') {
                saveToDB(document.getElementById('answerP5').value, 26);
            } else {
                document.getElementById('p5').className += ' invalid';
                valid = false;
            }

            // go to SUBMIT
            if (valid) {
                saveToDB("finish", 0);
                // FINISH Simulasi 1 Sesi 2
                alert('Jawaban Simulasi 1 Sesi 2 Berhasil Disimpan!');
                window.close();
            }
            break;
    }

    if (valid) nextForm(1);

    return valid;
}