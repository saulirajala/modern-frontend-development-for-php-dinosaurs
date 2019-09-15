<?php
// Traditional way
function foo($arg_1, $arg_2){
    return $arg_1 . ' '. $arg_2. "\n";
}
echo foo("moi", "hei");

// Variable function
$func = 'foo';
echo $func("hei","moi");

// Anonymous function variable assignment
$greet = function($name){
    printf("Hello %s\r\n", $name);
};

$greet('Jyväskylä WordPress meetup');

// The WP way via action/filter hooks
function my_func(){
    // Do domething
}
add_action( 'wp_loaded', 'my_func' );