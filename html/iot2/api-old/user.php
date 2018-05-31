<?php
/* Snap4City: IoT-Directory
   Copyright (C) 2017 DISIT Lab https://www.disit.org - University of Florence

   This program is free software; you can redistribute it and/or
   modify it under the terms of the GNU General Public License
   as published by the Free Software Foundation; either version 2
   of the License, or (at your option) any later version.
   This program is distributed in the hope that it will be useful,
   but WITHOUT ANY WARRANTY; without even the implied warranty of
   MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
   GNU General Public License for more details.
   You should have received a copy of the GNU General Public License
   along with this program; if not, write to the Free Software
   Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA. */

header("Content-type: application/json");
header("Access-Control-Allow-Origin: *\r\n");
include ('../config.php');
// session_start();
$link = mysqli_connect($host, $username, $password) or die("failed to connect to server !!");
mysqli_select_db($link, $dbname);

//Altrimenti restituisce in output le warning
error_reporting(E_ERROR | E_NOTICE);


if(!$link->set_charset("utf8")) 
{
    exit();
}

if(isset($_REQUEST['action']) && !empty($_REQUEST['action'])) 
    {
        $action = $_REQUEST['action'];
    }
else
{
    exit();
}

$result=array();	
/* all the primitives return an array "result" with the following structure

result["status"] = ok/ko; reports the status of the operation (mandatory)
result["msg"] a message related to the execution of the operation (optional)
result["content"] in case of positive execution of the operation the content extracted from the db (optional)

This array should be encoded in json
*/	

if ($action=="insert")
{   $username = mysqli_real_escape_string($link, $_REQUEST['username']);
	$name = mysqli_real_escape_string($link, $_REQUEST['firstName']);
	$surname = mysqli_real_escape_string($link, $_REQUEST['lastName']);
	$organization = mysqli_real_escape_string($link, $_REQUEST['organization']);
	$admin = mysqli_real_escape_string($link, $_REQUEST['userType']);
	$email = mysqli_real_escape_string($link, $_REQUEST['email']);

	$q = "INSERT INTO users(username, name, surname, organization, admin, email) " .
		 "VALUES('$username', '$name', '$surname',  '$organization', '$admin', '$email' )";
	$r = mysqli_query($link, $q);

	if($r)
	{
		$result["status"]='ok';
	}
	else
	{
		 $result["status"]='ko';
		 $result["msg"] = '<script type="text/javascript">'.
						 'alert("Error: An error occurred when registering the user $name. <br/>' .
						   mysqli_error($link) . $q .
						   ' Please enter again the user")'. '</script>';
	}
	echo json_encode($result);
	mysqli_close($link);
}	

else if($action=="delete")
{
      $username = mysqli_real_escape_string($link, $_REQUEST['username']);      
      $q = "DELETE FROM users WHERE username = '$username'";
      $r = mysqli_query($link, $q);
      if($r)
	  {
		$result["status"]='ok';
	  }
	  else
	  {
		 $result["status"]='ko';
		 
		 $result["msg"] = 'User <b>' . $name . '</b> &nbsp; deletion failed, ' .
						   mysqli_error($link) . $q .
						   ' Please enter again.';
	  }
	  echo json_encode($result);
	  mysqli_close($link);
}

else if ($action=="update")
{
	$username = mysqli_real_escape_string($link, $_REQUEST['username']);
	$name = mysqli_real_escape_string($link, $_REQUEST['firstName']);
	$surname = mysqli_real_escape_string($link, $_REQUEST['lastName']);
	$organization = mysqli_real_escape_string($link, $_REQUEST['organization']);
	$admin = mysqli_real_escape_string($link, $_REQUEST['userType']);
	$status = mysqli_real_escape_string($link, $_REQUEST['userStatus']);
	$email = mysqli_real_escape_string($link, $_REQUEST['email']);
	
	
	$q = "UPDATE users SET username = '$username', name = '$name', surname = '$surname', organization = '$organization', admin = '$admin', status = '$status', email = '$email' WHERE name = '$name'";
	$r = mysqli_query($link, $q);

	if($r)
	{
		$result["status"]='ok';
	}
	else
	{
		 $result["status"]='ko';
		 $result["msg"] = '<script type="text/javascript">'.
						 'alert("Error: An error occurred when updating the user $name. <br/>' .
						   mysqli_error($link) . $q .
						   ' Please enter again the user")'. '</script>';
	}
	echo json_encode($result);
	mysqli_close($link);
}

else if($action == 'get_all_user')
{
	$q = "SELECT * FROM users";
	$r = mysqli_query($link, $q);
	if($r) 
	{
		$result['status'] = 'ok';
		$result['content'] = array();
		 while($row = mysqli_fetch_assoc($r)) 
		{
			array_push($result['content'], $row);
		}
	} 
	else
	{
		$result['status'] = 'ko';
		$result['msg'] = '<script type="text/javascript">'.
						 'alert("Error: errors in reading data about context brokers. <br/>' .
						   mysqli_error($link) . $q .
						   '")'. '</script>';
	}

	echo json_encode($result);
	mysqli_close($link); 
}

	
	else 
	{
	    $result['status'] = 'ko';
		$result['msg'] = 'invalid action ' . $action;
		echo json_encode($result);
	}
