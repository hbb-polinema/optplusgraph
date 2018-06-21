;
(function() {

    'use strict';

    // iPad and iPod detection	
    var isiPad = function() {
        return (navigator.platform.indexOf("iPad") != -1);
    };

    var isiPhone = function() {
        return (
            (navigator.platform.indexOf("iPhone") != -1) ||
            (navigator.platform.indexOf("iPod") != -1)
        );
    };

    // Parallax
    var parallax = function() {
        $(window).stellar();
    };

    // Burger Menu
    var burgerMenu = function() {

        $('body').on('click', '.js-fh5co-nav-toggle', function(event) {

            event.preventDefault();

            if ($('#navbar').is(':visible')) {
                $(this).removeClass('active');
            } else {
                $(this).addClass('active');
            }

        });
    };

    var goToTop = function() {

        $('.js-gotop').on('click', function(event) {
            event.preventDefault();
            $('html, body').animate({
                scrollTop: $('html').offset().top
            }, 500);
            return false;
        });

    };


    // Page Nav
    var clickMenu = function() {

        $('#navbar a:not([class="external"])').click(function(event) {
            var section = $(this).data('nav-section'),
                navbar = $('#navbar');

            if ($('[data-section="' + section + '"]').length) {
                $('html, body').animate({
                    scrollTop: $('[data-section="' + section + '"]').offset().top
                }, 500);
            }

            if (navbar.is(':visible')) {
                navbar.removeClass('in');
                navbar.attr('aria-expanded', 'false');
                $('.js-fh5co-nav-toggle').removeClass('active');
            }

            event.preventDefault();
            return false;
        });


    };

    // Reflect scrolling in navigation
    var navActive = function(section) {

        var $el = $('#navbar > ul');
        $el.find('li').removeClass('active');
        $el.each(function() {
            $(this).find('a[data-nav-section="' + section + '"]').closest('li').addClass('active');
        });

    };

    var navigationSection = function() {

        var $section = $('section[data-section]');

        $section.waypoint(function(direction) {

            if (direction === 'down') {
                navActive($(this.element).data('section'));
            }
        }, {
            offset: '150px'
        });

        $section.waypoint(function(direction) {
            if (direction === 'up') {
                navActive($(this.element).data('section'));
            }
        }, {
            offset: function() { return -$(this.element).height() + 155; }
        });

    };

    // Window Scroll
    /*var windowScroll = function() {
    	var lastScrollTop = 0;

    	$(window).scroll(function(event){

    	   	var header = $('#fh5co-header'),
    			scrlTop = $(this).scrollTop();

    		if ( scrlTop > 500 && scrlTop <= 2000 ) {
    			header.addClass('navbar-fixed-top fh5co-animated slideInDown');
    		} else if ( scrlTop <= 500) {
    			if ( header.hasClass('navbar-fixed-top') ) {
    				header.addClass('navbar-fixed-top fh5co-animated slideOutUp');
    				setTimeout(function(){
    					header.removeClass('navbar-fixed-top fh5co-animated slideInDown slideOutUp');
    				}, 100 );
    			}
    		} 
    		
    	});
    };*/

    // Animations
    // Home

    var homeAnimate = function() {
        if ($('#fh5co-home').length > 0) {

            $('#fh5co-home').waypoint(function(direction) {

                if (direction === 'down' && !$(this.element).hasClass('animated')) {

                    setTimeout(function() {
                        $('#fh5co-home .to-animate').each(function(k) {
                            var el = $(this);

                            setTimeout(function() {
                                el.addClass('fadeInUp animated');
                            }, k * 200, 'easeInOutExpo');

                        });
                    }, 200);

                    $(this.element).addClass('animated');
                }
            }, { offset: '80%' });
        }
    };


    var introAnimate = function() {
        if ($('#fh5co-intro').length > 0) {

            $('#fh5co-intro').waypoint(function(direction) {

                if (direction === 'down' && !$(this.element).hasClass('animated')) {

                    setTimeout(function() {
                        $('#fh5co-intro .to-animate').each(function(k) {
                            var el = $(this);

                            setTimeout(function() {
                                el.addClass('fadeInRight animated');
                            }, k * 200, 'easeInOutExpo');

                        });
                    }, 1000);

                    $(this.element).addClass('animated');
                }
            }, { offset: '80%' });
        }
    };

    var workAnimate = function() {
        if ($('#fh5co-work').length > 0) {

            $('#fh5co-work').waypoint(function(direction) {

                if (direction === 'down' && !$(this.element).hasClass('animated')) {

                    setTimeout(function() {
                        $('#fh5co-work .to-animate').each(function(k) {
                            var el = $(this);

                            setTimeout(function() {
                                el.addClass('fadeInUp animated');
                            }, k * 200, 'easeInOutExpo');

                        });
                    }, 200);

                    $(this.element).addClass('animated');

                }
            }, { offset: '80%' });

        }
    };


    var testimonialAnimate = function() {
        var testimonial = $('#fh5co-testimonials');
        if (testimonial.length > 0) {

            testimonial.waypoint(function(direction) {

                if (direction === 'down' && !$(this.element).hasClass('animated')) {

                    var sec = testimonial.find('.to-animate').length,
                        sec = parseInt((sec * 200) - 400);

                    setTimeout(function() {
                        testimonial.find('.to-animate').each(function(k) {
                            var el = $(this);

                            setTimeout(function() {
                                el.addClass('fadeInUp animated');
                            }, k * 200, 'easeInOutExpo');

                        });
                    }, 200);

                    setTimeout(function() {
                        testimonial.find('.to-animate-2').each(function(k) {
                            var el = $(this);

                            setTimeout(function() {
                                el.addClass('fadeInDown animated');
                            }, k * 200, 'easeInOutExpo');

                        });
                    }, sec);

                    $(this.element).addClass('animated');
                }
            }, { offset: '80%' });

        }
    };

    var servicesAnimate = function() {
        var services = $('#fh5co-services');
        if (services.length > 0) {

            services.waypoint(function(direction) {

                if (direction === 'down' && !$(this.element).hasClass('animated')) {

                    var sec = services.find('.to-animate').length,
                        sec = parseInt((sec * 200) + 400);

                    setTimeout(function() {
                        services.find('.to-animate').each(function(k) {
                            var el = $(this);

                            setTimeout(function() {
                                el.addClass('fadeInUp animated');
                            }, k * 200, 'easeInOutExpo');

                        });
                    }, 200);

                    setTimeout(function() {
                        services.find('.to-animate-2').each(function(k) {
                            var el = $(this);

                            setTimeout(function() {
                                el.addClass('bounceIn animated');
                            }, k * 200, 'easeInOutExpo');

                        });
                    }, sec);

                    $(this.element).addClass('animated');

                }
            }, { offset: '80%' });

        }
    };

    var aboutAnimate = function() {
        var about = $('#fh5co-about');
        if (about.length > 0) {

            about.waypoint(function(direction) {

                if (direction === 'down' && !$(this.element).hasClass('animated')) {

                    setTimeout(function() {
                        about.find('.to-animate').each(function(k) {
                            var el = $(this);

                            setTimeout(function() {
                                el.addClass('fadeInUp animated');
                            }, k * 200, 'easeInOutExpo');

                        });
                    }, 200);

                    $(this.element).addClass('animated');
                }
            }, { offset: '80%' });

        }
    };

    var countersAnimate = function() {
        var counters = $('#fh5co-counters');
        if (counters.length > 0) {

            counters.waypoint(function(direction) {

                if (direction === 'down' && !$(this.element).hasClass('animated')) {

                    var sec = counters.find('.to-animate').length,
                        sec = parseInt((sec * 200) + 400);

                    setTimeout(function() {
                        counters.find('.to-animate').each(function(k) {
                            var el = $(this);

                            setTimeout(function() {
                                el.addClass('fadeInUp animated');
                            }, k * 200, 'easeInOutExpo');

                        });
                    }, 200);

                    setTimeout(function() {
                        counters.find('.js-counter').countTo({
                            formatter: function(value, options) {
                                return value.toFixed(options.decimals);
                            },
                        });
                    }, 400);

                    setTimeout(function() {
                        counters.find('.to-animate-2').each(function(k) {
                            var el = $(this);

                            setTimeout(function() {
                                el.addClass('bounceIn animated');
                            }, k * 200, 'easeInOutExpo');

                        });
                    }, sec);

                    $(this.element).addClass('animated');

                }
            }, { offset: '80%' });

        }
    };


    var contactAnimate = function() {
        var contact = $('#fh5co-contact');
        if (contact.length > 0) {

            contact.waypoint(function(direction) {

                if (direction === 'down' && !$(this.element).hasClass('animated')) {

                    setTimeout(function() {
                        contact.find('.to-animate').each(function(k) {
                            var el = $(this);

                            setTimeout(function() {
                                el.addClass('fadeInUp animated');
                            }, k * 200, 'easeInOutExpo');

                        });
                    }, 200);

                    $(this.element).addClass('animated');

                }
            }, { offset: '80%' });

        }
    };

    var checkResolution = function() {
        var width = window.innerWidth,
            height = window.innerHeight;

        if (width < 800 || height < 600) {
            alert('Maaf, Anda tidak dapat melanjutkan mengisi kuesioner ini!\n\n' +
                'Pastikan browser fullscreen dan\n' +
                'resolusi perangkat Anda minimal 800 x 600 pixels\n\n' +
                'Resolusi perangkat Anda saat ini:\n' +
                `${width} x ${height} pixels`);
        }
    };

    // Document on load.
    $(function() {

        parallax();
        burgerMenu();
        clickMenu();
        //windowScroll();
        navigationSection();
        goToTop();

        // Animations
        homeAnimate();
        introAnimate();
        workAnimate();
        testimonialAnimate();
        servicesAnimate();
        aboutAnimate();
        countersAnimate();
        contactAnimate();

        // Check Resolution
        checkResolution();
    });

}());

