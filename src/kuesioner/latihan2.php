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
                            <h3>Anda ditugaskan untuk menyelesaikan 4 soal kode program sederhana dengan bahasa pemrograman C menggunakan <a data-toggle="modal" data-target="#kakasCodeViz"><b>kakas CodeViz</b></a>.</h3>
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
                                <p>Silakan perbaiki kesalahan sintaks pada kode program berikut ini!</p>
                                <p>Output yang diharapkan:</p>
<pre><code>z: 493</code></pre>                                
                                </br>
<pre><code class="language-c">
Int main(){
    int x = 17;
    int y = 29;
    int z = y * x;
    printf(z);
    return 0;
}</code></pre>
                                <p>Silakan paste jawaban kode program Anda di bawah ini.</p>
                                <textarea id="answerP1" style="width:100%;height:111px;"></textarea>
                                <p><input class="btn btn-primary btn-lg" value="Buka Kakas CodeViz" type="button" onclick="simulasiCodeViz();"></p>
                            </div>
                        </div>
                        <div id="p2" class="tab form-group">
                            <div class="form-control" style="height: 100%">
                                <p style="margin-bottom: 7pt;"><span class="badge badge-info">Latihan | Warming Up</span></p>
                                <p><b>Soal 2</b></p>
                                <p>Prosedur xyz  berguna untuk ...</p>
                                <select id="answerP2" name="answerP2" class="form-control">
                                        <option value="" selected disabled>Silahkan Pilih Jawaban Anda</option>                
                                        <option value="a">mencetak hasil</option>                
                                        <option value="b">Operasi perkalian m dan n, kemudian mencetaknya</option>                
                                        <option value="c">Operasi penjumlahan</option>                
                                        <option value="d">Operasi print</option>    
                                        <option value="e">tidak berguna</option>        
                                </select></br>
<pre><code class="language-c">
void xyz(int a, int b){
  int z = a*b;
  printf("z = %d", z);
}

int main(){
  int m = 33;
  int n = 99;
  xyz(m,n);
  return 0;
}</code></pre>
                                <p><input class="btn btn-primary btn-lg" value="Buka Kakas CodeViz" type="button" onclick="simulasiCodeViz();"></p>
                            </div>
                        </div>
                        <div id="p3" class="tab form-group">
                            <div class="form-control" style="height: 100%">
                                <p style="margin-bottom: 7pt;"><span class="badge badge-info">Latihan | Warming Up</span></p>
                                <p><b>Soal 3</b></p>
                                <p>Dari kode program berikut ini, berapa nilai M[2][3] pada baris ke-4 ?</p>
                                <select id="answerP3" name="answerP3" class="form-control">
                                        <option value="" selected disabled>Silahkan Pilih Jawaban Anda</option>                
                                        <option value="a">29</option>                
                                        <option value="b">0</option>                
                                        <option value="c">1</option>                
                                        <option value="d">5</option>    
                                        <option value="e">null</option>        
                                </select></br>
<pre><code class="language-c">
int main(){
  int M[5][5] = {0};
  int y = 29;
  int z = y * M[2][3];
  return 0;
}</code></pre>
                                <p><input class="btn btn-primary btn-lg" value="Buka Kakas CodeViz" type="button" onclick="simulasiCodeViz();"></p>
                            </div>
                        </div>
                        <div id="p4" class="tab form-group">
                            <div class="form-control" style="height: 100%">
                                <p style="margin-bottom: 7pt;"><span class="badge badge-info">Latihan | Warming Up</span></p>
                                <p><b>Soal 4</b></p>
                                <p>Apa kegunaan kode program berikut ini ?</p>
                                <select id="answerP4" name="answerP4" class="form-control">
                                        <option value="" selected disabled>Silahkan Pilih Jawaban Anda</option>                
                                        <option value="a">Menghitung nilai array</option>                
                                        <option value="b">Menghitung luas persegi</option>                
                                        <option value="c">Menentukan nilai ganjil atau genap</option>                
                                        <option value="d">Menghitung panjang array</option>    
                                        <option value="e">Tidak dapat didefinisikan</option>        
                                </select></br>
<pre><code class="language-c">
int main(){
  int x[5], y, i;
  x[0] = 9;
  x[1] = 11;
  x[2] = 17;
  x[3] = 19;
  x[4] = 20;

  for(i = 0; i < 5; i++){
    y = x[i] % 2;
    if (y == 0) printf("%d adalah ganjil\n", x[i]);
    else printf("%d adalah genap\n", x[i]);
  }

  return 0;
}</code></pre>
                                <p><input class="btn btn-primary btn-lg" value="Buka Kakas CodeViz" type="button" onclick="simulasiCodeViz();"></p>
                            </div>
                        </div>
                        <div style="overflow:auto;">
                            <div style="float:center;">
                                <center><input id="nextBtn" class="btn btn-primary btn-lg" value="Soal Berikutnya" type="button" onclick="latihan2NextBtn(1)"></center>
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
    <script src="js/latihan2.js?v=1"></script>
    <script src="js/prism.js?v=1" type="text/javascript"></script>

    <?php require_once('footer.php'); ?>

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