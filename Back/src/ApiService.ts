import { ConnectionOptions } from 'mysql2'
import { IApiService, IDataBaseService, TasksResponse } from './interface'
import express from 'express'
import cors from 'cors'
import DataBaseService, { dbConfig } from './DataBaseService'
import { get } from 'http'

class ApiService implements IApiService {
    private app: express.Application
    private db: IDataBaseService

    constructor(dbConfig: ConnectionOptions) {
        this.app = express()
        this.db = new DataBaseService(dbConfig)

        this.setupMiddleware()
        this.routes()
    }

    public async routes(): Promise<void>{
        this.app.get('/tasks', async (_req, res) => {
            const response: TasksResponse[] = await this.db.query('SELECT * FROM tasks', [])
            try {
                const dataFormat = response.map((task) => {
                    //Essa conversão so esta sendo necessaria pela a escolha de banca simples no railway
                    //opitei por usar o tipo Date no banco de dados, porem diretamente lá nao é possivel 
                    //formatar a data para o formato que eu quero, nao pelo menos na versao free, 
                    //por isso estou fazendo isso aqui
                    //obs que em caso de sistemas grande isso nao seria uma boa pratica

                    const data = new Date('2024-12-12T03:00:00.000Z')
                    const format = new Intl.DateTimeFormat('pt-BR').format(data).toString()
                    return {...task, limit_date: format}
                })
                res.json(dataFormat)
            }
            catch (error) {
                res.status(500).json({error: 'Erro ao buscar as tarefas'})
            }
        })

       //post
       //put
       //delete 
    }

    private setupMiddleware(): void {
        this.app.use(cors())
        this.app.use(express.json())
    }

    public async startServer(port: number): Promise<void> {
        this.app.listen(port, () => {
            try {
                this.db.connect()
                console.log(`Servidor rodando em http://localhost:${port}`)
            } catch (error) {
                console.error('Erro ao conectar ao banco de dados:', error)
            }
        })
    }

    public async stopServer(): Promise<void> {
        this.db.disconnect()
        console.log('Servidor parado')


    }
}
const apiService = new ApiService(dbConfig);
apiService.startServer(5000);


// Função Serverless que será chamada pelo Vercel
// const taskAPI = new TaskAPI(dbConfig);

// export default async (req: VercelRequest, res: VercelResponse) => {
//   if (req.method === 'GET') {
//     return taskAPI.getTasks(req, res);
//   }

//   res.status(405).json({ error: 'Método não permitido' });
// };
