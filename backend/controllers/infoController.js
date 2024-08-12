const e = require("express");
const asyncHandler = require("express-async-handler");

const { Personal, Contact, Platform, Tool, Portfolio } = require("../models/infoModel");

//----------------------------------------------------------------Controllers - Personal
const createPersonalInfo = asyncHandler(async (req, res) => {

    const { name, profession, picture } = req.body;
    if (name, profession, picture) {

        const foundPersonal = await Personal.find();
        if (foundPersonal.length !== 0) {
            res.status(400);
            throw new Error("Personal Informaton already exists");
        } else {
            const personal = await Personal.create({
                name,
                profession,
                picture
            });

            if (personal) {
                res.status(201);
                res.send(personal);
            } else {
                res.status(400);
                throw new Error("Failed to create personal information")
            }
        }

    } else {
        res.status(400);
        throw new Error("Please input all fields");
    }


});

const readPersonalInfo = asyncHandler(async (req, res) => {
    const foundPersonal = await Personal.find();
    if (foundPersonal.length) {
        res.status(200);
        res.send(foundPersonal);
    } else {
        res.status(400);
        throw new Error("Personal information not found")
    }
});

const updatePersonalInfo = asyncHandler(async (req, res) => {

    const { id } = req.params;
    const { name, profession, picture } = req.body;

    const personal = {
        name,
        profession,
        picture
    };

    const updatePersonal = await Personal.updateOne({ _id: id }, personal);

    if (updatePersonal) {
        res.status(200);
        res.send(updatePersonal);
    } else {
        res.status(400);
        throw new Error("Cannot Update")
    }

});

const deletePersonalInfo = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const deletePersonal = await Personal.deleteOne({ _id: id });
    if (deletePersonal) {
        res.status(200);
        res.send(deletePersonal);
    } else {
        res.status(400);
        throw new Error("Cannot Delete");
    }
});

//----------------------------------------------------------------Controllers - Contact
const createContactInfo = asyncHandler(async (req, res) => {

    const { email, phone, address, social } = req.body;

    if (email, phone, address, social) {

        const foundContact = await Contact.find();
        if (foundContact.length !== 0) {
            res.status(400);
            throw new Error("Contact Informaton already exists");
        } else {
            const contact = await Contact.create({
                email,
                phone,
                address,
                social,
            });

            if (contact) {
                res.status(201);
                res.send(contact);
            } else {
                res.status(400);
                throw new Error("Failed to create contact information")
            }
        }

    } else {
        res.status(400);
        throw new Error("Please input all fields");
    }



});

const readContactInfo = asyncHandler(async (req, res) => {
    const foundContact = await Contact.find();
    if (foundContact.length) {
        res.status(200);
        res.send(foundContact);
    } else {
        res.status(400);
        throw new Error("Contact information not found")
    }
});

const updateContactInfo = asyncHandler(async (req, res) => {

    const { id } = req.params;
    const { email, phone, address, social } = req.body;

    const contact = {
        email,
        phone,
        address,
        social,
    };

    const updateContact = await Contact.updateOne({ _id: id }, contact);

    if (updateContact) {
        res.status(200);
        res.send(updateContact);
    } else {
        res.status(400);
        throw new Error("Cannot Update")
    }

});

const deleteContactInfo = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const deleteContact = await Contact.deleteOne({ _id: id });
    if (deleteContact) {
        res.status(200);
        res.send(deleteContact);
    } else {
        res.status(400);
        throw new Error("Cannot Delete");
    }
});
//----------------------------------------------------------------Controllers - Platform
const createPlatformInfo = asyncHandler(async (req, res) => {

    const { platformName } = req.body;

    const platform = await Platform.create({
        platformName
    });

    if (platform) {
        res.status(201);
        res.send(platform);
    } else {
        res.status(400);
        throw new Error("Failed to create platform information")
    }

});

const readPlatformInfo = asyncHandler(async (req, res) => {
    const foundPlatform = await Platform.find();
    if (foundPlatform.length) {
        res.status(200);
        res.send(foundPlatform);
    } else {
        res.status(400);
        throw new Error("Platform information not found")
    }
});

