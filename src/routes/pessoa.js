import express from 'express';
import { getTodasPessoas, getPessoaPorId, criarPessoa, atualizarPessoa, deletarPessoa } from '../controllers/pessoa.js';

const router = express.Router();

router.get('/pessoas', getTodasPessoas);
router.get('/pessoas/:id', getPessoaPorId);
router.post('/pessoas', criarPessoa);
router.put('/pessoas/:id', atualizarPessoa);
router.delete('/pessoas/:id', deletarPessoa);

export default router;
