const https = require('https');

exports.handler = async (event) => {
  const siren = event.queryStringParameters && event.queryStringParameters.siren;
  if (!siren) {
    return { statusCode: 400, body: JSON.stringify({ error: 'SIREN manquant' }) };
  }

  const API_TOKEN = '2f03bd66f50acf715cec1ee61cff3cfdffd5b649f72040a3';
  const url = 'https://api.pappers.fr/v2/entreprise?siren=' + siren + '&api_token=' + API_TOKEN;

  return new Promise(function(resolve) {
    https.get(url, function(res) {
      var data = '';
      res.on('data', function(chunk) { data += chunk; });
      res.on('end', function() {
        resolve({
          statusCode: res.statusCode,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
          body: data,
        });
      });
    }).on('error', function(e) {
      resolve({ statusCode: 500, body: JSON.stringify({ error: e.message }) });
    });
  });
};
