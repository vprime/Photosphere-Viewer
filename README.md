# Photosphere-Viewer
Easily display your photosphere images on the web as taken from Google maps or other software.

## Implimenting
This uses Three.js WebGL library to project a sphere using your image as the inner texture, and Orbit controls to move around the image. To add a photosphere to your websie, you'll need to include all the JS files in the JS viewer. Initialize the sphere with ```Photosphere.init("<URL to your image>");```. You can use a JPG, GIF, or PNG image. It's best to use a square image in a resolution by the power of 2, but the library will automaticly rescale the image if you don't have that.

Use ```Detector.webgl;``` to determine if WebGL is available. It's a requirement, thankfully prety much all modern browsers support WebGL.

## Testing
Your web browser may not allow you to open this launched directly from your filesystem. If you want to test locally, then use pip to install SimpleHTTPServer then run it within same directory of index.html.

```
pip install SimpleHTTPServer
python -m SimpleHTTPServer 80
```
