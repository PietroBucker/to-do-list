import ApiService from '../src/ApiService';
import { dbConfig } from '../src/DataBaseService';
import { VercelRequest, VercelResponse } from '@vercel/node';

// Função serverless
export default async (req: VercelRequest, res: VercelResponse) => {
    const apiService = new ApiService(dbConfig); // Cria a instância da ApiService
    
    // Chama a função de handleRequest que cuida do roteamento e da lógica do Express
    // apiService.startServer(5000);
    apiService.handleRequest(req, res);  
};

