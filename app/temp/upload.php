<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST,OPTIONS,PUT');

if (!empty($_FILES)) {

    $tempPath = $_FILES['file']['tmp_name'];
    //$uploadPath = dirname(__FILE__) . '\temp\\' . $_FILES['file']['name'];
    $uploadPath = dirname(__FILE__) . '/' . $_FILES['file']['name'];

    move_uploaded_file($tempPath, $uploadPath);

    $answer = array('answer' => 'File transfer completed');
    $json = json_encode($answer);

    echo $json;

} else {
    echo 'No files';

}