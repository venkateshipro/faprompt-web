<?php
/**
 * FaPrompt — headless WordPress glue.
 *
 * Place this in your theme's functions.php (a child theme of any block theme,
 * or a tiny custom theme — the front end is never shown, so the theme barely
 * matters). It:
 *   1. Registers the Service / Project / Testimonial custom post types and
 *      exposes them to WPGraphQL.
 *   2. Opens CORS for the Next.js frontend.
 *   3. Adds an on-demand revalidation ping so publishing content refreshes the
 *      live site within seconds (pairs with /app/api/revalidate in Next).
 *
 * ACF field groups (service fields, project fields, etc.) are created in the
 * WP admin — see SETUP.md for the exact fields. Enable "Show in GraphQL" on each
 * field group and set its GraphQL field name to match the queries
 * (serviceFields, projectFields, testimonialFields).
 */

/* 1 ─ Custom post types ----------------------------------------------------- */
add_action( 'init', function () {

  register_post_type( 'service', array(
    'label'               => 'Services',
    'public'              => true,
    'has_archive'         => false,
    'menu_icon'           => 'dashicons-screenoptions',
    'supports'            => array( 'title', 'editor', 'page-attributes' ),
    'show_in_graphql'     => true,
    'graphql_single_name' => 'service',
    'graphql_plural_name' => 'services',
    'hierarchical'        => false,
  ) );

  register_post_type( 'project', array(
    'label'               => 'Projects',
    'public'              => true,
    'has_archive'         => false,
    'menu_icon'           => 'dashicons-portfolio',
    'supports'            => array( 'title', 'editor', 'thumbnail', 'page-attributes' ),
    'show_in_graphql'     => true,
    'graphql_single_name' => 'project',
    'graphql_plural_name' => 'projects',
  ) );

  register_post_type( 'testimonial', array(
    'label'               => 'Testimonials',
    'public'              => true,
    'has_archive'         => false,
    'menu_icon'           => 'dashicons-format-quote',
    'supports'            => array( 'title' ),
    'show_in_graphql'     => true,
    'graphql_single_name' => 'testimonial',
    'graphql_plural_name' => 'testimonials',
  ) );
} );

/* 2 ─ CORS for the Next.js frontend ---------------------------------------- */
add_action( 'graphql_response_headers_to_send', function ( $headers ) {
  $allowed = array(
    'https://faprompt.com',
    'https://www.faprompt.com',
    'http://localhost:3000',
  );
  $origin = isset( $_SERVER['HTTP_ORIGIN'] ) ? $_SERVER['HTTP_ORIGIN'] : '';
  if ( in_array( $origin, $allowed, true ) ) {
    $headers['Access-Control-Allow-Origin'] = $origin;
  }
  $headers['Access-Control-Allow-Headers'] = 'Content-Type';
  return $headers;
} );

/* 3 ─ On-publish revalidation ping ----------------------------------------- */
add_action( 'save_post', function ( $post_id, $post ) {
  if ( wp_is_post_revision( $post_id ) || $post->post_status !== 'publish' ) return;
  if ( ! in_array( $post->post_type, array( 'service', 'project', 'testimonial', 'post', 'page' ), true ) ) return;

  $frontend = 'https://faprompt.com';          // your Next.js site
  $secret   = getenv( 'REVALIDATE_SECRET' );    // must match Next's env
  if ( ! $secret ) return;

  wp_remote_post( $frontend . '/api/revalidate', array(
    'blocking' => false,
    'timeout'  => 2,
    'headers'  => array( 'Content-Type' => 'application/json' ),
    'body'     => wp_json_encode( array(
      'secret' => $secret,
      'type'   => $post->post_type,
      'slug'   => $post->post_name,
    ) ),
  ) );
}, 10, 2 );
