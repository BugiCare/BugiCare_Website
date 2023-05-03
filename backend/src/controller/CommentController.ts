import {Comment} from "../entity/Comment";
import {getConnection} from "typeorm";
import {Board} from "../entity/Board";
import {User} from "../entity/User";

export class CommentController {
    static addComment = async (req, res) => {
        const {board_id, content, user_id} = req.body;

        const board = await getConnection().getRepository(Board).findOne({
            where: {id: board_id}
        });
        const user = await getConnection().getRepository(User).findOne({
            where:{id: user_id}}
        );

        const comment = new Comment();
        comment.content = content;
        comment.board = board;
        comment.user = user;
        await getConnection().getRepository(Comment).save(comment);

        res.send(comment);
    }

    // comment를 가져오는 부분을 페이지네이션으로 변경
    static findAllComment = async (req, res) => {
        const {board_id, page_number, page_size} = req.query;

        const options = {};
        options['select'] = ["id", "content", "createdAt", "updatedAt", "deletedAt"];
        options['order'] = {id: 'DESC'};
        options['relations'] = ['user', 'board']
        options['where'] = {boardId: board_id}
        // page_number와 page_size 둘 중하나라도 입력하지 않으면 전체 목록 리턴
        if (page_number && page_size) {
            options['skip'] = (page_number - 1) * page_size;
            options['take'] = page_size;
        }

        const comments = await getConnection().getRepository(Comment).find(options);
        res.send(comments);
    }

    static findOneComment = async (req, res) => {
        const {id} = req.params;

        const comment = await getConnection().getRepository(Comment).findOne({
            where: {id},
            //relations:['user']
        });
        console.log({comment});
        res.send(comment);
    }

    static modifyComment = async (req, res) => {
        const {id, content} = req.body;

        const result = await getConnection().createQueryBuilder().update(Comment)
            .set({content})
            .where("id = :id", {id})
            .execute();

        res.send(result);
    }

    static removeComment = async (req, res) => {
        const {id} = req.params;

        const result = await getConnection()
            .createQueryBuilder()
            .softDelete()
            .from(Comment)
            .where("id = :id", {id})
            .execute();

        res.send(result);
    }
    // board의 전체 comment 갯수
    static countBoardComment = async (req, res) => {
        const {board_id} = req.query;

        const total = await getConnection().getRepository(Comment).find({where:{boardId: board_id}});
        res.send({total: total.length});
    }
}