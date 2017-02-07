var peer = new Peer({
	host: location.hostname,
	port: location.port || (location.protocol === 'https:' ? 443 : 80),
	path: '/p2papi'
});

var game = new Phaser.Game(800, 600, Phaser.AUTO, 'game', { preload: preload, create: create });

peer.on('open', function(id) {
  console.log('My peer ID is: ' + id);
});

peer.on('connection', function(conn) {
  conn.on('data', function(data){
    // Will print 'hi!'
    console.log(data);
  });
});

function preload() {

    //  You can fill the preloader with as many assets as your game requires

    //  Here we are loading an image. The first parameter is the unique
    //  string by which we'll identify the image later in our code.

    //  The second parameter is the URL of the image (relative)
    game.load.image('sample', '../UIpack/sample.png');

}

function create() {

    //  This creates a simple sprite that is using our loaded image and
    //  displays it on-screen
    game.add.sprite(0, 0, 'sample');

}
