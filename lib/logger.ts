import fs from 'fs';
import path from 'path';

// Ensure logs directory exists
const logsDir = path.join(process.cwd(), 'logs');
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir, { recursive: true });
}

/**
 * Logger utility to save error logs to files
 */
export const logger = {
  /**
   * Log an error message to a file
   * @param message - The error message to log
   * @param error - The error object (optional)
   * @param context - Additional context information (optional)
   */
  error: (message: string, error?: any, context?: Record<string, any>) => {
    try {
      const date = new Date();
      const formattedDate = date.toISOString().split('T')[0]; // YYYY-MM-DD
      const timestamp = date.toISOString();
      
      const logFilePath = path.join(logsDir, `log-${formattedDate}.txt`);
      
      const logEntry = {
        timestamp,
        level: 'ERROR',
        message,
        error: error ? {
          name: error.name,
          message: error.message,
          stack: error.stack
        } : undefined,
        context
      };
      
      const logString = JSON.stringify(logEntry, null, 2) + '\n\n';
      
      // Append to log file
      fs.appendFileSync(logFilePath, logString);
      
      // Also log to console in development
      if (process.env.NODE_ENV !== 'production') {
        console.error('[ERROR]', message, error);
      }
    } catch (loggingError) {
      // Fallback to console if file logging fails
      console.error('[LOGGING ERROR]', loggingError);
      console.error('[ORIGINAL ERROR]', message, error);
    }
  },
  
  /**
   * Log an info message to a file
   * @param message - The info message to log
   * @param context - Additional context information (optional)
   */
  info: (message: string, context?: Record<string, any>) => {
    try {
      const date = new Date();
      const formattedDate = date.toISOString().split('T')[0]; // YYYY-MM-DD
      const timestamp = date.toISOString();
      
      const logFilePath = path.join(logsDir, `log-${formattedDate}.txt`);
      
      const logEntry = {
        timestamp,
        level: 'INFO',
        message,
        context
      };
      
      const logString = JSON.stringify(logEntry, null, 2) + '\n\n';
      
      // Append to log file
      fs.appendFileSync(logFilePath, logString);
      
      // Also log to console in development
      if (process.env.NODE_ENV !== 'production') {
        console.info('[INFO]', message);
      }
    } catch (loggingError) {
      // Fallback to console if file logging fails
      console.error('[LOGGING ERROR]', loggingError);
      console.info('[ORIGINAL INFO]', message);
    }
  }
}; 