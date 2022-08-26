import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"

class CommentsService{

    async createComment(newComment){
      const res = await api.post('api/comments', newComment)
      logger.log('Created Comment', res.data)
      AppState.comments.push(res.data)
    }

    async getComments(eventId){
        const res = await api.get(`api/events/${eventId}/comments`)
        logger.log('Comments for an Event by Id', res.data)
        AppState.comments = res.data
    }

    async removeComment(commentId) {
        const res = await api.delete(`api/comments/${commentId}`)
        AppState.comments = AppState.comments.filter(c => c.id != commentId)

    }
}

export const commentsService = new CommentsService()