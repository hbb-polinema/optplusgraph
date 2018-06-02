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
                        </ul> Simulasi 2 - Sesi 1
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
                    <h2 class="to-animate">Simulasi 2 - Sesi 1</h2>
                    <div class="row">
                        <div class="col-md-8 col-md-offset-2 subtext to-animate">
                            <h3>Anda ditugaskan untuk menyelesaikan 5 soal graf kode program dengan bahasa pemrograman C menggunakan <a data-toggle="modal" data-target="#kakasCodeViz"><b>kakas CodeViz</b></a>.</h3>
                        </div>
                    </div>
                </div>
            </div>

            <div class="row">
                <div class="col-md-6 col-sm-6 to-animate">
                    
                    <div id="DivFormSimulasi">
                        <div id="p1" class="tab form-group">
                            <div class="form-control" style="height: 100%">
                                <p style="margin-bottom: 7pt;"><span class="badge badge-info">Tes Inti | Simulasi 2 - Sesi 1</span></p>
                                <p><b>Soal 1</b></p>
                                <p>Ubahlah bobot antara simpul 2 dan 4 menjadi nilai 7 pada graf kode program berikut ini.</p>
                                
<pre><code class="language-c">
#include "stdio.h"

int main()
{    
    int row = 4, col = 4;
    int i, j,
    cost[4][4] = {  { 0, 1, 1, 1},
                    { 1, 0, 1, 1},
                    { 1, 1, 0, 1},
                    { 1, 1, 1, 0}
                 };
    
    printf("\nthe matrix:\n");
    for (i = 0; i < row; i++)
        for (j = 0; j < col; j++)
            printf("cost[%d][%d]: %d\n",i,j,cost[i][j]);

    return 0;
}</code></pre>
                                <p>Silakan paste jawaban kode program Anda di bawah ini.</p>
                                <textarea style="width:100%;height:111px;"></textarea>
                                <p><input class="btn btn-primary btn-lg" value="Buka Kakas CodeViz" type="button" onclick="simulasiCodeViz();"></p>
                            </div>
                        </div>
                        <div id="p2" class="tab form-group">
                            <div class="form-control" style="height: 100%">
                                <p style="margin-bottom: 7pt;"><span class="badge badge-info">Tes Inti | Simulasi 2 - Sesi 1</span></p>
                                <p><b>Soal 2</b></p>
                                <p>Apa kegunaan prosedur Q pada graf kode program berikut ini ?</p>
                                <select id="answerP2" name="answerP2" class="form-control">
                                        <option value="" selected disabled>Silahkan Pilih Jawaban Anda</option>                
                                        <option value="a">menghitung jarak minimum antar simpul</option>                
                                        <option value="b">prosedur rekursif dengan memanggil fungsi xyz kemudian mencetak hasil</option>                
                                        <option value="c">prosedur pelengkap untuk mencetak hasil jarak minimum</option>                
                                        <option value="d">untuk menghitung dengan fungsi xyz</option>    
                                        <option value="e">tidak diketahui</option>
                                </select></br>
<pre><code class="language-c">
#include "stdio.h"
#include "time.h"
#define infinity 999

int graf[10][10], X[10], n, c = 0;

int R(const int nMin, const int nMax)
{
    return rand() % (nMax - nMin) + nMin;
}

void Z()
{
    int i, j;

    n = R(3, 9);    

    for (i = 0; i < n; i++)
    {
        for (j = 0; j < n; j++)
        {
            graf[i][j] = R(0, 17);
            if (graf[i][j] == 0)
            {
                graf[i][j] = infinity;
                graf[j][i] = infinity;
            }
            else
            {
                graf[j][i] = graf[i][j];
            }
        }

        X[i] = 0;
    }

    for (i = 0; i < n; i++)
    {
        printf("\n");

        for (j = 0; j < n; j++)
            printf("\t%d", graf[i][j]);
    }
}

void Q(int s)
{
    int i, n;

    X[s] = 1;

    printf("%d--->", s + 1);
    n = xyz(s);

    if (n == 999)
    {
        n = 0;
        printf("%d", n + 1);
        c += graf[s][n];

        return;
    }

    Q(n);
}

int xyz(int c)
{
    int i, nc = 999;
    int min = 999, kmin;

    for (i = 0; i < n; i++)
    {
        if ((graf[c][i] != 0) && (X[i] == 0))
            if (graf[c][i] + graf[i][c] < min)
            {
                min = graf[i][0] + graf[c][i];
                kmin = graf[c][i];
                nc = i;
            }
    }

    if (min != 999)
        c += kmin;

    return nc;
}

int main()
{
    srand(time(NULL));
    Z();
    printf("\n");

    Q(0);

    printf("\n\nHasil: %d\n ", c);

    return 0;
}</code></pre>
                                <p><input class="btn btn-primary btn-lg" value="Buka Kakas CodeViz" type="button" onclick="simulasiCodeViz();"></p>
                            </div>
                        </div>
                        <div id="p3" class="tab form-group">
                            <div class="form-control" style="height: 100%">
                                <p style="margin-bottom: 7pt;"><span class="badge badge-info">Tes Inti | Simulasi 2 - Sesi 1</span></p>
                                <p><b>Soal 3</b></p>
                                <p>Berapa derajat (degree) yang dimiliki oleh simpul 3 dari graf kode program berikut ini ? Jika ada error, silakan perbaiki!</p>
                                <select id="answerP3" name="answerP3" class="form-control">
                                        <option value="" selected disabled>Silahkan Pilih Jawaban Anda</option>                
                                        <option value="a">1</option>                
                                        <option value="b">2</option>                
                                        <option value="c">3</option>                
                                        <option value="d">4</option>    
                                        <option value="e">5</option>        
                                </select></br>
