<?
if(isset($_GET['url'])) {
    $p = @file_get_contents($_GET['url']);
	if($p === false) {
		echo 0;
	}
	else {
		echo 1;
	}
}
?>