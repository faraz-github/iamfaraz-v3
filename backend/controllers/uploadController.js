const asyncHandler = require("express-async-handler");

// Cloudinary
const { cloudinary } = require("../config/uploader");

const uploadAdminPicture = asyncHandler(async (req, res) => {

    const { imageString, adminName } = req.body;
    const uploadResponse = await cloudinary.uploader.upload(imageString, {
        folder: `MyPortfolioMedia/Admin_Pictures/${adminName.toUpperCase()}`
    });
    if (uploadResponse.asset_id) {
        res.status(200);
        res.send(uploadResponse);
    } else {
        res.status(400);
        throw new Error("Failed to upload admin profile picture")
    }

});

const uploadPersonalPicture = asyncHandler(async (req, res) => {

    const { imageString } = req.body;
    const uploadResponse = await cloudinary.uploader.upload(imageString, {
        folder: "MyPortfolioMedia/Personal_Pictures"
    });
    if (uploadResponse.asset_id) {
        res.status(200);
        res.send(uploadResponse);
    } else {
        res.status(400);
        throw new Error("Failed to upload admin profile picture")
    }

});

const uploadToolIconPicture = asyncHandler(async (req, res) => {
    const { imageString } = req.body;
    const uploadResponse = await cloudinary.uploader.upload(imageString, {
        folder: "MyPortfolioMedia/Tool_Pictures"
    });
    if (uploadResponse.asset_id) {
        res.status(200);
        res.send(uploadResponse);
    } else {
        res.status(400);
        throw new Error("Failed to upload tool icon picture")
    }
});

const uploadPortfolioPicture = asyncHandler(async (req, res) => {
    const { imageString } = req.body;
    const uploadResponse = await cloudinary.uploader.upload(imageString, {
        folder: "MyPortfolioMedia/Portfolio_Pictures"
    });
    if (uploadResponse.asset_id) {
        res.status(200);
        res.send(uploadResponse);
    } else {
        res.status(400);
        throw new Error("Failed to upload portfolio picture")
    }
});

const uploadClientPicture = asyncHandler(async (req, res) => {
    const { imageString, clientProjectName } = req.body;
    const uploadResponse = await cloudinary.uploader.upload(imageString, {
        folder: `MyPortfolioMedia/Client_Pictures/${clientProjectName.toUpperCase()}`
    });
    if (uploadResponse.asset_id) {
        res.status(200);
        res.send(uploadResponse);
    } else {
        res.status(400);
        throw new Error("Failed to upload portfolio picture")
    }
});

module.exports = {
    uploadAdminPicture,
    uploadPersonalPicture,
    uploadToolIconPicture,
    uploadPortfolioPicture,
    uploadClientPicture
}