<pre><code class="language-c">
#include "stdio.h"

int row = 5, col = 4;
int i, j,
graf[5][4] = {  { 0, 2, 3, 1},
                { 2, 0, 7, 9},
                { 3, 7, 0, 8},
                { 1, 9, 8, 0}
             };

int main()
{
    printf("\nGraf:\n");
    for (i = 0; i < row i++)
        for (j = 0; j < cols; j++)
            printf("graf[%d][%d]: %d\n",i,j,graf[i][j]);

    return 0;
}</code></pre>
                                <p><input class="btn btn-primary btn-lg" value="Buka Kakas CodeViz" type="button" onclick="simulasiCodeViz();"></p>
                            </div>
                        </div>
                        <div id="p4" class="tab form-group">
                            <div class="form-control" style="height: 100%">
                                <p style="margin-bottom: 7pt;"><span class="badge badge-info">Tes Inti | Simulasi 2 - Sesi 1</span></p>
                                <p><b>Soal 4</b></p>
                                <p>Apa nama algoritma yang paling cocok digunakan untuk menggambarkan proses eksekusi graf kode program berikut ?</p>
                                <select id="answerP4" name="answerP4" class="form-control">
                                        <option value="" selected disabled>Silahkan Pilih Jawaban Anda</option>                
                                        <option value="a">Dijkstra</option>                
                                        <option value="b">Bellman Ford</option>                
                                        <option value="c">Breadth First Search (BFS)</option>                
                                        <option value="d">Tree</option>    
                                        <option value="e">Tidak diketahui</option>        
                                </select></br>
<pre><code class="language-c">
#include "stdio.h"

int baris = 5, kolom = 5;
int i, j,
graf[5][5];

int main()
{
    printf("\nthe matrix:\n");
    graf[0][1] = 2;
    graf[0][2] = 3;
    graf[0][3] = 1;
    graf[1][2] = 7;
    graf[1][3] = 9;
    graf[2][3] = 8;
    graf[2][4] = 4;
   
    for (i = 0; i < baris; i++)
        for (j = 0; j < kolom; j++)
            printf("graf[%d][%d]: %d\n",i,j,graf[i][j]);

    return 0;
}</code></pre>
                                <p><input class="btn btn-primary btn-lg" value="Buka Kakas CodeViz" type="button" onclick="simulasiCodeViz();"></p>
                            </div>
                        </div>
                        <div id="p5" class="tab form-group">
                            <div class="form-control" style="height: 100%">
                                <p style="margin-bottom: 7pt;"><span class="badge badge-info">Tes Inti | Simulasi 2 - Sesi 1</span></p>
                                <p><b>Soal 5</b></p>
                                <p>Berapa bobot minimum dari simpul 1 ke simpul 7 pada graf kode program berikut ini ?</p>
                                <select id="answerP5" name="answerP5" class="form-control">
                                        <option value="" selected disabled>Silahkan Pilih Jawaban Anda</option>                
                                        <option value="a">14</option>                
                                        <option value="b">13</option>                
                                        <option value="c">12</option>                
                                        <option value="d">11</option>    
                                        <option value="e">tidak dapat dihitung</option>
                                </select></br>
<pre><code class="language-c">
#include "stdio.h"
#include "time.h"
#define infinity 999

int graf[10][10], X[10], n, c = 0;

int R(const int nMin, const int nMax)
{
    return rand() % (nMax - nMin) + nMin;
}

void Z()
{
    int i, j;
    n = 7;

    for (i = 0; i < n; i++)
    {
        X[i] = 0;
    }
    
    graf[1][2] = 3;
    graf[1][3] = 5;
    graf[2][4] = 10;
    graf[3][5] = 4;
    graf[5][6] = 1;
    graf[6][7] = 3;
    graf[2][7] = 11;
    
    for (i = 0; i < n; i++)
    {
        printf("\n");
        for (j = 0; j < n; j++)
            printf("\t%d", graf[i][j]);
    }
}

void Q(int s)
{
    int i, n;

    X[s] = 1;

    printf("%d--->", s + 1);
    n = xyz(s);

    if (n == 999)
    {
        n = 0;
        printf("%d", n + 1);
        c += graf[s][n];

        return;
    }

    Q(n);
}

int xyz(int c)
{
    int i, nc = 999;
    int min = 999, kmin;

    for (i = 0; i < n; i++)
    {
        if ((graf[c][i] != 0) && (X[i] == 0))
            if (graf[c][i] + graf[i][c] < min)
            {
                min = graf[i][0] + graf[c][i];
                kmin = graf[c][i];
                nc = i;
            }
    }

    if (min != 999)
        c += kmin;

    return nc;
}

int main()
{
    srand(time(NULL));
    Z();
    printf("\n");
    Q(0);
    printf("\n\nHasil: %d\n ", c);

    return 0;
}</code></pre>
                                <p><input class="btn btn-primary btn-lg" value="Buka Kakas CodeViz" type="button" onclick="simulasiCodeViz();"></p>
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