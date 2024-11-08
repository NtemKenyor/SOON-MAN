const tokens = []; // In-memory storage for tokens
const path = require('path');

// Mock function for token creation on the SOON network
const createTokenOnSOON = (name, symbol, decimals, supply, metadata) => {
  const token = { id: tokens.length + 1, name, symbol, decimals, supply, ...metadata };
  tokens.push(token);
  return token;
};

exports.createToken = (req, res) => {
  const { tokenName, decimals, symbol, supply, description, website, twitter, telegram, discord } = req.body;

  if (!req.files || !req.files.image) {
    return res.status(400).send('Image file is required');
  }

  const image = req.files.image;
  const imagePath = path.join(__dirname, '../../frontend/uploads', image.name);

  // Save image to disk
  image.mv(imagePath, (err) => {
    if (err) return res.status(500).send(err);

    const newToken = createTokenOnSOON(tokenName, symbol, decimals, supply, {
      description,
      // imageUrl: `/uploads/${image.name}`, // Assume a static path for now
      imageUrl: `uploads/${image.name}`, // Assume a static path for now
      socialLinks: { website, twitter, telegram, discord }
    });

    res.status(201).json(newToken);
  });
};

exports.getTokens = (req, res) => {
  res.status(200).json(tokens);
};
