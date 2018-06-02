<?php
session_start();

if($_SESSION['isSetSession'] && isset($_SESSION['kode'])){
    require_once('../db/db.php');
    $_DB = new DB();
    $kode_unik = $_SESSION['kode'];
    $select = $_DB->select('SELECT id_responden FROM responden WHERE kode_unik = '.$kode_unik);

    if($select){
        $tahap = $_DB->validate_data($_POST['tahap']);
        $update = $_DB->query("UPDATE `responden` SET `tahap_sekarang` = ".$tahap." WHERE `kode_unik` = ".$kode_unik);
        
        if($update) echo 'sukses';
        else echo 'U1 - gagal';
        
    } else {
        echo 'PRE1 - Terjadi Kesalahan!';
    }
} else {
    echo '101 - Terjadi Kesalahan';
}
?>