<?php

include_once "./db/databases.php";
include_once "./db/contextbroker.php";

if (!isset($_GET["errore"]))
{

    $cb = new contextbroker();
    	
	$cb->fetchRecord(array("name"=>$_GET["id"]));
	if ($cb->error_status==1 && $cb->fetchNumRows()==1)
	{
	  $dati= $cb->result[0];
	}
	else
	{
	  // header("Location:../index.php?op=errore&status=1");
	  $cb->error_redirect();
	}
}
else
{
     $dati = unserialize($_GET['dati']);
     $errore = unserialize($_GET['errore']);
}

?>

<div class="col-lg-6 mb-4">
<div class="well well-lg">

<form role="form" method="POST" action="php/modifyCB-exe.php">


<div class="form-group">
      <label>Name </label> <span class="text-danger pull-right"><?php if (isset($errore["name"])) echo $errore["name"];?></span>
      <input class="form-control" type="text" name="name" value="<?php echo $dati["name"];?>"   <?php if (!isset($errore["name"])) echo "readonly"?>>
</div>
<div class="form-group">
    <label>Type</label>
	    <select name="type" class="form-control">
               <option value="AMQP"  <?php if ($dati["type"]=="amqp") echo "selected"; ?>>AMQP</option>
			   <!-- <option value="COAP"  <?php if ($dati["type"]=="COAP") echo "selected"; ?>>COAP</option>
			   -->
			   <option value="MQTT"   <?php if ($dati["type"]=="mqtt") echo "selected"; ?>>MQTT</option>
			   <option value="NGSI"   <?php if ($dati["type"]=="ngsi") echo "selected"; ?>>NGSI</option>
        </select>
</div>

<div class="form-group">
      <label>IP address</label><span class="text-danger pull-right"><?php if (isset($errore["ip"])) echo $errore["ip"];?></span>
      <input class="form-control" type="text" name="ip" value="<?php echo $dati["ip"];?>">
</div>

<div class="form-group">
      <label>Port</label><span class="text-danger pull-right"><?php if (isset($errore["port"])) echo $errore["port"];?></span>
      <input class="form-control" type="text" name="port" value="<?php echo $dati["port"];?>">
</div>

<div class="form-group">
      <label>Login</label><span class="text-danger pull-right"><?php if (isset($errore["login"])) echo $errore["login"];?></span>
      <input class="form-control" type="text" name="login" value="<?php echo $dati["login"];?>">
</div>

<div class="form-group">
      <label>Password</label><span class="text-danger pull-right"><?php if (isset($errore["password"])) echo $errore["password"];?></span>
      <input class="form-control" type="text" name="password" value="<?php echo $dati["password"];?>">
</div>

<div class="form-group">
      <label>Latitude</label><span class="text-danger pull-right"><?php if (isset($errore["latitude"])) echo $errore["latitude"];?></span>
      <input class="form-control" type="text" name="latitude" value="<?php echo $dati["latitude"];?>">
</div>

<div class="form-group">
      <label>Longitude</label><span class="text-danger pull-right"><?php if (isset($errore["longitude"])) echo $errore["longitude"];?></span>
      <input class="form-control" type="text" name="longitude" value="<?php echo $dati["longitude"];?>">
</div>

<div class="form-group">
      <label>Creation date</label><span class="text-danger pull-right"><?php if (isset($errore["created"])) echo $errore["created"];?></span>
      <input class="form-control" type="text" name="created" value="<?php echo $dati["created"];?>" readonly>
</div>

<input type="submit" class="btn btn-primary" value="Update"></input>
<input type="reset" class="btn btn-success" value="Cancel"></input>
</form>
</div>
</div>
