import rateLimit from "express-rate-limit";

// Limit the number of login attempts
const loginLimiter = rateLimit({
  // 15 minute time period
  windowMs: 15 * 60 * 1000,

  // Allow only 5 login attempts during this period
  limit: 5,

  // Message shown after too many attempts
  message: {
    message: "Too many login attempts. Please try again later."
  }
});

// Export the limiter so userRoutes can use it
export default loginLimiter;