const updatePlatformInfo = asyncHandler(async (req, res) => {

    const { id } = req.params;
    const { platformName } = req.body;

    const platform = {
        platformName
    };

    const updatePlatform = await Platform.updateOne({ _id: id }, platform);

    if (updatePlatform) {
        res.status(200);
        res.send(updatePlatform);
    } else {
        res.status(400);
        throw new Error("Cannot Update")
    }

});

const deletePlatformInfo = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const deletePlatform = await Platform.deleteOne({ _id: id });
    if (deletePlatform) {
        res.status(200);
        res.send(deletePlatform);
    } else {
        res.status(400);
        throw new Error("Cannot Delete");
    }
});
//----------------------------------------------------------------Controllers - Tool
const createToolInfo = asyncHandler(async (req, res) => {

    const { name, type, description, link, icon } = req.body;

    const tool = await Tool.create({
        name,
        type,
        description,
        link,
        icon
    });

    if (tool) {
        res.status(201);
        res.send(tool);
    } else {
        res.status(400);
        throw new Error("Failed to create tool information")
    }

});

const readToolInfo = asyncHandler(async (req, res) => {
    const foundTool = await Tool.find();
    if (foundTool.length) {
        res.status(200);
        res.send(foundTool);
    } else {
        res.status(400);
        throw new Error("Tool information not found")
    }
});

const updateToolInfo = asyncHandler(async (req, res) => {

    const { id } = req.params;
    const { name, type, description, link, icon } = req.body;

    const tool = {
        name,
        type,
        description,
        link,
        icon
    };

    const updateTool = await Tool.updateOne({ _id: id }, tool);

    if (updateTool) {
        res.status(200);
        res.send(updateTool);
    } else {
        res.status(400);
        throw new Error("Cannot Update")
    }

});

const deleteToolInfo = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const deleteTool = await Tool.deleteOne({ _id: id });
    if (deleteTool) {
        res.status(200);
        res.send(deleteTool);
    } else {
        res.status(400);
        throw new Error("Cannot Delete");
    }
});
//----------------------------------------------------------------Controllers - Portfolio
const createPortfolioInfo = asyncHandler(async (req, res) => {

    const { name, type, description, picture, stack, link, source } = req.body;

    const portfolio = await Portfolio.create({
        name,
        type,
        description,
        picture,
        stack,
        link,
        source
    });

    if (portfolio) {
        res.status(201);
        res.send(portfolio);
    } else {
        res.status(400);
        throw new Error("Failed to create portfolio information")
    }

});

const readPortfolioInfo = asyncHandler(async (req, res) => {
    const foundPortfolio = await Portfolio.find();
    if (foundPortfolio.length) {
        res.status(200);
        res.send(foundPortfolio);
    } else {
        res.status(400);
        throw new Error("Portfolio information not found")
    }
});

const updatePortfolioInfo = asyncHandler(async (req, res) => {

    const { id } = req.params;
    const { name, type, description, picture, stack, link, source } = req.body;

    const portfolio = {
        name,
        type,
        description,
        picture,
        stack,
        link,
        source
    };

    const updatePortfolio = await Portfolio.updateOne({ _id: id }, portfolio);

    if (updatePortfolio) {
        res.status(200);
        res.send(updatePortfolio);
    } else {
        res.status(400);
        throw new Error("Cannot Update")
    }

});

const deletePortfolioInfo = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const deletePortfolio = await Portfolio.deleteOne({ _id: id });
    if (deletePortfolio) {
        res.status(200);
        res.send(deletePortfolio);
    } else {
        res.status(400);
        throw new Error("Cannot Delete");
    }
});


module.exports = {
    createPersonalInfo, readPersonalInfo, updatePersonalInfo, deletePersonalInfo,
    createContactInfo, readContactInfo, updateContactInfo, deleteContactInfo,
    createPlatformInfo, readPlatformInfo, updatePlatformInfo, deletePlatformInfo,
    createToolInfo, readToolInfo, updateToolInfo, deleteToolInfo,
    createPortfolioInfo, readPortfolioInfo, updatePortfolioInfo, deletePortfolioInfo
}