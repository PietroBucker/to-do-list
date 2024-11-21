import mysql, { Connection, ConnectionOptions, QueryResult } from 'mysql2';
import { IDataBaseService, TasksResponse } from './interface';
import { rejects } from 'assert';

export const dbConfig: ConnectionOptions = {
    host: 'junction.proxy.rlwy.net',
    port: 16839,
    user: 'root',
    password: 'vXJeecdqXUgFNejIZdHBhPnGcfgtiYeB',
    database: 'railway',
};

class DataBaseService implements IDataBaseService {
    public connection: Connection;

    constructor(private config: ConnectionOptions) {
        this.connection = mysql.createConnection(this.config);
    }
    query(sql: string, values: []): Promise<TasksResponse[]> {
        return new Promise((resolve, rejects) => {
            this.connection.query(sql, values, (err, results) => {
                if (err) {
                    console.error('Erro ao executar a query:', err.message);
                    rejects(err);
                } else {
                    resolve(results as TasksResponse[]);
                }
            });
        })
    }

    // Testar a conexão
    connect(): Promise<void> {

        return new Promise((resolve, reject) => {

            this.connection.connect((err) => {
                if (err) {
                    reject(`Erro ao conectar ao banco de dados:  ${err.message}`);
                } else {
                    console.log('Conexão bem-sucedida ao banco de dados!');
                    resolve();
                }

            });
        });
    }



    disconnect(): Promise<void> {
        return new Promise((resolve, reject) => {
            this.connection.end((err) => {
                if (err) {
                    reject(`Erro ao desconectar do banco de dados: ${err.message}`);
                } else {
                    console.log('Desconectado do banco de dados!');
                    resolve();
                }
            });
        });

    }
}
export default DataBaseService;