import {Router} from "express";
// controller 모듈
import {BoardController} from "../controller/BoardController";
// 인증 미들웨어
import {AuthMiddleware} from "../middleware/AuthMiddleware";
// multer 설정
const multer = require('multer');
const upload = multer({storage: multer.memoryStorage()})

const routes = Router();

// board 생성
//routes.post('', BoardController.addBoard);
routes.post('', upload.single('file'), BoardController.addBoard);
// board 전체 목록
routes.get('/list', BoardController.findAllBoard);
// board 전체 수
routes.get('/count', BoardController.countBoard);
// board 검색
routes.get('/:id', BoardController.findOneBoard);
// board 수정
//routes.put('', BoardController.modifyBoard);
routes.put('', upload.single('file'), BoardController.modifyBoard);
// board 삭제
routes.delete('/:id', BoardController.removeBoard);
// user가 등록한 board 전체 갯수
routes.get('/user/count/:user_id', AuthMiddleware.verifyToken, BoardController.countUserBoard);
// user가 등록한 board 가져오기
routes.get('/user/list/', AuthMiddleware.verifyToken, BoardController.findAllUserBoard);
export default routes;routes;