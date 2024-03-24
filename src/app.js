const express = require('express')
const app = express()
const productRoutes = require('./ProductRoutes')
const cartRoutes = require('./CartRoutes')

app.use(express.json())

app.use('/products', productRoutes)
app.use('/carts', cartRoutes)

const PORT = 8080;
app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`)
})