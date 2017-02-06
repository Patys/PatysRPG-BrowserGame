var peer = new Peer('', {host: 'localhost', port: 9000, path: '/p2papi'});

peer.on('open', function(id) {
  console.log('My peer ID is: ' + id);
});
