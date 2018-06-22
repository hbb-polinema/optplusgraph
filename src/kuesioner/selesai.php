<?php
session_start();

if(isset($_SESSION['kode'])){
    require_once('db/db.php');
    $kode_unik = $_SESSION['kode'];
    $_DB = new DB();
    $select = $_DB->select('SELECT id_responden, nama_responden, email_responden, ponsel_responden FROM responden WHERE kode_unik = '.$kode_unik);
    
    if($select){
        $id_responden = $select[0]['id_responden'];
        $nama_responden = $select[0]['nama_responden'];
        $email_responden = $select[0]['email_responden'];
        $ponsel_responden = $select[0]['ponsel_responden'];
        
        $id_pretes = array(1,47);
        $id_latihan = array(49,50);
        $id_simulasi1OPT = array(17,20,21);
        $id_simulasi1CODEVIZ = array(23,28,26);
        $id_post1 = 27;
        $id_simulasi2CODEVIZ = array(24,29,37);
        $id_simulasi2OPT = array(35,36,30);
        $id_post2 = 45;

        $BENAR_pretes = 0;
        $BENAR_latihan = 0;
        $BENAR_simulasi1OPT = 0;
        $BENAR_simulasi1CODEVIZ = 0;
        $BENAR_post1 = 0;
        $BENAR_simulasi2CODEVIZ = 0;
        $BENAR_simulasi2OPT = 0;
        $BENAR_post2 = 0;

        $SISA_WAKTU_simulasi1OPT = '';
        $SISA_WAKTU_simulasi1CODEVIZ = '';
        $SISA_WAKTU_post1 = '';
        $SISA_WAKTU_simulasi2CODEVIZ = '';
        $SISA_WAKTU_simulasi2OPT = '';
        $SISA_WAKTU_post2 = '';

        foreach($id_pretes as $id){
            $select = $_DB->select('SELECT isi_jawaban FROM jawaban WHERE id_responden = '.$id_responden.' AND id_pertanyaan = '.$id.' AND isi_jawaban IN (SELECT kunci_jawaban FROM pertanyaan WHERE id_pertanyaan = '.$id.')');
            if($select) $BENAR_pretes++;
        }

        foreach($id_latihan as $id){
            $select = $_DB->select('SELECT isi_jawaban FROM jawaban WHERE id_responden = '.$id_responden.' AND id_pertanyaan = '.$id.' AND isi_jawaban IN (SELECT kunci_jawaban FROM pertanyaan WHERE id_pertanyaan = '.$id.')');
            if($select) $BENAR_latihan++;
        }

        foreach($id_simulasi1OPT as $id){
            $select = $_DB->select('SELECT isi_jawaban FROM jawaban WHERE id_responden = '.$id_responden.' AND id_pertanyaan = '.$id.' AND isi_jawaban IN (SELECT kunci_jawaban FROM pertanyaan WHERE id_pertanyaan = '.$id.')');
            if($select) $BENAR_simulasi1OPT++;
            if($id == 21){
                $select = $_DB->select('SELECT durasi_waktu_penyelesaian FROM jawaban WHERE id_responden = '.$id_responden.' AND id_pertanyaan = '.$id);
                if($select) $SISA_WAKTU_simulasi1OPT = $select[0]['durasi_waktu_penyelesaian'];
            }
        }

        foreach($id_simulasi1CODEVIZ as $id){
            $select = $_DB->select('SELECT isi_jawaban FROM jawaban WHERE id_responden = '.$id_responden.' AND id_pertanyaan = '.$id.' AND isi_jawaban IN (SELECT kunci_jawaban FROM pertanyaan WHERE id_pertanyaan = '.$id.')');
            if($select) $BENAR_simulasi1CODEVIZ++;
            if($id == 26){
                $select = $_DB->select('SELECT durasi_waktu_penyelesaian FROM jawaban WHERE id_responden = '.$id_responden.' AND id_pertanyaan = '.$id);
                if($select) $SISA_WAKTU_simulasi1CODEVIZ = $select[0]['durasi_waktu_penyelesaian'];
            }
        }

        $select = $_DB->select('SELECT isi_jawaban FROM jawaban WHERE id_responden = '.$id_responden.' AND id_pertanyaan = '.$id_post1.' AND isi_jawaban IN (SELECT kunci_jawaban FROM pertanyaan WHERE id_pertanyaan = '.$id_post1.')');
        if($select) $BENAR_post1++;
        $select = $_DB->select('SELECT durasi_waktu_penyelesaian FROM jawaban WHERE id_responden = '.$id_responden.' AND id_pertanyaan = '.$id_post1);
        if($select) $SISA_WAKTU_post1 = $select[0]['durasi_waktu_penyelesaian'];

        foreach($id_simulasi2CODEVIZ as $id){
            $select = $_DB->select('SELECT isi_jawaban FROM jawaban WHERE id_responden = '.$id_responden.' AND id_pertanyaan = '.$id.' AND isi_jawaban IN (SELECT kunci_jawaban FROM pertanyaan WHERE id_pertanyaan = '.$id.')');
            if($select) $BENAR_simulasi2CODEVIZ++;
            if($id == 37){
                $select = $_DB->select('SELECT durasi_waktu_penyelesaian FROM jawaban WHERE id_responden = '.$id_responden.' AND id_pertanyaan = '.$id);
                if($select) $SISA_WAKTU_simulasi2CODEVIZ = $select[0]['durasi_waktu_penyelesaian'];
            }
        }

        foreach($id_simulasi2OPT as $id){
            $select = $_DB->select('SELECT isi_jawaban FROM jawaban WHERE id_responden = '.$id_responden.' AND id_pertanyaan = '.$id.' AND isi_jawaban IN (SELECT kunci_jawaban FROM pertanyaan WHERE id_pertanyaan = '.$id.')');
            if($select) $BENAR_simulasi2OPT++;
            if($id == 30){
                $select = $_DB->select('SELECT durasi_waktu_penyelesaian FROM jawaban WHERE id_responden = '.$id_responden.' AND id_pertanyaan = '.$id);
                if($select) $SISA_WAKTU_simulasi2OPT = $select[0]['durasi_waktu_penyelesaian'];
            }
        }

        $select = $_DB->select('SELECT isi_jawaban FROM jawaban WHERE id_responden = '.$id_responden.' AND id_pertanyaan = '.$id_post2.' AND isi_jawaban IN (SELECT kunci_jawaban FROM pertanyaan WHERE id_pertanyaan = '.$id_post2.')');
        if($select) $BENAR_post2++;
        $select = $_DB->select('SELECT durasi_waktu_penyelesaian FROM jawaban WHERE id_responden = '.$id_responden.' AND id_pertanyaan = '.$id_post2);
        if($select) $SISA_WAKTU_post2 = $select[0]['durasi_waktu_penyelesaian'];

        $TOTAL_BENAR = $BENAR_simulasi1OPT + $BENAR_simulasi1CODEVIZ + $BENAR_post1 + $BENAR_simulasi2CODEVIZ + $BENAR_simulasi2OPT + $BENAR_post2;
        
        if($TOTAL_BENAR >= 12) $PULSA = 'Rp. 25.000,-';
        else if($TOTAL_BENAR >= 9) $PULSA = 'Rp. 20.000,-';
        else if($TOTAL_BENAR >= 6) $PULSA = 'Rp. 15.000,-';
        else if($TOTAL_BENAR >= 3) $PULSA = 'Rp. 10.000,-';
        else if($TOTAL_BENAR >= 1) $PULSA = 'Rp. 5.000,-';
        else if($TOTAL_BENAR >= 0) $PULSA = 'Maaf, Anda tidak berhak mendapat Pulsa!';

        $_DB->query("UPDATE `responden` SET `kode_unik` = 'MAREH' WHERE `id_responden` = ".$id_responden);

    } else {
        header("Location: index.php");
        exit;
    }

} else {
    header("Location: index.php");
    exit;
}
?>
<?php require_once('destroy.php'); ?>
<?php require_once('header.php'); ?>

