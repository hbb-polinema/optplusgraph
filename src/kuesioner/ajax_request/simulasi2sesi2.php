<?php
session_start();

if($_SESSION['isSetSession'] && isset($_SESSION['kode'])){
    require_once('../db/db.php');
    $_DB = new DB();
    $kode_unik = $_SESSION['kode'];
    $select = $_DB->select('SELECT id_responden,kode_unik FROM responden WHERE kode_unik = '.$kode_unik);

    if($select){
        $q = $_POST['id_soal'];
        $jwb = $_DB->validate_data($_POST['jwb']);
        $id_responden = $select[0]['id_responden'];

        if( strpos($jwb, 'finish') ){
            $update = $_DB->query("UPDATE `responden` SET `tahap_sekarang` = 'simulasi.php' WHERE `kode_unik` = ".$kode_unik);
            if($update) echo 'sukses';
            return;
        }

        $insert = $_DB->query("INSERT INTO `jawaban` 
                                            (`isi_jawaban`, 
                                            `alur_pertanyaan`, 
                                            `durasi_waktu_penyelesaian`, 
                                            `id_responden`, 
                                            `id_pertanyaan`)
                    
                    VALUES                  (".$jwb.", 
                                            'simulasi2sesi2', 
                                            NULL, 
                                            ".$id_responden.", 
                                            ".$q.");");
        if($insert) echo 'sukses';
        else echo 'gagal-'.$q.'-'.$jwb.'-'.$id_responden;

    } else {
        echo 'Sim2S2 - Terjadi Kesalahan!';
    }
} else {
    echo '101 - Terjadi Kesalahan';
}
?>