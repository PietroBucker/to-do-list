import ApiService from '../src/ApiService';
import { dbConfig } from '../src/DataBaseService';

const app = new ApiService(dbConfig);

export default app;