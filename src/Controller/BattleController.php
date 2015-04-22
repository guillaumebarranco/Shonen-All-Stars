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
        $this->loadModel('Fights');
        $this->loadModel('UserPersos');
        $this->loadComponent('RequestHandler');
    }

    public function index() {

    }

    public function getConnectedUser() {

        $this->autoRender = false;
        $this->layout = null;
        $this->RequestHandler->renderAs($this, 'json');

        $session = $this->request->session();
        $connected_user = $session->read('user');

        $user = $this->Users->find()->where(
            array('Users.pseudo' => $connected_user[0]->pseudo)
        )->toArray();

        if($user) {
            $check = 'OK';
        }

        $response = array();
        $response['check'] = $check;
        $response['user'] = $user;

        echo json_encode($response);
    }

    public function getPersos() {

        $this->layout = null;
        $this->RequestHandler->renderAs($this, 'json');

        $session = $this->request->session();
        $connected_user = $session->read('user')[0];

        $persos = $this->Persos->find()->toArray();
        $attacks = $this->Attacks->find()->toArray();
        $user_persos = $this->UserPersos->find()->where(
            array('UserPersos.id_user' => $connected_user['id'])
        )->toArray();

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
                        $persos[$v]['attack_'.$i]['anim'] = $attack['anim'];
                    }
                }
            }

            foreach ($user_persos as $key => $user_perso) {
                if($user_perso['id_perso'] == $perso['id'] && $user_perso['unlocked'] == 1) {
                    $persos[$v]['unlocked'] = 1;
                }
            }

            $v++;
        }

        $this->set(array(
            'persos' => $persos,
            '_serialize' => array('persos')
        ));
    }

    public function getUserPersos() {

        $this->layout = null;
        $session = $this->request->session();
        $connected_user = $session->read('user')[0];

        $user_persos = null;

        if($connected_user) {

            $user_persos = $this->UserPersos->find()->where(
                array('UserPersos.id_user' => $connected_user['id'])
            )->toArray();

            if(!$user_persos) {

                $persos = $this->Persos->find()->toArray();

                $userPersos = TableRegistry::get('UserPersos');
                
                foreach ($persos as $key => $perso) {
                    
                    $new_user_perso = $userPersos->newEntity();

                    $new_user_perso->id_user = $connected_user['id'];
                    $new_user_perso->id_perso = $perso['id'];

                    // On donne au joueur 4 personnages parmi les plus faibles (bah ouais)
                    if($perso['id'] == 15 || $perso['id'] == 16 || $perso['id'] == 19 || $perso['id'] == 22) {
                        $new_user_perso->unlocked = 1;
                   } else {
                        $new_user_perso->unlocked = 0;
                   }
                    
                    $userPersos->save($new_user_perso);

                }

                echo 'ok';
                die;
            }
        }

        $this->set(array(
            'user_persos' => $user_persos,
            '_serialize' => array('user_persos')
        ));
    }

    public function updateUserPerso() {

        $this->autoRender = false;
        $this->layout = null;
        $this->RequestHandler->renderAs($this, 'json');

        $session = $this->request->session();
        $connected_user = $session->read('user')[0];

        $check = 'KO';
        $perso = null;

        if(isset($this->request->data) && $connected_user) {

            $data = $this->request->data;

            if(isset($data['id_perso']) && $data['id_perso'] != null) {

                $userPersosTable = TableRegistry::get('UserPersos');
                $query = $userPersosTable->query();

                $query->update()
                ->set(['unlocked' => 1])
                ->where(['id_user' => $connected_user['id']])
                ->where(['id_perso' => intval($data['id_perso'])])
                ->execute();

                $perso = $this->Persos->find();
                $perso->where(['id' => intval($data['id_perso'])]);

                $check = 'OK';   
            }
        }

        $response = array();
        $response['check'] = $check;
        $response['perso'] = $perso;

        echo json_encode($response);
    }

    public function signLogIn() {

        $this->autoRender = false;
        $this->layout = null;
        $this->RequestHandler->renderAs($this, 'json');

        $check = 'KO';
        $user = null;

        if(isset($this->request->data)) {
            $data = $this->request->data;

            if(isset($data['pseudo']) && isset($data['password'])) {

                $check_user = $this->Users->find()->where(
                    array(
                        'Users.pseudo' => $data['pseudo'],
                        'Users.password' => md5($data['password'])
                    ))
                ->toArray();

                if($data['what_form'] == 'signIn') {

                    if(!$check_user) {
                        $users = TableRegistry::get('Users');
                        $new_user = $users->newEntity();

                        $new_user->pseudo = $data['pseudo'];
                        $new_user->password = md5($data['password']);
                        $new_user->created = time();

                        $users->save($new_user);

                        $user = $this->Users->find()->where(
                            array('Users.pseudo' => $data['pseudo'])
                        )->toArray();

                        $session = $this->request->session();
                        $session->write('user', $user);

                        $check = 'OK';
                    }

                } elseif($data['what_form'] == 'logIn') {

                    if($check_user) {
                        $user = $check_user;

                        $session = $this->request->session();
                        $session->write('user', $user);

                        $check = 'OK';
                    }
                }
            }
        }

        $response = array();
        $response['check'] = $check;
        $response['user'] = $user;

        echo json_encode($response);
    }

    public function updateUser() {

        $this->autoRender = false;
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

                $user = $this->Users->find()->where(
                    array('Users.pseudo' => $data['pseudo'])
                )->toArray();

                $session = $this->request->session();
                $session->write('user', $user);
                        
                $check = 'OK';
            }
        }

        $response = array();
        $response['check'] = $check;

        echo json_encode($response);
    }

    public function recordFight() {

        $this->autoRender = false;
        $this->layout = null;
        $this->RequestHandler->renderAs($this, 'json');

        $check = 'KO';

        if(isset($this->request->data)) {

            $data = $this->request->data;

            if(isset($data['user']) && $data['user'] != null && $data['user'] != '') {

                /*
                *   ON ENREGISTRE LE COMBAT
                */

                $fights = TableRegistry::get('Fights');
                $fight = $fights->newEntity();

                $fight->user = $data['user'];
                $fight->ally = $data['ally'];
                $fight->ennemy = $data['ennemy'];
                $fight->result = $data['result'];
                $fight->created = time();

                $fights->save($fight);

                if($fight) {
                    $check = 'OK';   
                }
            }
        }

        $response = array();
        $response['check'] = $check;

        echo json_encode($response);
    }
}
