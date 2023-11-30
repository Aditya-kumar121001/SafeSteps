// Mock users (for demonstration purposes, replace with actual user authentication logic)
const users = [
    { id: 1, username: 'user1', password: 'password1', role: 'user' },
    { id: 2, username: 'admin1', password: 'adminpassword1', role: 'admin' }
  ];
  
  // Controller functions
  const authController = {
    loginUser: (req, res) => {
      const { username, password } = req.body;
  
      // Simulated authentication logic (replace with actual authentication)
      const user = users.find(u => u.username === username && u.password === password);
  
      if (!user) {
        return res.status(401).json({ success: false, message: 'Invalid credentials' });
      }
  
      // Generate token (dummy token for demonstration)
      const token = generateToken(user.id, user.role);
      res.status(200).json({ success: true, token });
    }
  };
  
  // Function to generate token (replace with actual token generation logic)
  function generateToken(userId, role) {
    const token = 'dummyToken'; // Replace with JWT or other token generation logic
    return token;
  }
  
  module.exports = authController;
  