/**
 * Fungsi-fungsi yang dibuat oleh @habibieeddien
 */

function checkCode() {
    var kode = document.getElementById('kode').value;

    if (kode.length == 5) {
        $.ajax({
            type: "POST",
            url: "ajax_request/kode.php",
            data: "kode_unik=" + kode,
            cache: false,
            success: function(result) {
                if (result == 'sukses') {
                    alert('Sukses');
                    window.location.href = 'data-pribadi.php';
                } else if (result == 'gagal') {
                    alert('Maaf, kode unik salah');
                }
            },
            error: function(xhr, status, error) {
                alert('Terjadi koneksi galat: ' + status);
            }
        });
    } else {
        alert('Kode Unik salah');
    }
}

function dataPribadi() {
    var data = [],
        valid = true;
    data.push(document.getElementById('nama').value);
    data.push(document.getElementById('gender').value);
    data.push(document.getElementById('umur').value);
    data.push(document.getElementById('pendidikan').value);
    data.push(document.getElementById('kampus').value);
    data.push(document.getElementById('prodi').value);
    data.push(document.getElementById('email').value);
    data.push(document.getElementById('ponsel').value);
    data.push(document.getElementById('pernyataan').checked);

    for (var i = 0; i < data.length; i++) {
        if (data[i].length != 0) {
            console.log(data[i]);
        } else {
            valid = false;
            break;
        }
    }

    if (!data[data.length - 1]) {
        valid = false;
        alert('Pernyataan belum disetujui');
    }

    if (valid) {
        $.ajax({
            type: "POST",
            url: "ajax_request/data_pribadi.php",
            data: "nama=" + data[0] + "&gender=" + data[1] +
                "&umur=" + data[2] + "&pendidikan=" + data[3] +
                "&kampus=" + data[4] + "&prodi=" + data[5] +
                "&email=" + data[6] + "&ponsel=" + data[7] +
                "&pernyataan=" + data[8],
            cache: false,
            success: function(result) {
                if (result == 'sukses') {
                    alert('Sukses! Terima kasih atas pengisian Data Anda');
                    window.location.href = 'pretest.php';
                } else {
                    alert(result);
                }
            },
            error: function(xhr, status, error) {
                alert('Terjadi koneksi galat: ' + status);
            }
        });
    } else {
        alert('Mohon isi data dengan lengkap terlebih dahulu!');
    }
}

