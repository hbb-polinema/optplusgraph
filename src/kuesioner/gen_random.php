<html accept-charset="UTF-8">
<?php
require_once('db/db.php');
$_DB = new DB();

function random_str($length, $keyspace = '0123456789ABCDEFGHIJKLMNOPQRSTWXYZ'){
    $pieces = [];
    $max = strlen($keyspace) - 1;

    for($i = 0; $i < $length; ++$i){
        $pieces[] = $keyspace[random_int(0, $max)];
    }

    return implode('', $pieces);
}

$nim = 13517001;
$i = 1;
while($i < 100){
    $key = random_str(5);
    $row = $_DB->select('SELECT kode_unik FROM responden WHERE kode_unik = '.$key);

    if($row){
        echo 'Key Found Duplicate!<br>';
    } else {
        echo 'Nice! New Unique Key<br>';
        $_DB->query('INSERT INTO responden (email_responden, kode_unik) VALUES ("'.$nim.'@std.stei.itb.ac.id", "'.$key.'")');
        $i++;
        $nim++;
    }

    echo $key.' - '.$nim.'<hr>';
}

$email15 = '13515001@std.stei.itb.ac.id'; # OK
$email16 = '13516001@std.stei.itb.ac.id'; # OK
$email17 = '13517001@std.stei.itb.ac.id'; # OK


?>
</html>