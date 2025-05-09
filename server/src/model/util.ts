export interface CreateUser {
    name: string;
    email: string;
    password: string;
}

export interface User {
    id: number;
    name: string;
    email: string;
    password: string;
}

export interface UpdateUser {
    name?: string;
    email?: string;
    password?: string;
}

export interface responseUser {
    name: string;
    email: string;
}

export interface task {
    id: number;
    userId?: number;
    title: string;
    description: string;
    priority: string;
    finished: boolean;
    createdAt: string;
    updatedAt: string;
    finishedAt: string;
}

export interface CreateTask {
    userId: number;
    title: string;
    description: string;
    priority: string;
}

export interface UpdateTask {
    title?: string;
    description?: string;
    priority?: string;
}

export enum Priority {
    LOW = "low",
    MEDIUM = "medium",
    HIGH = "high"
}