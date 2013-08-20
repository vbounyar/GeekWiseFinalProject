
<?php
//$jsonRaw = fopen('php://input', 'r');
$jsonInput = file_get_contents("php://input");
//$data = json_decode($jsonInput);

//$jsonObjectStr = json_encode($data);

$file = "data/project_test_data.json";
$handle = fopen($file, 'w');
fwrite($handle, $jsonInput);
fclose($handle);

echo "Done";

?>

