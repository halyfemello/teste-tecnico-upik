const express = require('express');
const router = express.Router();

const imageRepository = [
    { id: "01", likes: 1 }
];

/**
 * @swagger
 * tags:
 *   name: Likes
 *   description: Endpoints para gerenciar likes de imagens
 */

/**
 * @swagger
 * definitions:
 *   Like:
 *     type: object
 *     required:
 *       - imageId
 *     properties:
 *       imageId:
 *         type: string
 *         description: ID da imagem para o qual o like será adicionado
 */

/**
 * @swagger
 * /api/like/save:
 *   post:
 *     summary: Adiciona um like a uma imagem
 *     tags: [Likes]
 *     requestBody:
 *       description: Objeto contendo a ID da imagem
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/Like'
 *     responses:
 *       '200':
 *         description: Sucesso, retorna a contagem atualizada de likes para a imagem
 */
router.post('/api/like/save', (req, res) => {

    const { imageId } = req.body;

    var image = imageRepository.find(x => x.id === imageId);

    if (image)
    {
        image.likes++;
    }
    else
    {
        imageRepository.push({ id: imageId, likes: 1 });
    }

    res.status(200).json({ imageRepository });
});

// /**
//  * @swagger
//  * /likes/{imageId}:
//  *   get:
//  *     summary: Retorna a contagem de likes para uma imagem específica
//  *     tags: [Likes]
//  *     parameters:
//  *       - name: imageId
//  *         in: path
//  *         required: true
//  *         description: ID da imagem
//  *         schema:
//  *           type: string
//  *     responses:
//  *       '200':
//  *         description: Sucesso, retorna a contagem de likes para a imagem
//  */
// router.get('/api/likes/:imageId', (req, res) => {
    
//     const { imageId } = req.params;
//     const likesCount = likesData[imageId] || 0;

//     res.status(200).json({ likes: likesCount });
// });

/**
 * @swagger
 * /api/like/list:
 *   get:
 *     summary: Lista as imagens e suas curtidas
 *     tags: [Likes]
 *     responses:
 *       '200':
 *         description: Sucesso, retorna a lista completa das imagens e suas curtidas
 *         content:
 *           application/json:
 *             example:
 *               - id: "1"
 *                 likes: 10
 *               - id: "2"
 *                 likes: 5
 *               - id: "3"
 *                 likes: 15
 */
router.get('/api/like/list', (req, res) => {
    res.status(200).json(imageRepository);
});

module.exports = router;