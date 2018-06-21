<?php require_once('destroy.php'); ?>
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
                        <li class="icon-arrow-circle-right" style="margin-top:17px;"></li>
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
                        <li class="icon-arrow-circle-right" style="margin-top:17px;color:lightseagreen;"></li>
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
                            <p>Baca lebih lanjut tentang
                                <a data-toggle="modal" data-target="#kebijakan">Kebijakan Privasi</a> |
                                <a data-toggle="modal" data-target="#skb">Syarat & Ketentuan</a>.</p>
                        </div>
                    </div>
                </div>
            </div>

        </div>

    </section>

    <div style="height:133px;"></div>
    
    <?php require_once('footer.php'); ?>