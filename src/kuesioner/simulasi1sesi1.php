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
                        </ul> Simulasi 1 - Sesi 1
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
                    <h2 class="to-animate">Simulasi 1 - Sesi 1</h2>
                    <div class="row">
                        <div class="col-md-8 col-md-offset-2 subtext to-animate">
                            <h3>Anda ditugaskan untuk menyelesaikan 5 soal graf kode program dengan bahasa pemrograman C menggunakan <a data-toggle="modal" data-target="#kakasOPT"><b>kakas OPT</b></a>.</h3>
                        </div>
                    </div>
                </div>
            </div>

            <div class="row">
                <div class="col-md-6 col-sm-6 to-animate">
                    
                    <div id="DivFormSimulasi">
                        <div id="p1" class="tab form-group">
                            <div class="form-control" style="height: 100%">
                                <p style="margin-bottom: 7pt;"><span class="badge badge-info">Tes Inti | Simulasi 1 - Sesi 1</span></p>
                                <p><b>Soal 1</b></p>
                                <p>Berapa bobot antara simpul 7 dan 1 dalam graf kode program berikut ini ?</p>
                                <select id="answerP1" name="answerP1" class="form-control">
                                        <option value="" selected disabled>Silahkan Pilih Jawaban Anda</option>                
                                        <option value="a">3</option>                
                                        <option value="b">4</option>                
                                        <option value="c">0</option>                
                                        <option value="d">1</option>    
                                        <option value="e">Tidak ada</option>
                                </select></br>
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
                                <p><input class="btn btn-primary btn-lg" value="Buka Kakas OPT" type="button" onclick="simulasiOPT();"></p>
                            </div>
                        </div>
                        <div id="p2" class="tab form-group">
                            <div class="form-control" style="height: 100%">
                                <p style="margin-bottom: 7pt;"><span class="badge badge-info">Tes Inti | Simulasi 1 - Sesi 1</span></p>
                                <p><b>Soal 2</b></p>
                                <p>Silakan perbaiki kesalahan pada graf kode program berikut ini agar dapat <i>running</i> secara normal.</p>
<pre><code class="language-c">
#include < stdio.h >

int row = 4, col = 4;
int i, j,
cost[4][4];

int main()
{
    printf("\nthe matrix:\n")
    cost[0][1] = 2
    cost[0][2] = 3;
    cost[0][3] = 1;
    cost[1][2] = 7;
    cost[1][3] = 9;
    cost[2][3] = 8;
   
    for (i = 0; i < row; i++)
        for (j = 0; j <= col; j++)
            printf("cost[%d][%d]: %d\n",i,j,cost[i][j]);

    return 0
}</code></pre>
                                <p>Silakan paste jawaban kode program Anda di bawah ini.</p>
                                <textarea id="answerP2" style="width:100%;height:111px;"></textarea>
                                <p><input class="btn btn-primary btn-lg" value="Buka Kakas OPT" type="button" onclick="simulasiOPT();"></p>
                            </div>
                        </div>
                        <div id="p3" class="tab form-group">
                            <div class="form-control" style="height: 100%">
                                <p style="margin-bottom: 7pt;"><span class="badge badge-info">Tes Inti | Simulasi 1 - Sesi 1</span></p>
                                <p><b>Soal 3</b></p>
                                <p>Apa nama algoritma yang paling cocok digunakan untuk menggambarkan proses eksekusi graf kode program berikut ini ?</p>
                                <select id="answerP3" name="answerP3" class="form-control">
                                        <option value="" selected disabled>Silahkan Pilih Jawaban Anda</option>                
                                        <option value="a">Travelling Salesman Problem (TSP)</option>                
                                        <option value="b">Bellman Ford</option>                
                                        <option value="c">Binary Search Tree (BST)</option>                
                                        <option value="d">Breadth First Search (BFS)</option>    
                                        <option value="e">tidak diketahui</option>        
                                </select></br>
<pre><code class="language-c">
#include "stdio.h"

int ary[10][10], completed[10], n, cost = 0;

void takeInput()
{
    int i, j;

    printf("the number of villages: ");
    n = 4;

    printf("\nthe Cost Matrix\n");

    for (i = 0; i < n; i++)
    {
        printf("\nElements of Row: %d\n", i + 1);
        ary[i][0] = 3;
        ary[i][1] = 7;
        ary[i][2] = 4;
        ary[i][3] = 9;
        completed[i] = 0;
    }

    printf("\n\nThe cost list is:");

    for (i = 0; i < n; i++)
    {
        printf("\n");

        for (j = 0; j < n; j++)
            printf("\t%d", ary[i][j]);
    }
}

void mincost(int city)
{
    int i, ncity;

    completed[city] = 1;

    printf("%d--->", city + 1);
    ncity = least(city);

    if (ncity == 999)
    {
        ncity = 0;
        printf("%d", ncity + 1);
        cost += ary[city][ncity];

        return;
    }

    mincost(ncity);
}

