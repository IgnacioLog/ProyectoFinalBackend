const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const swaggerOptions = {
    swaggerDefinition: {
        info: {
            title: 'API de Mi Proyecto',
            description: 'Documentación de la API',
            contact: {
                name: 'Nacho'
            },
            servers: ["http://localhost:3000"]
        }
    },
    apis: [
        './router/auth.js',
        './router/blog.js',
        './router/carts.js',
        './router/products.js',
        './router/index.js'
      ]
      
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

module.exports = (app) => {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
};
