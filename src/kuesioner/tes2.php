<?php
    //untuk memulai session
    session_start();
     
    //set session dulu dengan nama $_SESSION["mulai"]
    if (isset($_SESSION["mulai"])) { 
        //jika session sudah ada
        $telah_berlalu = time() - $_SESSION["mulai"];
    } else { 
        //jika session belum ada
        $_SESSION["mulai"]  = time();
        $telah_berlalu      = 0;
    }

    $temp_waktu = (2*60) - $telah_berlalu; # set 4 menit    //dijadikan detik dan dikurangi waktu yang berlalu
    $temp_menit = (int)($temp_waktu/60);                    //dijadikan menit lagi
    $temp_detik = $temp_waktu%60;                           //sisa bagi untuk detik
     
    if ($temp_menit < 60) { 
        /* Apabila $temp_menit yang kurang dari 60 meni */
        $jam    = 0; 
        $menit  = $temp_menit; 
        $detik  = $temp_detik; 
    } else { 
        /* Apabila $temp_menit lebih dari 60 menit */           
        $jam    = (int)($temp_menit/60);    //$temp_menit dijadikan jam dengan dibagi 60 dan dibulatkan menjadi integer 
        $menit  = $temp_menit%60;           //$temp_menit diambil sisa bagi ($temp_menit%60) untuk menjadi menit
        $detik  = $temp_detik;
    }   
?>

    <form method="post" name="quiz" id="quiz_form" action="destroy.php"></form>

    <div style="font-weight: bold" id="quiz-time-left"></div>

<?php require_once('footer.php'); ?>

<!-- Script Timer -->
    <script type="text/javascript">
        $(document).ready(function() {
            /** Membuat Waktu Mulai Hitung Mundur Dengan 
             * var detik;
             * var menit;
             */
            var detik = <?php echo $detik; ?>;
            var menit = <?php echo $menit; ?>;

            var div_timer = document.getElementById("quiz-time-left");
            div_timer.innerHTML = 'Sisa Waktu: ' + menit + ' menit ' + detik + ' detik';

            /**
             * Membuat function hitung() sebagai Penghitungan Waktu
             */
            function Timer() {
                /** setTimout(hitung, 1000) digunakan untuk 
                 * mengulang atau merefresh halaman selama 1000 (1 detik) 
                 */
                setTimeout(Timer, 1000);

                /** Jika waktu kurang dari 1 menit maka Timer akan berubah menjadi warna merah */
                if (menit == 0 && detik <= 59) {                    
                    /** Menampilkan Waktu Timer pada Tag #Timer di HTML yang tersedia - WARNING sisa 1 menit*/
                    div_timer.innerHTML = '<span style="color:red">Sisa Waktu: ' + menit + ' menit ' + detik + ' detik</span>';
                } else {
                    /** Menampilkan Waktu Timer pada Tag #Timer di HTML yang tersedia */
                    div_timer.innerHTML = 'Sisa Waktu: ' + menit + ' menit ' + detik + ' detik';
                }

                /** Melakukan Hitung Mundur dengan Mengurangi variabel detik - 1 */
                detik--;

                /** Jika var detik <= 0
                 * var detik akan dikembalikan ke 59
                 * Menit akan Berkurang 1
                 */
                if (detik <= 0) {
                    detik = 59;
                    menit--;

                    /** Jika menit <= 0
                     * SELESAI
                     */
                    if (menit <= 0) {
                        clearInterval(Timer);
                        /** Variable yang digunakan untuk submit secara otomatis di Form */
                        setTimeout('document.quiz.submit()', 1);
                    }
                }
            }

            /** Menjalankan Function Hitung Waktu Mundur */
            Timer();
        });
    </script>