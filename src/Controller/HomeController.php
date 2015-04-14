<?php

namespace App\Controller;

use Cake\Core\Configure;
use Cake\Network\Exception\NotFoundException;
use Cake\View\Exception\MissingTemplateException;
use Cake\ORM\TableRegistry;

class HomeController extends AppController
{

    public function index() {

        $query = TableRegistry::get('Persos');

        $persos = $query->find('all')->toArray();

        $query2 = TableRegistry::get('Attacks');

        $attacks = $query2->find('all')->toArray();

        $v = 0;

        foreach ($persos as $key => $perso) {
            foreach ($attacks as $key => $attack) {

                for ($i=1; $i < 5; $i++) { 

                    if($attack['id'] == $perso['attack_'.$i]) {
                        $persos[$v]['attack_'.$i] = array();
                        $persos[$v]['attack_'.$i]['name'] = $attack['name'];
                        $persos[$v]['attack_'.$i]['power'] = $attack['power'];
                        $persos[$v]['attack_'.$i]['require'] = $attack['require'];
                    }
                }
            }
            $v++;
        }

        $this->set(array(
            'persos' => $persos,
            '_serialize' => array('persos')
        ));
    }

    public function addPerso() {
        if(isset($this->request)) {
            $data = $this->request->data;

            debug($data);

            $persos = TableRegistry::get('Persos');
            $perso = $persos->newEntity();

            $perso->name = $data['name'];
            $perso->manga_name = $data['manga_name'];
            $perso->attack_1 = $data['attack_1'];
            $perso->attack_2 = $data['attack_2'];
            $perso->attack_3 = $data['attack_3'];
            $perso->attack_4 = $data['attack_4'];
            $perso->vit = $data['vit'];
            $perso->atk = $data['atk'];
            $perso->def = $data['def'];
            $perso->atk_spe = $data['atk_spe'];
            $perso->def_spe = $data['def_spe'];


            $persos->save($perso);

            die;
        }
    }
}
