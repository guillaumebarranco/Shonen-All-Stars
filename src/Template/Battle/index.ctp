
<style>
	.battle {
		width: 700px;
		height: 500px;
		border: solid 1px black;
		position: relative;
		margin-top: 50px;
		padding: 10px;
		box-sizing: border-box;
	}

	.ally {
		height: 250px;
		width: 700px;
		bottom: 0;
		left: 0;
	}

	.picture, .infos_battle {
		display: inline-block;
		width: 340px;
		vertical-align: top;
	}

	.ally .picture {
		margin-bottom: 100px;
	}

	.ally .picture img {
		float: left;
	}

	.ennemy {
		height: 200px;
		width: 700px;
		top: 0;
		left: 0;
	}

	.ennemy .picture {
		float: right;
		position: relative;
	}

	.ennemy .picture img {
		position: absolute;
		right: 20px;
	}

	.choose {
		padding: 0;
		margin: 0;
		margin-top: 40px;
	}

	.choose li {
		list-style: none;
		display: inline-block;
		width: 170px;
		margin: 0;
	}

	.choose li button {
		width: 170px;
		margin: 0;
		padding: 20px;
		border: solid 1px black;
		box-sizing: border-box;
	}

	.status div {
		margin-top: 10px;
	}

	.status b {
		width: 30px;
		display: inline-block;
		vertical-align: top;
	}

	.status span {
		display: inline-block;
		vertical-align: top;
		background-color: blue;
		width: 300px;
		color: white;
	}

</style>

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