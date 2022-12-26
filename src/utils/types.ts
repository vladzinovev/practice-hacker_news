export interface INewsItemType {
    by: string,
    descendants: number,
    id: number,
    kids?:[],
    score: number,
    time: number,
    title?: string,
    type: string,
    url: string
}

export interface IComment {
    by: string,
    id: number,
    kids?:[],
    parent:number
    text: string,
    time: number,
    type: string
}

export interface IUser{
    about?:string,
    created:number,
    id:number,
    karma:number,
    submitted:[]
}

