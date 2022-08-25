import { dbContext } from "../db/DbContext"

class CommentsService {
    async create(body) {
        const comment = await dbContext.Comments.create(body)
        await comment.populate('creator', 'name picture')
        return comment
    }
    
}

export const commentsService = new CommentsService()