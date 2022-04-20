import express from 'express';
import errorStrings from '../utils/errors';
import { changeStreamState, getAllStreamsStates, getStreamState } from '../utils/firestore/verification';

var router = express.Router();

router.post('/streamstate', function (req, res, next) {
    const body = req.body;

    changeStreamState(body.name, body.state)
        .then(() => {
            res.status(200).json({
                state: body.state,
                path: `/${body.name}/index.m3u8`
            });
        }).catch(error => {
            const msg = error.message;
            res.status(500).send(msg);
        })
});

router.get('/streamstate', function (req, res, next) {
    const uid = req.query.uid;

    if (uid === undefined || uid === '') {
        getAllStreamsStates().then((jsonRes) => {
            res.status(200).json(jsonRes);
        }).catch(error => {
            const msg = error.message;
            res.status(500).send(msg);
        })
    } else {
        getStreamState(uid)
            .then((state) => {
                res.status(200).send(state);
            }).catch(error => {
                const msg = error.message;
                res.status(500).send(msg);
            })
    }
});

export default router;