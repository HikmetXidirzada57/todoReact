import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  add,
  remove,
  statusCompleted,
  toggleCompleted,
  edit,
} from "./redux/reducers/todoSlice";
import { fetchUser } from "./redux/reducers/userSlice";

function App() {
  const todos = useSelector((state) => state.todos);
  const user = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(fetchUser());
  }, []);


  const statuses = [
    {
      name: "Un Completed",
      status: "unCompleted",
    },
    {
      name: "In Progress",
      status: "inProgress",
    },
    {
      name: "Completed",
      status: "completed",
    },
  ];

  const editData=(todo)=>{
   setTask(todo.task)
   setId(todo.id)
  }
  const dispatch = useDispatch();

  const [task, setTask] = useState("");
  const [id, setId] = useState(undefined)

  const addTask = () => {
    if(id){
      dispatch(edit({id,task}))
      setId(null)
    }else{
      dispatch(add(task));
    }
    setTask("");
  };

  return (
    <div className="App container p-5">
      {user.loading ? (
        <p>Loading .....</p>
      ) : !user.error ? (
        <h1>{user.data.first_name} welcome</h1>
      ) : (
        <h1> {user.error} </h1>
      )}
      <div className="card mb-4">
        <div className="d-flex card-body">
          <div class="form-group w-100 mx-sm-3 mb-2">
            <input
              value={task}
              onChange={(e) => setTask(e.target.value)}
              type="text"
              class="form-control"
              id="task"
              placeholder="ADD TASK HERE"
            />
          </div>
          <button
            onClick={() => {
              addTask();
            }}
            type="submit"
            class="btn btn-primary mb-2"
          >
            {id ? "Edit":"Add"}
          </button>
        </div>
      </div>


     { statuses.length>0 && statuses.map((s,index)=>{
      
      return <div key={index}>
        <h2 style={{fontFamily:"fantasy"}} className="mb-3">{s.name}</h2>
        <ul class="list-group">
        {todos.filter((t)=>t.status===s.status).map((todo, index) => (
          <li key={index} class="list-group-item">
            <div className="d-flex align-items-center justify-content-between">
              <div>{todo.task}</div>
              <div>{todo.status}</div>
              <div>
                <button
                  onClick={() => {
                    dispatch(remove(todo.id));
                  }}
                  className="btn me-2 btn-danger"
                >
                  Remove
                </button>
                <button onClick={()=>editData(todo)} className="btn btn-primary me-2">Edit</button>
                {todo.status === "completed" ? (
                  <button
                    onClick={() => {
                      dispatch(
                        statusCompleted({
                          id: todo.id,
                          status: "inProgress",
                        })
                      );
                    }}
                    className="btn me-2 btn-success"
                  >
                    Back to in progress
                  </button>
                ) : (
                  <button
                    disabled={todo.status === "completed"}
                    onClick={() => {
                      dispatch(
                        statusCompleted({
                          id: todo.id,
                          status:
                            todo.status === "unCompleted"
                              ? "inProgress"
                              : "completed",
                        })
                      );
                    }}
                    className="btn me-2 btn-success"
                  >
                    {todo.status === "UnComplete"
                      ? "Add to progress"
                      : "Complete"}
                  </button>
                )}
              </div>
            </div>
          </li>
        ))}
      </ul>
      </div>
     })}


    </div>
  );
}

export default App;
