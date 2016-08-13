<?php

/**
 * Plugin Name: Github Feed
 * Plugin URI: http://aquariusdue.com
 * Description: Retrieve and save data from Github Feed
 * Version: 1.0.0
 * Author: Mihai Dumitru
 * Author URI: http://aquariusdue.com
 * License: MIT
 */

 add_action( 'admin_enqueue_scripts', 'github_feed_enqueue_scripts' );

 function github_feed_enqueue_scripts() {
  wp_deregister_script('jquery');
  wp_register_script( 'jquery', ("https://code.jquery.com/jquery-2.2.3.min.js"));
 	wp_enqueue_script( 'github_feed_ajax', plugins_url( '/github_feed_ajax.js', __FILE__ ), array('jquery'), null, true );

  wp_localize_script( 'github_feed_ajax', 'github_object', array(
 	  'ajax_url' => admin_url( 'admin-ajax.php' )
 	));
 }

 add_action( 'wp_enqueue_scripts', 'github_feed_enqueue_public_scripts' );

function github_feed_enqueue_public_scripts() {
  if ( is_home() ) {
    wp_enqueue_script( 'moment', plugins_url( '/moment.min.js', __FILE__ ) );
    wp_enqueue_script( 'github_feed_ajax_client', plugins_url( '/github_feed_ajax_client.js', __FILE__ ), array('jquery', 'moment'), null, true );

    wp_localize_script( 'github_feed_ajax_client', 'github_object', array(
   	  'ajax_url' => admin_url( 'admin-ajax.php' )
   	));
  }
}

add_action( 'wp_ajax_github_feed', 'github_feed_callback' );

function github_feed_callback() {
  $ch = curl_init( "https://api.github.com/users/AquariusDue/events/public" );
  $fp = fopen( plugin_dir_path(__FILE__) . "github-timeline.json", "w");
  $user_agent = 'User-Agent: AquariusDue';

  curl_setopt($ch, CURLOPT_FILE, $fp);
  curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
  curl_setopt($ch, CURLOPT_USERAGENT, $user_agent);

  curl_exec($ch);
  curl_close($ch);
  fclose($fp);

  wp_die();
}

add_action( 'admin_menu', 'github_menu' );

function github_menu() {
  add_submenu_page( 'index.php', 'Github Feed Plugin', 'Github Feed Plugin', 'manage_options', 'github-submenu', 'github_submenu_callback');
}

function github_submenu_callback() {
?>

  <div class="wrap">
    <p class="github-update-button">Update Github Test</p>
  </div>

<?php
}

add_action( 'wp_ajax_github_display_feed', 'wp_ajax_github_display_feed_callback' );
add_action( 'wp_ajax_nopriv_github_display_feed', 'wp_ajax_github_display_feed_callback' );

function wp_ajax_github_display_feed_callback() {
  $feed_data = file_get_contents( plugin_dir_path(__FILE__) . "github-timeline.json" );
  echo $feed_data;
  die();
}
