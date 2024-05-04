import { Router } from 'express';
import { Publisher } from './publisher.js';
import { Book } from './book.js';

const router = Router();

// 출판사 등록하기 API
router.post('/publishers', async (req, res) => {
    try {
        const { name } = req.body;
        const newPublisher = await Publisher.create({ name });
        res.json({ message: "성공적으로 생성되었습니다.", name: newPublisher.name });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// 책 등록하기 API
router.post('/books', async (req, res) => {
    try {
        const { title, publisher } = req.body;
        const newBook = await Book.create({ title, publisher });

        // 해당 출판사의 publications 배열에 책 제목 추가
        await Publisher.findOneAndUpdate(
            { name: publisher },
            { $push: { publications: title } }
        );

        res.json({ message: "성공적으로 생성되었습니다.", title: newBook.title });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// 출판사명을 기준으로 책 찾기 API
router.get('/publishers/:name', async (req, res) => {
    try {
        const { name } = req.params;
        const publisher = await Publisher.findOne({ name });

        if (!publisher) {
            res.status(404).json({ message: "출판사를 찾을 수 없습니다." });
            return;
        }

        res.json({ message: `${name} 출판사의 책입니다.`, data: publisher.publications });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;