var peer = new Peer('', {host: 'localhost', port: 8080, path: '/p2papi'});
var peer = new Peer({
	host: location.hostname,
	port: location.port || (location.protocol === 'https:' ? 443 : 80),
	path: '/p2papi'
});

peer.on('open', function(id) {
  console.log('My peer ID is: ' + id);
});
