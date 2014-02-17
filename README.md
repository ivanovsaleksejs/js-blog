Haskell Blog
============

The blog engine written in Haskell (back-end) and JavaScript (front-end)

The goal of this project is not to make a blog, but to try Haskell in web programming.

Back-end acts as REST-like server, sending only data. 
All presentation logic is implemented in front-end via JavaScript.

To run server:

1) Install GHC

2a) Compile and run index.hs as root, or

2b) Launch <pre>sudo runhaskell index.hs</pre>

su privileges are necessary for 80 port.

You will need to install additional packages, like happstack, mysql-simple etc.
