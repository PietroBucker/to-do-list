import React, { useEffect, useState } from "react";
import { TasksResponse } from "../interface";
import { filterData, getTasks } from "../helpers";
import Tasks from "../components/Task";
import SearchBar from "../components/SearchBar";
import ThemeButton from "../components/ThemeButton";
import styles from './Home.module.css';
import StyledButton from "../components/StyledButton";
import cross from '../assets/cross.svg';
import Form from "../components/Form";
import { DragDropContext, Droppable, Draggable, DropResult } from "@hello-pangea/dnd";

export default function Home() {
  const [search, setSearch] = useState<string>('');
  const [data, setData] = useState<TasksResponse[]>([]);
  const modalFormRef = React.useRef<HTMLDialogElement>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    getTasks(setData, setLoading);
  }, [loading]);

  const filtred = filterData(data, search);

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const reorderedData = [...data];
    const [movedItem] = reorderedData.splice(result.source.index, 1);
    reorderedData.splice(result.destination.index, 0, movedItem);

    setData(reorderedData);
  };

  return (
    <div className={styles['home-container']}>
      <h1>TODO LIST</h1>
      <div className={styles['home-container-search']}>
        <SearchBar value={search} onChange={({ target }) => setSearch(target.value)} />
        <ThemeButton />
      </div>
      <div className={styles['home-container-tasks']}>
        {loading ? <h1>Carregando...</h1> : ''}
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="tasks">
            {(provided) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className={styles['tasks-list-droppable']}
              >
                {filtred &&
                  filtred.map((item, index) => (
                    <Draggable key={item.id} draggableId={(item.id ?? 0).toString()} index={index} >
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className={styles['tasks-container-draggable']}
                        >
                          <Tasks
                            desc={item.description}
                            loading={setLoading}
                            id={item.id}
                            over1000={item.cost as number >= 1000}
                          >
                            <div className={styles.task_item_container}>{item.task_name}</div>
                            <div className={styles.task_item_container}>{item.limit_date}</div>
                            <div className={styles.task_item_container}>{item.cost}</div>
                          </Tasks>
                        </div>
                      )}
                    </Draggable>
                  ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
        <StyledButton
          onClick={() => modalFormRef.current?.showModal()}
          className={styles['fixed-button']}
        >
          <img src={cross} alt="" />
        </StyledButton>
        <Form ref={modalFormRef} useRef={modalFormRef} action={'save'} loading={setLoading} />
      </div>
    </div>
  );
}
