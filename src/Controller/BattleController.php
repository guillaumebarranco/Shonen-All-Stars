<?php

namespace App\Controller;

use Cake\Core\Configure;
use Cake\Network\Exception\NotFoundException;
use Cake\View\Exception\MissingTemplateException;
use Cake\ORM\TableRegistry;
use Cake\Controller\Component\RequestHandlerComponent;

class BattleController extends AppController
{

     public function initialize() {
        parent::initialize();
        $this->loadModel('Persos');
        $this->loadModel('Attacks');
        $this->loadComponent('RequestHandler');
    }

    public function index() {

    }


    public function getPersos() {
        
        $this->layout = null;
        $this->RequestHandler->renderAs($this, 'json');

        $persos = $this->Persos->find()->toArray();
        $attacks = $this->Attacks->find()->toArray();

        $v = 0;

        foreach ($persos as $key => $perso) {
            foreach ($attacks as $key => $attack) {

                // On fait une boucle pour les quatres attaques de chaque personnage
                for ($i=1; $i < 5; $i++) { 

                    if($attack['id'] == $perso['attack_'.$i]) {
                        $persos[$v]['attack_'.$i] = array();
                        $persos[$v]['attack_'.$i]['name'] = $attack['name'];
                        $persos[$v]['attack_'.$i]['power'] = $attack['power'];
                        $persos[$v]['attack_'.$i]['requis'] = $attack['requis'];
                        $persos[$v]['attack_'.$i]['type'] = $attack['type'];
                    }
                }
            }
            $v++;
        }

        echo json_encode($persos);
    }
}
