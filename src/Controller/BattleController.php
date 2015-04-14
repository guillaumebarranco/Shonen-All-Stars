<?php

namespace App\Controller;

use Cake\Core\Configure;
use Cake\Network\Exception\NotFoundException;
use Cake\View\Exception\MissingTemplateException;
use Cake\ORM\TableRegistry;
use Cake\Controller\Component\RequestHandlerComponent;

class BattleController extends AppController
{

    public function index() {

    }

    public function getPersos() {
        
        $this->loadComponent('RequestHandler');
        
        $this->layout = null;
        $this->RequestHandler->renderAs($this, 'json');

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

        echo json_encode($persos);
    }
}
