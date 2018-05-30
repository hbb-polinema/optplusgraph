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
                    <h2 class="to-animate">Post Test</h2>
                    <div class="row">
                        <div class="col-md-8 col-md-offset-2 subtext to-animate">
                            <h3>Tes ini untuk menilai hasil kinerja Anda<br>dari simulasi yang telah dilakukan.<br>Mohon kejujuran dan konsentrasi Anda.</h3>
                            <p>Baca lebih lanjut tentang <a href="#" target="_blank">Kebijakan Privasi</a>.</p>
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
                                <b id="sisaSoal">4</b>
                            </h4>
                        </div>

                        <!-- One "tab" for each step in the form: -->
                        <div id="DivFormPostTest">
                            
                            <div id="p1" class="tab form-group">
                                <div class="form-control" style="height: 100%">
                                    <p style="margin-bottom: 7pt;">Berapa total simpul dalam graf kode program ini ?</p>
                                    <select id="answerP1" name="answerP1" class="form-control">
                                        <option value="" selected disabled>Pilih Jawaban Anda</option>                
                                        <option value="a">5</option>                
                                        <option value="b">7</option>                
                                        <option value="c">8</option>                
                                        <option value="d">9</option>    
                                        <option value="e">10</option>        
                                    </select>
                                    <!--TODO: tampilkan graf kode program di sini-->
                                </div>
                            </div>
                            
                            <div id="p2" class="tab form-group">
                                <div class="form-control" style="height: 100%">
                                    <p id="p2title" style="margin-bottom: 7pt;">Berapa derajat (<i>degree</i>) yang dimiliki oleh simpul 3 pada graf kode program berikut ini ?</p>
                                    <select id="answerP2" name="answerP2" class="form-control">
                                        <option value="" selected disabled>Pilih Jawaban Anda</option>
                                        <option value="a">5</option>                
                                        <option value="b">7</option>                
                                        <option value="c">8</option>                
                                        <option value="d">9</option>    
                                        <option value="e">10</option>
                                    </select>
                                    <!--TODO: tampilkan graf kode program di sini-->
                                </div>
                            </div>
                            
                            <div id="p3" class="tab form-group">
                                <div class="form-control" style="height: 100%">
                                    <p id="p3title" style="margin-bottom: 7pt;">Berapa total biaya (<i>cost</i>) yang diperlukan dari simpul 1 hingga simpul 5 pada graf kode program berikut ini ?</p>
                                    <select id="answerP3" name="answerP3" class="form-control">
                                        <option value="" selected disabled>Pilih Jawaban Anda</option>
                                        <option value="a">15</option>                
                                        <option value="b">17</option>                
                                        <option value="c">18</option>                
                                        <option value="d">19</option>    
                                        <option value="e">20</option>
                                    </select>
                                    <!--TODO: tampilkan graf kode program di sini-->
                                </div>
                            </div>

                            <div id="p4" class="tab form-group">
                                <div class="form-control" style="height: 100%">
                                    <p id="p4title" style="margin-bottom: 7pt;">Berapa jumlah sisi (<i>edge</i>) yang dimiliki oleh graf kode program berikut ini ?</p>
                                    <select id="answerP4" name="answerP4" class="form-control">
                                        <option value="" selected disabled>Pilih Jawaban Anda</option>
                                        <option value="a">5</option>                
                                        <option value="b">7</option>                
                                        <option value="c">8</option>                
                                        <option value="d">9</option>    
                                        <option value="e">10</option>
                                    </select>
                                    <!--TODO: tampilkan graf kode program di sini-->
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
    <script src="js/post-test.js?v=3"></script>

<?php require_once('footer.php'); ?>