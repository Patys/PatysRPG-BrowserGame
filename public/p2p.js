var peer = new Peer('', {host: 'localhost', port: 8080, path: '/p2papi'});

peer.on('open', function(id) {
  console.log('My peer ID is: ' + id);
});
