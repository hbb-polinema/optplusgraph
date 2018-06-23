<?php
session_start();

if($_SESSION['isSetSession'] && isset($_SESSION['kode'])){
    require_once('../db/db.php');
    $_DB = new DB();
    $kode_unik = $_SESSION['kode'];
    $select = $_DB->select('SELECT id_responden FROM responden WHERE kode_unik = '.$kode_unik);

    if($select){
        $q = $_POST['id'];
        $id_responden = $select[0]['id_responden'];

        $cek = $_DB->select('SELECT isi_jawaban FROM jawaban WHERE id_responden = '.$id_responden.' AND id_pertanyaan = '.$q);
        if($cek){
            echo 'sudah';
        } else {
            echo 'belum';
        }

    } else {
        echo 'CEK01 - Terjadi Kesalahan!';
    }
} else {
    echo 'CEK02 - Terjadi Kesalahan';
}
?>