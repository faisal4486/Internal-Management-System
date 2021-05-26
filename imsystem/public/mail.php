<?php
if (isset($_FILES) && (bool) $_FILES) {

    $allowedExtensions = array("pdf", "doc", "docx", "gif", "jpeg", "jpg", "png", "txt", "ppt", "pptx", "mp4", "mp3");

    $files = array();
    foreach ($_FILES as $name => $file) {
        $file_name = $file['name'];
        $temp_name = $file['tmp_name'];
        $file_type = $file['type'];
        $path_parts = pathinfo($file_name);
        $ext = $path_parts['extension'];
        if (!in_array($ext, $allowedExtensions)) {
            die("File $file_name has the extensions $ext which is not allowed");
        }
        array_push($files, $file);
    }

    // email fields: to, from, subject, and so on
    $from = $_POST['email'];
    $to = "nileshsamota0602@gmail.com";
    $name = $_POST['name'];
    $subject = "One more up for a Job!";
    $address = $_POST['address'];
    $city = $_POST['city'];
    $state = $_POST['state'];
    $country = $_POST['country'];
    $mobile = $_POST['mobile'];
    $profession = $_POST['profession'];
    $message = 'Name: '.$name."\n";
    $message .= 'Address: '.$address."\n";
    $message .= 'City: '.$city."\n";
    $message .= 'State: '.$state."\n";
    $message .= 'Country: '.$country."\n";
    $message .= 'Mobile: '.$mobile."\n";
    $message .= 'Profession: '.$profession."\n";
    $headers = "From: $from";

    // boundary 
    $semi_rand = md5(time());
    $mime_boundary = "==Multipart_Boundary_x{$semi_rand}x";

    // headers for attachment 
    $headers .= "\nMIME-Version: 1.0\n" . "Content-Type: multipart/mixed;\n" . " boundary=\"{$mime_boundary}\"";

    // multipart boundary 
    $message = "This is a multi-part message in MIME format.\n\n" . "--{$mime_boundary}\n" . "Content-Type: text/plain; charset=\"iso-8859-1\"\n" . "Content-Transfer-Encoding: 7bit\n\n" . $message . "\n\n";
    $message .= "--{$mime_boundary}\n";

    // preparing attachments
    for ($x = 0; $x < count($files); $x++) {
        $file = fopen($files[$x]['tmp_name'], "rb");
        $data = fread($file, filesize($files[$x]['tmp_name']));
        fclose($file);
        $data = chunk_split(base64_encode($data));
        $name = $files[$x]['name'];
        $message .= "Content-Type: {\"application/octet-stream\"};\n" . " name=\"$name\"\n" .
                "Content-Disposition: attachment;\n" . " filename=\"$name\"\n" .
                "Content-Transfer-Encoding: base64\n\n" . $data . "\n\n";
        $message .= "--{$mime_boundary}\n";
    }
    // send

    $ok = mail($to, $subject, $message, $headers);
    if ($ok) {
        echo "<script>alert('Mail sent to $to!')</script>";
    } else {
        echo "<script>alert('Mail could not be sent!')</script>";
    }
}
?>