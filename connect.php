<?php
    $email = $_POST['email'];
    $skill = $_POST['skill'];
    $level = $_POST['level'];
    $country = $_POST['country'];

    //Database connection
    $conn = new mysqli('localhost', 'root', '', 'waitlist_hackly');
    if($conn->connect_error){
        die('Connection Failed : '.$conn->connect_error);
    }else{
        $stmt = $conn->prepare("insert into registration(email, skill, level, country) values(?, ?, ?, ?)");
        $stmt->bind_param("ssss",$email, $skill, $level, $country);
        $stmt->execute();
        echo "registration SUccessfully...";
        $stmt->close();
        $conn->close();
    }
?>
