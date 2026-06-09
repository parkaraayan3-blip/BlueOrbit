import http from 'http';

http.get('http://127.0.0.1:5173/src/main.jsx', (res) => {
  console.log(`Status: ${res.statusCode}`);
  console.log(`Headers: ${JSON.stringify(res.headers, null, 2)}`);
  
  let data = '';
  res.on('data', chunk => { data += chunk; });
  res.on('end', () => {
    console.log(`Body excerpt: ${data.substring(0, 500)}`);
  });
}).on('error', (err) => {
  console.error(`Error: ${err.message}`);
});
