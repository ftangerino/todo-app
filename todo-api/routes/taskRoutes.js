const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const authenticateToken = require('../middleware/authMiddleware');

/**
 * @swagger
 * components:
 *   schemas:
 *     Task:
 *       type: object
 *       required:
 *         - title
 *         - description
 *         - status
 *       properties:
 *         id:
 *           type: integer
 *           description: ID da tarefa
 *         title:
 *           type: string
 *           description: Título da tarefa
 *         description:
 *           type: string
 *           description: Descrição da tarefa
 *         status:
 *           type: string
 *           description: Status da tarefa
 *           enum:
 *             - pendente
 *             - em progresso
 *             - concluída
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Data de criação da tarefa
 */

/**
 * @swagger
 * /api/tasks:
 *   post:
 *     summary: Cria uma nova tarefa
 *     tags: [Tasks]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Task'
 *     responses:
 *       201:
 *         description: Tarefa criada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Task'
 *       500:
 *         description: Erro ao criar tarefa
 */
router.post('/tasks', authenticateToken, taskController.createTask);

/**
 * @swagger
 * /api/tasks:
 *   get:
 *     summary: Retorna a lista de todas as tarefas
 *     tags: [Tasks]
 *     responses:
 *       200:
 *         description: Lista de tarefas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Task'
 *       500:
 *         description: Erro ao buscar tarefas
 */
router.get('/tasks', authenticateToken, taskController.getTasks);

/**
 * @swagger
 * /api/tasks/{id}:
 *   put:
 *     summary: Atualiza uma tarefa existente
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da tarefa
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Task'
 *     responses:
 *       200:
 *         description: Tarefa atualizada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Task'
 *       404:
 *         description: Tarefa não encontrada
 *       500:
 *         description: Erro ao atualizar tarefa
 */
router.put('/tasks/:id', authenticateToken, taskController.updateTask);

/**
 * @swagger
 * /api/tasks/{id}:
 *   delete:
 *     summary: Deleta uma tarefa existente
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da tarefa
 *     responses:
 *       204:
 *         description: Tarefa deletada com sucesso
 *       404:
 *         description: Tarefa não encontrada
 *       500:
 *         description: Erro ao deletar tarefa
 */
router.delete('/tasks/:id', authenticateToken, taskController.deleteTask);

module.exports = router;
