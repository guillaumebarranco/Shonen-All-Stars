<?= $this->Html->css('battle') ?>
<?= $this->Html->css('sweetalert') ?>

<h1>Battle</h1>

<a href="<?= $this->request->base ?>/home">Home</a>
	
<?php 

$session = $this->request->session();
$user = $session->read('user');

if(!isset($user)) { ?>

	<h3 class="pseudo"></h3>

	<div class="before_battle">

	<a href="#" class="return_sign_log_in">Retour</a>

	<div class="buttons_sign_log_in">
		<button class="show_signIn">Sign In</button>
		<button class="show_logIn">Log In</button>
	</div>

	<div class="sign_log_in">

		<form class="logIn" action="" method="post">
			
			<div>Log in</div>

			<div class="style_input">
				<label for="pseudo">Pseudo</label>
				<input type="text" name="pseudo" />
			</div>

			<div class="style_input">
				<label for="password">Password</label>
				<input name="password" type="password" />
			</div>

			<input type="submit" value="Valider">
		</form>

		<form class="signIn" action="" method="post">
			
			<div>Sign in</div>
			<div class="style_input">
				<label for="pseudo">Pseudo</label>
				<input type="text" name="pseudo" />
			</div>

			<div class="style_input">
				<label for="password">Password</label>
				<input name="password" type="password" />
			</div>

			<input type="submit" value="Valider">
		</form>
	</div>

<?php } else { ?>
	
	<h3 class="pseudo">
		<?=$user[0]->pseudo?>
		<span class="nb_win">Win <em><?php if(isset($user[0]->win)) echo $user[0]->win; else echo 0; ?></em></span>
		<span class="nb_lost">Lost <em><?php if(isset($user[0]->lost)) echo $user[0]->lost; else echo 0; ?></em></span>
		<span class="nb_arcade">Arcades <em><?php if(isset($user[0]->arcades)) echo $user[0]->arcades; else echo 0; ?></em></span>
	</h3>

	<div class="launch_direct"></div>

	<div class="before_battle" style="display:none;">

<?php } ?>
	

		<h2>Choisissez votre personnage</h2>
		<ul class="choose_perso"></ul>
	</div>



<div class="battle">

	<div class="ennemy">

		<div class="infos_battle">
			<div class="status">
				<div class="name"></div>

				<div class="life">
					<b>Life</b> <span><strong>100</strong></span>
				</div>

				<div class="pp">
					<b>PP</b> <span><strong>100</strong></span>
				</div>
			</div>
		</div>

		<div class="anim">
		</div>

		<div class="picture">
			<img src="" class="" alt="" />
		</div>
		
	</div>

	<div class="ally">

		<div class="anim">
		</div>

		<div class="picture">
			<img src="" alt="" />
		</div>

		<div class="infos_battle">
			<div class="status">
				<div class="name"></div>

				<div class="life">
					<b>Life</b> <span><strong>100</strong></span>
				</div>

				<div class="pp">
					<b>PP</b> <span><strong>100</strong></span>
				</div>
			</div>
			
			<div style="height: 30px;">
				<a href="#" class="button_return">Retour</a>
			</div>
			
			<ul class="choose">
				<li><button class="button_depart make_attack">Attack</button></li><!--
				--><li><button class="button_depart use_tools">Tools</button></li><!--
				--><li><button class="button_depart manga_ball">Manga Ball</button></li><!--
				--><li><button class="button_depart">Boutonquisertàrien</button></li>

				<li><button class="button_attack button_attack1"></button></li><!--
				--><li><button class="button_attack button_attack2"></button></li><!--
				--><li><button class="button_attack button_attack3"></button></li><!--
				--><li><button class="button_attack button_attack4"></button></li>

				<li><button class="button_tools button_life_potion"><span>PV + 50</span>Life Potion</button></li><!--
				--><li><button class="button_tools button_pp_potion"><span>PP + 50</span>PP Potion</button></li><!--
				--><li><button class="button_tools  button_life_pp_potion"><span>PV + 25 / PP + 25</span>Recovery Potion</button></li><!--
				--><li><button class="button_tools button_shosinsui"><span>PV 100% / PP - 50</span>Shosinsui</button></li>
			</ul>
		</div>

		
	</div>

</div>

<div class="chat">
	
</div>


<script src="js/jquery-1.11.2.min.js"></script>

<script>
	var showCanvasFromBeginning = false;
	var canPassChapter = false;
</script>

<script src="js/phaser.min.js"></script>
<script src="js/functions.js"></script>
<script src="js/init.js"></script>
<script src="js/sweetalert.min.js"></script>
<script src="js/menu.js"></script>
<script src="js/talk.js"></script>
<script src="js/main.js"></script>
<script src="js/battle.js"></script>