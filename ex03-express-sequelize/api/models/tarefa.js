const getTarefaModel = (sequelize, { DataTypes }) => {
    const Tarefa = sequelize.define('Tarefa', {
        objectId: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            validate: {
                isUUID: 4,
            },
        },
        descricao: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true, // Não pode ser uma string vazia
            },
        },
        concluida: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
    });

    return Tarefa;
};

export default getTarefaModel;