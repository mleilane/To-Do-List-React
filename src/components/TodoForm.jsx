import { useState } from "react";

const TodoForm = ({addTodo}) => {
  //variaveis que serao usadas para manipular os dados do componente
  const [value, setValue] = useState("");
  const [category, setCategory] = useState("");

  //funcao que sera chamada quando o formulario for enviado
  const handleSubmit = (e) => {
    e.preventDefault(); //usado para impedir o comportamento padrao do formulario, permitindo controle do que contece ao envia-lo

    // validacao para caso tenha valors null
    if (!value || !category) return;
    addTodo(value, category); //adiciona nova tarefa ao todo
    setValue(""); //reseta 
    setCategory(""); //reseta 
  };

  return (
    <div className="todo-form">
      <h2>Criar Tarefas </h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Digite o título"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value=""> Selecione uma categoria</option>
          <option value="Trabalho"> Trabalho</option>
          <option value="Pessoal"> Pessoal</option>
          <option value="Estudos"> Estudos</option>
        </select>
        <button type="submit"> Criar tarefa</button>
      </form>
    </div>
  );
};

export default TodoForm;
