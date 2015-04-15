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
        $this->loadModel('Users');
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

    public function signIn() {
        $this->layout = null;
        $this->RequestHandler->renderAs($this, 'json');

        $check = 'KO';

        if(isset($this->request->data)) {
            $data = $this->request->data;

            $check_user = $this->Users->find()->where(
                array('Users.pseudo' => $data['pseudo'])
            )->toArray();

            if(!$check_user) {
                $users = TableRegistry::get('Users');
                $user = $users->newEntity();

                $user->pseudo = $data['pseudo'];
                $user->created = time();

                $users->save($user);

                $check = 'OK';
            }            
        }

        $response = array();
        $response['check'] = $check;
        $response['pseudo'] = $data['pseudo'];

        echo json_encode($response);
    }

    public function logIn() {
        $this->layout = null;
        $this->RequestHandler->renderAs($this, 'json');

        $check = 'KO';

        if(isset($this->request->data)) {
            $data = $this->request->data;

            if(isset($data['pseudo']) && $data['pseudo'] != '') {

                $user = $this->Users->find()->where(
                    array('Users.pseudo' => $data['pseudo'])
                )->toArray();

                if($user) {
                    $check = 'OK';
                }
            }
        }

        $response = array();
        $response['check'] = $check;
        $response['user'] = $user;

        echo json_encode($response);
    }

    public function updateUser() {
        $this->layout = null;
        $this->RequestHandler->renderAs($this, 'json');

        $check = 'KO';

        if(isset($this->request->data)) {

            $data = $this->request->data;

            $user = $this->Users->find()->where(
                array('Users.pseudo' => $data['pseudo'])
            )->toArray();

            $user = $user[0];

            $usersTable = TableRegistry::get('Users');
            $the_user = $usersTable->get($user['id']);

            if(isset($data['type'])) {

                    switch ($data['type']) {

                    case 'win':
                        $the_user->win = $user['win'] + 1;
                    break;

                    case 'lost':
                        $the_user->lost = $user['lost'] + 1;
                    break;

                    case 'arcade':
                        $the_user->arcades = $user['arcades'] + 1;
                    break;
                }

                $usersTable->save($the_user);
                $check = 'OK';
            }
        }

        $response = array();
        $response['check'] = $check;

        echo json_encode($response);
    }
}
