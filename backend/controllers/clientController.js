const asyncHandler = require("express-async-handler");

const { Client } = require("../models/clientModel");

//----------------------------------------------------------------Controllers - Client
const createClientInfo = asyncHandler(async (req, res) => {
  const {
    clientName,
    clientCompany,
    clientPosition,
    projectName,
    projectDescription,
    projectPicture,
    projectFirstScreen,
    projectSecondScreen,
    projectLastScreen,
    consentToDisplay,
    rating,
    feedback,
  } = req.body;

  // Validate required fields
  if (
    !clientName ||
    !projectName ||
    !projectDescription ||
    feedback === undefined
  ) {
    res.status(400);
    throw new Error("Please provide all required fields");
  }

  // Create a new client document
  const client = await Client.create({
    client: {
      name: clientName,
      company: clientCompany,
      position: clientPosition,
    },
    project: {
      name: projectName,
      description: projectDescription,
      picture: projectPicture,
      firstScreen: projectFirstScreen,
      secondScreen: projectSecondScreen,
      lastScreen: projectLastScreen,
      consentToDisplay: consentToDisplay || false,
    },
    rating: rating || 5, // Default rating to 5 if not provided
    feedback,
  });

  if (client) {
    res.status(201);
    res.send(client);
  } else {
    res.status(400);
    throw new Error("Failed to create client information");
  }
});

const readClientInfo = asyncHandler(async (req, res) => {
  const foundClient = await Client.find();
  if (foundClient.length) {
    res.status(200);
    res.send(foundClient);
  } else {
    res.status(400);
    throw new Error("Client information not found");
  }
});

const updateClientInfo = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const {
    clientName,
    clientCompany,
    clientPosition,
    projectName,
    projectDescription,
    projectPicture,
    projectFirstScreen,
    projectSecondScreen,
    projectLastScreen,
    consentToDisplay,
    rating,
    feedback,
  } = req.body;

  // Construct the update object to match the model
  const client = {
    client: {
      name: clientName,
      company: clientCompany,
      position: clientPosition,
    },
    project: {
      name: projectName,
      description: projectDescription,
      picture: projectPicture,
      firstScreen: projectFirstScreen,
      secondScreen: projectSecondScreen,
      lastScreen: projectLastScreen,
      consentToDisplay: consentToDisplay,
    },
    rating: rating,
    feedback: feedback,
  };

  // Perform the update
  const updateClient = await Client.updateOne({ _id: id }, client);

  if (updateClient) {
    res.status(200);
    res.send(updateClient);
  } else {
    res.status(400);
    throw new Error("Cannot Update");
  }
});

const deleteClientInfo = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const deleteClient = await Client.deleteOne({ _id: id });
  if (deleteClient) {
    res.status(200);
    res.send(deleteClient);
  } else {
    res.status(400);
    throw new Error("Cannot Delete");
  }
});

module.exports = {
  createClientInfo,
  readClientInfo,
  updateClientInfo,
  deleteClientInfo,
};
