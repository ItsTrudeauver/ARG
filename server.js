import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import codeRoutes from './routes/codeRoutes.js'; 
import trashRoutes from './routes/trashRoutes.js';
import session from 'express-session';
import 'dotenv/config';
import { users } from './routes/login.js';  // Import users from login.js

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();

app.use(express.urlencoded({ extended: true }));
// Serve static files
app.use('/static', express.static(path.join(__dirname, 'static')));

// Middleware to parse JSON request bodies
app.use(express.json());

// Middleware for session processing
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

// Helper function to dynamically handle .ejs routes
const renderEJSRoute = (subPath) => (req, res) => {
  const relativePath = path.join(subPath, req.params[0]);
  res.render(relativePath);
};

// Root route (for login)
app.get('/', (req, res) => {
    console.log(req.session.username);  // Check if username is in the session
    if (req.session.username) {
        // Redirect based on the username stored in session
        if (req.session.username === 'WALKENHURST') {
            return res.redirect('https://www.youtube.com');
        } else if (req.session.username === 'user2') {
            return res.redirect('https://www.youtube.com');
        }
    }
    res.render('index');  // Render login page if not logged in
});

// Handle login route
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    console.log(req.body);  // Log incoming data

    // Test with hardcoded credentials
    if (username === 'WALKENHURST' && password === 'syntac9988@sp.quad.ppa') {
        req.session.username = username;
        return res.redirect('https://www.youtube.com');
    } else if (username === 'ASHCROFT' && password === 'eleanor041020@div16.sect4@lead.engineer') {
        req.session.username = username;
        return res.redirect('https://www.youtube.com');
    } else {
        res.send('Invalid username or password');
    }
});


// C0R3-specific routes (you already have these, no changes)
app.get('/C0R3/gateway', (req, res) => {
    res.render('C0R3/gateway');
});

app.get('/C0R3/unlocked', (req, res) => {
    res.render('C0R3/unlocked');
});

// Other routes and middleware (no changes here)
app.get('/C0R3/tabs/*', renderEJSRoute('C0R3/tabs'));
app.get('/C0R3/redirects/*', renderEJSRoute('C0R3/redirects'));

app.get('*.ejs', (req, res) => {
    res.redirect(301, req.path.replace(/\.ejs$/, ''));
});

// Verifying codes (no changes here)
app.use('/', codeRoutes);
app.use('/api/trash', trashRoutes);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
