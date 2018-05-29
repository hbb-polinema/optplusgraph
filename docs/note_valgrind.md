# Valgrind 3.11.0 OPT Hacked #

WinMerge (Free, OpenSource on Windows/Linux)
* untuk membandingkan perbedaan file

http://winmerge.org

### Result: ###

1. valgrind-3.11.0\memcheck\mc_main.c >> Line 54, 55, 3789, 5693, 5715-5718, 7394-7406, 7646-7647, 7761-7763
2. valgrind-3.11.0\include\pub_tool_debuginfo.h >> Line 36-37, 124-132, 191, 198, 214, 285-408
3. valgrind-3.11.0\coregrind\m_debuginfo\debuginfo.c >> Line 74-1458, 5043-5159, 5472, 5594-5719, 5846
4. valgrind-3.11.0\memcheck\mc_translate.c >> Line 6261-6481, 6665, 6708-6716, 6795-6811
5. valgrind-3.11.0\coregrind\m_debuginfo\tytypes.c >> Line 47-51, 328-864
6. valgrind-3.11.0\coregrind\m_debuginfo\priv_tytypes.h >> Line 160-165
7. valgrind-3.11.0\config.h >> Line 41
8. valgrind-3.11.0\memcheck\mc_include.h >> Line 142-156


### backend.js ###

* TIMEOUT_SECS : limit masa tunggu code dieksekusi oleh valgrind, semakin banyak baris code maka semakin lama. Jika batas tunggu tercapai maka koneksi ajax antar client dan server diputus kemudian tampilkan pesan penyebab error kepada pengguna

* MAX_BUFFER_SIZE : limit data I/O tampung JSON antar client dan server. Jika semakin kecil server lebih ringan, tapi baris code yang dapat dieksekusi semakin sedikit.

* MEM_LIMIT : batas penggunaan RAM docker untuk eksekusi code di server. Jika semakin besar, maka akan semakin banyak baris code dapat dieksekusi.

* Kesimpulan: semakin banyak variabel yang digunakan dalam code, maka akan lebih banyak membutuhkan ruang memory dan buffer size I/O serta waktu eksekusi.

* child_process : https://medium.freecodecamp.org/node-js-child-processes-everything-you-need-to-know-e69498fe970a


