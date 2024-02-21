<?php

define("OPERATOR_USER", "usuario");
define("OPERATOR_PASSWORD", "usuario123456");

define("CONTROLLER", "192.168.100.28");
define("PORT", "443");
define("CONTROLLER_ID", "61c48dad6e3fdd80c79a1340bcf9817");
define('COOKIE_FILE_PATH', 'cookie.txt');
define('TOKEN_FILE_PATH', '/token.txt');



class miClase{


  public static function login(){
    $loginInfo = array(
      "name" => OPERATOR_USER,
      "password" => OPERATOR_PASSWORD
    );

    $headers = array(
      "Content-Type: application/json",
      "Accept: application/json"
    );

    $ch = curl_init();

    // post
    curl_setopt($ch, CURLOPT_POST, TRUE);

    // Set return to a value, not return to page
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);

    // Set up cookies. COOKIE_FILE_PATH defines where to save Cookie.
    curl_setopt($ch, CURLOPT_COOKIEJAR, COOKIE_FILE_PATH);
    curl_setopt($ch, CURLOPT_COOKIEFILE, COOKIE_FILE_PATH);

    // Allow Self Signed Certs
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, FALSE);
    curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, FALSE);

    // API Call

    curl_setopt($ch, CURLOPT_URL, "https://" . CONTROLLER . ":" . PORT . "/" . CONTROLLER_ID . "/api/v2/hotspot/login");
    curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
    curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($loginInfo));

    $res = curl_exec($ch);
    $resObj = json_decode($res);

    //Prevent CSRF. TOKEN_FILE_PATH defines where to save Token.

    $resObj = json_decode($res);
    if ($resObj !== null) {
        if (property_exists($resObj, 'errorCode') && $resObj->errorCode == 0 && property_exists($resObj, 'result') && property_exists($resObj->result, 'token')) {
            self::setCSRFToken($resObj->result->token);
        }
    } else {
        echo "Erro null";
    }

    curl_close($ch);

  }

  

  private static function setCSRFToken($token){

    $myfile = fopen(TOKEN_FILE_PATH, "w") or die("Unable to open file!");
    fwrite($myfile, $token);
    fclose($myfile);

    return $token;

  }

  /* Plantilla de código PHP para EAP: */

  

  public static function authorize($clientMac, $apMac, $ssidName, $radioId, $milliseconds){
  // Send user to authorize and the time allowed

    $authInfo = array(
      'clientMac' => $clientMac,
      'apMac' => $apMac,
      'ssidName' => $ssidName,
      'radioId' => $radioId,
      'time' => $milliseconds,
      'authType' => 4
    );

    $csrfToken = self::getCSRFToken();

    $headers = array(
      'Content-Type: application/json',
      'Accept: application/json',
      'Csrf-Token: ' . $csrfToken
    );

    $ch = curl_init();

    // post

    curl_setopt($ch, CURLOPT_POST, TRUE);

  

    // Set return to a value, not return to page

    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);

  

    // Set up cookies.

    curl_setopt($ch, CURLOPT_COOKIEJAR, COOKIE_FILE_PATH);

    curl_setopt($ch, CURLOPT_COOKIEFILE, COOKIE_FILE_PATH);

  

    // Allow Self Signed Certs

    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, FALSE);

    curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, FALSE);

    

    // API Call

    curl_setopt($ch, CURLOPT_URL, "https://" . CONTROLLER . ":" . PORT . "/" . CONTROLLER_ID . "/api/v2/hotspot/login");

    curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($authInfo));

    curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);

    $res = curl_exec($ch);

    echo $res;

    $resObj = json_decode($res);

    if ($resObj->errorCode == 0) {

    // authorized successfully

    }

    curl_close($ch);

  }

  

  public static function getCSRFToken(){

    $myfile = fopen(TOKEN_FILE_PATH, "r") or die("Unable to open file!");

    $token = fgets($myfile);

    fclose($myfile);

    return $token;

  }

  public static function test(){
    echo "<script>alert('Los datos no son válidos');</script>";
  }
 
}


?>

