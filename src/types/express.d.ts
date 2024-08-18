// types/express.d.ts
import { User } from '../types/index';

declare global {
  namespace Express {
    interface Request {
      user?: User; // Add the user property with the appropriate type
    }
  }
}
