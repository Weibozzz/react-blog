const isProductionMode = (process.env.NODE_ENV ==='production');
const app = isProductionMode ? require ('./app.prod.js') : require('./app.dev.js');
if (!isProductionMode) {
  process.env.NODE_ENV = 'development';
}
  const PORT = process.env.PORT ||9001;
  app.listen(PORT, function() {
    console.log ('running in '+ (isProductionMode ?'production':'development')+ ' mode')
    console.log ('listening on port:'+ PORT);
  });

