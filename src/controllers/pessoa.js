import Pessoa from '../models/Pessoa.js';
import { v4 as uuidv4 } from 'uuid';
import pool from "../db.js";

export const getTodasPessoas = async (req, res) => {
    const client = await pool.connect();
    try {
        const result = await client.query('SELECT * FROM Pessoa');
        /*
            const jsonData = result.rows.map(row => ({
                id: row.id,
                name: row.name
            }));
        */
        /*
            const pessoas = result.rows.map((row) => new Pessoa(
            row.id_pessoa,
            row.nome_pessoa,
            row.cpf,
            row.descricao_endereco,
            row.data_nascimento,
            row.telefone,
            row.email,
            row.pcd
        ));*/
        res.status(200).json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Erro ao buscar pessoas' });
    } finally {
        client.release();
    }
};

export const getPessoaPorId = async (req, res) => {
    const id = req.params.id;
    const client = await pool.connect();
    try {
        const result = await client.query('SELECT * FROM Pessoa WHERE id_pessoa = $1', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Pessoa não encontrada' });
        }
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Erro ao buscar pessoa' });
    } finally {
        client.release();
    }
};

export const criarPessoa = async (req, res) => {
    const pessoa = req.body;
    const uuid = uuidv4(); // Generate a UUID

    /*const pessoa = await Pessoa.create({
        id_pessoa: uuid, // Assign the UUID as id_pessoa
        ...pessoaPost, // Spread the other properties from newPessoa
    });*/

    const client = await pool.connect();
    try {
        const result = await client.query(
            `INSERT INTO Pessoa (id_pessoa, nome_pessoa, cpf, descricao_endereco, data_nascimento, telefone, email, pcd)
             VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
            [
                uuid,
                pessoa.nome_pessoa,
                pessoa.cpf,
                pessoa.descricao_endereco,
                pessoa.data_nascimento,
                pessoa.telefone,
                pessoa.email,
                pessoa.pcd,
            ]
        );
        if (result.rows.length === 0) {
            throw new Error('Erro ao criar Pessoa');
        }

        /*const pessoaInserida = new Pessoa(
            result.rows[0].id_pessoa,
            result.rows[0].nome_pessoa,
            result.rows[0].cpf,
            result.rows[0].descricao_endereco,
            result.rows[0].data_nascimento,
            result.rows[0].telefone,
            result.rows[0].email,
            result.rows[0].pcd
        );*/

        res.status(201).json(pessoa);
    } catch (err) {
        console.error(err);
        res.status(400).json({ message: 'Erro ao criar pessoa' });
    } finally {
        client.release();
    }
};

export const atualizarPessoa = async (req, res) => {
    const id = req.params.id;
    const updatedPessoa = req.body;
    const client = await pool.connect();
    try {
        const result = await client.query(
            `UPDATE Pessoa
               SET nome_pessoa = $2, cpf = $3, descricao_endereco = $4, data_nascimento = $5,
                   telefone = $6, email = $7, pcd = $8
               WHERE id_pessoa = $1
               RETURNING *`,
            [
                id,
                updatedPessoa.nome_pessoa,
                updatedPessoa.cpf,
                updatedPessoa.descricao_endereco,
                updatedPessoa.data_nascimento,
                updatedPessoa.telefone,
                updatedPessoa.email,
                updatedPessoa.pcd,
            ]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Pessoa não encontrada' });
        }
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(400).json({ message: 'Erro ao atualizar pessoa' });
    } finally {
        client.release();
    }
};

export const deletarPessoa = async (req, res) => {
    const id = req.params.id;
    const client = await pool.connect();
    try {
        const result = await client.query('DELETE FROM Pessoa WHERE id_pessoa = $1 RETURNING *', [id]);
        if (result.rows.length === 0) {
            return res.status(200).json({message: 'Pessoa deletada'});
        }
    } catch (err) {
        console.error(err);
        res.status(400).json({ message: 'Erro ao atualizar pessoa' });
    } finally {
        client.release();
    }
};