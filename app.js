const http = require('http');
const os = require('os');
const { Pool } = require('pg');

const pool = new Pool({
	host: process.env.DB_HOST,
	port: 5432,
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_NAME
});

const port = 3000;
const hostname = '0.0.0.0';

const server = http.createServer(async (req, res) => {
	res.setHeader('Content-Type', 'application/json');

	if(req.url === '/pessoas') {
		try {
			const resultado = await pool.query('SELECT * FROM pessoas ORDER BY id');
			res.statusCode = 200;
			res.end(JSON.stringify(resultado.rows));
		} catch (erro) {
			console.error(erro);
			res.statusCode = 500;
			res.end(JSON.stringify({
				erro: 'Erro ao consultar banco'
			}));
		}

		return;
	}

	res.statusCode = 200

	res.end(JSON.stringify({
		message: 'API funcionando',
		hostname: require('os').hostname()
	}));
});

server.listen(port, hostname, () => {
	console.log(`Servidor executando na porta ${port}`);
});
