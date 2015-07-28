<?php

class AppController extends Controller {

    public function initialize() {
        $this->loadComponent('Flash');
        $this->loadComponent('RequestHandler');
        $this->loadModel('Persos');
        $this->loadModel('Attacks');
        $this->loadModel('Users');
    }

    function Jsonification() {
        $this->autoRender = false;
        $this->layout = null;
        $this->RequestHandler->renderAs($this, 'json');
        return 'KO';
    }

    function getResponse($check = 'KO') {
        $response = array();
        $response['check'] = $check;
        return json_encode($response);
    }
}
