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

    <link href="css/prism.css?v=1" rel="stylesheet" type="text/css">

    <header role="banner" id="fh5co-header" class="navbar-fixed-top">
        <div class="container">
            
            <nav class="navbar navbar-default">
                <div class="navbar-header">
                    <!-- Mobile Toggle Menu Button -->
                    <a href="#" class="js-fh5co-nav-toggle fh5co-nav-toggle" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar"></a>
                    <div class="navbar-brand" style="font-size:12pt">
                        <ul class="social social-circle" style="width: auto;">
                            <li class="icon-head"></li>
                        </ul> Latihan 2
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
                    <h2 class="to-animate">Latihan 2</h2>
                    <div class="row">
                        <div class="col-md-8 col-md-offset-2 subtext to-animate">
                            <h3>Anda ditugaskan untuk menyelesaikan 1 soal kode program sederhana dengan bahasa pemrograman C menggunakan <a data-toggle="modal" data-target="#kakasCodeViz"><b>kakas CodeViz</b></a>.</h3>
                        </div>
                    </div>
                </div>
            </div>

            <div class="row">
                <div class="col-md-12 col-sm-12 to-animate">
                    
                    <div id="DivFormSimulasi">
                        <div id="p1" class="tab form-group">
                            <div class="form-control" style="height: 100%">
                                <p style="margin-bottom: 7pt;"><span class="badge badge-info">Latihan | Warming Up</span></p>
                                <p>Silakan perbaiki kesalahan sintaks pada kode program berikut ini!</p>
                                <p>Berapa nilai M[2][3] ?</p>
                                <div class="row">
                                    <div class="col-md-6 col-sm-6 to-animate">
                                        <select id="answerP1" name="answerP1" class="form-control" onchange="checkAnswer(this);">
                                            <option value="" selected disabled>Silahkan Pilih</option>                
                                            <option value="a">29</option>                
                                            <option value="b">5</option>                
                                            <option value="c">1</option>                
                                            <option value="d">0</option>    
                                            <option value="e">null</option>        
                                        </select>
                                    </div>
                                    <div class="col-md-6 col-sm-6 to-animate">
                                        <div style="overflow:auto;">
                                            <div style="float:center;">
                                                <center><input id="nextBtn" class="btn btn-primary btn-lg" style="display:none;" value="Simpan" type="button" onclick="latihan2NextBtn(1)"></center>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <iframe id="CODEVIZ" width="100%" height="600" frameborder="0" src="http://localhost:3000/codeviz/#code=int%20main%28%29%7B%0A%20%20int%20M%5B5%5D%5B5%5D%20%3D%20%7B0%7D%3B%0A%20%20int%20y%20%3D%2029%3B%0A%20%20Int%20z%20%3D%20y%20*%20M%5B2%5D%5B3%5D%0A%20%20retun%200%3B%0A%7D&mode=edit&origin=opt-frontend.js&py=c&rawInputLstJSON=%5B%5D"> </iframe>
                            </div>
                        </div>

                    </div>
                </div>

            </div>

        </div>
    </section>

    <div style="height:133px;"></div>
    <?php require_once('footer.php'); ?>
    <script src="js/simulasi.js?v=3"></script>
    <script src="js/latihan2.js?v=4"></script>

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