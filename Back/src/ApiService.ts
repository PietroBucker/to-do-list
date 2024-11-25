import { ConnectionOptions } from 'mysql2'
import { IApiService, IDataBaseService, TasksResponse } from './interface'
import express from 'express'
import cors from 'cors'
import DataBaseService, { dbConfig } from './DataBaseService'
import {VercelRequest, VercelResponse} from '@vercel/node'

export default class ApiService implements IApiService {
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

                    const data = new Date(task.limit_date)
                    const format = new Intl.DateTimeFormat('pt-BR').format(data).toString()
                    return {...task, limit_date: format, cost: !task.cost? 0 : task.cost}
                })
                res.json(dataFormat)
            }
            catch (error) {
                res.status(500).json({error: 'Erro ao buscar as tarefas'})
            }

        })
        this.app.get('/', async (req, res) => {
            res.json({message: 'Hello World'})
        })

        this.app.post('/tasks', async (req, res) => {
            const { task_name, cost, limit_date, description } = req.body as TasksResponse

            const get: TasksResponse[] = await this.db.query('SELECT * FROM tasks', [])
            const taskNameVerify = get.some((task) => task.task_name === task_name)
            if(taskNameVerify){
                res.status(400).json({error: 'Nome da tarefa já existe'})
                return
            }

            const costVerify = !cost ? 0.00 : cost
            try {
            const response = await this.db.query('INSERT INTO tasks (task_name, cost, limit_date, description) VALUES (?, ?, ?, ?)', [task_name, costVerify, limit_date, description])
                res.json({id: response.insertId, task_name, cost: costVerify, limit_date, description})
            }
            catch (error) {
                res.status(500).json({error: 'Erro ao criar a tarefa'})
            }
        })

        this.app.put('/tasks/:id', async (req, res) => {
            const { task_name, cost, limit_date, description } = req.body as TasksResponse
            const { id } = req.params

            const get: TasksResponse[] = await this.db.query('SELECT * FROM tasks', [])
            const taskNameVerify = get.some((task) => task.task_name === task_name)
            if(taskNameVerify){
                res.status(400).json({error: 'Nome da tarefa já existe'})
                return
            }

            const costVerify = !cost ? 0.00 : cost.toFixed(2)
            try {
                const response = await this.db.query('UPDATE tasks SET task_name = ?, cost = ?, limit_date = ?, description = ? WHERE id = ?', [task_name, costVerify, limit_date, description, id])
                res.json({id, task_name, cost: costVerify, limit_date, description})
            }
            catch (error) {
                res.status(500).json({error: 'Erro ao atualizar a tarefa'})
            }
        })
       
        this.app.delete('/tasks/:id', async (req, res) => {
            const { id } = req.params
            try {
                const response = await this.db.query('DELETE FROM tasks WHERE id = ?', [id])
                res.json({id})
            }
            catch (error) {
                res.status(500).json({error: 'Erro ao deletar a tarefa'})
            }
        })
       //delete 
    }

    private setupMiddleware(): void {
        const corsOptions = {
            origin: ['https://to-do-list-nine-lime-73.vercel.app/', 'https://to-do-list-zvcz.vercel.app/tasks'], 
            methods: ['GET', 'POST', 'PUT', 'DELETE'], 
            allowedHeaders: ['Content-Type', 'Authorization'],
        };
        this.app.use(cors(corsOptions))
        this.app.use(express.json())
        this.app.listen(3000, () => {
            console.log("Server listening on PORT", 3000);
        });
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

     // Função para manipular a requisição serverless
     public handleRequest(req: VercelRequest, res: VercelResponse): void {
        this.app(req, res);  // Express lida com o roteamento automaticamente
    }
}

// Função serverless
// export default async (req: VercelRequest, res: VercelResponse) => {
//     const apiService = new ApiService(dbConfig); // Cria a instância da ApiService
    
//     // Chama a função de handleRequest que cuida do roteamento e da lógica do Express
//     // apiService.startServer(5000);
//     apiService.handleRequest(req, res);  
// };

// const apiService = new ApiService(dbConfig)
// apiService.startServer(5000)