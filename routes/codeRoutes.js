
import express from 'express';
const router = express.Router();

router.post('/verify-code', async (req, res) => {
    const { code } = req.body;
    const CORRECT_CODE = 'blessed_be_the_doomsday_knights';

    if (code === CORRECT_CODE) {
        return res.status(200).send({ redirect: '/C0R3/unlocked' }); 
    } else {
        res.status(401).send({ message: 'Access denied' });
    }
});
export default router



