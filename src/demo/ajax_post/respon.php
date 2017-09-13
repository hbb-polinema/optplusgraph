<?php
if(isset($_POST['user_script'])){
    $data = $_POST['user_script'];
    $length = strlen($data);
    echo("count: ".$length."<hr>");
    echo($data);
}
?>