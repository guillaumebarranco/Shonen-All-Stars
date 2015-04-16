<?= $this->Html->css('battle') ?>

<h1>Battle</h1>
<p>
	
</p>

<a href="<?= $this->request->base ?>/home">Home</a>

<h3 class="pseudo"></h3>

<div class="before_battle">
	
	<div class="buttons_sign_log_in">
		<button class="show_signIn">Sign In</button>
		<button class="show_logIn">Log In</button>
	</div>
	

	<div class="sign_log_in">

		<form class="logIn" action="" method="post">
			<div class="style_input">
				<label for="pseudo">Log In</label>
				<input type="text" name="pseudo" />
				<input type="submit" value="Valider">
			</div>
		</form>

		<form class="signIn" action="" method="post">
			<div class="style_input">
				<label for="pseudo">Sign in</label>
				<input type="text" name="pseudo" />
				<input type="submit" value="Valider">
			</div>
		</form>
	</div>

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
			<a href="#" class="button_return">Retour</a>
			<ul class="choose">
				<li><button class="button_depart make_attack">Attack</button></li><!--
				--><li><button class="button_depart use_tools">Tools</button></li><!--
				--><li><button class="button_depart">Attack + 20</button></li><!--
				--><li><button class="button_depart">Defense + 20</button></li>

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