const { v4: uuid } = require("uuid");

const tasksList = [
  {
    name: "ListOne",
    id: uuid(),
    task: [
      {
        id: 1,
        name: "task1",
        isDone: false,
      },
    ],
  },
  {
    name: "ListTwo",
    id: uuid(),
    task: [
      {
        id: 1,
        name: "task1",
        isDone: false,
      },
      {
        id: 2,
        name: "task2",
        isDone: false,
      },
    ],
  },
];

exports.getLists = (request, response, next) => {
  try {
    response.status(200).json(tasksList);
  } catch (error) {
    response.status(500).json({
      error,
      message:
        "Oops! Coś poszło nie tak, przy metodzie GET w endpointcie /taskLists",
    });
  }
};

exports.getList = (request, response, next) => {
  try {
    const { name } = request.params;
    const listToSend = tasksList.find((list) => list.name == name);

    if (!listToSend) {
      response.status(404).json({
        message: `Nie znaleziono listy o nazwie: ${name}`,
      });

      return;
    }

    response.status(200).json(listToSend);
  } catch (error) {
    response.status(500).json({
      error,
      message:
        "Oops! Coś poszło nie tak, przy metodzie GET w endpointcie /tasks-list/:name",
    });
  }
};

exports.postList = (request, response, next) => {
  try {
    const { name, task } = request.body;
    if (!name || !task) {
      response.status(400).json({
        message: "Nie podano wszystkich wymaganych informacji",
      });

      return;
    }

    const isListExist = tasksList.some(
      ({ name: currentName }) => currentName === name
    );
    if (isListExist) {
      response.status(409).json({
        message: `Istnieje już w bazie kurs ${name}`,
      });

      return;
    }

    const newList = {
      name: name,
      id: uuid(),
      task: task,
    };

    tasksList.push(newList);

    response.status(201).json(newList);
  } catch (error) {
    response.status(500).json({
      error,
      message:
        "Oops! Coś poszło nie tak, przy metodzie POST w endpointcie /tasksList",
    });
  }
};

exports.putList = (request, response, next) => {
  try {
    const { name, id, task } = request.body;
    if (!name || !id || !task) {
      response.status(400).json({
        message: "Nie podano wszystkich wymaganych informacji",
      });

      return;
    }

    const indexListToUpdate = tasksList.findIndex((list) => list.id === id);
    if (indexListToUpdate === -1) {
      response.status(404).json({
        message: "Nie znaleziono listy zadań  o podanym id",
      });

      return;
    }

    tasksList.splice(indexListToUpdate, 1, request.body);

    response.status(202).json(tasksList);
  } catch (error) {
    response.status(500).json({
      error,
      message:
        "Oops! Coś poszło nie tak, przy metodzie PUT w endpointcie /tasksList",
    });
  }
};

exports.deleteList = (request, response, next) => {
  try {
    const { id } = request.params;

    const indexListToDelete = tasksList.findIndex((list) => list.id === id);

    if (indexListToDelete === -1) {
      response.status(404).json({
        message: "Nie znaleziono listy zadań o podanym id",
      });

      return;
    }

    tasksList.splice(indexListToDelete, 1);
    response.status(200).end();
  } catch (error) {
    response.status(500).json({
      error,
      message:
        "Oops! Coś poszło nie tak, przy metodzie DELETE w endpointcie/tasksList/:id",
    });
  }
};

exports.tasksList = tasksList;
