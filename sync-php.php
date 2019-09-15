<?php
$url = 'my-awesome-api.test';
$response = wp_remote_get( $url );

// Tähän ei tulla ennen kuin wp_remote_get() funktio on suoritettu loppuun
// eli $response muuttujalla on aina joku arvo
if ( wp_remote_retrieve_response_code( $response ) !== 200 || is_wp_error( $response ) ) {
    $error_message            = ( is_wp_error( $response ) ) ? $response->get_error_message() : 'Jotain meni pieleen';
    $ret_val = '{"data":[], "error": "' . $error_message . '"}';
}else {
    $re_val = wp_remote_retrieve_body( $response );
}

