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
                                <b id="sisaPertanyaan">14</b>
                            </h4>
                        </div>
                        <!-- One "tab" for each step in the form: -->
                        <div id="DivFormPreTest">
                            <div id="p0" class="tab form-group">
                                <div class="form-control" style="height: 100%">
                                    <p style="margin-bottom: 7pt;">Kapan terakhir Anda membuat kode program atau memprogram ?</p>
                                    <select id="answerP0" name="answerP0" class="form-control" onchange="clearInvalid(0);">
                                        <option value="" selected disabled>Silahkan Pilih</option>
                                        <option value="today">Hari ini</option>
                                        <option value="yesterday">Kemarin</option>
                                        <option value="2past">2 hari yang lalu</option>
                                        <option value="3past">lebih dari 3 hari yang lalu</option>
                                        <option value="no">Belum pernah memprogram</option>
                                    </select>
                                </div>
                            </div>
                            <div id="p1" class="tab form-group">
                                <div class="form-control" style="height: 100%">
                                    <p id="p1title" style="margin-bottom: 7pt;">Bahasa Pemrograman apa yang terakhir kali Anda gunakan ?</p>
                                    <select id="answerP1" name="answerP1" class="form-control" onchange="clearInvalid(1);">
                                        <option value="" selected disabled>Pilih Bahasa Pemrograman</option>
                                        <option value="ada">Ada</option>
                                        <option value="cpp">C/C++</option>
                                        <option value="go">Go Lang</option>
                                        <option value="java">Java</option>
                                        <option value="js">JavaScript</option>
                                        <option value="py">Python</option>
                                        <option value="rb">Ruby</option>
                                        <option value="no">Lainnya</option>
                                    </select>
                                </div>
                            </div>
                            <div id="p2" class="tab form-group">
                                <div class="form-control" style="height: 100%">
                                    <p id="p2title" style="margin-bottom: 7pt;">Menurut penilaian Anda, secara keseluruhan berapa tingkat kemahiran Anda dalam memprogram menggunakan bahasa {{bahasa yang dipilih}} ?</p>
                                    <div class="row">
                                        <div class="col-md-12 col-xs-12 rating">
                                            <input id="answerP2-five" name="answerP2" type="radio" value="5" class="radio-btn hide"/>
                                            <label for="answerP2-five">☆</label>
                                            <input id="answerP2-four" name="answerP2" type="radio" value="4" class="radio-btn hide"/>
                                            <label for="answerP2-four">☆</label>
                                            <input id="answerP2-three" name="answerP2" type="radio" value="3" class="radio-btn hide"/>
                                            <label for="answerP2-three">☆</label>
                                            <input id="answerP2-two" name="answerP2" type="radio" value="2" class="radio-btn hide"/>
                                            <label for="answerP2-two">☆</label>
                                            <input id="answerP2-one" name="answerP2" type="radio" value="1" class="radio-btn hide"/>
                                            <label for="answerP2-one">☆</label>
                                            <div class="clear"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div id="p3" class="tab form-group">
                                <div class="form-control" style="height: 100%">
                                    <p id="p3title" style="margin-bottom: 7pt;">Menurut penilaian Anda, secara keseluruhan berapa tingkat kemahiran Anda dalam memprogram menggunakan bahasa C/C++ ?</p>
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
                                    <p style="margin-bottom: 7pt;">Apakah Anda pernah belajar Pemrograman Struktur Data ? (seperti penggunaan <i>Array</i>, <i>Struct</i>, atau <i>Pointer</i>).</p>
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
                                    <p style="margin-bottom: 7pt;">Kapan terakhir Anda membuat kode program struktur data ?</p>
                                    <select id="answerP5" name="answerP5" class="form-control">
                                        <option value="" selected disabled>Silahkan Pilih</option>                
                                        <option value="today">Hari ini</option>                
                                        <option value="yesterday">Kemarin</option>                
                                        <option value="2past">2 hari yang lalu</option>                
                                        <option value="3past">lebih dari 3 hari yang lalu</option>    
                                        <option value="no">Belum pernah memprogram</option>        
                                    </select>
                                </div>
                            </div>
                            <div id="p6" class="tab form-group">
                                <div class="form-control" style="height: 100%">
                                    <p id="p6title" style="margin-bottom: 7pt;">Kode program tentang apa yang Anda buat ?</p>
                                    <textarea id="answerP6" class="form-control" name="answerP6"></textarea>
                                </div>
                            </div>
                            <div id="p7" class="tab form-group">
                                <div class="form-control" style="height: 100%">
                                    <p style="margin-bottom: 7pt;">Apakah Anda pernah belajar <b>teori</b> tentang Struktur Data Graf ?</p>
                                    <select id="answerP7" name="answerP7" class="form-control" onchange="checkAnswerP7(this);">
                                        <option value="" selected disabled>Pilih Jawaban Anda</option>
                                        <option value="y">Ya, Pernah</option>
                                        <option value="t">Tidak Pernah</option>
                                        <option value="n">Lupa/Tidak Tahu</option>
                                    </select>
                                </div>
                            </div>
                            <div id="p8" class="tab form-group">
                                <div class="form-control" style="height: 100%">
                                    <p style="margin-bottom: 7pt;">Kapan terakhir Anda belajar teori tentang Struktur Data Graf ?</p>
                                    <select id="answerP8" name="answerP8" class="form-control">                
                                        <option value="" selected disabled>Silahkan Pilih</option>                
                                        <option value="today">Hari ini</option>                
                                        <option value="yesterday">Kemarin</option>                
                                        <option value="2past">2 hari yang lalu</option>                
                                        <option value="3past">lebih dari 3 hari yang lalu</option>            
                                    </select>
                                </div>
                            </div>
                            <div id="p9" class="tab form-group">
                                <div class="form-control" style="height: 100%">
                                    <p style="margin-bottom: 7pt;">Teori Graf apa saja yang pernah Anda pelajari ?</p>
                                    <textarea id="answerP9" class="form-control" name="answerP9"></textarea>
                                </div>
                            </div>
                            <div id="p10" class="tab form-group">
                                <div class="form-control" style="height: 100%">
                                    <p style="margin-bottom: 7pt;">Di antara semua teori tersebut, mana yang paling Anda <b>paham</b> ?</p>
                                    <textarea id="answerP10" class="form-control" name="answerP10"></textarea>
                                </div>
                            </div>
                            <div id="p11" class="tab form-group">
                                <div class="form-control" style="height: 100%">
                                    <p style="margin-bottom: 7pt;">Di antara semua teori tersebut, mana yang paling Anda <b>tidak paham</b> ?</p>
                                    <textarea id="answerP11" class="form-control" name="p11"></textarea>
                                </div>
                            </div>
                            <div id="p12" class="tab form-group">
                                <div class="form-control" style="height: 100%">
                                    <p style="margin-bottom: 7pt;">Menurut penilaian Anda, berapa tingkat pemahaman Anda tentang teori graf secara keseluruhan ?</p>
                                    <div class="row">
                                        <div class="col-md-12 col-xs-12 rating">
                                            <input id="answerP12-five" name="answerP12" type="radio" value="5" class="radio-btn hide" onclick="checkAnswerP12(this);"/>
                                            <label for="answerP12-five">☆</label>
                                            <input id="answerP12-four" name="answerP12" type="radio" value="4" class="radio-btn hide" onclick="checkAnswerP12(this);"/>
                                            <label for="answerP12-four">☆</label>
                                            <input id="answerP12-three" name="answerP12" type="radio" value="3" class="radio-btn hide" onclick="checkAnswerP12(this);"/>
                                            <label for="answerP12-three">☆</label>
                                            <input id="answerP12-two" name="answerP12" type="radio" value="2" class="radio-btn hide" onclick="checkAnswerP12(this);"/>
                                            <label for="answerP12-two">☆</label>
                                            <input id="answerP12-one" name="answerP12" type="radio" value="1" class="radio-btn hide" onclick="checkAnswerP12(this);"/>
                                            <label for="answerP12-one">☆</label>
                                            <div class="clear"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div id="p13" class="tab form-group">
                                <div class="form-control" style="height: 100%">
                                    <p style="margin-bottom: 7pt;">Mohon jelaskan dengan rinci mengapa Anda merasa kurang dalam memahami teori graf? Bagian mana yang menjadi kesulitan?</p>
                                    <textarea id="answerP13" class="form-control" name="answerP13"></textarea>
                                </div>
                            </div>
                        </div>

                        <div style="overflow:auto;">
                            <div style="float:right;">
                                <input id="nextBtn" class="btn btn-primary btn-lg" value="Lanjut" type="button" onclick="preTest(0)">
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
    <script src="js/pretest.js?v=1"></script>

<?php require_once('footer.php'); ?>