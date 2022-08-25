import { Auth0Provider } from "@bcwdev/auth0provider"
import { commentsService } from "../services/CommentsService"
import BaseController from "../utils/BaseController"

export class CommentsController extends BaseController{
    constructor(){
        super('api/comments')
        this.router
        .use(Auth0Provider.getAuthorizedUserInfo)
        .post('', this.create)
        .delete('/:id', this.archive)

    }

    async create(req, res, next){
        try {
            req.body.creatorId = req.userInfo.id
            let comment = await commentsService.create(req.body)
          return res.send(comment)
        } catch (error) {
          next(error)
        }
    }

    async archive(req, res, next){
      try {
        const comment = await commentsService.archive(req.params.id, req.userInfo.id)
        return res.send(comment)
      } catch (error) {
        next(error)
      }
    }

}