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
                        </ul> Latihan 1
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
                    <h2 class="to-animate">Latihan 1</h2>
                    <div class="row">
                        <div class="col-md-8 col-md-offset-2 subtext to-animate">
                            <h3>Anda ditugaskan untuk menyelesaikan 4 soal kode program sederhana dengan bahasa pemrograman C menggunakan <a data-toggle="modal" data-target="#kakasOPT"><b>kakas OPT</b></a>.</h3>
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
                                <p><b>Soal 1</b></p>
                                <p>Dari kode program berikut, ketika variabel x di print bernilai ...</p>
                                <select id="answerP1" name="answerP1" class="form-control">
                                        <option value="" selected disabled>Silahkan Pilih</option>                
                                        <option value="a">41</option>                
                                        <option value="b">10</option>                
                                        <option value="c">0</option>                
                                        <option value="d">31</option>    
                                        <option value="e">62</option>        
                                </select></br>
<pre><code class="language-c">
int main(){
    int x = 10;
    int y = 31;
    int z = 0;

    x = y;
    y = x;
    x = x + y;

    printf("x = %d", x);

    return 0;
}</code></pre>
                                <p><input class="btn btn-primary btn-lg" value="Buka Kakas OPT" type="button" onclick="simulasiOPT();"></p>
                            </div>
                        </div>
                        <div id="p2" class="tab form-group">
                            <div class="form-control" style="height: 100%">
                                <p style="margin-bottom: 7pt;"><span class="badge badge-info">Latihan | Warming Up</span></p>
                                <p><b>Soal 2</b></p>
                                <p>Silakan perbaiki kesalahan sintaks pada kode program berikut ini!</p>
<pre><code class="language-c">
Int main(){
    int graf = [7][7];
    int graf[7][8] = 0;

    printf("graf", graf);
    return 0;
}</code></pre>
                                <p>Silakan paste jawaban kode program Anda di bawah ini.</p>
                                <textarea id="answerP2" style="width:100%;height:111px;"></textarea>
                                <p><input class="btn btn-primary btn-lg" value="Buka Kakas OPT" type="button" onclick="simulasiOPT();"></p>
                            </div>
                        </div>
                        <div id="p3" class="tab form-group">
                            <div class="form-control" style="height: 100%">
                                <p style="margin-bottom: 7pt;"><span class="badge badge-info">Latihan | Warming Up</span></p>
                                <p><b>Soal 3</b></p>
                                <p>Apa nama algoritma yang paling cocok untuk kode program berikut ini ?</p>
                                <select id="answerP3" name="answerP3" class="form-control">
                                        <option value="" selected disabled>Silahkan Pilih Jawaban Anda</option>                
                                        <option value="a">menghitung luas</option>                
                                        <option value="b">menghitung luas segitiga</option>                
                                        <option value="c">menghitung luas persegi panjang</option>                
                                        <option value="d">menghitung luas lingkaran</option>    
                                        <option value="e">tidak dapat ditentukan</option>        
                                </select></br>
<pre><code class="language-c">
int main(){
    int p = 7;
    int l = 9;

    int L = p * l;

    return 0;
}</code></pre>
                                <p><input class="btn btn-primary btn-lg" value="Buka Kakas OPT" type="button" onclick="simulasiOPT();"></p>
                            </div>
                        </div>
                        <div id="p4" class="tab form-group">
                            <div class="form-control" style="height: 100%">
                                <p style="margin-bottom: 7pt;"><span class="badge badge-info">Latihan | Warming Up</span></p>
                                <p><b>Soal 4</b></p>
                                <p>Fungsi X berguna untuk ...</p>
                                <select id="answerP4" name="answerP4" class="form-control">
                                        <option value="" selected disabled>Silahkan Pilih Jawaban Anda</option>                
                                        <option value="a">menghitung perkalian</option>                
                                        <option value="b">menghitung luas lingkaran</option>                
                                        <option value="c">menghitung luas persegi</option>                
                                        <option value="d">menghitung nilai phi</option>    
                                        <option value="e">tidak berfungsi / error</option>        
                                </select></br>
<pre><code class="language-c">
int x(int r){
    return 3.14*r*r;
}

int main(){
    int L;

    L = x(7);
    printf(‘L = %d’, L);

    return 0;
}</code></pre>
                                <p><input class="btn btn-primary btn-lg" value="Buka Kakas OPT" type="button" onclick="simulasiOPT();"></p>
                            </div>
                        </div>
                        <div style="overflow:auto;">
                            <div style="float:center;">
                                <center><input id="nextBtn" class="btn btn-primary btn-lg" value="Soal Berikutnya" type="button" onclick="latihan1NextBtn(1)"></center>
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
    <script src="js/latihan1.js?v=3"></script>
    <script src="js/prism.js?v=1" type="text/javascript"></script>

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