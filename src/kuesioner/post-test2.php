<?php
session_start();

if(isset($_SESSION['kode'])){
    require_once('db/db.php');
    $kode_unik = $_SESSION['kode'];
    $_DB = new DB();
    $select = $_DB->select('SELECT nama_responden, tahap_sekarang FROM responden WHERE kode_unik = '.$kode_unik);
    if($select){
        if($select[0]['tahap_sekarang'] == "post-test2.php"){
            # Ok, right place!
        } else {
            header("Location: ".$select[0]['tahap_sekarang']);
            exit;            
        }
    } else {
        header("Location: index.php");
        exit;
    }
} else {
    header("Location: index.php");
    exit;
}
?>
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
    <link href="css/prism.css?v=1" rel="stylesheet" type="text/css">

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
                    <h2 class="to-animate">Post Test 2</h2>
                    <div class="row">
                        <div class="col-md-8 col-md-offset-2 subtext to-animate">
                            <h3>Tes ini untuk menilai hasil kinerja Anda<br>dari simulasi yang telah dilakukan.<br>Mohon kejujuran dan konsentrasi Anda.</h3>
                            <p>Baca lebih lanjut tentang <a data-toggle="modal" data-target="#kebijakan">Kebijakan Privasi</a>.</p>
                            <p>Anda <b>tidak diperkenankan</b> menggunakan bantuan kakas apapun.<br>
                            Silakan persiapkan alat tulis untuk membantu dalam menghitung.</p>
                        </div>
                    </div>
                </div>
            </div>

            <div class="row">

                <div class="col-md-2 col-sm-2"></div>
                <div class="col-md-8 col-sm-8 to-animate">
                    
                    <form accept-charset="utf-8" method="POST" action="#" name="formPostTest" id="formPostTest">
                        
                        <div style="text-align:center;margin-top:40px;">
                            <h4>Sisa Soal:
                                <b id="sisaSoal">5</b>
                            </h4>
                        </div>

                        <!-- One "tab" for each step in the form: -->
                        <div id="DivFormPostTest">
                            
                            <div id="p1" class="tab form-group">
                                <div class="form-control" style="height: 100%">
                                    <p style="margin-bottom: 7pt;">Berapa derajat (degree) yang dimiliki oleh simpul 3 pada graf kode program berikut ini ?</p>
                                    <select id="answerP1" name="answerP1" class="form-control">
                                        <option value="" selected disabled>Pilih Jawaban Anda</option>                
                                        <option value="a">3</option>                
                                        <option value="b">4</option>                
                                        <option value="c">5</option>                
                                        <option value="d">6</option>    
                                        <option value="e">7</option>        
                                    </select>
<pre><code class="language-c">
#include "stdio.h"

int baris = 5, kolom = 5;
int i, j,
cost[5][5];

int main()
{
    printf("\nthe matrix:\n");
    cost[0][1] = 2;
    cost[0][2] = 3;
    cost[0][3] = 1;
    cost[1][2] = 7;
    cost[1][3] = 9;
    cost[2][3] = 8;
    cost[2][4] = 4;
   
    for (i = 0; i < baris; i++)
        for (j = 0; j < kolom; j++)
            printf("cost[%d][%d]: %d\n",i,j,cost[i][j]);

    return 0;
}</code></pre>
                                </div>
                            </div>
                            
                            <div id="p2" class="tab form-group">
                                <div class="form-control" style="height: 100%">
                                    <p id="p2title" style="margin-bottom: 7pt;">Apakah tujuan fungsi Z dibuat pada graf kode program berikut ini ?</p>
                                    <select id="answerP2" name="answerP2" class="form-control">
                                        <option value="" selected disabled>Pilih Jawaban Anda</option>
                                        <option value="a">untuk menghitung nilai random</option>                
                                        <option value="b">untuk menghitung nilai bobot pada sisi graf</option>                
                                        <option value="c">untuk menghitung jarak antar simpul (node)</option>                
                                        <option value="d">untuk menghitung sisi simpul dari dan ke simpul lain</option>    
                                        <option value="e">tidak diketahui</option>
                                    </select>
<pre><code class="language-c">
#include "stdio.h"

int Z(int graf[4][4], int m, int n){
  printf("\nHitung sisi simpul %d ke %d\n", m, n);
  return graf[n][m];
}

int main(){
  int row = 4, col = 4, sisi;
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
      sisi = Z(graf, i, j);
    }
  return 0;
}</code></pre>
                                </div>
                            </div>
                            
                            <div id="p3" class="tab form-group">
                                <div class="form-control" style="height: 100%">
                                    <p id="p3title" style="margin-bottom: 7pt;">Berapa jumlah sisi (edge) yang dimiliki oleh graf kode program berikut ini jika tanpa simpul 5 ?</p>
                                    <select id="answerP3" name="answerP3" class="form-control">
                                        <option value="" selected disabled>Pilih Jawaban Anda</option>
                                        <option value="a">1</option>                
                                        <option value="b">6</option>                
                                        <option value="c">5</option>                
                                        <option value="d">7</option>    
                                        <option value="e">0</option>
                                    </select>
