import { query } from "express"
import { dbContext } from "../db/DbContext"
import { Forbidden } from "../utils/Errors"

class CommentsService {

    
    async archive(commentId, userId) {
     const comment = await dbContext.Comments.findById(commentId)
     // @ts-ignore
     if(comment.creatorId != userId){
        throw new Forbidden("You don't have permission to delete that")
      }
      // @ts-ignore
      await comment.remove()
      return`comment archived`
    }
    async getCommentsAll(eventId) {
      const comments = await dbContext.Comments.find({eventId}).populate('creator', 'name picture')
      return comments
    }
    async create(body) {
        const comment = await dbContext.Comments.create(body)
        await comment.populate('creator', 'name picture')
        return comment
    }
    
}

export const commentsService = new CommentsService()