<?php require_once('header.php'); ?>

<body onunload="_DESTROY_OPT()">
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
                        </ul> Simulasi 2 - Sesi 2 <p class="timer-simulasi" id="timer">Sisa Waktu: 25 menit 0 detik</p>
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
                    <h2 class="to-animate">Simulasi 2 - Sesi 2</h2>
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
                                <p style="margin-bottom: 7pt;"><span class="badge badge-info">Tes Inti | Simulasi 2 - Sesi 2</span></p>
                                <p><b>Soal 1</b></p>
                                <p>Berapa jumlah sisi (edge) yang dimiliki oleh graf kode program berikut ini ?</p>
                                <select id="answerP1" name="answerP1" class="form-control">
                                        <option value="" selected disabled>Silahkan Pilih Jawaban Anda</option>                
                                        <option value="a">5</option>                
                                        <option value="b">6</option>                
                                        <option value="c">7</option>                
                                        <option value="d">8</option>    
                                        <option value="e">10</option>
                                </select></br>
<pre><code class="language-c">
#include "stdio.h"

int main()
{    
    int baris = 5, kolom = 5;
    int x, y,
    graf[5][5] = {  { 0, 1, 1, 1, 1},
                    { 1, 0, 1, 1, 1},
                    { 1, 1, 0, 1, 1},
                    { 1, 1, 1, 0, 1},
                    { 1, 1, 1, 1, 0}
                 };
    
    printf("\nGraf:\n");
    for (x = 0; x < baris; x++)
        for (y = 0; y < kolom; y++)
            printf("graf[%d][%d]: %d\n",x,y,graf[x][y]);

    return 0;
}</code></pre>
                                <p><input class="btn btn-primary btn-lg" value="Buka Kakas OPT" type="button" onclick="simulasiOPT();"></p>
                            </div>
                        </div>
                        <div id="p2" class="tab form-group">
                            <div class="form-control" style="height: 100%">
                                <p style="margin-bottom: 7pt;"><span class="badge badge-info">Tes Inti | Simulasi 2 - Sesi 2</span></p>
                                <p><b>Soal 2</b></p>
                                <p>Ubahlah graf kode program berikut ini agar jumlah simpul menjadi 5 buah.</p>
<pre><code class="language-c">
#include "stdio.h"
#include "time.h"
#define infinity 999

int graf[4][4], X[4], n, c = 0;

int R(const int M, const int N){
    return rand() % (N - M) + M;
}

void G(){
    int i, j;
    n = R(2, 4);

    for (i = 1; i < n; i++)
    {
        for (j = 1; j < n; j++)
        {
            graf[i][j] = R(0, 17);
            if (graf[i][j] == 0){
                graf[i][j] = infinity;
                graf[j][i] = infinity;
            } else {
                graf[j][i] = graf[i][j];
            }
        }
        X[i] = 0;
    }

    for (i = 1; i < n; i++){
        printf("\n");
        for (j = 1; j < n; j++)
            printf("\t%d", graf[i][j]);
    }
}

void F(int s){
    int i, n;
    X[s] = 1;
    printf("%d--->", s);
    n = minim(s);

    if (n == 999){
        n = 1;
        printf("%d", n);
        c += graf[s][n];
        return;
    }
    F(n);
}

int minim(int c){
    int i, nc = 999;
    int min = 999, g_min;

    for (i = 1; i < n; i++){
        if ((graf[c][i] != 0) && (X[i] == 0))
            if (graf[c][i] + graf[i][c] < min){
                min = graf[i][0] + graf[c][i];
                g_min = graf[c][i];
                nc = i;
            }
    }

    if (min != 999)
        c += g_min;

    return nc;
}