<pre><code class="language-c">
#include "stdio.h"

int main(){
  int x = 6, y = 6;
  int i, j,
  graf[6][6] = {  { 0, 0, 0, 0, 0, 0},
                  { 0, 0, 11, 7, 5, 9},
                  { 0, 11, 0, 8, 4, 13},
                  { 0, 7, 8, 0, 2, 1},
                  { 0, 5, 3, 2, 0, 13},
                  { 0, 9, 3, 1, 13, 0}
               };    
  printf("\nGraf:\n");
  for (i = 0; i < x; i++)
    for (j = 0; j < y; j++){
      printf("graf[%d][%d]: %d\n",i,j,graf[i][j]);
    }
  return 0;
}</code></pre>
                                </div>
                            </div>

                            <div id="p4" class="tab form-group">
                                <div class="form-control" style="height: 100%">
                                    <p id="p4title" style="margin-bottom: 7pt;">Berapa jumlah simpul dari graf kode program berikut ini ?</p>
                                    <select id="answerP4" name="answerP4" class="form-control">
                                        <option value="" selected disabled>Pilih Jawaban Anda</option>
                                        <option value="a">6</option>                
                                        <option value="b">7</option>                
                                        <option value="c">8</option>                
                                        <option value="d">9</option>    
                                        <option value="e">13</option>
                                    </select>
<pre><code class="language-c">
#include "stdio.h"
#define Z 999

void A(int n, int v, int cost[7][7], int dist[10]){
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
    int graf[7][7] = {  { 0, 0, 0, 0, 0, 0, 0},
                        { 0, Z, 5, Z, Z, Z, 8},
                        { 0, 5, Z, 7, Z, 2, Z},
                        { 0, Z, 7, Z, 9, Z, Z},
                        { 0, Z, Z, 9, Z, 4, Z},
                        { 0, Z, 2, Z, 4, Z, Z},
                        { 0, 8, Z, Z, Z, Z, Z} 
                    };
    
    v = 2;
    printf("\nthe source matrix: %d \n", v);
    
    A(n, v, graf, dist);
    
    printf("\nShortest path:\n");
    for (i = 1; i <= n; i++){
        if (i != v){
            printf("%d->%d,graf=%d\n", v, i, dist[i]);
        }
    }

    return 0;
}</code></pre>
                                </div>
                            </div>

                            <div id="p5" class="tab form-group">
                                <div class="form-control" style="height: 100%">
                                    <p id="p5title" style="margin-bottom: 7pt;">Ada berapa kesalahan sintaks pada kode program berikut ini ? Sebutkan di bagian mana saja!</p>
                                    <select id="answerP5" name="answerP5" class="form-control">
                                        <option value="" selected disabled>Pilih Jawaban Anda</option>
                                        <option value="a">1</option>                
                                        <option value="b">3</option>                
                                        <option value="c">5</option>                
                                        <option value="d">9</option>    
                                        <option value="e">0</option>
                                    </select><br>
<pre><code class="language-c">
#include "stdio.h"
#define Z 999

void A(int n, int v, int cost[7][7], int dist[10]){
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
    int graf[7][7] = {  { 0, 0, 0, 0, 0, 0, 0},
                        { 0, Z, 5, Z, Z, Z, 8},
                        { 0, 5, Z, 7, Z, 2, Z},
                        { 0, Z, 7, Z, 9, Z, Z},
                        { 0, Z, Z, 9, Z, 4, Z},
                        { 0, Z, 2, Z, 4, Z, Z},
                        { 0, 8, Z, Z, Z, Z, Z} 
                    };
    
    v = 2;
    printf("\nthe source matrix: %d \n", v);
    
    A(n, v, graf, dist);
    
    printf("\nShortest path:\n");
    for (i = 1; i <= n; i++){
        if (i != v){
            printf("%d->%d,graf=%d\n", v, i, dist[i]);
        }
    }

    return 0;
}</code></pre>
                                </div>
                            </div>

                        </div>

                        <div style="overflow:auto;">
                            <div style="float:right;">
                                <input id="nextBtn" class="btn btn-primary btn-lg" value="Lanjut" type="button" onclick="postTest(1)">
                            </div>
                        </div>
                    </form>
                </div>
                <div class="col-md-2 col-sm-2"></div>

            </div>

        </div>
    </section>

    <div style="height:133px;"></div>
    <script src="js/post-test.js?v=4"></script>
    <script src="js/prism.js?v=1" type="text/javascript"></script>

<?php require_once('footer.php'); ?>