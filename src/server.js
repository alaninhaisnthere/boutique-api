const express = require('express');
const app = express();
const productRoutes = require('./routes/productRoutes');
const homeRoutes = require('./routes/homeRoutes');

app.use(cors());

app.use('/api', productRoutes);
app.use('/', homeRoutes);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor iniciado na porta ${PORT}`);
});
