import { configDotenv } from 'dotenv';
import express from 'express';
import connectDB from './config/database.js';
import path from 'path';
import { fileURLToPath  } from 'url';
import compression from 'compression';

configDotenv();
connectDB();

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(compression())
app.use(express.json());
app.use(express.static(__dirname,{ maxAge: '1h', }));

const PORT = process.env.PORT || 3000;

app.get('/',(req,res)=>{
  res.sendFile(path.join(__dirname,'index.html'));
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});  