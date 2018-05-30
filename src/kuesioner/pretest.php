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

        /* Make circles that indicate the steps of the form: */

        .step {
            height: 15px;
            width: 15px;
            margin: 0 2px;
            background-color: #bbbbbb;
            border: none;
            border-radius: 50%;
            display: inline-block;
            opacity: 0.5;
        }

        .step.active {
            opacity: 1;
        }

        /* Mark the steps that are finished and valid: */

        .step.finish {
            background-color: #4CAF50;
        }
    </style>
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
                            <h4>Sisa Pertanyaan:
                                <b id="sisaPertanyaan">8</b>
                            </h4>
                        </div>
                        <!-- One "tab" for each step in the form: -->
                        <div id="DivFormPreTest">
                            <div id="p1" class="tab form-group">
                                <div class="form-control" style="height: 100%">
                                    <p style="margin-bottom: 7pt;">Apa yang dimaksud dengan graf ?</p>
                                    <div class="row">
                                        <input id="answerP1-a" type="radio" name="answerP1" value="a" onclick="clearInvalid(1)"> Graf adalah objek dasar pelajaran dalam teori graf<br>
                                        <input id="answerP1-b" type="radio" name="answerP1" value="b" onclick="clearInvalid(1)"> Graf adalah himpunan dari objek-objek yang dinamakan titik<br>
                                        <input id="answerP1-c" type="radio" name="answerP1" value="c" onclick="clearInvalid(1)"> Graf adalah ...<br>
                                        <input id="answerP1-d" type="radio" name="answerP1" value="d" onclick="clearInvalid(1)"> Graf adalah ...<br>
                                        <input id="answerP1-e" type="radio" name="answerP1" value="e" onclick="clearInvalid(1)"> Graf adalah ...<br>
                                    </div>
                                </div>
                            </div>
                            <div id="p2" class="tab form-group">
                                <div class="form-control" style="height: 100%">
                                    <p id="p2title" style="margin-bottom: 7pt;">Apa yang dimaksud dengan simpul (node) pada graf ?</p>
                                    <div class="row">
                                        <input id="answerP2-a" type="radio" name="answerP2" value="a"> Simpul (node) adalah ...<br>
                                        <input id="answerP2-b" type="radio" name="answerP2" value="b"> Simpul (node) adalah ...<br>
                                        <input id="answerP2-c" type="radio" name="answerP2" value="c"> Simpul (node) adalah ...<br>
                                        <input id="answerP2-d" type="radio" name="answerP2" value="d"> Simpul (node) adalah ...<br>
                                        <input id="answerP2-e" type="radio" name="answerP2" value="e"> Simpul (node) adalah ...<br>
                                    </div>
                                </div>
                            </div>
                            <div id="p3" class="tab form-group">
                                <div class="form-control" style="height: 100%">
                                    <p id="p3title" style="margin-bottom: 7pt;">Apa yang dimaksud dengan sisi (edge) pada graf ?</p>
                                    <div class="row">
                                        <input id="answerP3-a" type="radio" name="answerP3" value="a"> Sisi (edge) adalah ...<br>
                                        <input id="answerP3-b" type="radio" name="answerP3" value="b"> Sisi (edge) adalah ...<br>
                                        <input id="answerP3-c" type="radio" name="answerP3" value="c"> Sisi (edge) adalah ...<br>
                                        <input id="answerP3-d" type="radio" name="answerP3" value="d"> Sisi (edge) adalah ...<br>
                                        <input id="answerP3-e" type="radio" name="answerP3" value="e"> Sisi (edge) adalah ...<br>
                                    </div>
                                </div>
                            </div>
                            <div id="p4" class="tab form-group">
                                <div class="form-control" style="height: 100%">
                                    <p id="p4title" style="margin-bottom: 7pt;">Apa yang dimaksud dengan derajat (degree) pada graf ?</p>
                                    <div class="row">
                                        <input id="answerP4-a" type="radio" name="answerP4" value="a"> Derajat (degree) adalah ...<br>
                                        <input id="answerP4-b" type="radio" name="answerP4" value="b"> Derajat (degree) adalah ...<br>
                                        <input id="answerP4-c" type="radio" name="answerP4" value="c"> Derajat (degree) adalah ...<br>
                                        <input id="answerP4-d" type="radio" name="answerP4" value="d"> Derajat (degree) adalah ...<br>
                                        <input id="answerP4-e" type="radio" name="answerP4" value="e"> Derajat (degree) adalah ...<br>
                                    </div>
                                </div>
                            </div>
                            <div id="p5" class="tab form-group">
                                <div class="form-control" style="height: 100%">
                                    <p style="margin-bottom: 7pt;">Ada berapa simpul pada gambar graf berikut ini ?</p>
                                    <select id="answerP5" name="answerP5" class="form-control">
                                        <option value="" selected disabled>Silahkan Pilih</option>                
                                        <option value="a">5</option>                
                                        <option value="b">7</option>                
                                        <option value="c">8</option>                
                                        <option value="d">9</option>    
                                        <option value="e">10</option>        
                                    </select>
                                    <p style="margin:30px;"><center><img src="images/pretest-p5.jpg"></center></p>
                                </div>
                            </div>
                            <div id="p6" class="tab form-group">
                                <div class="form-control" style="height: 100%">
                                    <p id="p6title" style="margin-bottom: 7pt;">Ada berapa sisi pada graf berikut ?</p>
                                    <select id="answerP6" name="answerP6" class="form-control">
                                        <option value="" selected disabled>Silahkan Pilih</option>                
                                        <option value="a">5</option>                
                                        <option value="b">7</option>                
                                        <option value="c">8</option>                
                                        <option value="d">9</option>    
                                        <option value="e">10</option>        
                                    </select>
                                    <p style="margin:30px;"><center><img src="images/pretest-p6.jpg"></center></p>
                                </div>
                            </div>
                            <div id="p7" class="tab form-group">
                                <div class="form-control" style="height: 100%">
                                    <p style="margin-bottom: 7pt;">Berapa derajat pada simpul nomor 2 yang dimiliki oleh graf berikut ?</p>
                                    <select id="answerP7" name="answerP7" class="form-control">
                                        <option value="" selected disabled>Silahkan Pilih</option>                
                                        <option value="a">6</option>                
                                        <option value="b">7</option>                
                                        <option value="c">8</option>                
                                        <option value="d">9</option>    
                                        <option value="e">10</option>        
                                    </select>
                                    <p style="margin:30px;"><center><img src="images/pretest-p7.jpg"></center></p>
                                </div>
                            </div>
                            <div id="p8" class="tab form-group">
                                <div class="form-control" style="height: 100%">
                                    <p style="margin-bottom: 7pt;">Apakah Anda familiar dengan bahasa pemrograman C ?</p>
                                    <select id="answerP8" name="answerP8" class="form-control" required onchange="bahasaPem(this);">
                                        <option value="" selected disabled>Silahkan Pilih</option>                
                                        <option value="y">Ya</option>                
                                        <option value="t">Tidak</option>       
                                    </select>
                                </div>
                                <div class="form-group" id="programC" style="display:none;">
                                    <p style="margin-bottom: 7pt;">Apakah Anda pernah memprogram graf dengan bahasa C ?</p>
                                    <select name="pC" id="pC" class="form-control" required onchange="bahasaPem(this);">
                                        <option value="" selected disabled>Silahkan Pilih</option>
                                        <option value="a">Ya Pernah</option>
                                        <option value="b">Tidak Pernah</option>
                                        <option value="c">Lupa/Tidak Tahu</option>
                                    </select>
                                </div>
                                <div class="form-group" id="lastC" style="display:none;">
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
                                <input id="nextBtn" class="btn btn-primary btn-lg" value="Lanjut" type="button" onclick="preTest(1)">
                            </div>
                        </div>
                    </form>
                </div>
                <div class="col-md-2 col-sm-2"></div>
            </div>

        </div>

        <div class="row">
            <div style="height:77px;"></div>
            <div class="col-md-12 text-center">
                <p style="font-size:11pt;">
                    <span class="badge badge-info">Info</span> Jumlah pertanyaan akan bertambah atau berkurang menyesuaikan
                    <br>jawaban yang Anda pilih, karena dibutuhkan analisis data yang berkorelasi.</p>
            </div>
        </div>

    </section>

    <div style="height:133px;"></div>
    <script src="js/pretest.js?v=3"></script>

    <?php require_once('footer.php'); ?>