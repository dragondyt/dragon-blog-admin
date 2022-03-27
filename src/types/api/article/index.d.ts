export interface Article {
    id: string
    title: string
    tags?: string[]
    sticky: boolean
    description?: string
    content?: string
    createdDateTime?: string
}
export interface Channel {
    id:string
}