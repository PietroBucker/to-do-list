import { Connection } from 'mysql2';

export interface IDataBaseService {
    connection: Connection;
    connect(): void;
    query(sql: string, values: any[]): any;
    disconnect(): void;
}


export interface IApiService {
    routes(): Promise<void>;
    startServer(port: number): void;
    stopServer(): Promise<void>;
}

export type TasksResponse = {
    id?:number
    task_name:string
    cost?:number
    limit_date:string
    descsda:string //conferir o nome
}