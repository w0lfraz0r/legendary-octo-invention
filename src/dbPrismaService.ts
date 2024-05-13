import { Book, PrismaClient } from "@prisma/client"

class DBPrismaService {
    private prisma = new PrismaClient()

    public async insertBook(book: {
        title: string
        author: string
        published: boolean
    }): Promise<Book> {
        const createdBook = await this.prisma.book.create({ data: book })
        return createdBook
    }

    public async getBooks(): Promise<Book[]> {
        const foundBooks = await this.prisma.book.findMany()
        return foundBooks
    }
}

export default new DBPrismaService()