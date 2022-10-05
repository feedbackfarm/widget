<?php
/**
* Plugin Name: Feedback Farm
* Plugin URI: https://www.feedback.farm/
* Description: Gathering customer feedback should be easy and affordable. Feedback is one of the most useful metric while building an application. Easily embed the wordpress plugin to start getting user feedback.
* Version: 2.0.8
* Author: Charles-Olivier Demers
* Author URI: https://www.twitter.com/co_demers
**/

function feedback_farm_enqueue_script() {
    wp_register_script( 'feedback-farm', "https://unpkg.com/@feedbackfarm/js@1.0.6/dist/widget.js", [], null, true);
    wp_enqueue_script('feedback-farm');
}
add_action('wp_enqueue_scripts', 'feedback_farm_enqueue_script');

function feedback_farm_setting_page() {
    $page_title = 'Feedback Farm Settings';
    $menu_title = 'Feedback Farm';
    $capability = 'manage_options';
    $slug = 'feedback_farm';
    $callback = 'feedback_farm_callback';

    add_submenu_page(
        'plugins.php',
        'Feedback Farm Settings',
        'Feedback Farm',
        'manage_options',
        'feedback_farm',
        'feedback_farm_callback'
    );
}
add_action('admin_menu', 'feedback_farm_setting_page');


function feedback_farm_callback() {
?>
  <div class="wrap">
    <h1>Feedback Farm</h1>
    <p>Documentation available <a target="_blank" href="https://docs.feedback.farm/widgets/integrate-with-your-wordpress-website">here</a></p>
    <form method="post" action="options.php">
        <?php
            settings_fields('feedback_farm');
            do_settings_sections('feedback_farm');
            submit_button();
        ?>
    </form>
  </div>
<?php
}

add_action('admin_init', 'feedback_farm_settings_page_sections');
add_action('admin_init', 'feeback_farm_settings_fields');
function feedback_farm_settings_page_sections() {
    add_settings_section(
        'feedback_farm',
        'General',
        'feedback_farm_setting_callback',
        'feedback_farm'
    );
}

function feeback_farm_settings_fields() {
    add_settings_field(
        'feedback_farm_projectId',
        'Project Id',
        'feedback_farm_projectId',
        'feedback_farm',
        'feedback_farm'
    );

    add_settings_field(
        'feedback_farm_selected_menu',
        'Assigned Menu',
        'feedback_farm_selected_menu_field',
        'feedback_farm',
        'feedback_farm'
    );
    
    add_settings_field(
        'feedback_farm_end_image_url',
        'End Image Url',
        'feedback_farm_end_image_url',
        'feedback_farm',
        'feedback_farm'
    );

    add_settings_field(
        'feedback_farm_identifier',
        'Identifier',
        'feedback_farm_identifier',
        'feedback_farm',
        'feedback_farm'
    );

    add_settings_field(
        'feedback_farm_localization',
        'Localization',
        'feedback_farm_localization',
        'feedback_farm',
        'feedback_farm'
    );

    add_settings_field(
        'feedback_farm_page_name',
        'Page Name',
        'feedback_farm_page_name',
        'feedback_farm',
        'feedback_farm'
    );
    

    add_settings_field(
        'feedback_farm_theme',
        'Theme',
        'feedback_farm_theme',
        'feedback_farm',
        'feedback_farm'
    );

    add_settings_field(
        'feedback_farm_types',
        'Feedback Type',
        'feedback_farm_types',
        'feedback_farm',
        'feedback_farm'
    );

    register_setting('feedback_farm', 'feedback_farm_projectId');
    register_setting('feedback_farm', 'feedback_farm_selected_menu');
    register_setting('feedback_farm', 'feedback_farm_end_image_url');
    register_setting('feedback_farm', 'feedback_farm_identifier');
    register_setting('feedback_farm', 'feedback_farm_localization');
    register_setting('feedback_farm', 'feedback_farm_page_name');
    register_setting('feedback_farm', 'feedback_farm_theme');
    register_setting('feedback_farm', 'feedback_farm_types');
}

