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
                    <h2 class="to-animate">Simulasi</h2>
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
                        <div id="p1" class="tab form-group">
                            <div class="form-control" style="height: 100%">
                                <p style="margin-bottom: 7pt;"><span class="badge badge-info">Latihan | Warming Up</span></p>
                                <p><b>Latihan 1</b></p>
                                <p>Anda ditugaskan untuk menyelesaikan 4 soal kode program sederhana dengan bahasa pemrograman C menggunakan <b>kakas OPT</b>.</p>
                                <p><input class="btn btn-primary btn-lg" value="Mulai - Latihan 1" type="button" onclick="simulasiOPT();"></p>
                            </div>
                        </div>
                        <div id="p2" class="tab form-group">
                            <div class="form-control" style="height: 100%">
                                <p style="margin-bottom: 7pt;"><span class="badge badge-info">Latihan | Warming Up</span></p>
                                <p><b>Latihan 2</b></p>
                                <p>Anda ditugaskan untuk menyelesaikan 4 soal kode program sederhana dengan bahasa pemrograman C menggunakan <b>kakas CodeViz</b>.</p>
                                <p><input class="btn btn-primary btn-lg" value="Mulai - Latihan 2" type="button" onclick="simulasiCodeViz();"></p>
                            </div>
                        </div>
                        <div id="p3" class="tab form-group">
                            <div class="form-control" style="height: 100%">
                                <p style="margin-bottom: 7pt;"><span class="badge badge-info">Tes Inti | Core Test</span></p>
                                <p><b>Sesi 1</b> - Waktu Penyelesaian: 4 Menit</p>
                                <p>Anda ditugaskan untuk menyelesaikan 4 soal <b>graf kode program</b> dengan bahasa pemrograman C menggunakan <b>kakas OPT</b>.</p>
                                <p><input class="btn btn-primary btn-lg" value="Mulai - Sesi 1" type="button" onclick="simulasiOPT();"></p>
                            </div>
                        </div>
                        <div id="p4" class="tab form-group">
                            <div class="form-control" style="height: 100%">
                                <p style="margin-bottom: 7pt;"><span class="badge badge-info">Tes Inti | Core Test</span></p>
                                <p><b>Sesi 2</b> - Waktu Penyelesaian: 4 Menit</p>
                                <p>Anda ditugaskan untuk menyelesaikan 4 soal <b>graf kode program</b> dengan bahasa pemrograman C menggunakan <b>kakas CodeViz</b>.</p>
                                <p><input class="btn btn-primary btn-lg" value="Mulai - Sesi 2" type="button" onclick="simulasiOPT();"></p>
                            </div>
                        </div>
                        <div style="overflow:auto;">
                            <div style="float:center;">
                                <center><input id="nextBtn" class="btn btn-primary btn-lg" value="Soal Berikutnya" type="button" onclick="simulasi(1)"></center>
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
    <script src="js/simulasi.js?v=3"></script>

    <?php require_once('footer.php'); ?>