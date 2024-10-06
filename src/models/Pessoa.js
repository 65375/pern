class Pessoa {
    constructor(id_pessoa, nome_pessoa, cpf, descricao_endereco, data_nascimento, telefone, email, pcd) {
        this.id_pessoa = id_pessoa;
        this.nome_pessoa = nome_pessoa;
        this.cpf = cpf;
        this.descricao_endereco = descricao_endereco;
        this.data_nascimento = data_nascimento;
        this.telefone = telefone;
        this.email = email;
        this.pcd = pcd;
    }
}

export default Pessoa;