int least(int c)
{
    int i, nc = 999;
    int min = 999, kmin;

    for (i = 0; i < n; i++)
    {
        if ((ary[c][i] != 0) && (completed[i] == 0))
            if (ary[c][i] + ary[i][c] < min)
            {
                min = ary[i][0] + ary[c][i];
                kmin = ary[c][i];
                nc = i;
            }
    }

    if (min != 999)
        cost += kmin;

    return nc;
}

int main()
{
    takeInput();

    printf("\n\nThe Path is:\n");
    mincost(0);

    printf("\n\nMinimum cost is %d\n ", cost);

    return 0;
}</code></pre>
                                <p><input class="btn btn-primary btn-lg" value="Buka Kakas OPT" type="button" onclick="simulasiOPT();"></p>
                            </div>
                        </div>
                        <div id="p4" class="tab form-group">
                            <div class="form-control" style="height: 100%">
                                <p style="margin-bottom: 7pt;"><span class="badge badge-info">Tes Inti | Simulasi 1 - Sesi 1</span></p>
                                <p><b>Soal 4</b></p>
                                <p>Apa kegunaan fungsi XYZ dibuat pada graf kode program berikut ini ?</p>
                                <select id="answerP4" name="answerP4" class="form-control">
                                        <option value="" selected disabled>Silahkan Pilih Jawaban Anda</option>                
                                        <option value="a">menghitung derajat simpul</option>                
                                        <option value="b">menghitung jumlah sisi</option>                
                                        <option value="c">menghitung simpul yang berdekatan</option>                
                                        <option value="d">menghitung jarak antar simpul</option>    
                                        <option value="e">tidak dapat ditentukan</option>        
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

void fungsiku(int s)
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

    fungsiku(n);
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

    fungsiku(0);

    printf("\n\nMin: %d\n ", c);

    return 0;
}</code></pre>
                                <p><input class="btn btn-primary btn-lg" value="Buka Kakas OPT" type="button" onclick="simulasiOPT();"></p>
                            </div>
                        </div>
                        <div id="p5" class="tab form-group">
                            <div class="form-control" style="height: 100%">
                                <p style="margin-bottom: 7pt;"><span class="badge badge-info">Tes Inti | Simulasi 1 - Sesi 1</span></p>
                                <p><b>Soal 5</b></p>
                                <p>Berapa jumlah simpul dalam graf kode program berikut ini ?</p>
                                <select id="answerP5" name="answerP5" class="form-control">
                                        <option value="" selected disabled>Silahkan Pilih Jawaban Anda</option>                
                                        <option value="a">3</option>                
                                        <option value="b">7</option>                
                                        <option value="c">4</option>                
                                        <option value="d">9</option>    
                                        <option value="e">10</option>
                                </select></br>
<pre><code class="language-c">
#include "stdio.h"

int G[10][10], completed[10], n, cost = 0;

void takeInput()
{
    int i, j;

    printf("the number of villages: ");
    n = 4;

    printf("\nthe Cost Matrix\n");

    for (i = 0; i < n; i++)
    {
        printf("\nElements of Row: %d\n", i + 1);
        G[i][0] = 3;
        G[i][1] = 7;
        G[i][2] = 4;
        G[i][3] = 9;
        completed[i] = 0;
    }

    printf("\n\nThe cost list is:");

    for (i = 0; i < n; i++)
    {
        printf("\n");

        for (j = 0; j < n; j++)
            printf("\t%d", G[i][j]);
    }
}

void mincost(int city)
{
    int i, ncity;

    completed[city] = 1;

    printf("%d--->", city + 1);
    ncity = least(city);

    if (ncity == 999)
    {
        ncity = 0;
        printf("%d", ncity + 1);
        cost += G[city][ncity];

        return;
    }

    mincost(ncity);
}

int least(int c)
{
    int i, nc = 999;
    int min = 999, kmin;

    for (i = 0; i < n; i++)
    {
        if ((G[c][i] != 0) && (completed[i] == 0))
            if (G[c][i] + G[i][c] < min)
            {
                min = G[i][0] + G[c][i];
                kmin = G[c][i];
                nc = i;
            }
    }

    if (min != 999)
        cost += kmin;

    return nc;
}

int main()
{
    takeInput();

    printf("\n\nThe Path is:\n");
    mincost(0);

    printf("\n\nMinimum cost is %d\n ", cost);

    return 0;
}</code></pre>
                                <p><input class="btn btn-primary btn-lg" value="Buka Kakas OPT" type="button" onclick="simulasiOPT();"></p>
                            </div>
                        </div>

                        <div style="overflow:auto;">
                            <div style="float:center;">
                                <center><input id="nextBtn" class="btn btn-primary btn-lg" value="Soal Berikutnya" type="button" onclick="simulasi1sesi1NextBtn(1)"></center>
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
    <script src="js/simulasi1sesi1.js?v=1"></script>
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