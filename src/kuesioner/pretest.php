<?php
session_start();

if(isset($_SESSION['kode'])){
    require_once('db/db.php');
    $kode_unik = $_SESSION['kode'];
    $_DB = new DB();
    $select = $_DB->select('SELECT id_responden, nama_responden, tahap_sekarang FROM responden WHERE kode_unik = '.$kode_unik);
    
    if($select){
        if($select[0]['tahap_sekarang'] == "pretest.php"){
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
                        </ul> <?php echo $select[0]['nama_responden']; ?> sebagai Responden
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
                        <li class="active">
                            <a href="#" data-nav-section="pretest">
                                <span>Pre Test</span>
                            </a>
                        </li>
                        <li class="icon-arrow-circle-right" style="margin-top:17px;color:lightseagreen;"></li>
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
                        <li class="icon-arrow-circle-right" style="margin-top:17px;"></li>
                        <li>
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

    <section id="fh5co-contact" data-section="pretest">
        <div class="clearfix visible-sm-block"></div>
        <div class="container">
            <div class="row">
                <div class="col-md-6 section-heading text-center">
                    <h2 class="to-animate">Pre Test</h2>
                    <div class="row">
                        <div class="col-md-8 col-md-offset-2 subtext to-animate">
                            <h3>Tes ini untuk menggali informasi
                                <br>yang telah Anda ketahui sebelumnya.
                                <br>Mohon kejujuran dan konsentrasi Anda.</h3>
                            <p>Baca lebih lanjut tentang
                                <a data-toggle="modal" data-target="#kebijakan">Kebijakan Privasi</a>.</p>
                        </div>
                    </div>
                </div>
            </div>

            <div class="row">
                <div class="col-md-2 col-sm-2"></div>
                <div class="col-md-8 col-sm-8 to-animate">
                    <form accept-charset="utf-8" method="POST" action="#" name="formPreTest" id="formPreTest">
                        <div style="text-align:center;margin-top:40px;">
                            <h4>Sisa Soal:
                                <b id="sisaPertanyaan">4</b>
                            </h4>
                        </div>
                        <!-- One "tab" for each step in the form: -->
                        <div id="DivFormPreTest">
                            <div id="p1" class="tab form-group">
                                <div class="form-control" style="height: 100%">
                                    <p style="margin-bottom: 7pt;">Apa yang dimaksud dengan graf ?</p>
                                    <div class="row">
                                        <input id="answerP1-a" type="radio" name="answerP1" value="a" onclick="clearInvalid(1, this)"> Graf adalah objek dasar pelajaran dalam teori graf.<br>
                                        <input id="answerP1-b" type="radio" name="answerP1" value="b" onclick="clearInvalid(1, this)"> Graf adalah himpunan dari objek-objek yang dinamakan titik, simpul, atau sudut dihubungkan oleh penghubung yang dinamakan garis atau sisi.<br>
                                        <input id="answerP1-c" type="radio" name="answerP1" value="c" onclick="clearInvalid(1, this)"> Graf adalah gambar kurva (garis atau sisi) yang membentuk bangun datar berupa persegi panjang.<br>
                                        <input id="answerP1-d" type="radio" name="answerP1" value="d" onclick="clearInvalid(1, this)"> Graf adalah gambar grafik untuk kepentingan visualisasi data.<br>
                                        <input id="answerP1-e" type="radio" name="answerP1" value="e" onclick="clearInvalid(1, this)"> Graf adalah objek dasar yang terdiri dari bangun datar dan garis.<br>
                                    </div>
                                </div>
                            </div>
                            <div id="p2" class="tab form-group">
                                <div class="form-control" style="height: 100%">
                                    <p id="p2title" style="margin-bottom: 7pt;">Hitunglah komponen berikut ini berdasarkan pada gambar di bawah ini:</p>
                                    <p>Simpul = ... buah<br>Sisi = ... buah<br>Derajat pada simpul X = ... buah</p>
                                    <div class="row">
                                        <div class="col-md-6 col-sm-6">
                                            <input id="answerP2-a" type="radio" name="answerP2" value="a" onclick="clearInvalid(2, this)"> 3, 11, dan 5<br>
                                            <input id="answerP2-b" type="radio" name="answerP2" value="b" onclick="clearInvalid(2, this)"> 5, 6, dan 5<br>
                                            <input id="answerP2-c" type="radio" name="answerP2" value="c" onclick="clearInvalid(2, this)"> 9, 18, dan 6<br>
                                            <input id="answerP2-d" type="radio" name="answerP2" value="d" onclick="clearInvalid(2, this)"> 9, 14, dan 5<br>
                                            <input id="answerP2-e" type="radio" name="answerP2" value="e" onclick="clearInvalid(2, this)"> 10, 14, dan 5<br>
                                        </div>
                                        <div class="col-md-6 col-sm-6">
                                            <center><img src="images/pretest-p5.jpg" style="width: 100%;height: 100%;"></center>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div id="p3" class="tab form-group">
                                <div class="form-control" style="height: 100%">
                                    <p id="p3title" style="margin-bottom: 7pt;">Apakah Anda familiar dengan teori graf ?</p>
                                    <select id="answerP3" name="answerP3" class="form-control" required onchange="checkAnswer(this);">
                                        <option value="" selected disabled>Silahkan Pilih</option>                
                                        <option value="y">Ya</option>                
                                        <option value="t">Tidak</option>       
                                    </select>
                                </div>
                            </div>
                            <div id="p4" class="tab form-group">
                                <div class="form-control" style="height: 100%">
                                    <p style="margin-bottom: 7pt;">Apakah Anda familiar dengan bahasa pemrograman C ?</p>
                                    <select id="answerP4" name="answerP4" class="form-control" required onchange="bahasaPem(this);">
                                        <option value="" selected disabled>Silahkan Pilih</option>                
                                        <option value="y">Ya</option>                
                                        <option value="t">Tidak</option>       
                                    </select>
                                </div>
                            </div>
                            <div id="programC" style="display:none;" class="tab2 form-group">
                                <div class="form-control">
                                    <p style="margin-bottom: 7pt;">Apakah Anda pernah memprogram struktur data graf dengan bahasa pemrograman C ?</p>
                                    <select name="pC" id="pC" class="form-control" required onchange="bahasaPem(this);">
                                        <option value="" selected disabled>Silahkan Pilih</option>
                                        <option value="a">Ya Pernah</option>
                                        <option value="b">Tidak Pernah</option>
                                        <option value="c">Lupa/Tidak Tahu</option>
                                    </select>
                                </div>
                            </div>
                            <div id="lastC" style="display:none;" class="tab2 form-group">
                                <div class="form-control">
                                    <p style="margin-bottom: 7pt;">Kapan Anda kali terkahir menggunakan bahasa pemrograman C ?</p>
                                    <select name="lastpC" id="lastpC" class="form-control" required>
                                        <option value="" selected disabled>Silahkan Pilih</option>
                                        <option value="a">Hari ini</option>
                                        <option value="b">Kemarin</option>
                                        <option value="c">2 hari lalu</option>
                                        <option value="d">lebih dari 3 hari lalu</option>
                                        <option value="e">Lupa/Tidak Tahu</option>
                                    </select>
                                </div>
                            </div>

                        </div>

                        <div style="overflow:auto;">
                            <div style="float:right;">
                                <input id="nextBtn" style="display:none;" class="btn btn-primary btn-lg" value="Lanjut" type="button" onclick="preTest(1)">
                            </div>
                        </div>
                    </form>
                </div>
                <div class="col-md-2 col-sm-2"></div>
            </div>

        </div>

    </section>

    <div style="height:133px;"></div>

    <?php require_once('footer.php'); ?>
    <script src="js/pretest.js?v=1"></script>