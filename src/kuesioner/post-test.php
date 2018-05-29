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
                        <li><a href="#" data-nav-section="simulasi"><span>Simulasi</span></a></li>
                        <li class="icon-arrow-circle-right" style="margin-top:17px;"></li>
                        <li class="active"><a href="#" data-nav-section="post-test"><span>Post Test</span></a></li>
                        <li class="icon-arrow-circle-right" style="margin-top:17px;color:lightseagreen;"></li>
                        <li><a href="#" data-nav-section="selesai"><span>Selesai</span></a></li>
                    </ul>
                </div>
            </nav>
            <!-- </div> -->
        </div>
    </header>

    <section id="fh5co-contact" data-section="post-test">
        <div class="clearfix visible-sm-block"></div>
        <div class="container">
            <div class="row">
                <div class="col-md-6 section-heading text-center">
                    <h2 class="to-animate">Post Test</h2>
                    <div class="row">
                        <div class="col-md-8 col-md-offset-2 subtext to-animate">
                            <h3>Tes ini untuk menilai hasil kinerja Anda<br>dari simulasi yang telah dilakukan.<br>Mohon kejujuran dan konsentrasi Anda.</h3>
                            <p>Baca lebih lanjut tentang <a href="#" target="_blank">Kebijakan Privasi</a>.</p>
                        </div>
                    </div>
                </div>
            </div>

            <div class="row">

                <div class="col-md-2 col-sm-2"></div>
                <div class="col-md-8 col-sm-8 to-animate">
                    
                    <form accept-charset="utf-8" method="POST" action="#" name="formPostTest" id="formPostTest">
                        
                        <div style="text-align:center;margin-top:40px;">
                            <h4>Sisa Pertanyaan:
                                <b id="sisaPertanyaan">12</b>
                            </h4>
                        </div>

                        <!-- One "tab" for each step in the form: -->
                        <div id="DivFormPostTest">
                            
                            <div id="p0" class="tab form-group">
                                <div class="form-control" style="height: 100%">
                                    <p style="margin-bottom: 7pt;">Apa yang telah Anda pelajari dari aplikasi {{opt/codeviz}} ?</p>
                                    <textarea id="answerP0" class="form-control" name="answerP0"></textarea>
                                </div>
                            </div>
                            
                            <div id="p1" class="tab form-group">
                                <div class="form-control" style="height: 100%">
                                    <p id="p1title" style="margin-bottom: 7pt;">Apakah {{opt/codeviz}} memiliki fitur visualisasi graf ?</p>
                                    <select id="answerP1" name="answerP1" class="form-control">
                                        <option value="" selected disabled>Pilih Jawaban Anda</option>
                                        <option value="y">Ya</option>
                                        <option value="t">Tidak</option>
                                        <option value="n">Tidak Tahu</option>
                                    </select>
                                </div>
                            </div>
                            
                            <div id="p2" class="tab form-group">
                                <div class="form-control" style="height: 100%">
                                    <p id="p2title" style="margin-bottom: 7pt;">Menurut Anda, pada nomor berapa aplikasi {{opt/codeviz}} memiliki fitur visualisasi graf ?</p>
                                    <select id="answerP2" name="answerP2" class="form-control">
                                        <option value="" selected disabled>Pilih Jawaban Anda</option>
                                        <option value="1">Nomor 1</option>
                                        <option value="2">Nomor 2</option>
                                        <option value="3">Nomor 3</option>
                                        <option value="4">Nomor 4</option>
                                        <option value="5">Nomor 5</option>
                                    </select>
                                    <!--TODO: tampilkan gambar schot di sini-->
                                </div>
                            </div>
                            
                            <div id="p3" class="tab form-group">
                                <div class="form-control" style="height: 100%">
                                    <p id="p3title" style="margin-bottom: 7pt;">Menurut penilaian Anda, berapa rating fitur visualisasi graf yang dimiliki {{opt/codeviz}} ?</p>
                                    <div class="row">
                                        <div class="col-md-12 col-xs-12 rating">
                                            <input id="answerP3-five" name="answerP3" type="radio" value="5" class="radio-btn hide"/>
                                            <label for="answerP3-five">☆</label>
                                            <input id="answerP3-four" name="answerP3" type="radio" value="4" class="radio-btn hide"/>
                                            <label for="answerP3-four">☆</label>
                                            <input id="answerP3-three" name="answerP3" type="radio" value="3" class="radio-btn hide"/>
                                            <label for="answerP3-three">☆</label>
                                            <input id="answerP3-two" name="answerP3" type="radio" value="2" class="radio-btn hide"/>
                                            <label for="answerP3-two">☆</label>
                                            <input id="answerP3-one" name="answerP3" type="radio" value="1" class="radio-btn hide"/>
                                            <label for="answerP3-one">☆</label>
                                            <div class="clear"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div id="p4" class="tab form-group">
                                <div class="form-control" style="height: 100%">
                                    <p id="p4title" style="margin-bottom: 7pt;">Apakah Anda pernah menggunakan aplikasi {{opt/codeviz}} sebelumnya ?</p>
                                    <select id="answerP4" name="answerP4" class="form-control">
                                        <option value="" selected disabled>Pilih Jawaban Anda</option>
                                        <option value="y">Ya, Pernah</option>
                                        <option value="t">Tidak Pernah</option>
                                        <option value="n">Lupa/Tidak Tahu</option>
                                    </select>
                                </div>
                            </div>
                            
                            <div id="p5" class="tab form-group">
                                <div class="form-control" style="height: 100%">
                                    <p style="margin-bottom: 7pt;">Dari mana Anda mengetahui aplikasi {{opt/codeviz}}</p>
                                    <select id="answerP5" name="answerP5" class="form-control">
                                        <option value="" selected disabled>Pilih Jawaban Anda</option>
                                        <option value="b">Browsing Internet</option>
                                        <option value="s">Seminar Jurnal/Paper</option>
                                        <option value="t">Teman</option>
                                        <option value="p">Pengajar/Dosen</option>
                                        <option value="l">Lainnya</option>
                                    </select>
                                </div>
                            </div>
                            
                            <div id="p6" class="tab form-group">
                                <div class="form-control" style="height: 100%">
                                    <p style="margin-bottom: 7pt;">Apakah Anda pernah menggunakan aplikasi sejenis {{opt/codeviz}} ?</p>
                                    <select id="answerP6" name="answerP6" class="form-control">
                                        <option value="" selected disabled>Pilih Jawaban Anda</option>
                                        <option value="y">Ya, Pernah</option>
                                        <option value="t">Tidak Pernah</option>
                                        <option value="n">Lupa/Tidak Tahu</option>
                                    </select>
                                </div>
                            </div>
                            
                            <div id="p7" class="tab form-group">
                                <div class="form-control" style="height: 100%">
                                    <p id="p7title" style="margin-bottom: 7pt;">lalu, nama aplikasinya apa ?</p>
                                    <textarea id="answerP7" class="form-control" name="answerP7"></textarea>
                                </div>
                            </div>
                            
                            <div id="p8" class="tab form-group">
                                <div class="form-control" style="height: 100%">
                                    <p style="margin-bottom: 7pt;">Kapan terkahir kali Anda menggunakan aplikasi tersebut ?</p>
                                    <select id="answerP8" name="answerP0" class="form-control">
                                        <option value="" selected disabled>Silahkan Pilih</option>
                                        <option value="today">Hari ini</option>
                                        <option value="yesterday">Kemarin</option>
                                        <option value="2past">2 hari yang lalu</option>
                                        <option value="3past">lebih dari 3 hari yang lalu</option>
                                        <option value="no">Belum pernah memprogram</option>
                                    </select>
                                </div>
                            </div>

                            <div id="p9" class="tab form-group">
                                <div class="form-control" style="height: 100%">
                                    <p style="margin-bottom: 7pt;">Menurut penilaian Anda, apakah aplikasi {{opt/codeviz}} mudah untuk digunakan ?</p>
                                    <div class="row">
                                        <div class="col-md-12 col-xs-12 rating">
                                            <input id="answerP9-five" name="answerP9" type="radio" value="5" class="radio-btn hide"/>
                                            <label for="answerP9-five">☆</label>
                                            <input id="answerP9-four" name="answerP9" type="radio" value="4" class="radio-btn hide"/>
                                            <label for="answerP9-four">☆</label>
                                            <input id="answerP9-three" name="answerP9" type="radio" value="3" class="radio-btn hide"/>
                                            <label for="answerP9-three">☆</label>
                                            <input id="answerP9-two" name="answerP9" type="radio" value="2" class="radio-btn hide"/>
                                            <label for="answerP9-two">☆</label>
                                            <input id="answerP9-one" name="answerP9" type="radio" value="1" class="radio-btn hide"/>
                                            <label for="answerP9-one">☆</label>
                                            <div class="clear"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div id="p10" class="tab form-group">
                                <div class="form-control" style="height: 100%">
                                    <p style="margin-bottom: 7pt;">Apakah visualisasi membantu Anda dalam memahami eksekusi kode program ?</p>
                                    <select id="answerP10" name="answerP10" class="form-control">
                                        <option value="" selected disabled>Pilih Jawaban Anda</option>
                                        <option value="y">Ya, Sangat Membantu</option>
                                        <option value="t">Tidak Berguna</option>
                                        <option value="n">Tidak Tahu</option>
                                    </select>
                                </div>
                            </div>
                            
                            <div id="p11" class="tab form-group">
                                <div class="form-control" style="height: 100%">
                                    <p style="margin-bottom: 7pt;">Apa yang membuat Anda terbantu dengan adanya visualisasi ? Mohon jelaskan!</p>
                                    <textarea id="answerP11" class="form-control" name="answerP11"></textarea>
                                </div>
                            </div>
                            
                            <div id="p12" class="tab form-group">
                                <div class="form-control" style="height: 100%">
                                    <p style="margin-bottom: 7pt;">Mengapa visualisasi tidak membantu Anda ?</p>
                                    <textarea id="answerP12" class="form-control" name="answerP10"></textarea>
                                </div>
                            </div>

                        </div>

                        <div style="overflow:auto;">
                            <div style="float:right;">
                                <input id="nextBtn" class="btn btn-primary btn-lg" value="Lanjut" type="button" onclick="postTest(0)">
                            </div>
                        </div>
                    </form>
                </div>
                <div class="col-md-2 col-sm-2"></div>

            </div>

        </div>
    </section>

    <div style="height:133px;"></div>
    <script src="js/post-test.js?v=1"></script>

<?php require_once('footer.php'); ?>