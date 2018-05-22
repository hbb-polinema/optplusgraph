<?php
session_start();

if($_SESSION['isSetSession'] && isset($_SESSION['kode'])){
    require_once('../db/db.php');
    $_DB = new DB();
    $kode_unik = $_SESSION['kode'];
    $email = $_DB->validate_data($_POST['email']);
    $select = $_DB->select('SELECT email_responden,kode_unik FROM responden WHERE kode_unik = '.$kode_unik.' AND email_responden = '.$email);

    if($select){
        if ( strpos($email, $_SESSION['email']) ){
            $nama = $_DB->validate_data($_POST['nama']);
            
            $gender = $_POST['gender'];
            if( $gender == 'p') $gender = 'Pria';
            if( $gender == 'w') $gender = 'Wanita';

            $umur = $_POST['umur'];
            switch ($umur) {
                case 'a': $umur = '14 tahun ke bawah'; break;
                case 'b': $umur = '15 - 20 tahun'; break;
                case 'c': $umur = '21 - 25 tahun'; break;
                case 'd': $umur = '26 - 30 tahun'; break;
                case 'e': $umur = '31 - 40 tahun'; break;
                case 'f': $umur = '41 - 50 tahun'; break;
                case 'g': $umur = 'lebih dari 51 tahun'; break;
            }

            $pendidikan = $_POST['pendidikan'];
            switch ($pendidikan) {
                case 'd': $pendidikan = 'Diploma (D1-D4)'; break;
                case 's1': $pendidikan = 'Sarjana (S1)'; break;
                case 's2': $pendidikan = 'Magister (S2)'; break;
            }

            $kampus = $_DB->validate_data($_POST['kampus']);            

            $prodi = $_POST['prodi'];
            switch ($prodi) {
                case 'infor': $prodi = 'Teknik Informatika / Informatika'; break;
                case 'si': $prodi = 'Sistem Informasi'; break;
                case 'sk': $prodi = 'Sistem Komputer'; break;
                case 'ik': $prodi = 'Ilmu Komputer'; break;
                case 'l': $prodi = 'Lainnya'; break;
            }

            $ponsel = $_DB->validate_data($_POST['ponsel']);
            $perangkat = '{"id":"any"}';

            $insert = $_DB->query('
            UPDATE responden 
            SET nama_responden = '.$nama.', 
                gender_responden = "'.$gender.'", 
                umur_responden = "'.$umur.'", 
                pendidikan_responden = "'.$pendidikan.'", 
                kampus_responden = '.$kampus.', 
                ponsel_responden = '.$ponsel.',
                perangkat_responden = \''.$perangkat.'\'
            WHERE kode_unik = '.$kode_unik.' AND email_responden = '.$email);

            if ($insert) 
                echo 'sukses';
            else 
                echo '98 - Terjadi Kesalahan';
        } else {
            echo '99 - Email Anda tidak cocok';
        }

    } else {
        echo '100 - Terjadi Kesalahan: Email tidak terdaftar!';
    }
} else {
    echo '101 - Terjadi Kesalahan';
}
?>