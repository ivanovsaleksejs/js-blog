JS Blog
============

The blog engine written in JavaScript

Check working version: <a href="http://aleksejs.net">aleksejs.net</a>

Blog post about this engine: <a href="http://aleksejs.net/post/how_this_blog_works">How this blog works</a>

Back-end acts as REST-like server, sending only data. 
All presentation logic is implemented in front-end via JavaScript.

To run blog copy/checkout files on your machine. Make sure project's root folder is visible for your web server.

You may want to setup a virtual host. Here is a example configuration for nginx:
<pre>
server {
    listen 80;
    server_name blog.test;

    rewrite .*/favicon.ico /img/favicon.ico last;

    root /usr/share/nginx/html/blog/;
    expires 1h;
    try_files $uri $uri/ /index.html$is_args$args;

}
</pre>

Choose any backend you like or use static models.
