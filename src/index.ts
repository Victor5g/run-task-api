import express from 'express';

import router from './router';

const CONFIG = { port: 5000 };

const app = express();

app.use(express.json());

app.use(router);

app.listen(CONFIG.port, () => {
    console.log(`# Server is running in port ${CONFIG.port}`);
});
