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
                                usaha Anda.</h3>
                            <p>Kontribusi Anda sangat berarti bagi penelitian ini.
                            Oleh karena itu, sebagai reward/penghargaan penulis ingin
                            memberikan hadiah berupa pulsa dan FREE Domain .id<br>
                            Pemberian Hadiah akan diinformasikan melalui email atau nomor telepon
                            yang telah terdaftar.</p>
                            <p>Jika Anda ingin menambah poin untuk berpeluang sebagai pemenang Responden
                            Terbaik untuk FREE Domain .ID, dapat mengisi 3 pertanyaan opini <a>di sini</a>.</p>
                            <p>Baca lebih lanjut tentang
                                <a data-toggle="modal" data-target="#kebijakan">Kebijakan Privasi</a> |
                                <a data-toggle="modal" data-target="#skb">Syarat & Ketentuan</a>.</p>
                        </div>
                    </div>
                </div>
            </div>

            <!--div class="row">
                <div class="col-md-2 col-sm-2"></div>
                <div class="col-md-8 col-sm-8 to-animate">
                    <form accept-charset="utf-8" method="POST" action="#" name="formPreTest" id="formPreTest">
                        <div style="text-align:center;margin-top:40px;">
                            <h4>Penutup
                                <b id="sisaPertanyaan">3</b>
                            </h4>
                        </div>
                        
                        <div id="DivFormPreTest">
                            <div id="p1" class="tab form-group">
                                <div class="form-control" style="height: 100%">
                                    <p style="margin-bottom: 7pt;">Informasi apa saja yang Anda butuhkan ketika sedang menyelesaikan soal graf kode program di kakas CodeViz ?</p>
                                    <div class="row">
                                        <input id="answerP1-a" type="radio" name="answerP1" value="a" onclick="clearInvalid(1)"> Graf adalah objek dasar pelajaran dalam teori graf.<br>
                                        <input id="answerP1-b" type="radio" name="answerP1" value="b" onclick="clearInvalid(1)"> Graf adalah himpunan dari objek-objek yang dinamakan titik, simpul, atau sudut dihubungkan oleh penghubung yang dinamakan
                                        garis atau sisi.<br>
                                        <input id="answerP1-c" type="radio" name="answerP1" value="c" onclick="clearInvalid(1)"> Graf adalah gambar kurva (garis atau sisi) yang membentuk bangun datar berupa persegi panjang.
                                        <br>
                                        <input id="answerP1-d" type="radio" name="answerP1" value="d" onclick="clearInvalid(1)"> Graf adalah gambar grafik untuk kepentingan visualisasi data.<br>
                                        <input id="answerP1-e" type="radio" name="answerP1" value="e" onclick="clearInvalid(1)"> Graf adalah objek dasar yang terdiri dari bangun datar dan garis.<br>
                                    </div>
                                </div>
                            </div>
                            <div id="p2" class="tab form-group">
                                <div class="form-control" style="height: 100%">
                                    <p id="p2title" style="margin-bottom: 7pt;">Animasi graf seperti apa yang Anda harapkan agar efektif dalam memahami eksekusi graf kode program ? Informasi seperti apa yang dibutuhkan ketika Anda mencoba memahami eksekusi graf kode program ?</p>
                                    <div class="row">
                                        <input id="answerP2-a" type="radio" name="answerP2" value="a"> Simpul (node) adalah graf ganda.<br>
                                        <input id="answerP2-b" type="radio" name="answerP2" value="b"> Simpul (node) adalah graf tidak sederhana.<br>
                                        <input id="answerP2-c" type="radio" name="answerP2" value="c"> Simpul (node) adalah graf semu.<br>
                                        <input id="answerP2-d" type="radio" name="answerP2" value="d"> Simpul (node) adalah sisi yang menghubungkan pasangan titik yang sama.<br>
                                        <input id="answerP2-e" type="radio" name="answerP2" value="e"> Simpul (node) adalah himpunan titik.<br>
                                    </div>
                                </div>
                            </div>
                            <div id="p3" class="tab form-group">
                                <div class="form-control" style="height: 100%">
                                    <p id="p3title" style="margin-bottom: 7pt;">Apakah Anda bersedia untuk di wawancara ketika dibutuhkan?</p>
                                    <div class="row">
                                        <input id="answerP3-a" type="radio" name="answerP3" value="a"> Sisi (edge) adalah bagian penting graf.<br>
                                        <input id="answerP3-b" type="radio" name="answerP3" value="b"> Sisi (edge) adalah himpunan graf.<br>
                                        <input id="answerP3-c" type="radio" name="answerP3" value="c"> Sisi (edge) adalah jembatan.
                                        <br>
                                        <input id="answerP3-d" type="radio" name="answerP3" value="d"> Sisi (edge) adalah sisi yang membentuk persegi.<br>
                                        <input id="answerP3-e" type="radio" name="answerP3" value="e"> Sisi (edge) adalah garis yang menghubungkan dua simpul atau lebih.<br>
                                    </div>
                                </div>
                            </div>

                        </div>

                        <div style="overflow:auto;">
                            <div style="float:right;">
                                <input id="nextBtn" class="btn btn-primary btn-lg" value="Lanjut" type="button" onclick="selesai(1)">
                            </div>
                        </div>
                    </form>
                </div>
                <div class="col-md-2 col-sm-2"></div>
            </div-->

        </div>

    </section>

    <div style="height:133px;"></div>
    <!--script src="js/selesai.js?v=1"></script-->

    <?php require_once('footer.php'); ?>