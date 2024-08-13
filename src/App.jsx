import { useState } from "react";
import "./App.css"; // importacao do arquivo com nossos estilos css

import Todo from "./components/Todo";
import TodoForm from "./components/TodoForm";
import Search from "./components/Search";
import Filter from "./components/Filter";

function App() {
  //utilizamos o array para criar a lista inicial de tarefas, e o useStates para coneguir atualizar a renderização
  const [todos, setTodos] = useState([
    {
      id: 1,
      text: "Criar funcionalidade X  no Sistema",
      category: "Trabalho",
      isCompleted: false,
    },
    {
      id: 2,
      text: "Ir para academia",
      category: "Pessoal",
      isCompleted: false,
    },
    {
      id: 3,
      text: "Estudar React",
      category: "Estudos",
      isCompleted: false,
    },
  ]);

  //criando os states

  const [search, setSearch] = useState(""); // iniciando com vazio
  const [filter, setFilter] = useState("All"); // inicia mostrando todos
  const [sort, setSort] = useState("Asc"); //inicia com ordenação ascendente

  //criando funcao para criar um novo todo
  const addTodo = (text, category) => {
    const newTodos = [
      ...todos,
      {
        id: Math.floor(Math.random() * 1000),
        text,
        category,
        isCompleted: false,
      },
    ];

    setTodos(newTodos);
  };

  //funcao para remover itens da lista pelo id

  const removeTodo = (id) => {
    const newTodos = [...todos];
    const filteredTodos = newTodos.filter((todo) =>
      todo.id !== id ? todo : null
    );
    setTodos(filteredTodos); //atualiza o estado da lista de tarefas todos
  };

  //fubcao para completar tarefas - OBS o map modifica o array original diferente do filter
  const completeTodo = (id) => {
    const newTodos = [...todos];
    newTodos.map((todo) =>
      todo.id === id ? (todo.isCompleted = !todo.isCompleted) : todo
    );
    setTodos(newTodos);
  };

  return (
    <div className="app">
      <h1> Lista de Tarefas</h1>
      <Search search={search} setSearch={setSearch} />
      <Filter filter={filter} setFilter={setFilter} setSort={setSort} />

      <div className="todo-list">
        {todos
          .filter(
            (
              todo //filtra de acordo com o status
            ) =>
              filter === "All"
                ? true
                : filter === "Completed"
                ? todo.isCompleted
                : !todo.isCompleted
          )
          .filter(
            (
              todo //filtra de acordo com o que foi digitado
            ) => todo.text.toLowerCase().includes(search.toLocaleLowerCase())
          )
          .sort((a, b) =>
            sort === "Asc"
              ? a.text.localeCompare(b.text)
              : b.text.localeCompare(a.text)
          ) //ordenaçao asc e desc 
          .map((todo) => (
            <Todo
              key={todo.id}
              todo={todo}
              removeTodo={removeTodo}
              completeTodo={completeTodo}
            />
          ))}
      </div>
      <TodoForm addTodo={addTodo} />
    </div>
  );
}

export default App;

// o bloco do map percorre todo o nosso array e exibe na tela a propriedade text
