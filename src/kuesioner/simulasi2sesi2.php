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
                        </ul> Simulasi 2 - OPT <p class="timer-simulasi" id="timer">Sisa Waktu: 15 menit 0 detik</p>
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
                    <h2 class="to-animate">Simulasi 2 - OPT</h2>
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
                                <p style="margin-bottom: 7pt;"><span class="badge badge-info">Tes Inti | Simulasi 2 - OPT</span></p>
                                <p><b>Soal 1</b></p>
                                <p>Silakan perbaiki kesalahan sintaks pada kode program berikut ini !</p>
                                <p>apa nama algoritma yang paling sesuai untuk kode program berikut ini ?</p>
                                <div class="row">
                                    <div class="col-md-6 col-sm-6 to-animate">
                                        <select id="answerP1" name="answerP1" class="form-control" onchange="checkAnswer(this, 1);">
                                            <option value="" selected disabled>Silahkan Pilih Jawaban Anda</option>                
                                            <option value="a">Dijkstra</option>                
                                            <option value="b">Bellman Ford</option>                
                                            <option value="c">Depth First Search (DFS)</option>                
                                            <option value="d">Breadth First Search (BFS)</option>    
                                            <option value="e">Tidak diketahui</option>        
                                        </select>
                                    </div>
                                    <div class="col-md-6 col-sm-6 to-animate">
                                        <div style="overflow:auto;">
                                            <div style="float:center;">
                                                <center><input id="nextBtn1" class="btn btn-primary btn-lg" style="display:none;" value="Simpan" type="button" onclick="simulasi2sesi2NextBtn(1)"></center>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <iframe id="OPT1" width="100%" height="600" frameborder="0" src="http://localhost:3000/opt/#code=%23include%20stdio.h%0A%23define%20infinity%20999%0A%0Avoid%20XYZ%28int%20n,%20int%20v,%20int%20cost%5B7%5D%5B7%5D,%20int%20dist%5B10%5D%29%7B%0A%20%20%20%20int%20i,%20u,%20count,%20w,%20flag%5B10%5D,%20min%3B%0A%0A%20%20%20%20for%20%28i%20%3D%201%3B%20i%20%3C%3D%20n%3B%20i%2B%2B%29%7B%0A%20%20%20%20%20%20%20%20flag%5Bi%5D%20%3D%200%3B%0A%20%20%20%20%20%20%20%20dist%5Bi%5D%20%3D%20cost%5Bv%5D%5Bi%5D%3B%0A%20%20%20%20%7D%0A%20%20%20%20%0A%20%20%20%20count%20%3D%202%0A%20%20%20%20%0A%20%20%20%20while%20%28count%20%3C%3D%20n%29%7B%0A%20%20%20%20%20%20%20%20min%20%3D%2099%3B%0A%20%20%20%20%20%20%20%20for%20%28w%20%3D%201%3B%20w%20%3C%3D%20n%3B%20w%2B%2B%29%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20if%20%28dist%5Bw%5D%20%3C%20min%20%26%26%20!flag%5Bw%5D%29%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20min%20%3D%20dist%5Bw%5D%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20u%20%3D%20w%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%20%20%0A%20%20%20%20%20%20%20%20flag%5Bu%5D%20%3D%201%3B%0A%20%20%20%20%20%20%20%20count%2B%2B%3B%0A%0A%20%20%20%20%20%20%20%20for%20%28w%20%3D%201%3B%20w%20%3C%3D%20n%3B%20w%2B%2B%29%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20if%20%28%28dist%5Bu%5D%20%2B%20cost%5Bu%5D%5Bw%5D%20%3C%20dist%5Bw%5D%29%20%26%26%20!flag%5Bw%5D%29%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20dist%5Bw%5D%20%3D%20dist%5Bu%5D%20%2B%20cost%5Bu%5D%5Bw%5D%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%7D%0A%7D%0A%0Aint%20main%28%29%0A%7B%0A%20%20%20%20int%20n,%20v,%20i,%20dist%5B10%5D%20%3D%20%7B0%7D%3B%0A%20%20%20%20%0A%20%20%20%20n%20%3D%206%3B%0A%20%20%20%20printf%28%22%5Cnthe%20number%20of%20nodes%3A%20%25d%20%5Cn%22,%20n%29%3B%0A%20%20%20%20%0A%20%20%20%20print%28%22%5Cnthe%20cost%20matrix%3A%5Cn%22%29%3B%0A%20%20%20%20int%20cost%5B7%5D%5B7%5D%20%3D%20%7B%20%20%7B%200,%20%20%20%20%20%20%20%200,%20%20%20%20%20%20%20%200,%20%20%20%20%20%20%20%200,%20%20%20%20%20%20%20%200,%20%20%20%20%20%20%20%200,%20%20%20%20%20%20%20%200%7D,%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%7B%200,%20infinity,%20%20%20%20%20%20%20%205,%20infinity,%20infiniti,%20infinity,%20%20%20%20%20%20%20%208%7D,%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%7B%200,%20%20%20%20%20%20%20%205,%20infinity,%20%20%20%20%20%20%20%207,%20infinity,%20%20%20%20%20%20%20%202,%20infinity%7D,%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%7B%200,%20infinity,%20%20%20%20%20%20%20%207,%20infiniti,%20%20%20%20%20%20%20%209,%20infinity,%20infinity%7D,%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%7B%200,%20infinity,%20infinity,%20%20%20%20%20%20%20%209,%20infinity,%20%20%20%20%20%20%20%204,%20infinity%7D,%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%7B%200,%20infinity,%20%20%20%20%20%20%20%202,%20infinity,%20%20%20%20%20%20%20%204,%20infinity,%20infinity%7D,%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%7B%200,%20%20%20%20%20%20%20%208,%20infinity,%20infinity,%20infinity,%20infinity,%20infinity%7D%20%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%7D%3B%0A%20%20%20%20%0A%20%20%20%20v%20%3D%202%3B%0A%20%20%20%20printf%28%22%5Cnthe%20source%20matrix%3A%20%25d%20%5Cn%22,%20v%29%3B%0A%20%20%20%20%0A%20%20%20%20XYZ%28n,%20v,%20cost,%20dist%29%3B%0A%20%20%20%20%0A%20%20%20%20printf%28%22%5CnShortest%20path%3A%5Cn%22%29%3B%0A%20%20%20%20for%20%28i%20%3D%201%3B%20i%20%3C%3D%20n%3B%20i%2B%2B%29%7B%0A%20%20%20%20%20%20%20%20if%20%28i%20!%3D%20v%29%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20printf%28%22%25d-%3E%25d,cost%3D%25d%5Cn%22,%20v,%20i,%20dist%5Bi%5D%29%3B%0A%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%7D%0A%0A%20%20%20%20return%200%3B%0A%7D&mode=edit&origin=opt-frontend.js&py=c&rawInputLstJSON=%5B%5D"> </iframe>
                            </div>
                        </div>
                        <div id="p2" class="tab form-group">
                            <div class="form-control" style="height: 100%">
                                <p style="margin-bottom: 7pt;"><span class="badge badge-info">Tes Inti | Simulasi 2 - OPT</span></p>
                                <p><b>Soal 2</b></p>
                                <p>Berapa bobot minimum dari simpul 2 ke simpul 3 pada kode program berikut ini ?</p>
                                <div class="row">
                                    <div class="col-md-6 col-sm-6 to-animate">
                                        <select id="answerP2" name="answerP2" class="form-control" onchange="checkAnswer(this, 2);">
                                            <option value="" selected disabled>Silahkan Pilih Jawaban Anda</option>                
                                            <option value="a">2</option>                
                                            <option value="b">3</option>                
                                            <option value="c">4</option>                
                                            <option value="d">8</option>    
                                            <option value="e">11</option>        
                                        </select>
                                    </div>
                                    <div class="col-md-6 col-sm-6 to-animate">
                                        <div style="overflow:auto;">
                                            <div style="float:center;">
                                                <center><input id="nextBtn2" class="btn btn-primary btn-lg" style="display:none;" value="Simpan" type="button" onclick="simulasi2sesi2NextBtn(2)"></center>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <iframe id="OPT2" width="100%" height="600" frameborder="0" src="http://localhost:3000/opt/#code=%23include%20%22stdio.h%22%0A%0Avoid%20X%28int%20graf%5B4%5D%5B4%5D,%20int%20m,%20int%20n%29%7B%0A%20%20printf%28%22%5CnHitung%20jarak%20antar%20simpul%20%25d%20ke%20%25d%5Cn%22,%20m,%20n%29%3B%0A%7D%0A%0Aint%20main%28%29%7B%0A%20%20int%20row%20%3D%204,%20col%20%3D%204%3B%0A%20%20int%20i,%20j,%0A%20%20graf%5B4%5D%5B4%5D%20%3D%20%7B%20%20%7B%200,%202,%203,%201%7D,%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%7B%202,%200,%207,%209%7D,%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%7B%203,%207,%200,%208%7D,%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%7B%201,%209,%208,%200%7D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%7D%3B%20%20%20%20%0A%20%20printf%28%22%5CnGraf%3A%5Cn%22%29%3B%0A%20%20for%20%28i%20%3D%200%3B%20i%20%3C%20row%3B%20i%2B%2B%29%0A%20%20%20%20for%20%28j%20%3D%200%3B%20j%20%3C%20col%3B%20j%2B%2B%29%7B%0A%20%20%20%20%20%20printf%28%22graf%5B%25d%5D%5B%25d%5D%3A%20%25d%5Cn%22,i,j,graf%5Bi%5D%5Bj%5D%29%3B%0A%20%20%20%20%20%20X%28graf,%20i,%20j%29%3B%0A%20%20%20%20%7D%0A%20%20return%200%3B%0A%7D&mode=edit&origin=opt-frontend.js&py=c&rawInputLstJSON=%5B%5D"> </iframe>
                            </div>
                        </div>
                        <div id="p3" class="tab form-group">
                            <div class="form-control" style="height: 100%">
                                <p style="margin-bottom: 7pt;"><span class="badge badge-info">Tes Inti | Simulasi 2 - OPT</span></p>
                                <p><b>Soal 3</b></p>
                                <p>Berapa jumlah sisi (edge) yang dimiliki oleh kode program berikut ini ?</p>
                                <div class="row">
                                    <div class="col-md-6 col-sm-6 to-animate">
                                        <select id="answerP3" name="answerP3" class="form-control" onchange="checkAnswer(this, 3);">
                                            <option value="" selected disabled>Silahkan Pilih Jawaban Anda</option>                
                                            <option value="a">6</option>                
                                            <option value="b">7</option>                
                                            <option value="c">8</option>                
                                            <option value="d">9</option>    
                                            <option value="e">13</option>        
                                        </select>
                                    </div>
                                    <div class="col-md-6 col-sm-6 to-animate">
                                        <div style="overflow:auto;">
                                            <div style="float:center;">
                                                <center><input id="nextBtn3" class="btn btn-primary btn-lg" style="display:none;" value="Simpan" type="button" onclick="simulasi2sesi2NextBtn(3)"></center>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <iframe id="OPT3" width="100%" height="600" frameborder="0" src="http://localhost:3000/opt/#code=%23include%20%22stdio.h%22%0A%23define%20Z%20999%0A%0Avoid%20A%28int%20n,%20int%20v,%20int%20cost%5B7%5D%5B7%5D,%20int%20dist%5B10%5D%29%7B%0A%20%20%20%20int%20i,%20u,%20count,%20w,%20F%5B10%5D,%20min%3B%0A%0A%20%20%20%20for%20%28i%20%3D%201%3B%20i%20%3C%3D%20n%3B%20i%2B%2B%29%7B%0A%20%20%20%20%20%20%20%20F%5Bi%5D%20%3D%200%3B%0A%20%20%20%20%20%20%20%20dist%5Bi%5D%20%3D%20cost%5Bv%5D%5Bi%5D%3B%0A%20%20%20%20%7D%0A%20%20%20%20%0A%20%20%20%20count%20%3D%202%3B%0A%20%20%20%20%0A%20%20%20%20while%20%28count%20%3C%3D%20n%29%7B%0A%20%20%20%20%20%20%20%20min%20%3D%2099%3B%0A%20%20%20%20%20%20%20%20for%20%28w%20%3D%201%3B%20w%20%3C%3D%20n%3B%20w%2B%2B%29%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20if%20%28dist%5Bw%5D%20%3C%20min%20%26%26%20!F%5Bw%5D%29%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20min%20%3D%20dist%5Bw%5D%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20u%20%3D%20w%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%20%20%0A%20%20%20%20%20%20%20%20F%5Bu%5D%20%3D%201%3B%0A%20%20%20%20%20%20%20%20count%2B%2B%3B%0A%0A%20%20%20%20%20%20%20%20for%20%28w%20%3D%201%3B%20w%20%3C%3D%20n%3B%20w%2B%2B%29%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20if%20%28%28dist%5Bu%5D%20%2B%20cost%5Bu%5D%5Bw%5D%20%3C%20dist%5Bw%5D%29%20%26%26%20!F%5Bw%5D%29%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20dist%5Bw%5D%20%3D%20dist%5Bu%5D%20%2B%20cost%5Bu%5D%5Bw%5D%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%7D%0A%7D%0A%0Aint%20main%28%29%0A%7B%0A%20%20%20%20int%20n,%20v,%20i,%20dist%5B10%5D%20%3D%20%7B0%7D%3B%0A%20%20%20%20%0A%20%20%20%20n%20%3D%206%3B%0A%20%20%20%20printf%28%22%5Cnthe%20number%20of%20nodes%3A%20%25d%20%5Cn%22,%20n%29%3B%0A%20%20%20%20%0A%20%20%20%20printf%28%22%5Cnthe%20cost%20matrix%3A%5Cn%22%29%3B%0A%20%20%20%20int%20graf%5B7%5D%5B7%5D%20%3D%20%7B%20%20%7B%200,%200,%200,%200,%200,%200,%200%7D,%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%7B%200,%20Z,%205,%20Z,%20Z,%20Z,%208%7D,%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%7B%200,%205,%20Z,%207,%20Z,%202,%20Z%7D,%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%7B%200,%20Z,%207,%20Z,%209,%20Z,%20Z%7D,%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%7B%200,%20Z,%20Z,%209,%20Z,%204,%20Z%7D,%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%7B%200,%20Z,%202,%20Z,%204,%20Z,%20Z%7D,%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%7B%200,%208,%20Z,%20Z,%20Z,%20Z,%20Z%7D%20%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%7D%3B%0A%20%20%20%20%0A%20%20%20%20v%20%3D%202%3B%0A%20%20%20%20printf%28%22%5Cnthe%20source%20matrix%3A%20%25d%20%5Cn%22,%20v%29%3B%0A%20%20%20%20%0A%20%20%20%20A%28n,%20v,%20graf,%20dist%29%3B%0A%20%20%20%20%0A%20%20%20%20printf%28%22%5CnShortest%20path%3A%5Cn%22%29%3B%0A%20%20%20%20for%20%28i%20%3D%201%3B%20i%20%3C%3D%20n%3B%20i%2B%2B%29%7B%0A%20%20%20%20%20%20%20%20if%20%28i%20!%3D%20v%29%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20printf%28%22%25d-%3E%25d,graf%3D%25d%5Cn%22,%20v,%20i,%20dist%5Bi%5D%29%3B%0A%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%7D%0A%0A%20%20%20%20return%200%3B%0A%7D&mode=edit&origin=opt-frontend.js&py=c&rawInputLstJSON=%5B%5D"> </iframe>
                            </div>
                        </div>

                    </div>

                </div>

            </div>

        </div>
    </section>

    <div style="height:133px;"></div>
    
    <?php require_once('footer.php'); ?>
    <script src="js/simulasi.js?v=2"></script>
    <script src="js/simulasi2sesi2.js?v=2"></script>

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