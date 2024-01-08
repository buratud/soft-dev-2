import { withIronSessionApiRoute } from 'iron-session/next';
import { ironOptions, getUser } from '@/shared/iron';

import multer from 'multer';
const upload = multer({
    dest: 'uploads/',
    limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB
    fileFilter: (req, file, cb) => {
        if (file.mimetype !== 'application/jpg') {
            return cb(new multer.MulterError('LIMIT_UNEXPECTED_FILE', 'not_jpg'))
        }

        cb(null, true);
    }
});

export default withIronSessionApiRoute(questionAddRoute, ironOptions);

async function questionAddRoute(req, res) {
    const userSession = getUser(req);
    if ('error' in userSession) {
        return res.status(userSession.error.code).send(userSession);
    }
    if (userSession.data.level > 1) {
        return res.status(401).send({
            ok: false, error: { code: 401, message: 'You don\'t have permission to do this' }
        });
    }

    upload.single('jpgFile')(req, res, async function (err) {
        if (err) {
            console.error('/api/questions/add', err);
            if (err.code == 'LIMIT_UNEXPECTED_FILE' && err.field == 'not_jpg') {
                return res.status(500).send({
                    ok: false, error: { code: 500, message: 'Only JPG files are allowed.' }
                });
            }

            res.status(500).send({
                ok: false, error: { code: 500, message: 'Error uploading file.' }
            });
        } else {
            if (req.file == undefined) {
                return res.status(400).send({
                    ok: false, error: { code: 400, message: 'File cannot be empty' }
                });
            }

            res.status(200).send({
                ok: true, data: req.file
            });
        }
    });
}

export const config = {
    api: {
        bodyParser: false
    }
}