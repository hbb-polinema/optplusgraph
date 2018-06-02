<?php
session_start();

if($_SESSION['isSetSession'] && isset($_SESSION['kode'])){
    require_once('../db/db.php');
    $_DB = new DB();
    $kode_unik = $_SESSION['kode'];
    $select = $_DB->select('SELECT id_responden,kode_unik FROM responden WHERE kode_unik = '.$kode_unik);

    if($select){
        $q = $_POST['q'];
        $jwb = $_DB->validate_data($_POST['jwb']);
        $id_responden = $select[0]['id_responden'];

        /*
        TODO: INSERT
        isi_jawaban = $jwb
        alur_pertanyaan = pretest
        id_responden = $select[0]['id_responden']
        id_pertanyaan = $q
        */

        $insert = $_DB->query("INSERT INTO `jawaban` 
                                            (`isi_jawaban`, 
                                            `alur_pertanyaan`, 
                                            `durasi_waktu_penyelesaian`, 
                                            `id_responden`, 
                                            `id_pertanyaan`)
                    
                    VALUES                  (".$jwb.", 
                                            'pretest', 
                                            NULL, 
                                            ".$id_responden.", 
                                            ".$q.");");
        if($insert) echo 'sukses';
        else echo 'gagal-'.$q.'-'.$jwb.'-'.$id_responden;

    } else {
        echo 'PRE1 - Terjadi Kesalahan!';
    }
} else {
    echo '101 - Terjadi Kesalahan';
}
?>