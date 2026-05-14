const net = require('net');

const host = 'db.pqcexuqenjfudrwefnql.supabase.co';
const port = 5432;

const client = new net.Socket();

console.log(`Attempting to connect to ${host}:${port}...`);

client.connect(port, host, () => {
    console.log('Successfully connected to ' + host + ':' + port);
    client.destroy();
});

client.on('error', (err) => {
    console.error('Connection failed: ' + err.message);
    client.destroy();
});

client.on('timeout', () => {
    console.error('Connection timed out');
    client.destroy();
});

client.setTimeout(5000);
