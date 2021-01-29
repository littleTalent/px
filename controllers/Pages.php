<?php

class Pages extends CI_Controller
{

	public function index($page = 'index')
	{
		if (!file_exists(APPPATH.'views/pages/'.$page.'.php'))
		{
			// Whoops, we don't have a page for that!
			show_404();
		}

		$data['title'] = ucfirst($page); // Capitalize the first letter
		// $data['clientIP']=$this->get_client_ip();
		// $data['serverIP']=$this->get_server_ip();
		$this->load->view('templates/header', $data);
		$this->load->view('pages/'.$page, $data);
		$this->load->view('templates/footer', $data);
	}

	function get_client_ip()
	{
		if (getenv("HTTP_CLIENT_IP"))
			$ip = getenv("HTTP_CLIENT_IP");
		else if (getenv("HTTP_X_FORWARDED_FOR"))
			$ip = getenv("HTTP_X_FORWARDED_FOR");
		else if (getenv("REMOTE_ADDR"))
			$ip = getenv("REMOTE_ADDR");
		else
		{
			$ip = "Unknow";
		}
		return $ip;
	}

	function get_server_ip(){
		if(!empty($_SERVER['SERVER_ADDR'])){
			$ip = $_SERVER['SERVER_ADDR'];
		}else{
			$ip = gethostbyname($_SERVER['HOSTNAME']);
		}
		return $ip;
	}

	function get_cs_ip(){
//		echo json_encode(array("22"=>$this->get_client_ip(),"34"));
		echo json_encode(array("clientIP"=>$this->get_client_ip(), "serverIP"=>$this->get_server_ip()));
	}
}
