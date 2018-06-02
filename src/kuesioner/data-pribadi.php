<?php
session_start();

if(isset($_SESSION['kode'])){
    require_once('db/db.php');
    $kode_unik = $_SESSION['kode'];
    $_DB = new DB();
    $select = $_DB->select('SELECT tahap_sekarang FROM responden WHERE kode_unik = '.$kode_unik);
    if($select){
        if($select[0]['tahap_sekarang'] == "data-pribadi.php"){
            # Ok, right place!
        } else {
            header("Location: ".$select[0]['tahap_sekarang']);
            exit;            
        }
    } else {
        header("Location: index.php");
        exit;
    }
} else {
    header("Location: index.php");
    exit;
}
?>

<?php require_once('header.php'); ?>
<body>
    <header role="banner" id="fh5co-header" class="navbar-fixed-top">
        <div class="container">
            <!-- <div class="row"> -->
            <nav class="navbar navbar-default">
                <div class="navbar-header">
                    <!-- Mobile Toggle Menu Button -->
                    <a href="#" class="js-fh5co-nav-toggle fh5co-nav-toggle" data-toggle="collapse" data-target="#navbar" aria-expanded="false"
                        aria-controls="navbar"></a>
                    <div class="navbar-brand" style="font-size:12pt">
                        <ul class="social social-circle" style="width: auto;">
                            <li class="icon-head"></li>
                        </ul> Anda sebagai Responden
                    </div>
                </div>
                <div id="navbar" class="navbar-collapse collapse">
                    <ul class="nav navbar-nav navbar-right">
                        <li><a href="#" data-nav-section="beranda"><span>Beranda</span></a></li>
                        <li class="icon-arrow-circle-right" style="margin-top:17px;"></li>
                        <li class="active"><a href="#" data-nav-section="data-pribadi"><span>Data Pribadi</span></a></li>
                        <li class="icon-arrow-circle-right" style="margin-top:17px;color:lightseagreen;"></li>
                        <li><a href="#" data-nav-section="pretest"><span>Pre Test</span></a></li>
                        <li class="icon-arrow-circle-right" style="margin-top:17px;"></li>
                        <li><a href="#" data-nav-section="simulasi"><span>Simulasi</span></a></li>
                        <li class="icon-arrow-circle-right" style="margin-top:17px;"></li>
                        <li><a href="#" data-nav-section="post-test"><span>Post Test</span></a></li>
                        <li class="icon-arrow-circle-right" style="margin-top:17px;"></li>
                        <li><a href="#" data-nav-section="selesai"><span>Selesai</span></a></li>
                    </ul>
                </div>
            </nav>
            <!-- </div> -->
        </div>
    </header>

    <section id="fh5co-contact" data-section="data-pribadi">
        <div class="clearfix visible-sm-block"></div>
        <div class="container">
            <div class="row">
                <div class="col-md-6 section-heading text-center">
                    <h2 class="to-animate">Biodata Diri</h2>
                    <div class="row">
                        <div class="col-md-8 col-md-offset-2 subtext to-animate">
                            <h3>Data pribadi Anda terjamin kerahasiaannya<br>dan hanya digunakan untuk kepentingan riset ini.</h3>
                            <p>Baca lebih lanjut tentang <a data-toggle="modal" data-target="#kebijakan">Kebijakan Privasi</a>.</p>
                        </div>
                    </div>
                </div>
            </div>

            <div class="row">
                <div class="col-md-6 col-sm-6 to-animate">
                    <form id="formPersonal" accept-charset="utf-8" name="formPersonal">

                        <div class="form-group">
                            <label for="nama" class="sr-only">Nama</label>
                            <input id="nama" minlength="3" maxlength="33" class="form-control" placeholder="Nama Lengkap" type="text" required>
                        </div>

                        <div class="form-group">
                            <label for="gender" class="sr-only">Gender</label>
                            <select name="gender" id="gender" class="form-control" required>
                                <option value="" selected disabled>Gender</option>
                                <option value="p">Pria</option>
                                <option value="w">Wanita</option>
                            </select>
                        </div>

                        <div class="form-group">
                            <label for="umur" class="sr-only">Umur</label>
                            <select name="umur" id="umur" class="form-control" required>
                                <option value="" selected disabled>Umur</option>
                                <option value="a">14 tahun ke bawah</option>
                                <option value="b">15 - 20 tahun</option>
                                <option value="c">21 - 25 tahun</option>
                                <option value="d">26 - 30 tahun</option>
                                <option value="e">31 - 40 tahun</option>
                                <option value="f">41 - 50 tahun</option>
                                <option value="g">lebih dari 51 tahun</option>
                            </select>
                        </div>

                        <div class="form-group">
                            <label for="pendidikan" class="sr-only">Pendidikan Saat Ini</label>
                            <select name="pendidikan" id="pendidikan" class="form-control" required onchange="showProdi(this);">
                                <option value="" selected disabled>Pendidikan Saat Ini</option>                                
                                <option value="d">Diploma (D1-D4)</option>
                                <option value="s1">Sarjana (S1)</option>
                                <option value="s2">Magister (S2)</option>
                            </select>
                        </div>

                        <div class="form-group" id="asal-kampus" style="display:none;">
                            <label for="kampus" class="sr-only">Asal Universitas</label>
                            <input id="kampus" class="form-control" placeholder="Asal Universitas" type="text" required>
                        </div>

                        <div class="form-group" id="jurusan" style="display:none;">
                            <label for="prodi" class="sr-only">Program Studi</label>
                            <select name="prodi" id="prodi" class="form-control">
                                <option value="" selected disabled>Program Studi</option>
                                <option value="infor">Teknik Informatika / Informatika</option>
                                <option value="si">Sistem Informasi</option>
                                <option value="sk">Sistem Komputer</option>
                                <option value="ik">Ilmu Komputer</option>
                                <option value="l">Lainnya</option>
                            </select>
                        </div>

                        <div class="form-group">
                            <label for="email" class="sr-only">Email</label>
                            <input id="email" class="form-control" placeholder="Email" type="email" required>
                        </div>

                        <div class="form-group">
                            <label for="ponsel" class="sr-only">Nomor Ponsel</label>
                            <input id="ponsel" minlength="7" class="form-control" placeholder="Nomor Ponsel" type="number" required>
                        </div>

                        <div class="form-group">
                            <label for="pernyataan" class="sr-only">Pernyataan</label>
                            <div class="form-control row" style="height:100%; margin-left:0;">
                                <div style="padding:0;margin-top:23pt;" class="col-md-1"><input id="pernyataan" name="pernyataan" type="checkbox" value="setuju" style="display:block;width:100%;height:23px;" required></div>
                                <div class="col-md-11" style="padding:0;">Saya menyatakan data ini yang sebenarnya dan tidak ada paksaan dari siapa pun. Saya mengisi
                                    kuesioner ini dengan jujur dan tidak berbuat curang/menipu dengan cara apapun.</div>
                            </div>
                        </div>

                        <div class="form-group">
                            <center>
                                <input class="btn btn-primary btn-lg" value="Simpan &amp; Lanjutkan" type="button" onclick="checkResolution(2);" style="width: 100%;">
                            </center>
                        </div>

                    </form>
                </div>

                <div class="col-md-6 col-sm-6 to-animate">
                    <div class="fh5co-block to-animate" style="background-color: tomato;color: white;padding: 41px 41px;margin-bottom: 33pt;">
                        <div class="overlay-darker"></div>
                        <div class="overlay"></div>
                        <div class="fh5co-text">
                            <h2><span class="fh5co-intro-icon icon-gift"></span> Hadiah Utama Domain .ID</h2>
                            <p>Bagi responden terbaik berdasarkan kelengkapan kuesioner dan poin yang bisa dikumpulkan.</p>
                            <h5 style="margin-bottom:0px;">Baca syarat dan ketentuannya <a data-toggle="modal" data-target="#skb">di sini</a></h5>
                        </div>
                    </div>

                    <h3>Informasi Kontak</h3>
                    <ul class="fh5co-contact-info">
                        <li class="fh5co-contact-address ">
                            <i class="icon-home"></i> Institut Teknologi Bandung<br>Jalan Ganesha Nomor 10, <br>Kota Bandung
                        </li>
                        <li><i class="icon-phone"></i> 0811-3200-670</li>
                        <li><i class="icon-envelope"></i>habibieeddien@students.itb.ac.id</li>
                        <li><i class="icon-globe"></i> <a href="http://www.itb.ac.id/" target="_blank">ITB.ac.id</a></li>
                    </ul>
                </div>

            </div>

        </div>
    </section>

    <div style="height:133px;"></div>

<?php require_once('footer.php'); ?>