<?= $this->Html->css('battle') ?>

<h1>Battle</h1>

<a href="home">Home</a>

<div class="before_battle">
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

		

		<div class="picture">
			<img src="" alt="" />
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
			<ul class="choose">
				<li><button class="button_depart make_attack">Attack</button></li><!--
				--><li><button class="button_depart use_tools">Tools</button></li><!--
				--><li><button class="button_depart">Defense</button></li><!--
				--><li><button class="button_depart">Get out</button></li>

				<li><button class="button_attack button_attack1"></button></li><!--
				--><li><button class="button_attack button_attack2"></button></li><!--
				--><li><button class="button_attack button_attack3"></button></li><!--
				--><li><button class="button_attack button_attack4"></button></li>

				<li><button class="button_tools button_life_potion">Life Potion</button></li><!--
				--><li><button class="button_tools button_pp_potion">PP Potion</button></li><!--
				--><li><button class="button_tools">UNDEFINED</button></li><!--
				--><li><button class="button_tools">UNDEFINED</button></li>
			</ul>
		</div>

		
	</div>

</div>

<div class="chat">
	
</div>