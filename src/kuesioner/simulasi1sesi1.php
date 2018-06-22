<?php
session_start();

if(isset($_SESSION['kode'])){
    # Ok
} else {
    header("Location: index.php");
    exit;
}
?>
<?php require_once('header.php'); ?>

<body onunload="_DESTROY_OPT()">
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
                        </ul> Simulasi 1 - OPT <p class="timer-simulasi" id="timer">Sisa Waktu: 15 menit 0 detik</p>
                    </div>
                </div>
            </nav>
            
        </div>
    </header>

    <section id="fh5co-contact" data-section="simulasi">
        <div class="clearfix visible-sm-block"></div>
        <div class="container">
            <div class="row">
                <div class="col-md-6 section-heading text-center">
                    <h2 class="to-animate">Simulasi 1 - OPT</h2>
                    <div class="row">
                        <div class="col-md-8 col-md-offset-2 subtext to-animate">
                            <h3>Anda ditugaskan untuk menyelesaikan 3 soal kode program dengan bahasa pemrograman C menggunakan <a data-toggle="modal" data-target="#kakasOPT"><b>kakas OPT</b></a>.</h3>
                        </div>
                    </div>
                </div>
            </div>

            <div class="row">
                <div class="col-md-12 col-sm-12 to-animate">
                    
                    <div id="DivFormSimulasi">
                        <div id="p1" class="tab form-group">
                            <div class="form-control" style="height: 100%">
                                <p style="margin-bottom: 7pt;"><span class="badge badge-info">Tes Inti | Simulasi 1 - OPT</span></p>
                                <p><b>Soal 1</b></p>
                                <p>Silakan perbaiki kesalahan sintaks pada kode program berikut ini !</p>
                                <p>Berapa bobot antara simpul 7 dan 1 dari struktur data graf pada kode program tersebut ?</p>
                                <div class="row">
                                    <div class="col-md-6 col-sm-6 to-animate">
                                        <select id="answerP1" name="answerP1" class="form-control" onchange="checkAnswer(this, 1);">
                                            <option value="" selected disabled>Silahkan Pilih</option>                
                                            <option value="a">10</option>                
                                            <option value="b">4</option>                
                                            <option value="c">7</option>                
                                            <option value="d">3</option>    
                                            <option value="e">Tidak dapat ditentukan</option>        
                                        </select>
                                    </div>
                                    <div class="col-md-6 col-sm-6 to-animate">
                                        <div style="overflow:auto;">
                                            <div style="float:center;">
                                                <center><input id="nextBtn1" class="btn btn-primary btn-lg" style="display:none;" value="Simpan" type="button" onclick="simulasi1sesi1NextBtn(1)"></center>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <iframe id="OPT1" width="100%" height="600" frameborder="0" src="http://localhost:3000/opt/#code=%23include%20%E2%80%9Cstdio.h%E2%80%9D%0A%0Aint%20ar%5B10%5D%5B10%5D,%20completed%5B10%5D,%20n,%20cost%20%3D%200%3B%0A%0Avoid%20takeInput%28%29%0A%7B%0A%20%20%20%20int%20i,%20j%3B%0A%0A%20%20%20%20printf%28%22the%20number%20of%20villages%3A%20%22%29%3B%0A%20%20%20%20n%20%3D%204%3B%0A%0A%20%20%20%20printf%28%22%5Cnthe%20Cost%20Matrix%5Cn%22%29%3B%0A%0A%20%20%20%20for%20%28i%20%3D%200%3B%20i%20%3C%20n%3B%20i%2B%2B%29%0A%20%20%20%20%7B%0A%20%20%20%20%20%20%20%20printf%28%22%5CnElements%20of%20Row%3A%20%25d%5Cn%22,%20i%20%2B%201%29%3B%0A%20%20%20%20%20%20%20%20ary%5Bi%5D%5B0%5D%20%3D%203%3B%0A%20%20%20%20%20%20%20%20ary%5Bi%5D%5B1%5D%20%3D%207%3B%0A%20%20%20%20%20%20%20%20ary%5Bi%5D%5B2%5D%20%3D%204%3B%0A%20%20%20%20%20%20%20%20ary%5Bi%5D%5B3%5D%20%3D%209%3B%0A%20%20%20%20%20%20%20%20completed%5Bi%5D%20%3D%200%3B%0A%20%20%20%20%7D%0A%0A%20%20%20%20printf%28%22%5Cn%5CnThe%20cost%20list%20is%3A%22%29%3B%0A%0A%20%20%20%20for%20%28i%20%3D%200%3B%20i%20%3C%20n%3B%20i%2B%2B%29%0A%20%20%20%20%7B%0A%20%20%20%20%20%20%20%20printf%28%22%5Cn%22%29%3B%0A%0A%20%20%20%20%20%20%20%20for%20%28j%20%3D%200%3B%20j%20%3C%20n%20j%2B%2B%29%0A%20%20%20%20%20%20%20%20%20%20%20%20printf%28%22%5Ct%25d%22,%20ary%5Bi%5D%5Bj%5D%29%3B%0A%20%20%20%20%7D%0A%7D%0A%0Avoid%20mincost%28int%20city%29%0A%7B%0A%20%20%20%20int%20i,%20ncity%3B%0A%0A%20%20%20%20completed%5Bcity%5D%20%3D%201%3B%0A%0A%20%20%20%20printf%28%22%25d---%3E%22,%20city%20%2B%201%29%3B%0A%20%20%20%20ncity%20%3D%20least%28city%29%3B%0A%0A%20%20%20%20if%20%28ncity%20%3D%3D%20999%29%0A%20%20%20%20%7B%0A%20%20%20%20%20%20%20%20ncity%20%3D%200%3B%0A%20%20%20%20%20%20%20%20printf%28%22%25d%22,%20ncity%20%2B%201%29%3B%0A%20%20%20%20%20%20%20%20cost%20%2B%3D%20ary%5Bcity%5D%5Bncity%5D%3B%0A%0A%20%20%20%20%20%20%20%20return%3B%0A%20%20%20%20%7D%0A%0A%20%20%20%20mincost%28ncity%29%3B%0A%7D%0A%0Aint%20least%28int%20c%29%0A%7B%0A%20%20%20%20int%20i,%20nc%20%3D%20999%3B%0A%20%20%20%20int%20min%20%3D%20999,%20kmin%3B%0A%0A%20%20%20%20for%20%28i%20%3D%200%20i%20%3C%20n%3B%20i%2B%2B%29%0A%20%20%20%20%7B%0A%20%20%20%20%20%20%20%20if%20%28%28ary%5Bc%5D%5Bi%5D%20!%3D%200%29%20%26%26%20%28completed%5Bi%5D%20%3D%3D%200%29%29%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20if%20%28ary%5Bc%5D%5Bi%5D%20%2B%20ary%5Bi%5D%5Bc%5D%20%3C%20min%29%0A%20%20%20%20%20%20%20%20%20%20%20%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20min%20%3D%20ary%5Bi%5D%5B0%5D%20%2B%20ary%5Bc%5D%5Bi%5D%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20kmin%20%3D%20ary%5Bc%5D%5Bi%5D%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20nc%20%3D%20i%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%7D%0A%0A%20%20%20%20if%20%28min%20!%3D%20999%29%0A%20%20%20%20%20%20%20%20cost%20%2B%3D%20kmin%3B%0A%0A%20%20%20%20return%20nc%3B%0A%7D%0A%0Aint%20main%28%29%0A%7B%0A%20%20%20%20takeInput%28%29%3B%0A%0A%20%20%20%20printf%28%22%5Cn%5CnThe%20Path%20is%3A%5Cn%22%29%3B%0A%20%20%20%20mincost%280%29%3B%0A%0A%20%20%20%20print%28%22%5Cn%5CnMinimum%20cost%20is%20%25d%5Cn%20%22,%20cost%29%3B%0A%0A%20%20%20%20return%200%3B%0A%7D&mode=edit&origin=opt-frontend.js&py=c&rawInputLstJSON=%5B%5D"> </iframe>
                            </div>
                        </div>
                        <div id="p2" class="tab form-group">
                            <div class="form-control" style="height: 100%">
                                <p style="margin-bottom: 7pt;"><span class="badge badge-info">Tes Inti | Simulasi 1 - OPT</span></p>
                                <p><b>Soal 2</b></p>
                                <p>Silakan perbaiki kesalahan sintaks pada kode program berikut ini !</p>
                                <p>Apa kegunaan fungsi XYZ dibuat ?</p>
                                <div class="row">
                                    <div class="col-md-6 col-sm-6 to-animate">
                                        <select id="answerP2" name="answerP2" class="form-control" onchange="checkAnswer(this, 2);">
                                            <option value="" selected disabled>Silahkan Pilih</option>                
                                            <option value="a">Menghitung derajat simpul</option>                
                                            <option value="b">Menghitung jumlah sisi</option>                
                                            <option value="c">Menghitung simpul yang berdekatan</option>                
                                            <option value="d">Menghitung jarak antar simpul</option>    
                                            <option value="e">Tidak dapat ditentukan</option>        
                                        </select>
                                    </div>
                                    <div class="col-md-6 col-sm-6 to-animate">
                                        <div style="overflow:auto;">
                                            <div style="float:center;">
                                                <center><input id="nextBtn2" class="btn btn-primary btn-lg" style="display:none;" value="Simpan" type="button" onclick="simulasi1sesi1NextBtn(2)"></center>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <iframe id="OPT2" width="100%" height="600" frameborder="0" src="http://localhost:3000/opt/#code=%23include%20%E2%80%9Cstdio.h%E2%80%9D%0A%23include%20%E2%80%9Ctime.h%E2%80%9D%0A%23define%20infinity%20999%0A%0Aint%20graf%5B10%5D%5B10%5D,%20X%5B10%5D,%20n,%20c%20%3D%200%3B%0A%0Aint%20R%28const%20int%20nMin,%20const%20int%20nMax%29%0A%7B%0A%20%20%20%20return%20rand%28%29%20%25%20%28nMax%20-%20nMin%29%20%2B%20nMin%0A%7D%0A%0Avoid%20Z%28%29%0A%7B%0A%20%20%20%20int%20j%3B%0A%0A%20%20%20%20n%20%3D%20R%283,%209%29%3B%20%20%20%20%0A%0A%20%20%20%20for%20%28i%20%3D%200%3B%20i%20%3C%20n%3B%20i%2B%2B%29%0A%20%20%20%20%7B%0A%20%20%20%20%20%20%20%20for%20%28j%20%3D%200%3B%20j%20%3C%20n%3B%20j%2B%2B%29%0A%20%20%20%20%20%20%20%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20graf%5Bi%5D%5Bj%5D%20%3D%20R%280,%2017%29%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20if%20%28graf%5Bi%5D%5Bj%5D%20%3D%3D%200%29%0A%20%20%20%20%20%20%20%20%20%20%20%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20graf%5Bi%5D%5Bj%5D%20%3D%20infinity%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20graf%5Bj%5D%5Bi%5D%20%3D%20infinity%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%20%20%20%20%20%20else%0A%20%20%20%20%20%20%20%20%20%20%20%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20graf%5Bj%5D%5Bi%5D%20%3D%20graf%5Bi%5D%5Bj%5D%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%20%20%7D%0A%0A%20%20%20%20%20%20%20%20X%5Bi%5D%20%3D%200%3B%0A%20%20%20%20%7D%0A%0A%20%20%20%20for%20%28i%20%3D%200%3B%20i%20%3C%20n%20i%2B%2B%29%0A%20%20%20%20%7B%0A%20%20%20%20%20%20%20%20printf%28%22%5Cn%22%29%3B%0A%0A%20%20%20%20%20%20%20%20for%20%28j%20%3D%200%3B%20j%20%3C%20n%3B%20j%2B%2B%29%0A%20%20%20%20%20%20%20%20%20%20%20%20printf%28%22%5Ct%25d%22,%20graf%5Bi%5D%5Bj%5D%29%3B%0A%20%20%20%20%7D%0A%7D%0A%0Avoid%20fungsiku%28int%20s%29%0A%7B%0A%20%20%20%20int%20i,%20n%3B%0A%0A%20%20%20%20X%5Bs%5D%20%3D%201%3B%0A%0A%20%20%20%20printf%28%22%25d---%3E%22,%20s%20%2B%201%29%3B%0A%20%20%20%20n%20%3D%20xyz%28s%29%3B%0A%0A%20%20%20%20if%20%28n%20%3D%3D%20999%29%0A%20%20%20%20%7B%0A%20%20%20%20%20%20%20%20n%20%3D%200%3B%0A%20%20%20%20%20%20%20%20printf%28%22%25d%22,%20n%20%2B%201%29%3B%0A%20%20%20%20%20%20%20%20c%20%2B%3D%20grf%5Bs%5D%5Bn%5D%3B%0A%0A%20%20%20%20%20%20%20%20return%3B%0A%20%20%20%20%7D%0A%0A%20%20%20%20fungsiku%28n%29%3B%0A%7D%0A%0Aint%20xyz%28int%20c%29%0A%7B%0A%20%20%20%20int%20i,%20nc%20%3D%20999%3B%0A%20%20%20%20int%20min%20%3D%20999,%20kmin%3B%0A%0A%20%20%20%20for%20%28i%20%3D%200%3B%20i%20%3C%20n%3B%20i%2B%2B%29%0A%20%20%20%20%7B%0A%20%20%20%20%20%20%20%20if%20%28%28graf%5Bc%5D%5Bi%5D%20!%3D%200%29%20%26%26%20%28X%5Bi%5D%20%3D%3D%200%29%29%0A%20%20%20%20%20%20%20%20%20%20%20%20if%20%28graf%5Bc%5D%5Bi%5D%20%2B%20graf%5Bi%5D%5Bc%5D%20%3C%20min%29%0A%20%20%20%20%20%20%20%20%20%20%20%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20min%20%3D%20graf%5Bi%5D%5B0%5D%20%2B%20graf%5Bc%5D%5Bi%5D%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20kmin%20%3D%20graf%5Bc%5D%5Bi%5D%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20nc%20%3D%20i%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%7D%0A%0A%20%20%20%20if%20%28min%20!%3D%20999%29%0A%20%20%20%20%20%20%20%20c%20%2B%3D%20kmin%3B%0A%0A%20%20%20%20return%20n%3B%0A%7D%0A%0Aint%20main%28%29%0A%7B%0A%20%20%20%20srand%28time%28NULL%29%29%3B%0A%20%20%20%20Z%28%29%3B%0A%20%20%20%20printf%28%22%5Cn%22%29%3B%0A%0A%20%20%20%20fungsiku%280%29%3B%0A%0A%20%20%20%20printf%28%22%5Cn%5CnMin%3A%20%25d%5Cn%20%22,%20c%29%3B%0A%0A%20%20%20%20return%200%3B%0A%7D&mode=edit&origin=opt-frontend.js&py=c&rawInputLstJSON=%5B%5D"> </iframe>
                            </div>
                        </div>
                        <div id="p3" class="tab form-group">
                            <div class="form-control" style="height: 100%">
                                <p style="margin-bottom: 7pt;"><span class="badge badge-info">Tes Inti | Simulasi 1 - OPT</span></p>
                                <p><b>Soal 3</b></p>
                                <p>Silakan perbaiki kesalahan sintaks pada kode program berikut ini !</p>
                                <p>Berapa jumlah simpul pada kode program berikut ini ?</p>
                                <div class="row">
                                    <div class="col-md-6 col-sm-6 to-animate">
                                        <select id="answerP3" name="answerP3" class="form-control" onchange="checkAnswer(this, 3);">
                                            <option value="" selected disabled>Silahkan Pilih</option>                
                                            <option value="a">3</option>                
                                            <option value="b">8</option>                
                                            <option value="c">7</option>                
                                            <option value="d">2</option>    
                                            <option value="e">4</option>        
                                        </select>
                                    </div>
                                    <div class="col-md-6 col-sm-6 to-animate">
                                        <div style="overflow:auto;">
                                            <div style="float:center;">
                                                <center><input id="nextBtn3" class="btn btn-primary btn-lg" style="display:none;" value="Simpan" type="button" onclick="simulasi1sesi1NextBtn(3)"></center>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <iframe id="OPT3" width="100%" height="600" frameborder="0" src="http://localhost:3000/opt/#code=%23include%20%E2%80%9Cstdio.h%E2%80%9D%0A%0Aint%20row%20%3D%204,%20col%20%3D%204%3B%0Aint%20i,%20j,%0Agraf%5B4%5D%5B4%5D%20%3D%20%7B%20%20%7B%200,%202,%203,%201%7D,%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%7B%202,%200,%207,%209%7D,%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%7B%203,%207,%200,%208%7D,%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%7B%201,%209,%208,%200%7D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%7D%3B%0A%0AInt%20main%28%29%0A%7B%0A%20%20%20%20print%28%22%5CnGraf%3A%5Cn%22%29%3B%0A%20%20%20%20for%20%28i%20%3D%200%3B%20i%20%3C%20row%3B%20i%2B%2B%29%0A%20%20%20%20%20%20%20%20for%20%28j%20%3D%200%20j%20%3C%20col%3B%20j%2B%2B%29%0A%20%20%20%20%20%20%20%20%20%20%20%20printf%28%22graf%5B%25d%5D%5B%25d%5D%3A%20%25d%5Cn%22,i,j,graf%5Bi%5D%5Bj%5D%29%0A%0A%20%20%20%20return%200%3B%0A%7D&mode=edit&origin=opt-frontend.js&py=c&rawInputLstJSON=%5B%5D"> </iframe>
                            </div>
                        </div>

                    </div>

                </div>

            </div>

        </div>
    </section>

    <div style="height:133px;"></div>

    <?php require_once('footer.php'); ?>
    <script src="js/simulasi.js?v=4"></script>
    <script src="js/simulasi1sesi1.js?v=8"></script>

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