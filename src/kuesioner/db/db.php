<?php

class DB{
    // Koneksi ke DB
    protected static $my_connect;

    /**
    * Koneksi ke DB
    * @return bool false jika gagal / mysqli MySQLi object jika sukses
    */
    public function connect(){
        // mencoba terkoneksi ke DB
        if(!isset(self::$my_connect)){
            // baca konfigurasi berkas DB, agar aman file ini harus diletakkan di luar jangkauan web root
            $config = parse_ini_file('db_config.ini');
            self::$my_connect = new mysqli('localhost',$config['username'],$config['password'],$config['dbname']);
        }

        // jika koneksi gagal
        if(self::$my_connect === false){
            // penanganan error - beritahu administrator, catat pada sebuah berkas, tampilkan error screen, dll.
            echo "Koneksi gagal ke basis data.";
            return false;
        }

        return self::$my_connect;
    }

    /**
    * Query Database
    * @param $query Query string
    * @return kombinasi seperti function mysqli::query()
    */
    public function query($query){
        // koneksi ke DB
        $my_connect = $this -> connect();

        // Query DB
        $result = mysqli_query($my_connect,$query);

        return $result;
    }

    /**
     * Baca baris dari DB (SELECT query)
     *
     * @param $query Query string
     * @return bool False jika gagal / array DB jika sukses
     */
    public function select($query) {
        $rows = array();
        $result = $this -> query($query);

        if($result === false) {
            return false;
        }

        while ($row = $result -> fetch_assoc()) {
            $rows[] = $row;
        }

        return $rows;
    }

    /**
     * error terakhir yang terjadi di DB
     * 
     * @return string pesan error DB
     */
    public function error() {
        $my_connect = $this -> connect();
        return mysqli_error($my_connect);
    }

    /**
     * Quote dan memastikan nilai string untuk query DB
     *
     * @param string $value nilai yang akan divalidasi
     * @return string Hasil nilai string yang telah divalidasi
     */
    public function quote($value) {
        $my_connect = $this -> connect();
        return "'" . $my_connect -> real_escape_string($value) . "'";
    }

    public function validate_data($data){
        $data = trim($data);
        $data = stripslashes($data);
        $data = strip_tags($data);
        $data = htmlspecialchars($data);
        $data = $this->quote($data);
        return $data;
    }

} // END class DB

?>