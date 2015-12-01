Haskell Blog
============

The blog engine written in Haskell (back-end) and JavaScript (front-end)

The goal of this project is not to make a blog, but to try Haskell in web programming.

Back-end acts as REST-like server, sending only data. 
All presentation logic is implemented in front-end via JavaScript.

To run server:

1) Copy/checkout files on your machine. Make sure static/ folder is visible for your web server. Or, if you don't have one, then leave static/ folder in the same folder as the executable index file. It will act as a web server and will host static files.

2) Install GHC. 

3) Run cabal init or cabal sandbox init. It's recommended to install a project in a cabal sandbox, because cabal is hell. Then run cabal install.

4a) Compile and run index.hs, or

4b) Launch <pre>runhaskell index.hs</pre>

You may want to setup a virtual host. Here is a example configuration for nginx:
<pre>
server {
    listen 80;
    server_name someblog.xyz;

    location ~ ^/(css|js|img|html)/ {
        root /usr/share/nginx/html/blog/static;
        expires 30d;
    }

    location / {
        proxy_pass http://localhost:3000;
        proxy_redirect off;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        client_max_body_size 10m;
        client_body_buffer_size 128k;
        proxy_connect_timeout 90;
        proxy_send_timeout 90;
        proxy_read_timeout 90;
        proxy_buffer_size 4k;
        proxy_buffers 4 32k;
        proxy_busy_buffers_size 64k;
        proxy_temp_file_write_size 64k;
    }
}
</pre>
