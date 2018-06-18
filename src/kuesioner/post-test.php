<?php
session_start();

if(isset($_SESSION['kode'])){
    require_once('db/db.php');
    $kode_unik = $_SESSION['kode'];
    $_DB = new DB();
    $select = $_DB->select('SELECT nama_responden, tahap_sekarang FROM responden WHERE kode_unik = '.$kode_unik);
    if($select){
        if($select[0]['tahap_sekarang'] == "post-test.php"){
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
                        </ul> Anda sebagai Responden | <p id="timer">Sisa Waktu: 25 menit 0 detik</p>
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
                                    <p style="margin-bottom: 7pt;">Berapa total simpul dalam graf kode program di bawah ini ?</p>
                                    <select id="answerP1" name="answerP1" class="form-control">
                                        <option value="" selected disabled>Pilih Jawaban Anda</option>                
                                        <option value="a">7</option>                
                                        <option value="b">1</option>                
                                        <option value="c">antara 1 dan 7</option>                
                                        <option value="d">antara 0 dan 10</option>    
                                        <option value="e">tidak dapat ditentukan</option>        
                                    </select>
<pre><code class="language-c">
#include "stdio.h"
#include "time.h"
#define infinity 999

int G[10][10], X[10], n, c = 0;

void Z()
{
    int i, j;
    n = M(1, 7);    
    for (i = 0; i < n; i++)
    {
        for (j = 0; j < n; j++)
        {
            G[i][j] = M(0, 9);
            if (G[i][j] == 0)
            {
                G[i][j] = infinity;
                G[j][i] = infinity;
            }
            else
            {
                G[j][i] = G[i][j];
            }
        }
        X[i] = 0;
    }

    for (i = 0; i < n; i++)
    {
        printf("\n");
        for (j = 0; j < n; j++)
            printf("\t%d", G[i][j]);
    }
}

void F(int s)
{
    int i, n;
    X[s] = 1;
    printf("%d--->", s + 1);
    n = xyz(s);
    if (n == 999)
    {
        n = 0;
        printf("%d", n + 1);
        c += G[s][n];
        return;
    }
    F(n);
}

int M(const int x, const int y){
    return rand() % (y - x) + x;
}

int xyz(int c)
{
    int i, nc = 999;
    int min = 999, kmin;
    for (i = 0; i < n; i++)
    {
        if ((G[c][i] != 0) && (X[i] == 0))
            if (G[c][i] + G[i][c] < min)
            {
                min = G[i][0] + G[c][i];
                kmin = G[c][i];
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
    F(0);
    printf("\nMinimun cost: %d\n ", c);
    return 0;
}</code></pre>
                                </div>
                            </div>
                            
                            <div id="p2" class="tab form-group">
                                <div class="form-control" style="height: 100%">
                                    <p id="p2title" style="margin-bottom: 7pt;">Berapa derajat (<i>degree</i>) yang dimiliki oleh simpul 3 pada graf kode program berikut ini ?</p>
                                    <select id="answerP2" name="answerP2" class="form-control">
                                        <option value="" selected disabled>Pilih Jawaban Anda</option>
                                        <option value="a">1</option>                
                                        <option value="b">2</option>                
                                        <option value="c">3</option>                
                                        <option value="d">4</option>    
                                        <option value="e">tidak diketahui</option>
                                    </select>
<pre><code class="language-c">
#include "stdio.h"

int main()
{
    int row = 5, col = 5;
    int i, j,
    G[5][5] = {     { 0, 6, 3, 1, 3},
                    { 6, 0, 9, 9, 9},
                    { 3, 9, 0, 8, 8},
                    { 1, 9, 8, 0, 7},
                    { 1, 9, 8, 7, 0}
                 };

    printf("\nthe matrix:\n");
    for (i = 0; i < row; i++)
        for (j = 0; j < col; j++)
            printf("G[%d][%d]: %d\n",i,j,G[i][j]);

    return 0;
}</code></pre>
                                </div>
                            </div>
                            
                            <div id="p3" class="tab form-group">
                                <div class="form-control" style="height: 100%">
                                    <p id="p3title" style="margin-bottom: 7pt;">Berapa jumlah minimum biaya (<i>cost</i>) yang diperlukan dari simpul 1 hingga simpul 4 dari graf kode program berikut ini ?</p>
                                    <select id="answerP3" name="answerP3" class="form-control">
                                        <option value="" selected disabled>Pilih Jawaban Anda</option>
                                        <option value="a">7</option>                
                                        <option value="b">9</option>                
                                        <option value="c">11</option>                
                                        <option value="d">10</option>    
                                        <option value="e">12</option>
                                    </select>
<pre><code class="language-c">
#include "stdio.h"

int baris = 5, kolom = 5;
int i, j,
cost[5][5];

int main()
{
    printf("\nthe matrix:\n")
    cost[0][1] = 2
    cost[0][2] = 3;
    cost[0][3] = 1;
    cost[1][2] = 7;
    cost[1][3] = 9;
    cost[2][3] = 8;
    cost[2][4] = 4;
    cost[2][1] = 7;
   
    for (i = 0; i < row; i++)
        for (j = 0; j <= col; j++)
            printf("cost[%d][%d]: %d\n",i,j,cost[i][j]);

    return 0
}</code></pre>
                                </div>
                            </div>

                            <div id="p4" class="tab form-group">
                                <div class="form-control" style="height: 100%">
                                    <p id="p4title" style="margin-bottom: 7pt;">Berapa jumlah sisi (<i>edge</i>) yang dimiliki oleh graf kode program berikut ini ?</p>
                                    <select id="answerP4" name="answerP4" class="form-control">
                                        <option value="" selected disabled>Pilih Jawaban Anda</option>
                                        <option value="a">1</option>                
                                        <option value="b">2</option>                
                                        <option value="c">3</option>                
                                        <option value="d">4</option>    
                                        <option value="e">5</option>
                                    </select>
<pre><code class="language-c">
#include "stdio.h"

int row = 3, col = 3;
int i, j,
G[3][3] = {  { 0, 2, 3},
             { 2, 0, 7},
             { 3, 7, 0},
          };

int main()
{
    printf("\nGraf:\n");
    for (i = 0; i < row; i++)
        for (j = 0; j < col; j++)
            printf("G[%d][%d]: %d\n",i,j,G[i][j]);

    return 0;
}</code></pre>
                                </div>
                            </div>

                            <div id="p5" class="tab form-group">
                                <div class="form-control" style="height: 100%">
                                    <p id="p5title" style="margin-bottom: 7pt;">Ada berapa kesalahan sintaks pada kode program berikut ini?</p>
                                    <select id="answerP5" name="answerP5" class="form-control">
                                        <option value="" selected disabled>Pilih Jawaban Anda</option>
                                        <option value="a">5</option>                
                                        <option value="b">6</option>                
                                        <option value="c">7</option>                
                                        <option value="d">8</option>    
                                        <option value="e">9</option>
                                    </select><br>
                                    <p>Sebutkan pada baris berapa saja ...</p>
                                    <textarea id="answerP5a" style="width:100%;height:111px;"></textarea>
<pre><code class="language-c">
#include "stdio.h"

int baris = 5, kolom = 5;
int i, j,
cost[5][5];

int main()
{
    printf("\nthe matrix:\n")
    cost[0][1] = 2
    cost[0][2] = 3;
    cost[0][3] = 1;
    cost[1][2] = 7;
    cost[1][3] = 9;
    cost[2][3] = 8;
    cost[2][4] = 4;
    cost[2][1] = 7;
   
    for (i = 0; i < row; i++)
        for (j = 0; j <= col; j++)
            printf("cost[%d][%d]: %d\n",i,j,cost[i][j]);

    return 0
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

<?php require_once('footer.php'); ?>

<script src="js/post-test.js?v=6"></script>
<script src="js/prism.js?v=1" type="text/javascript"></script>