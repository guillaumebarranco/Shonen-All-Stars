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
        $this->loadModel('Fights');
        $this->loadModel('UserPersos');
    }

    public function index() {

    }

    public function getConnectedUser() {

        $this->Jsonification();

        $session = $this->request->session();
        $connected_user = $session->read('user');

        $user = $this->Users->find()->where(
            array('Users.pseudo' => $connected_user[0]->pseudo)
        )->toArray();

        $check = ($user) ? 'OK' : 'KO';

        $response = array();
        $response['check'] = $check;
        $response['user'] = $user;

        echo json_encode($response);
    }

    public function getPersos($pseudo = null) {

        $this->layout = null;
        $this->RequestHandler->renderAs($this, 'json');

        $session = $this->request->session();
        $connected_user = $session->read('user')[0];

        if($pseudo == null) {
            $id_user = $connected_user['id'];
        } else {
            $id_user = $this->getIdUserByPseudo($pseudo);
        }

        $persos = $this->Persos->find()->toArray();
        $attacks = $this->Attacks->find()->toArray();

        $user_persos = $this->UserPersos->find()->where(
            array('UserPersos.id_user' => $id_user)
        )->toArray();

        //var_dump($user_persos);
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

                if($user_perso['id_perso'] == $perso['id']) {
                    $persos[$v]['level'] = $user_perso['level'];
                    $persos[$v]['xp'] = $user_perso['xp'];

                    if($user_perso['unlocked'] == 1) {
                        $persos[$v]['unlocked'] = 1;
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

    function getIdUserByPseudo($pseudo) {
        $id_user = $this->Users->find('all')->where(['pseudo' => $pseudo])->toArray()[0]['id'];
        return $id_user;
    }

    public function getUserPersos($pseudo = null) {

        $this->layout = null;
        $session = $this->request->session();
        $connected_user = $session->read('user')[0];

        $user_persos = null;

        if($pseudo == null) {
            $id_user = $connected_user['id'];
        } else {
            $id_user = $this->getIdUserByPseudo($pseudo);
        }

        if($id_user) {

            $user_persos = $this->UserPersos->find()->where(
                array('UserPersos.id_user' => $id_user)
            )->toArray();

            if(!$user_persos) {

                $persos = $this->Persos->find()->toArray();

                $userPersos = TableRegistry::get('UserPersos');
                
                foreach ($persos as $key => $perso) {
                    
                    $new_user_perso = $userPersos->newEntity();

                    $new_user_perso->id_user = $id_user;
                    $new_user_perso->id_perso = $perso['id'];

                    // On donne au joueur 4 personnages parmi les plus faibles (bah ouais)
                    if($perso['name'] == 'Naruto' || $perso['name'] == 'Eyeshield' || $perso['name'] == 'Ashirogi' || $perso['name'] == 'Gon' || $perso['name'] == 'Terrence' || $perso['name'] == 'Shioon') {
                        $new_user_perso->unlocked = 1;
                    } else {
                        $new_user_perso->unlocked = 0;
                    }
                    
                    // Si le personnage se gagne avec une arcade
                    if(is_numeric($perso['condition'])) {

                        if($perso['name'] == 'Saitama') {
                            $new_user_perso->level = 50;
                        } else {
                            $new_user_perso->level = (intval($perso['condition']) * 3);
                        }

                    } else {
                        $new_user_perso->level = 1;
                    }
                    
                    $new_user_perso->exp = 0;
                    
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

    public function updateUserPerso($pseudo = null) {

        $check = $this->Jsonification();

        $session = $this->request->session();
        $connected_user = $session->read('user')[0];

        $perso = null;

        if($pseudo == null) {
            $id_user = $connected_user['id'];
        } else {
            $id_user = $this->getIdUserByPseudo($pseudo);
        }

        if(isset($this->request->data) && $id_user) {

            $data = $this->request->data;

            if(isset($data['id_perso']) && $data['id_perso'] != null) {

                $check_user_perso = $this->UserPersos->find()->where(
                    array(
                        'UserPersos.id_user' => $id_user,
                        'UserPersos.id_perso' => $data['id_perso']
                    ))
                ->toArray();
                
                if($check_user_perso) {

                    $userPersosTable = TableRegistry::get('UserPersos');
                    $query = $userPersosTable->query();

                    $query->update()
                    ->set(['unlocked' => 1])
                    ->where(['id_user' => $id_user])
                    ->where(['id_perso' => intval($data['id_perso'])])
                    ->execute();

                    $perso = $this->Persos->find();
                    $perso->where(['id' => intval($data['id_perso'])]);

                    $check = 'OK';   
                } else {

                    $userPersosTable = TableRegistry::get('UserPersos');
                    $new_user_perso = $userPersosTable->newEntity();

                    $new_user_perso->unlocked = 1;
                    $new_user_perso->id_user = $id_user;
                    $new_user_perso->id_perso = intval($data['id_perso']);

                    $savedArticle = $userPersosTable->save($new_user_perso);
                    
                    $perso = $this->Persos->find();
                    $perso->where(['id' => intval($data['id_perso'])]);

                    $check = 'OK';   
                }
            }
        }

        $response = array();
        $response['check'] = $check;
        $response['perso'] = $perso;

        echo json_encode($response);
    }

    public function signLogIn() {

        $check = $this->Jsonification();
        $user = null;

        if(isset($this->request->data)) {
            $data = $this->request->data;

            if(isset($data['pseudo']) && isset($data['password'])) {

                $check_user = $this->Users->find()->where(
                    array(
                        'Users.pseudo' => $data['pseudo']
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

                        if(md5($data['password']) == $check_user[0]->password) {
                            $user = $check_user;

                            $session = $this->request->session();
                            $session->write('user', $user);

                            $check = 'OK';
                        } else {
                            $check = 'KO';
                        }
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

        $check = $this->Jsonification();

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

        echo $this->getResponse($check);
    }

    public function updateLevelExp() {

        $check = $this->Jsonification();

        if(isset($this->request->data)) {

            $data = $this->request->data;

            $session = $this->request->session();
            $connected_user = $session->read('user')[0];

            $pseudo = $data['pseudo'];

            if($pseudo == null) {
                $id_user = $connected_user['id'];
            } else {
                $id_user = $this->getIdUserByPseudo($pseudo);
            }

            $userPersosTable = TableRegistry::get('UserPersos');
            $query = $userPersosTable->query();

            $query->update()
            ->set(['level' => intval($data['perso']['level'])])
            ->set(['xp' => intval($data['perso']['xp'])])
            ->where(['id_user' => $id_user])
            ->where(['id_perso' => intval($data['perso']['id'])])
            ->execute();

            $check = 'OK';
        }

        echo $this->getResponse($check);
    }

    public function recordFight() {

        $check = $this->Jsonification();

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

        echo $this->getResponse($check);
    }

}
