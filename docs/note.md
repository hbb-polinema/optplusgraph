Code Line | Kode User | JSON OPT | Viz.OPT | Target JSON | Viz. Target

########################################################################

Catatan Saat Seminar Proposal
`````````````````````````````
* Don't use GOJS, MIT, LGPL (Lesser General Public License)
* Use Open Source, Barkeley, NO GPL

Level of Programming
--------------------
* Reading
* Correcting
* Visualizing / Simulating
* Constructing

+ Bagaimana melakukan deteksi apakah pohon atau bukan ?
+ Tulis lebih rinci learning: struktur data vs programming
+ Apakah ada kemungkinan dikembangkan untuk error checking ?
+ Bagaimana menunjukkan pohon / graf yang salah ?
+ Apa yang baru (novelty) ?

########################################################################

Bimbingan Jumat 16Juni17 Jam 09:00 - Pak Yudis
``````````````````````````````````````````````
Overall:
- buat kamus pribadi / konsistensi kosa kata

Bab 1 - Latar Belakang
> maks 2 halaman
> ubah referensi dengan buku luar (english)
> closing remark menggunakan OPT.

Bab 2
> cukup II.1 Graf --> pohon bagian dari graf
> gambaran umum arsitektur OPT pindah ke sini dari bab 3

Bab 3
> Analisis Masalah yg ada di OPT
> yg perlu jd perhatian dlm pengembangan
> struktur data di c / c++ hanya ada array dan pointer

Bab 4 Pembangunan Perangkat Lunak
> Perbaikan arsitektur
> format tracing
> tahap pembangunan

Bab 5 Pengujian dan Evaluasi
> Desain eksperimen


Step by step (tentatif)
-----------------------
1. Sediakan dummy data JSON dari hasil visualize graf C dan C++
2. Lakukan eksperimen dengan data no.1 untuk menghasilkan visual graf
3. buat kondisi-kondisi tertentu untuk mendeteksi mana program yang perlu visual graf/tree


---------------------------
Catatan Penting tentang Pemrograman http://homepage.cs.uri.edu/faculty/wolfe/book/Readings/Reading13.htm

* Why Programming ?
* What Programmers do ?
* The Programming process
* C, C++, Java, and Javascript

>> opt/v3/docs/project-idea: The goal of this project is to create a set of effective custom renderers for data structures

------
Referensi yang disarankan oleh Bu Inge berdasarkan author
------
+ Donald Ervin Knuth
+ Thomas H. Cormen
+ Robert Sedgewick
----- dari diktat struktur data 2008 oleh Bu Inge ----
+ Aho, Hopcroft, Ullman
+ Horowitz, E. & Sahni, S.
+ Wirth, N.

---- dari perpus STEI 26/09/2017 -----
+ Redmond, D. and Moore, P.A., Graphical User Interface Design and Evaluation (GUIDE), Prentice Hall, London, 1995
		visualisasi merupakan suatu sarana yang menggambarkan suatu objek, bagian dari objek,
		atau aspek dari suatu objek pada antarmuka pengguna. Berpijak dari definisi yang dikemukakan tersebut,
		visualisasi akan dapat mempermudah pengguna dalam melihat suatu objek terutama untuk interpretasi
		suatu proses.
+ Nielson, L. Visualization in Scientific and Engineering Computation
+ Metode UML (Unified Modeling Languange) dirintis pada tahun 1995 oleh Booch, Rumbaugh dan Jacobson



https://id.wikihow.com/Menulis-Paragraf
http://romisatriawahono.net/2012/06/18/kiat-menyusun-alur-latar-belakang-masalah-penelitian/

Matriks - Berbobot - tak berarah
cirinya:
- alamat [baris, kolom] = alamat [kolom, baris]
- nilai > 0

Matriks - Berbobot - berarah
cirinya:
- alamat [baris, kolom] != alamat [kolom, baris]
- nilai > 0

Matriks - tak berbobot - tak berarah
cirinya:
- alamat [baris, kolom] = alamat [kolom, baris]
- nilai = 1 ada edge, nilai = 0 tidak ada edge

Matriks - tak berbobot - berarah
cirinya:
- alamat [baris, kolom] != alamat [kolom, baris]
- nilai = 1 ada edge, nilai = 0 tidak ada edge

*note: informasikan kepada pengguna nilai yang digunakan utk tak berbobot hanya 1 atau 0
*jika ditemukan lebih dari 1 matriks, maka tdk ada visualisasi (karena belum mendukung utk tampilkan graf lebih dari 1)


Pointer - Berbobot - tak berarah

Pointer - Berbobot - berarah

Pointer - tak berbobot - tak berarah

Pointer - tak berbobot - berarah

2 jenis dijkstra:
Dijkstra - berbobot - berarah
Dijkstra - berbobot - tak-berarah

--> Bagaimana cara animasikan node variabel yang sedang diakses ?

https://www2.cs.arizona.edu/icon/progvis/lectures/intro.htm --> VP

Sifat graf: http://web.cecs.pdx.edu/~sheard/course/Cs163/Doc/Graphs.html

Eksplorasi kakas VP:
+ Jype - p
+ Vismod - p157
+ jGrasp - p169
+ JAVAVIS, Seppala's tool, OOP Anim, Javamod, Jive 


+ Coding, temukan cara animasi variabel
+ tulis draft paper
+ cari conference/publikasi
+ cari responden email students

+ http://computize.org
+ http://www.famo.us
+ http://handlebarsjs.com
+ http://gato.sourceforge.net
+ http://ftsrg.github.io/seviz
+ http://www.yumpu.com
+ http://www.icsharpcode.net/opensource/sd/
+ https://library.ppu.edu/en/freeresource/libgen-e-books
+ Struktur Data: https://knowshares.wordpress.com/2016/12/14/linear-vs-non-linear-datastructure/

118.97.252.102:8080
/var/lib/tomcat8/webapps/