int main(){
    srand(time(NULL));
    G();
    printf("\n");
    F(1);
    printf("\n\nHasil: %d\n ", c);
    return 0;
}</code></pre>
                                <p>Silakan paste jawaban kode program Anda di bawah ini.</p>
                                <textarea id="answerP2" style="width:100%;height:111px;"></textarea>
                                <p><input class="btn btn-primary btn-lg" value="Buka Kakas OPT" type="button" onclick="simulasiOPT();"></p>
                            </div>
                        </div>
                        <div id="p3" class="tab form-group">
                            <div class="form-control" style="height: 100%">
                                <p style="margin-bottom: 7pt;"><span class="badge badge-info">Tes Inti | Simulasi 2 - Sesi 2</span></p>
                                <p><b>Soal 3</b></p>
                                <p>Apakah tujuan prosedur X dibuat pada graf kode program berikut ini ?</p>
                                <select id="answerP3" name="answerP3" class="form-control">
                                        <option value="" selected disabled>Silahkan Pilih Jawaban Anda</option>                
                                        <option value="a">untuk menghitung jumlah simpul (node)</option>                
                                        <option value="b">untuk menghitung jarak antar sisi (edge)</option>                
                                        <option value="c">untuk menghitung jarak antar simpul (node)</option>                
                                        <option value="d">untuk menghitung bobot pada sisi</option>    
                                        <option value="e">tidak diketahui</option>        
                                </select></br>
<pre><code class="language-c">
#include "stdio.h"

void X(int graf[4][4], int m, int n){
  printf("\nHitung jarak antar simpul %d ke %d\n", m, n);
}

int main(){
  int row = 4, col = 4;
  int i, j,
  graf[4][4] = {  { 0, 2, 3, 1},
                  { 2, 0, 7, 9},
                  { 3, 7, 0, 8},
                  { 1, 9, 8, 0}
               };    
  printf("\nGraf:\n");
  for (i = 0; i < row; i++)
    for (j = 0; j < col; j++){
      printf("graf[%d][%d]: %d\n",i,j,graf[i][j]);
      X(graf, i, j);
    }
  return 0;
}</code></pre>
                                <p><input class="btn btn-primary btn-lg" value="Buka Kakas OPT" type="button" onclick="simulasiOPT();"></p>
                            </div>
                        </div>
                        <div id="p4" class="tab form-group">
                            <div class="form-control" style="height: 100%">
                                <p style="margin-bottom: 7pt;"><span class="badge badge-info">Tes Inti | Simulasi 2 - Sesi 2</span></p>
                                <p><b>Soal 4</b></p>
                                <p>Apa nama algoritma yang paling sesuai pada graf kode program berikut ini ?</p>
                                <select id="answerP4" name="answerP4" class="form-control">
                                        <option value="" selected disabled>Silahkan Pilih Jawaban Anda</option>                
                                        <option value="a">Depth First Search (DFS)</option>                
                                        <option value="b">Bellman Ford</option>                
                                        <option value="c">Dijkstra</option>                
                                        <option value="d">Breadth First Search</option>    
                                        <option value="e">tidak diketahui</option>        
                                </select></br>
<pre><code class="language-c">
#include "stdio.h"
#define infinity 999

void XYZ(int n, int v, int cost[7][7], int dist[10]){
    int i, u, count, w, flag[10], min;

    for (i = 1; i <= n; i++){
        flag[i] = 0;
        dist[i] = cost[v][i];
    }
    
    count = 2;
    
    while (count <= n){
        min = 99;
        for (w = 1; w <= n; w++){
            if (dist[w] < min && !flag[w]){
                min = dist[w];
                u = w;
            }
        }
        
        flag[u] = 1;
        count++;

        for (w = 1; w <= n; w++){
            if ((dist[u] + cost[u][w] < dist[w]) && !flag[w]){
                dist[w] = dist[u] + cost[u][w];
            }
        }
    }
}

