<?php
session_start();

if(isset($_SESSION['timer'])){
    $timer = time() - $_SESSION['timer'];
    $timer = (int)($timer/60);
    echo 'time: '.time();
    echo ' timer: '.$timer;
    echo ' session: '.$_SESSION['timer'];
} else {
    $_SESSION['timer'] = time();
    $timer = 0;
}

$temp_waktu = (4*60) - $timer;
$temp_menit = (int)($temp_waktu/60);
$temp_detik = $temp_waktu % 60;

?>

<form method="post" name="quiz" id="quiz_form" action="destroy.php">
</form>

<div style="font-weight: bold" id="quiz-time-left"></div>

<script type="text/javascript">
    var max_time = <?php echo $timer; ?>;
    var c_seconds = 0;
    var total_seconds = 60 * max_time;

    max_time = <?php echo $temp_menit; ?>;//parseInt(total_seconds / 60);
    c_seconds = <?php echo $temp_detik; ?>; //parseInt(total_seconds % 60);
    
    var div_timer = document.getElementById("quiz-time-left");
    div_timer.innerHTML = 'Sisa Waktu: ' + max_time + ' menit ' + c_seconds + ' detik';

    function init() {
        div_timer.innerHTML = 'Sisa Waktu: ' + max_time + ' menit ' + c_seconds + ' detik';
        setTimeout("CheckTime()", 999);
    }

    function CheckTime() {
        div_timer.innerHTML = 'Sisa Waktu: ' + max_time + ' menit ' + c_seconds + ' detik';
        if (total_seconds <= 0 && max_time <= 0) {
            setTimeout('document.quiz.submit()', 1);

        } else {
            total_seconds = total_seconds - 1;
            max_time = parseInt(total_seconds / 60);
            c_seconds = parseInt(total_seconds % 60);
            setTimeout("CheckTime()", 999);
        }

    }
    init();
</script>