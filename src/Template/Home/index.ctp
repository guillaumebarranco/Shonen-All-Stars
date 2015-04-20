<style>
	li {
		display: inline-block;
		width: 300px;
		vertical-align: top;
	}
</style>

<div class="wrapper" style="margin-bottom: 100px;">
    <h1>Homepage</h1>

    <a href="<?= $this->request->base ?>/battle">Home</a>

    <h2>Persos</h2>

    <details>
        <ul>
            <?php foreach ($persos as $key => $perso) { ?>

                <li>
                    <p>
                        <?= $perso['name'] ?> <br />
                        <!-- <img src="img/persos/<?=$perso['img_back']?>" alt="" /><br />
                        <img src="img/persos/<?=$perso['img_front']?>" alt="" /><br /> -->
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
    </details>
    
    <?php
        echo $this->Form->create(null, [
            'url' => ['controller' => 'Home', 'action' => 'addPerso']
        ]);

        echo $this->Form->input('name');
        echo $this->Form->input('manga_name');

        echo $this->Form->input('attack_1');
        echo $this->Form->input('attack_1_power');
        echo $this->Form->input('attack_1_requis');
        echo $this->Form->input('attack_2');
        echo $this->Form->input('attack_2_power');
        echo $this->Form->input('attack_2_requis');

        echo $this->Form->input('attack_3');
        echo $this->Form->input('attack_3_power');
        echo $this->Form->input('attack_3_requis');

        echo $this->Form->input('attack_4');
        echo $this->Form->input('attack_4_power');
        echo $this->Form->input('attack_4_requis');

        echo $this->Form->input('vit');
        echo $this->Form->input('atk');
        echo $this->Form->input('def');
        echo $this->Form->input('atk_spe');
        echo $this->Form->input('def_spe');

        echo $this->Form->button('Ajouter');

        echo $this->Form->end(); 
    ?>


</div>