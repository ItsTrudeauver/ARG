
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import codeRoutes from './routes/codeRoutes.js'; 
import trashRoutes from './routes/trashRoutes.js';
import session from 'express-session';
import 'dotenv/config';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();

// Middleware to parse JSON request bodies
app.use(express.json());

//Middleware for session processing
app.use(session({
    secret: process.env.SESSION,
    resave: false,
    saveUninitialized: false, // Changed to false for security
    cookie: {
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 3600000
    }
}));


// Configure EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files
app.use('/static', express.static(path.join(__dirname, 'static')));

// Helper function to dynamically handle .ejs routes
const renderEJSRoute = (subPath) => (req, res) => {
  const relativePath = path.join(subPath, req.params[0]);
  res.render(relativePath);
};

// Root route
app.get('/', (req, res) => {
  res.render('index');
});

// route handlerC0R3/tabs/*.ejs files
app.get('/C0R3/tabs/*', renderEJSRoute('C0R3/tabs'));

// route handler C0R3/redirects/*.ejs files
app.get('/C0R3/redirects/*', renderEJSRoute('C0R3/redirects'));

// C0R3-specific routes
app.get('/C0R3/gateway', (req, res) => {
    res.render('C0R3/gateway'); 
    
});

app.get('/C0R3/unlocked', (req, res) => { // Corrected path
    res.render('C0R3/unlocked'); // Or whatever response you want here
});


app.get('*.ejs', (req, res) => {
  res.redirect(301, req.path.replace(/\.ejs$/, ''));
});

//verifying codes
app.use('/', codeRoutes);

app.use('/api/trash', trashRoutes);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});