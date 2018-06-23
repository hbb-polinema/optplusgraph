<?php
session_start();

if($_SESSION['isSetSession']){
    require_once('../db/db.php');
    $_DB = new DB();
    $kode_unik = $_DB->validate_data($_POST['kode_unik']);
    $select = $_DB->select('SELECT email_responden,kode_unik FROM responden WHERE kode_unik = '.$kode_unik);
    if($select){
        $_SESSION['email'] = $select[0]['email_responden'];
        $_SESSION['kode'] = $kode_unik;
        $_SESSION['host'] = 'localhost:3000'; # codeviz.tk/survei
        $_DB->query("UPDATE `responden` SET `tahap_sekarang` = 'data-pribadi.php' WHERE `kode_unik` = ".$kode_unik);
        echo 'sukses';
    } else {
        echo '96 - Terjadi Kesalahan';
    }
} else {
    echo '97 - Terjadi Kesalahan';
}
?>