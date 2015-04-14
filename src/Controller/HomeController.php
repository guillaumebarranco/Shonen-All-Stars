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

        $persos = $query->find('all', array(
            'conditions' => array(
            ),
            'limit' => 10
        ))->toArray();

        // debug($persos);
        // die;

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
                        $persos[$v]['attack_'.$i]['requis'] = $attack['requis'];
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

            /*
            *   ADD ATTACKS
            */

            // debug($data);
            // die;

            if(isset($data['attack_1']) && $data['attack_1'] != null && $data['attack_1'] != '') {
                $id_attack = array();

                for ($a=1; $a < 5; $a++) { 

                    $attacks = TableRegistry::get('Attacks');
                    $attack = $attacks->newEntity();


                    $attack->name = $data['attack_'.$a];
                    $attack->power = intval($data['attack_'.$a.'_power']);
                    $attack->requis = intval($data['attack_'.$a.'_requis']);

                    $attacks->save($attack);

                    $id_attack[$a] = $attack->id;
                }
            }

            

        


            /*
            *   ADD PERSO
            */

            $persos = TableRegistry::get('Persos');
            $perso = $persos->newEntity();

            $perso->name = $data['name'];
            $perso->manga_name = $data['manga_name'];
            if(isset($data['attack_1']) && $data['attack_1'] != null && $data['attack_1'] != '') {
                $perso->attack_1 = $id_attack[1];
                $perso->attack_2 = $id_attack[2];
                $perso->attack_3 = $id_attack[3];
                $perso->attack_4 = $id_attack[4];
            }
            $perso->vit = $data['vit'];
            $perso->atk = $data['atk'];
            $perso->def = $data['def'];
            $perso->atk_spe = $data['atk_spe'];
            $perso->def_spe = $data['def_spe'];
            $perso->img_front = strtolower($data['name']).'_front.png';
            $perso->img_back = strtolower($data['name']).'_back.png';


            $persos->save($perso);

            die;
        }
    }
}
