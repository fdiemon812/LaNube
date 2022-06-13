const express = require('express');
const path = require('path');
const app = express();
app.use(express.static(path.join(__dirname, 'dist','la-nube')));
app.get('*', function(req,res) {

  res.sendFile(path.join(__dirname,'dist','app_name','index.html'));

})

  app.listen(process.env.PORT || 8080);

