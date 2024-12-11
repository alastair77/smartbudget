export type Entrie = {
    id: number,
    name: string
}

export type Items = {
    id: number, 
    name: string,
    idEntrie: number 
} 

export type Transaction = {
    id: string,
    entrie : number,
    item: number,
    amount: number,
    date: string
}