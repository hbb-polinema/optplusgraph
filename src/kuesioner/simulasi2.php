<?php
session_start();

if(isset($_SESSION['kode'])){
    require_once('db/db.php');
    $kode_unik = $_SESSION['kode'];
    $_DB = new DB();
    $select = $_DB->select('SELECT nama_responden, tahap_sekarang FROM responden WHERE kode_unik = '.$kode_unik);
    if($select){
        if($select[0]['tahap_sekarang'] == "simulasi2.php"){
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
    </style>
    
    <header role="banner" id="fh5co-header" class="navbar-fixed-top">
        <div class="container">
            
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
                        <li><a href="#" data-nav-section="beranda"><span>Beranda</span></a></li>
                        <li class="icon-arrow-circle-right" style="margin-top:17px;"></li>
                        <li><a href="#" data-nav-section="data-pribadi"><span>Data Pribadi</span></a></li>
                        <li class="icon-arrow-circle-right" style="margin-top:17px;"></li>
                        <li><a href="#" data-nav-section="pretest"><span>Pre Test</span></a></li>
                        <li class="icon-arrow-circle-right" style="margin-top:17px;"></li>
                        <li class="active"><a href="#" data-nav-section="simulasi"><span>Simulasi</span></a></li>
                        <li class="icon-arrow-circle-right" style="margin-top:17px;color:lightseagreen;"></li>
                        <li><a href="#" data-nav-section="post-test"><span>Post Test</span></a></li>
                        <li class="icon-arrow-circle-right" style="margin-top:17px;"></li>
                        <li><a href="#" data-nav-section="selesai"><span>Selesai</span></a></li>
                    </ul>
                </div>
            </nav>
            
        </div>
    </header>

    <section id="fh5co-contact" data-section="simulasi">
        <div class="clearfix visible-sm-block"></div>
        <div class="container">
            <div class="row">
                <div class="col-md-6 section-heading text-center">
                    <h2 class="to-animate">Simulasi 2</h2>
                    <div class="row">
                        <div class="col-md-8 col-md-offset-2 subtext to-animate">
                            <h3>Ada 2 kakas (<i>tool</i>) yang memiliki fitur berbeda.<br>Anda ditugaskan untuk menyelesaikan soal menggunakan kedua kakas tersebut berdasarkan skenario yang telah dirancang dalam kuesioner ini.</h3>
                        </div>
                    </div>
                </div>
            </div>

            <div class="row">
                <div class="col-md-6 col-sm-6 to-animate">
                    
                    <div id="DivFormSimulasi">
                        <div id="p0" class="tab form-group">
                            <div class="form-control" style="height: 100%">
                                <p style="margin-bottom: 7pt;"><span class="badge badge-info">Pendahuluan</span></p>
                                <p>Sebelum memulai tes inti, sebaiknya perhatikan pada gambar diagram tahapan kuesioner berikut ini.</p>
                                <p style="margin:30px;"><center><img src="images/diagram_kuesioner.png"></center></p>
                                <p>Anda telah melewati Tahap 1, Tahap 2, dan sebagian di Tahap 3 dan Tahap 4.<br>
                                    <br>Anda telah melewati <b>Simulasi 1</b>, yaitu <b>Latihan soal</b>, <b>Tes OPT</b>, <b>Tes CodeViz</b>, dan <b>Post-tes</b>.<br>
                                    <br>Selanjutnya Anda akan melewati <b>Simulasi 2</b>, yaitu <b>Tes CodeViz</b>, <b>Tes OPT</b>, dan <b>Post-tes</b>.</br>
                                    <br>Perbedaannya adalah Anda ditugaskan untuk menyelesaikan soal menggunakan <b>kakas CodeViz</b> terlebih dahulu kemudian menggunakan <b>kakas OPT</b>.</br>
                                </p>

                                <p>Anda siap untuk mulai <b>Tes CodeViz</b> ? Silakan klik tombol di bawah ini.</p>
                            </div>
                        </div>                        
                        <div id="p1" class="tab form-group" style="background-color: #e67e22;">
                            <div class="form-control" style="height: 100%;color: whitesmoke;">
                                <p style="margin-bottom: 7pt;"><span class="badge badge-info">Tes Inti | Core Test</span></p>
                                <p><b>Sesi 1</b> - Waktu Penyelesaian Maksimal: 25 Menit</p>
                                <p>Anda ditugaskan untuk menyelesaikan 5 soal <b>graf kode program</b> dengan bahasa pemrograman C menggunakan <b>kakas CodeViz</b>.</p>
                                <p>Apa itu <a data-toggle="modal" data-target="#kakasCodeViz"><b>Kakas CodeViz</b></a> ? klik <a data-toggle="modal" data-target="#kakasCodeViz">di sini</a> untuk membaca deskripsinya.</p>
                                <p><input class="btn btn-primary btn-lg" value="Mulai - Sesi 1" type="button" onclick="simulasi2sesi1();"></p>
                            </div>
                        </div>
                        <div id="p2" class="tab form-group" style="background-color: #7f8c8d;">
                            <div class="form-control" style="height: 100%;color: whitesmoke;">
                                <p style="margin-bottom: 7pt;"><span class="badge badge-info">Tes Inti | Core Test</span></p>
                                <p><b>Sesi 2</b> - Waktu Penyelesaian Maksimal: 25 Menit</p>
                                <p>Anda ditugaskan untuk menyelesaikan 5 soal <b>graf kode program</b> dengan bahasa pemrograman C menggunakan <b>kakas OPT</b>.</p>
                                <p>Apa itu <a data-toggle="modal" data-target="#kakasOPT"><b>Kakas OPT</b></a> ? klik <a data-toggle="modal" data-target="#kakasOPT">di sini</a> untuk membaca deskripsinya.</p>
                                <p><input class="btn btn-primary btn-lg" value="Mulai - Sesi 2" type="button" onclick="simulasi2sesi2();"></p>
                            </div>
                        </div>
                        
                        <div style="overflow:auto;">
                            <div style="float:center;">
                                <center><input id="nextBtn" class="btn btn-primary btn-lg" value="Soal Berikutnya" type="button" onclick="simulasiNextBtn('post-test2.php',3);"></center>
                            </div>
                        </div>
                    </div>

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
    <script src="js/simulasi.js?v=1"></script>

    <?php require_once('footer.php'); ?>

<div id="kakasOPT" class="modal fade" role="dialog">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <Button type="button" class="close" data-dismiss="modal">&times;</Button>
                <h4 class="modal-title">Kakas OnlinePythonTutor (OPT)</h4>
            </div>
            <div class="modal-body">
                <p>Kakas ini disebut kakas visualisasi program.</p>
                <p>Visualisasi Program adalah kakas yang dapat membantu memvisualisasikan
                    data-data dalam memori komputer ketika melakukan eksekusi kode program.
                    Diharapkan dengan kakas ini dapat membantu dalam mempelajari kode program.</p>
                <p><b>OPT</b></p>
                <p>Tampilan awal kakas OPT dapat dilihat pada gambar berikut ini.</p>
                <p><img src="images/homescreen-opt.png" style="width:100%;" /></p>
                <p>Anda hanya akan menggunakan fitur nomor 2 dan 3. Fitur pada nomor 2 digunakan
                    untuk meng-input kode program dan fitur nomor 3 adalah tombol untuk eksekusi.
                    Ketika proses eksekusi visualisasi berhasil, maka Anda akan melihat tampilan
                    seperti pada gambar berikut ini.
                </p>
                <p><img src="images/visualisasi-opt.png" style="width:100%;"/></p>
                <p>Anda dapat mengedit kode program dengan klik <b>'Edit code'</b>.<br>
                    Tombol <b>'Forward'</b> untuk melihat visualisasi per baris kode program.<br>
                    Tombol <b>'Back'</b> untuk melihat visualisasi sebelumnya.<br>
                    Tombol <b>'Last'</b> untuk melihat visualisasi di akhir kode program.<br>
                    Tombol <b>'First'</b> untuk melihat visualisasi di awal kode program.<br>
                    Untuk membuat breakpoint, cukup klik pada nomor baris kode program.<br>
                    Untuk menghapus breakpoint, cukup klik pada nomor baris yang sebelumnya telah ditandai sebagai breakpoint.<br>
                </p>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">Tutup</button>
            </div>
        </div>
    </div>
</div>

<div id="kakasCodeViz" class="modal fade" role="dialog">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <Button type="button" class="close" data-dismiss="modal">&times;</Button>
                <h4 class="modal-title">Kakas CodeViz (Code Visualization)</h4>
            </div>
            <div class="modal-body">
                <p>Kakas ini disebut kakas visualisasi program.</p>
                <p>Visualisasi Program adalah kakas yang dapat membantu memvisualisasikan
                    data-data dalam memori komputer ketika melakukan eksekusi kode program.
                    Diharapkan dengan kakas ini dapat membantu dalam mempelajari kode program.
                    Kelebihan kakas CodeViz dibanding OPT adalah kakas ini mampu mendeteksi
                    representasi graf dalam data memori komputer sehingga dapat memvisualisasikan
                    graf.</p>
                <p><b>CodeViz</b></p>
                <p>Tampilan awal kakas CodeViz dapat dilihat pada gambar berikut ini.</p>
                <p><img src="images/homescreen-codeviz.png" style="width:100%;" /></p>
                <p>Seperti halnya kakas OPT, pada kakas CodeViz ini Anda hanya menggunakan <b>Code Editor</b>
                    untuk input kode program. Kemudian klik <b>'Visualize Execution'</b> untuk melihat hasil visualisasi.
                </p>
                <p><img src="images/gambarIV.14-codeviz.png" style="width:100%;"/></p>
                <p>Pada Gambar IV.14 terlihat tiga bagian penting, yaitu <b>(a) Navigasi kontrol</b>,
                <b>(b) Slider</b>, dan <b>(c) Panel visualisasi</b>.<br>
                    Pada Navigasi kontrol, terdiri dari 4 <i>button</i> yang dapat digunakan, yaitu:<br>
                    Tombol <b>'Forward'</b> untuk melihat visualisasi per baris kode program.<br>
                    Tombol <b>'Back'</b> untuk melihat visualisasi sebelumnya.<br>
                    Tombol <b>'Last'</b> untuk melihat visualisasi di akhir kode program.<br>
                    Tombol <b>'First'</b> untuk melihat visualisasi di awal kode program.<br>
                    Untuk membuat breakpoint, cukup klik pada nomor baris kode program.<br>
                    Untuk menghapus breakpoint, cukup klik pada nomor baris yang sebelumnya telah ditandai sebagai breakpoint.<br>
                    <br>
                    Pada <b>Slider</b>, Anda dapat menggeser proses langkah visualisasi dengan melompat pada
                    langkah tertentu yang diinginkan.<br>
                    Pada <b>Panel Visualisasi</b>, terdapat 3 bagian tab yaitu Primitif Visualization yang isinya sama dengan milik kakas OPT.
                    Panel kedua <b>Graph Visualization</b> adalah fitur utama dalam kakas CodeViz ini untuk menampilkan visualisasi graf.
                    Kemudian panel terakhir <b>Print Output</b> adalah untuk melihat hasil code <i>printf</i>.<br>
                    Pada code sebelah kiri, terlihat baris berwarna kuning dengan anak panah berwarna merah. Ini mengindikasikan baris kode program
                    yang akan dieksekusi selanjutnya. Untuk baris berwarna <i>gray</i> dengan anak panah berwarna hijau mengindikasikan baris kode program yang saat ini sedang divisualisasikan.
                </p>
                <p><img src="images/gambarIV.15-codeviz.png" style="width:100%;"/></p>
                <p>Pada Gambar IV.15 terlihat visualisasi graf.<br>
                    Anda dapat <b>drag and drop</b> simpul (node) untuk menyesuaikan visual graf.<br>
                    Simpul yang berwarna <i>orange</i>, akan menempel pada posisi yang Anda inginkan.
                    Untuk mengembalikan (release) seperti semula (simpul berwarna biru dongker), cukup <b>double-click</b> pada
                    simpul yang berwarna <i>orange</i> tadi.
                </p>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">Tutup</button>
            </div>
        </div>
    </div>
</div>