function checkResolution(step) {
    var width = window.innerWidth,
        height = window.innerHeight;

    if (width < 800 || height < 600) {
        alert('Maaf, Anda tidak dapat melanjutkan mengisi kuesioner ini!\n\n' +
            'Pastikan browser fullscreen dan\n' +
            'resolusi perangkat Anda minimal 800 x 600 pixels\n\n' +
            'Resolusi perangkat Anda saat ini:\n' +
            `${width} x ${height} pixels`);
        return;
    }

    // cek input kode unik
    if (step == 1) checkCode();
    else if (step == 2) dataPribadi();
    else if (step == 3) preTest();
    else if (step == 4) simulasi();
    else if (step == 5) postTest();
}

function showProdi(val) {
    var pendidikan = val.value;

    if (pendidikan == 'd' || pendidikan == 's1' || pendidikan == 's2') {
        document.getElementById('jurusan').style.display = 'block';
        document.getElementById('asal-kampus').style.display = 'block';
    } else {
        document.getElementById('jurusan').style.display = 'none';
        document.getElementById('asal-kampus').style.display = 'none';
    }
}

var _MIN, _SEC;

function timer(menit, detik, divTimer) {
    _MIN = menit;
    _SEC = detik;
    divTimer.innerHTML = 'Sisa Waktu: ' + _MIN + ' menit ' + _SEC + ' detik';

    function countTimer() {
        setTimeout(countTimer, 1000);
        if (_MIN == 0 && _SEC >= 0) {
            if (_MIN == 0 && _SEC == 0) {
                divTimer.innerHTML = '<span style="color:red">Sisa Waktu: 0 menit 0 detik</span>';
            } else
                divTimer.innerHTML = '<span style="color:red">Sisa Waktu: ' + _MIN + ' menit ' + _SEC + ' detik</span>';
        } else {
            divTimer.innerHTML = '<span style="color:#27ae60">Sisa Waktu: ' + _MIN + ' menit ' + _SEC + ' detik</span>';
        }

        if (_MIN >= 0 && _SEC > 0) _SEC--;
        if (_SEC <= 0) {
            if (_MIN > 0) {
                _SEC = 59;
                _MIN--;
            }
            if (_MIN <= 0) {
                clearTimeout(countTimer);
                setTimeout('console.log(`timeout`)', 1);
            }
        }
    }
    countTimer();
}

function checkFromDB(q) {
    console.log('q: ' + q);
    var hasil = '';

    $.ajax({
        type: "POST",
        url: "ajax_request/cek_q.php",
        data: "q=" + q,
        cache: false,
        success: function(result) {
            if (result == 'sudah') {
                console.log('pertanyaan sudah dijawab');
                hasil = 'sudah';
            } else if (result == 'belum') {
                console.log('pertanyaan belum dijawab');
                hasil = 'belum';
            } else {
                console.log(result);
                hasil = 'error';
            }
        },
        error: function(xhr, status, error) {
            console.log('Terjadi koneksi galat: ' + status);
        }
    });

    return hasil;
}