<body>
    <style>
        /* Mark input boxes that gets an error on validation: */
        
        .invalid {
            background-color: #ffdddd;
        }
        /* Hide all steps by default: */
        
        .tab {
            display: none;
            box-sizing: border-box;
            -webkit-animation: fadeEffect 1.5s;
            animation: fadeEffect 1.5s;
        }

        .tab2 {
            display: none;
            box-sizing: border-box;
            -webkit-animation: fadeEffect 1.5s;
            animation: fadeEffect 1.5s;
        }
        
        @-webkit-keyframes fadeEffect {
            from {
                opacity: 0;
            }
            to {
                opacity: 1;
            }
        }
        
        @keyframes fadeEffect {
            from {
                opacity: 0;
            }
            to {
                opacity: 1;
            }
        }

        #customers {
            font-family: "Trebuchet MS", Arial, Helvetica, sans-serif;
            font-size: 12pt;
            border-collapse: collapse;
            width: 100%;
        }

        #customers td, #customers th {
            border: 1px solid #ddd;
            padding: 8px;
        }

        #customers tr:nth-child(even){background-color: #f2f2f2;}

        #customers tr:hover {background-color: #52d3aa;}

        #customers th {
            padding-top: 12px;
            padding-bottom: 12px;
            text-align: left;
            background-color: #4CAF50;
            color: white;
        }
    </style>
    <header role="banner" id="fh5co-header" class="navbar-fixed-top">
        <div class="container">
            <!-- <div class="row"> -->
            <nav class="navbar navbar-default">
                <div class="navbar-header">
                    <!-- Mobile Toggle Menu Button -->
                    <a href="#" class="js-fh5co-nav-toggle fh5co-nav-toggle" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar"></a>
                    <div class="navbar-brand" style="font-size:12pt">
                        <ul class="social social-circle" style="width: auto;">
                            <li class="icon-head"></li>
                        </ul> Anda sebagai Responden
                    </div>
                </div>
                <div id="navbar" class="navbar-collapse collapse">
                    <ul class="nav navbar-nav navbar-right">
                        <li>
                            <a href="#" data-nav-section="beranda">
                                <span>Beranda</span>
                            </a>
                        </li>
                        <li class="icon-arrow-circle-right" style="margin-top:17px;"></li>
                        <li>
                            <a href="#" data-nav-section="data-pribadi">
                                <span>Data Pribadi</span>
                            </a>
                        </li>
                        <li class="icon-arrow-circle-right" style="margin-top:17px;"></li>
                        <li>
                            <a href="#" data-nav-section="pretest">
                                <span>Pre Test</span>
                            </a>
                        </li>
                        <li class="icon-arrow-circle-right" style="margin-top:17px;"></li>
                        <li>
                            <a href="#" data-nav-section="simulasi">
                                <span>Simulasi</span>
                            </a>
                        </li>
                        <li class="icon-arrow-circle-right" style="margin-top:17px;"></li>
                        <li>
                            <a href="#" data-nav-section="post-test">
                                <span>Post Test</span>
                            </a>
                        </li>
                        <li class="icon-arrow-circle-right" style="margin-top:17px;color:lightseagreen;"></li>
                        <li class="active">
                            <a href="#" data-nav-section="selesai">
                                <span>Selesai</span>
                            </a>
                        </li>
                    </ul>
                </div>
            </nav>
            <!-- </div> -->
        </div>
    </header>

    <section id="fh5co-contact" data-section="selesai">
        <div class="clearfix visible-sm-block"></div>
        <div class="container">
            <div class="row">
                <div class="col-md-6 section-heading text-center">
                    <h2 class="to-animate">Selesai</h2>
                    <div class="row">
                        <div class="col-md-8 col-md-offset-2 subtext to-animate">
                            <h3>Terima kasih telah meluangkan waktu dan
                                usaha Anda.<br>Berikut ini adalah hasil pekerjaan Anda.</h3>
                            <p>
                                <center>
                                <table id="customers">
                                    <tr>
                                        <td>Nama</td>
                                        <td><?php echo $nama_responden; ?></td>
                                    </tr>
                                    <tr>
                                        <td>Email</td>
                                        <td><?php echo $email_responden; ?></td>
                                    </tr>
                                    <tr>
                                        <td>No.HP</td>
                                        <td><?php echo $ponsel_responden; ?></td>
                                    </tr>
                                    <tr>
                                        <td>Pre-Tes</td>
                                        <td>Benar: <?php echo $BENAR_pretes; ?></td>
                                    </tr>
                                    <tr>
                                        <td>Latihan</td>
                                        <td>Benar: <?php echo $BENAR_latihan; ?></td>
                                    </tr>
                                    <tr>
                                        <td>simulasi1OPT</td>
                                        <td>Benar: <?php echo $BENAR_simulasi1OPT; ?> --- Sisa Waktu: <?php echo $SISA_WAKTU_simulasi1OPT; ?></td>
                                    </tr>
                                    <tr>
                                        <td>simulasi1CodeViz</td>
                                        <td>Benar: <?php echo $BENAR_simulasi1CODEVIZ; ?> --- Sisa Waktu: <?php echo $SISA_WAKTU_simulasi1CODEVIZ; ?></td>
                                    </tr>
                                    <tr>
                                        <td>Post-Tes 1</td>
                                        <td>Benar: <?php echo $BENAR_post1; ?> --- Sisa Waktu: <?php echo $SISA_WAKTU_post1; ?></td>
                                    </tr>
                                    <tr>
                                        <td>simulasi2CodeViz</td>
                                        <td>Benar: <?php echo $BENAR_simulasi2CODEVIZ; ?> --- Sisa Waktu: <?php echo $SISA_WAKTU_simulasi2CODEVIZ; ?></td>
                                    </tr>
                                    <tr>
                                        <td>simulasi2OPT</td>
                                        <td>Benar: <?php echo $BENAR_simulasi2OPT; ?> --- Sisa Waktu: <?php echo $SISA_WAKTU_simulasi2OPT; ?></td>
                                    </tr>
                                    <tr>
                                        <td>Post-Tes 2</td>
                                        <td>Benar: <?php echo $BENAR_post2; ?> --- Sisa Waktu: <?php echo $SISA_WAKTU_post2; ?></td>
                                    </tr>
                                </table>
                                <center>
                            </p>
                            <p>Total Benar* = <b><?php echo $TOTAL_BENAR; ?></b> (Pulsa: <b><?php echo $PULSA; ?></b>)</p>
                            <p>Kontribusi Anda sangat berarti bagi penelitian ini.
                            Oleh karena itu, sebagai reward/penghargaan penulis ingin
                            memberikan hadiah berupa pulsa dan FREE Domain .id<br>
                            Pemberian Hadiah akan diinformasikan melalui email atau nomor telepon
                            yang telah terdaftar.</p>
                            <p>Baca lebih lanjut tentang
                                <a data-toggle="modal" data-target="#kebijakan">Kebijakan Privasi</a> |
                                <a data-toggle="modal" data-target="#skb">Syarat & Ketentuan</a>.</p>
                        </div>
                    </div>
                </div>
            </div>

        </div>

    </section>

    <div style="height:133px;"></div>
    
    <?php require_once('footer.php'); ?>