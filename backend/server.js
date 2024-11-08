const express = require('express');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const tokenRoutes = require('./routes/tokenRoutes');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(fileUpload());  // Enable file uploads
app.use('/api/tokens', tokenRoutes);


app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
