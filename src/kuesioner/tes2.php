<?php
    session_start();

    if (isset($_SESSION["timer"])) { 
        $telah_berlalu = time() - $_SESSION["timer"];
    } else { 
        $_SESSION["timer"]  = time();
        $telah_berlalu      = 0;
    }

    $temp_waktu = (2*60) - $telah_berlalu; # set 4 menit    //dijadikan detik dan dikurangi waktu yang berlalu
    $temp_menit = (int)($temp_waktu/60);                    //dijadikan menit lagi
    $temp_detik = $temp_waktu%60;                           //sisa bagi untuk detik
     
    if ($temp_menit < 60) { 
        /* Apabila $temp_menit yang kurang dari 60 menit */
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

    <script type="text/javascript">
        $(document).ready(function() {
            var detik = <?php echo $detik; ?>;
            var menit = <?php echo $menit; ?>;

            var div_timer = document.getElementById("quiz-time-left");
            div_timer.innerHTML = 'Sisa Waktu: ' + menit + ' menit ' + detik + ' detik';

            function Timer() {
                setTimeout(Timer, 1000);

                if (menit == 0 && detik > 0) {
                    div_timer.innerHTML = '<span style="color:red">Sisa Waktu: ' + menit + ' menit ' + detik + ' detik</span>';
                } else if (menit >= 1) {
                    div_timer.innerHTML = 'Sisa Waktu: ' + menit + ' menit ' + detik + ' detik';
                } else if (menit == 0 && detik == 0) {
                    div_timer.innerHTML = '<span style="color:red">Waktu Habis!</span>';
                }

                detik--;

                if (menit >= 0 && detik == 0) {
                    detik = 59;
                    menit--;

                    if (menit == 0) {
                        clearInterval(Timer);
                        //setTimeout('document.quiz.submit()', 1);                        
                    }
                }
            }

            Timer();
        });
    </script>