int main()
{
    int n, v, i, dist[10] = {0};
    
    n = 6;
    printf("\nthe number of nodes: %d \n", n);
    
    printf("\nthe cost matrix:\n");
    int cost[7][7] = {  { 0,        0,        0,        0,        0,        0,        0},
                        { 0, infinity,        5, infinity, infinity, infinity,        8},
                        { 0,        5, infinity,        7, infinity,        2, infinity},
                        { 0, infinity,        7, infinity,        9, infinity, infinity},
                        { 0, infinity, infinity,        9, infinity,        4, infinity},
                        { 0, infinity,        2, infinity,        4, infinity, infinity},
                        { 0,        8, infinity, infinity, infinity, infinity, infinity} 
                    };
    
    v = 2;
    printf("\nthe source matrix: %d \n", v);
    
    XYZ(n, v, cost, dist);
    
    printf("\nShortest path:\n");
    for (i = 1; i <= n; i++){
        if (i != v){
            printf("%d->%d,cost=%d\n", v, i, dist[i]);
        }
    }

    return 0;
}</code></pre>
                                <p><input class="btn btn-primary btn-lg" value="Buka Kakas OPT" type="button" onclick="simulasiOPT();"></p>
                            </div>
                        </div>
                        <div id="p5" class="tab form-group">
                            <div class="form-control" style="height: 100%">
                                <p style="margin-bottom: 7pt;"><span class="badge badge-info">Tes Inti | Simulasi 2 - Sesi 2</span></p>
                                <p><b>Soal 5</b></p>
                                <p>Perbaiki kesalahan sintaks pada graf kode program berikut ini agar dapat <i>running</i> secara normal!</p>
<pre><code class="language-c">
#include < stdio.h >
#define infinity 999

void someAlgorithm(int n, int v, int cost[][], int dist[10]){
    int i, u, count, w, F[10], min;

    for (i = 1; i <= n; i++){
        F[i] = 0;
        dist[i] = cost[v][i];
    }
    
    count = 2;
    
    while (count <= n){
        min = 99;
        for (w = 1; w <= n; w++){
            if (dist[w] < min && !F[w]){
                min = dist[w];
                u = w;
            }
        }
        
        F[u] = 1;
        count++;

        for (w = 1; w <= n; w++){
            if ((dist[u] + cost[u][w] < dist[w]) && !F[w]){
                dist[w] = dist[u] + cost[u][w];
            }
        }
    }
}

int main()
{
    int n, v, i, dist[10] = {0};
    
    n = 6;
    printf("\nthe number of nodes: %d \n", n);
    
    printf("\nthe cost matrix:\n");
    int graf[7][7] = {  { 0,        0,        0,        0,        0,        0,        0}
                        { 0, infinity,        5, infinity, infinity, infinity,        8},
                        { 0,        5, infinity,        7, infinity,        2, infinity},
                        { 0, infinity,        7, infinit,        9, infinity, infinity},
                        { 0, infinity, infinity,        9, infinity,        4, infinity},
                        { 0, infinity,        2, infinity,        4, infinity, infinity},
                        { 0,        8, infinity, infinity, infinity, infinity, infinity} 
                    };
    
    v = 2;
    printf("\nthe source matrix: %d \n", v);
    
    someAlgorithm(n, v, graf, dist);
    
    printf("\nShortest path:\n");
    for (i = 1; i <= n; i++){
        if (i != v){
            printf("%d->%d,graf=%d\n", v, i, dist[i]);
        }
    }

    return 0;
}</code></pre>
                                <p>Silakan paste jawaban kode program Anda di bawah ini.</p>
                                <textarea id="answerP5" style="width:100%;height:111px;"></textarea>
                                <p><input class="btn btn-primary btn-lg" value="Buka Kakas OPT" type="button" onclick="simulasiOPT();"></p>
                            </div>
                        </div>

                        <div style="overflow:auto;">
                            <div style="float:center;">
                                <center><input id="nextBtn" class="btn btn-primary btn-lg" value="Soal Berikutnya" type="button" onclick="simulasi2sesi2NextBtn(1)"></center>
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
    
    <?php require_once('footer.php'); ?>
    <script src="js/simulasi.js?v=5"></script>
    <script src="js/simulasi2sesi2.js?v=2"></script>
    <script src="js/prism.js?v=1" type="text/javascript"></script>

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