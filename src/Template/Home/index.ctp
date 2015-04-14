<style>
	li {
		display: inline-block;
		width: 300px;
		vertical-align: top;
	}
</style>

<div class="wrapper" style="margin-bottom: 100px;">
    <h1>Homepage</h1>

    <h2>Persos</h2>

    <ul>
        <?php foreach ($persos as $key => $perso) { ?>

            <li>
            	<p>
            		<?= $perso['name'] ?> <br />
            		<img src="img/persos/<?=$perso['img_back']?>" alt="" /><br />
            		<img src="img/persos/<?=$perso['img_front']?>" alt="" /><br />
	            	Manga : <?= $perso['manga_name'] ?><br />
	            	Attack 1 : <?= $perso['attack_1']['name'] ?><br />
	            	Attack 2 : <?= $perso['attack_2']['name'] ?><br />
	            	Attack 3 : <?= $perso['attack_3']['name'] ?><br />
	            	Attack 4 : <?= $perso['attack_4']['name'] ?><br />
	            	Vitesse : <?= $perso['vit'] ?><br />
	            	Attaque : <?= $perso['atk'] ?><br />
	            	Défense : <?= $perso['def'] ?><br />
	            	Attaque spéciale : <?= $perso['atk_spe'] ?><br />
	            	Défense spéciale : <?= $perso['def_spe'] ?><br />
	            </p>
            </li>

        <?php } ?>
    </ul>

    <form action="home/addPerso" method="post" style="width: 500px;margin: 0 auto;">

    	<div class="style_input">
    		<label for="name">Name</label>
    		<input type="text" name="name" />
    	</div>

    	<div class="style_input">
    		<label for="manga_name">Manga</label>
    		<input type="text" name="manga_name" />
    	</div>

    	<div class="style_input">
    		<label for="attack_1">Attack 1</label>
    		<input type="text" name="attack_1" />
    	</div>

    	<div class="style_input">
    		<label for="attack_2">Attack 1</label>
    		<input type="text" name="attack_2" />
    	</div>

    	<div class="style_input">
    		<label for="attack_3">Attack 1</label>
    		<input type="text" name="attack_3" />
    	</div>

    	<div class="style_input">
    		<label for="attack_4">Attack 1</label>
    		<input type="text" name="attack_4" />
    	</div>

    	<div class="style_input">
    		<label for="vit">Vitesse</label>
    		<input type="text" name="vit" />
    	</div>

    	<div class="style_input">
    		<label for="atk">Attaque</label>
    		<input type="text" name="atk" />
    	</div>

    	<div class="style_input">
    		<label for="def">Défense</label>
    		<input type="text" name="def" />
    	</div>

    	<div class="style_input">
    		<label for="atk_spe">Attaque spéciale</label>
    		<input type="text" name="atk_spe" />
    	</div>

    	<div class="style_input">
    		<label for="def_spe">Défense spéciale</label>
    		<input type="text" name="def_spe" />
    	</div>
    	
    	<input type="submit" value="Valider" />
    </form>
   

</div>