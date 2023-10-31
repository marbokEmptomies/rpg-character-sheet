const express = require('express');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

// Import routes from the /routes directory
const characterSheetRoutes = require('./routes/characterSheetRoutes');
const characterSkillsRoutes = require('./routes/characterSkillsRoutes');

// Middleware for JSON request and response handling
app.use(cors())
app.use(express.json());

// Use routes
app.use('/character-sheets', characterSheetRoutes);
app.use('/character-skills', characterSkillsRoutes)

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