function feedback_farm_selected_menu_field() {
    $menus = wp_get_nav_menus();
    $selected_menu = get_option('feedback_farm_selected_menu');

    echo "<select name=\"feedback_farm_selected_menu\" id=\"feedback_farm_selected_menu\">";
    echo "<option value=\"\">Manual</option>";
    foreach ($menus as $menu) {
        echo "<option value=\"".esc_attr($menu->slug)."\"" .
            selected(esc_attr($selected_menu), esc_attr($menu->slug), false) .
            ">".esc_html($menu->name)."</option>";
    }

    echo "</select>";
    echo "<p class=\"description\">The plugin will add a \"Give feedback\" button to the selected menu. If you select the option manual, have a look to the <a href=\"https://docs.feedback.farm/widgets/integrate-with-your-wordpress-website\" target=\"_blank\">docs</a></p>";
}

function feedback_farm_projectId() {
    echo '<input name="feedback_farm_projectId" id="feedback_farm_projectId" type="text" value="' .
        esc_attr(get_option('feedback_farm_projectId')) .
        '" />';
}

function feedback_farm_end_image_url() {
    echo '<input name="feedback_farm_end_image_url" id="feedback_farm_end_image_url" type="text" value="' .
        esc_attr(get_option('feedback_farm_end_image_url')) .
        '" />';
}

function feedback_farm_identifier() {
    echo '<input name="feedback_farm_identifier" id="feedback_farm_identifier" type="text" value="' .
        esc_attr(get_option('feedback_farm_identifier')) .
        '" />';
}

function feedback_farm_localization() {
    echo '<input name="feedback_farm_localization" id="feedback_farm_localization" type="text" value="' .
        esc_attr(get_option('feedback_farm_localization')) .
        '" />';
}

function feedback_farm_page_name() {
    echo '<input name="feedback_farm_page_name" id="feedback_farm_page_name" type="text" value="' .
        esc_attr(get_option('feedback_farm_page_name')) .
        '" />';
}

function feedback_farm_theme() {
    echo '<input name="feedback_farm_theme" id="feedback_farm_theme" type="text" value="' .
        esc_attr(get_option('feedback_farm_theme')) .
        '" />';
}


function feedback_farm_types() {
    echo '<input name="feedback_farm_types" id="feedback_farm_types" type="text" value="' .
        esc_attr(get_option('feedback_farm_types')) .
        '" />';
}


function add_feedback_farm_nav_menu_item($items, $args) {
    $selected_menu = get_option('feedback_farm_selected_menu', 0);
    $projectId = get_option('feedback_farm_projectId');
    $endImageUrl = get_option('feedback_farm_end_image_url');
    $identifier = get_option('feedback_farm_identifier');
    $localization = get_option('feedback_farm_localization');
    $pageName = get_option('feedback_farm_page_name');
    $theme = get_option('feedback_farm_theme');
    $types = get_option('feedback_farm_types');


    if(!empty($selected_menu) && $args->menu->slug === $selected_menu) {
        $items .= "
            <li class=\"menu-item\">
                <a href=\"#\" id=\"feedback-farm\" 
                data-feedback-farm 
                data-feedback-farm-project-id=\"".esc_attr($projectId)."\"
                data-feedback-farm-end-image-url=\"".esc_attr($endImageUrl)."\"
                data-feedback-farm-identifier=\"".esc_attr($identifier)."\"
                data-feedback-farm-localization=\"".esc_attr($localization)."\"
                data-feedback-farm-page-name=\"".esc_attr($pageName)."\"
                data-feedback-farm-theme=\"".esc_attr($theme)."\"
                data-feedback-farm-types=\"".esc_attr($types)."\"
                >Give feedback</a></li>";
    }
    return $items;
}
add_filter('wp_nav_menu_items', 'add_feedback_farm_nav_menu_item', 10, 2);



function feedback_farm_setting_callback() {}
function encodeURIComponent($str) {
    $revert = array('%21'=>'!', '%2A'=>'*', '%27'=>"'", '%28'=>'(', '%29'=>')');
    return strtr(rawurlencode($str), $revert);
}
?>