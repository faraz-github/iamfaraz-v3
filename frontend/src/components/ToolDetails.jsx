import { useState } from "react";

import axios from "axios";
import { toast } from "react-toastify";

import { LoadingButton, TabContext, TabList, TabPanel } from "@mui/lab";
import { Box, Button, ButtonGroup, Card, CardActions, CardContent, CardHeader, IconButton, Paper, Stack, styled, Tab, TextField, Typography } from "@mui/material";
import CreateTwoToneIcon from '@mui/icons-material/CreateTwoTone';
import StorageTwoToneIcon from '@mui/icons-material/StorageTwoTone';
import UpdateTwoToneIcon from '@mui/icons-material/UpdateTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import BuildCircleIcon from '@mui/icons-material/BuildCircle';

import { useAdmin } from "../contexts/adminContext";
import { useLoading } from "../contexts/loadingContext";

const Input = styled('input')({
    display: 'none',
});

function ToolDetails() {

    const { token } = useAdmin();
    const { setOpenLoading } = useLoading();

    // =========================================================================================== MUI - Tabs
    const [value, setValue] = useState("1");
    const handleChange = (event, newValue) => {
        if (newValue === "1" || newValue === "3") {
            setName("");
            setType("");
            setDescription("");
            setLink("");
            setSelectedImage("");
            setValue(newValue);
        }
        setUpdateId("");
        setDeleteId("");
        setValue(newValue);
    }
    // =========================================================================================== CREATE TAB
    const [name, setName] = useState("");
    const [type, setType] = useState("");
    const [description, setDescription] = useState("");
    const [link, setLink] = useState("");

    const [selectedImage, setSelectedImage] = useState("");
    //-------------------------------------------------------------------------------------------
    const handleFileChange = (event) => {
        const image = event.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(image); // base 64 encoding
        reader.onloadend = () => {
            setSelectedImage(reader.result);
        }
    }

    //-------------------------------------------------------------------------------------------
    const onSubmitHandler = async (event) => {
        event.preventDefault();
        if (!name || !type || !description || !link) {
            console.log("Please provide all the details"); // Debug Log
            toast.info("Please provide all the details");
        } else {
            // Upload Profile Picture
            if (!selectedImage) {
                console.log("Please select a tool icon picture"); // Debug Log
                toast.info("Please select a tool icon picture");
            } else {
                const pictureURL = await uploadToolIconPicture(selectedImage);
                // Create Tool Info
                const toolData = {
                    name: name,
                    type: type,
                    description: description,
                    link: link,
                    icon: pictureURL
                }
                const response = await createToolInfo(toolData);
                if (response) {
                    setName("");
                    setType("");
                    setDescription("");
                    setLink("");
                    setSelectedImage("");
                    console.log(response); // Debug Log
                }
            }

        }
    }

    //------------------------------------------------------------------------------------------- API
    const uploadToolIconPicture = async (base64EncodedImage) => {
        setOpenLoading(true);
        try {
            const response = await axios.post("/api/upload/tool/picture", { imageString: base64EncodedImage });
            if (response) {
                setOpenLoading(false);
                return response.data.url;
            }
        } catch (error) {
            setOpenLoading(false);
            console.log(error);
        }
    }

    const createToolInfo = async (toolData) => {
        setOpenLoading(true);
        try {
            const response = await axios.post("/api/info/tool", toolData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (response) {
                setOpenLoading(false);
                toast.success("Successfully Created");
                return response;
            }
        } catch (error) {
            console.log(error); // Debug Log
            setOpenLoading(false);
            if (error.response.data.message) {
                toast.error(error.response.data.message);
            }
        }
    }

    // =========================================================================================== READ TAB
    const [tool, setTool] = useState([]);
    //------------------------------------------------------------------------------------------- API
    const readToolInfo = async () => {
        setOpenLoading(true);
        try {
            const response = await axios.get("/api/info/tool");
            if (response) {
                setOpenLoading(false);
                setTool(response.data);
                return response;
            }
        } catch (error) {
            console.log(error); // Debug Log
            setTool([]);
            setOpenLoading(false);
            if (error.response.data.message) {
                toast.error(error.response.data.message);
            }
        }
    }

    // =========================================================================================== UPDATE TAB
    const [updateId, setUpdateId] = useState("");
    const updateInformation = (info) => {
        setValue("3");
        setName(info.name);
        setType(info.type);
        setDescription(info.description);
        setLink(info.link)
        setSelectedImage(info.icon);
        setUpdateId(info._id);
    }

    const onUpdateHandler = async (event) => {
        event.preventDefault();
        if (!name || !type || !description || !link) {
            console.log("Please provide all the details"); // Debug Log
            toast.info("Please provide all the details");
        } else {
            // Upload Profile Picture
            if (!selectedImage) {
                console.log("Please select a tool icon picture"); // Debug Log
                toast.info("Please select a tool icon picture");
            } else {
                const pictureURL = await uploadToolIconPicture(selectedImage);
                // Update Personal Info
                const id = updateId;
                // Create Tool Info
                const toolData = {
                    name: name,
                    type: type,
                    description: description,
                    link: link,
                    icon: pictureURL
                }
                const response = await updateToolInfo(id, toolData);
                if (response) {
                    setUpdateId("");
                    console.log(response); // Debug Log
                }
            }
        }
    }
    //------------------------------------------------------------------------------------------- API
    const updateToolInfo = async (id, toolData) => {
        setOpenLoading(true);
        try {
            const response = await axios.patch(`/api/info/tool/${id}`, toolData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (response) {
                setOpenLoading(false);
                toast.success("Successfully Updated");
                return response;
            }
        } catch (error) {
            console.log(error); // Debug Log
            setOpenLoading(false);
            if (error.response.data.message) {
                toast.error(error.response.data.message);
            }
        }
    }

    // =========================================================================================== DELETE TAB
    const [deleteId, setDeleteId] = useState("");
    const deleteInformation = (info) => {
        setValue("4");
        setName(info.name);
        setType(info.type);
        setDescription(info.description);
        setLink(info.link)
        setSelectedImage(info.icon);
        setDeleteId(info._id);
    }
    //------------------------------------------------------------------------------------------- API
    const deleteToolInfo = async () => {
        setOpenLoading(true);
        try {
            const response = await axios.delete(`/api/info/tool/${deleteId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (response) {
                setOpenLoading(false);
                toast.success("Successfully Deleted");
                setDeleteId("");
                return response;
            }
        } catch (error) {
            console.log(error); // Debug Log
            setOpenLoading(false);
            if (error.response.data.message) {
                toast.error(error.response.data.message);
            }
        }
    }

    // =========================================================================================== RENDER
    return (
        <Card>
            <CardHeader
                title="Tool Information"
                subheader="Manager"
            />
            <CardContent>

                <TabContext value={value}>
                    <TabList
                        onChange={handleChange}
                        textColor="primary"
                        indicatorColor="primary"
                        variant="scrollable"
                    >
                        <Tab label="Create" value="1" icon={<CreateTwoToneIcon />} iconPosition="start" />
                        <Tab label="Read" value="2" icon={<StorageTwoToneIcon />} iconPosition="start" onClick={readToolInfo} />
                        <Tab label="Update" value="3" icon={<UpdateTwoToneIcon />} iconPosition="start" />
                        <Tab label="Delete" value="4" icon={<DeleteTwoToneIcon />} iconPosition="start" />
                    </TabList>

                    <TabPanel value="1"
                        sx={{
                            p: 0
                        }}
                    >

                        <Card
                            variant="outlined"
                            square
                        >
                            <CardHeader
                                title="Tool Details"
                                subheader="Create"
                            />
                            <form onSubmit={onSubmitHandler}>
                                <CardContent>

                                    <center>
                                        {
                                            selectedImage
                                                ? <Paper variant="outlined" sx={{ mb: 1, p: 1, width: "100px" }}>
                                                    <img src={selectedImage} alt="software-tool" width="100%" />
                                                </Paper>
                                                : <Paper variant="outlined" sx={{ mb: 1, p: 1, width: "100px" }}>
                                                    <Typography variant="caption" color="text.secondary">Set Tool Icon</Typography>
                                                    <BuildCircleIcon fontSize="large" />
                                                </Paper>
                                        }
                                    </center>

                                    <Stack spacing={1}>
                                        <TextField size="small" color="secondary" variant="outlined" type="text" label="Tool Name"
                                            name="name"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                        />
                                        <TextField size="small" color="secondary" variant="outlined" type="text" label="Type"
                                            name="type"
                                            value={type}
                                            onChange={(e) => setType(e.target.value)}
                                        />
                                        <TextField size="small" color="secondary" variant="outlined" type="text" label="Description"
                                            name="description"
                                            multiline
                                            maxRows={4}
                                            value={description}
                                            onChange={(e) => setDescription(e.target.value)}
                                        />
                                        <TextField size="small" color="secondary" variant="outlined" type="text" label="Link"
                                            name="link"
                                            value={link}
                                            onChange={(e) => setLink(e.target.value)}
                                        />

                                    </Stack>
                                </CardContent>
                                <CardActions>
                                    <Stack direction="row" spacing={1}>
                                        <IconButton color="primary" component="label">
                                            <Input accept="image/*" multiple={false} type="file"
                                                onChange={handleFileChange}
                                            />
                                            <BuildCircleIcon />
                                        </IconButton>
                                        <LoadingButton
                                            variant="contained"
                                            disableElevation
                                            type="submit"
                                            loading={false}
                                        >
                                            Create
                                        </LoadingButton>
                                    </Stack>
                                </CardActions>
                            </form>
                        </Card>
                    </TabPanel>

                    <TabPanel value="2"
                        sx={{
                            p: 0
                        }}
                    >

                        <Card
                            variant="outlined"
                            square
                        >
                            <CardHeader
                                title="Tool Details"
                                subheader="Read"
                            />
                            {
                                tool.length
                                    ? tool.map((info, index) => {
                                        return <Box key={index}>
                                            <CardContent>
                                                <center>
                                                    <Paper variant="outlined" sx={{ mb: 1, p: 1, width: "100px" }}>
                                                        <img src={info.icon} alt="software-tool" width="100%" />
                                                    </Paper>
                                                </center>
                                                <Typography color="text.secondary">Tool</Typography>
                                                <Typography variant="h6">{info.name}</Typography>
                                                <Typography color="text.secondary">Type</Typography>
                                                <Typography variant="h6">{info.type}</Typography>
                                                <Typography color="text.secondary">Description</Typography>
                                                <Typography variant="h6">{info.description}</Typography>
                                                <Typography color="text.secondary">Link</Typography>
                                                <Typography variant="h6" noWrap>{info.link}</Typography>
                                            </CardContent>

                                            <CardActions>
                                                <ButtonGroup variant="outlined">
                                                    <Button
                                                        color="success"
                                                        onClick={() => updateInformation(info)}
                                                    >
                                                        Update
                                                    </Button>
                                                    <Button
                                                        color="error"
                                                        onClick={() => deleteInformation(info)}
                                                    >
                                                        Delete
                                                    </Button>
                                                </ButtonGroup>
                                            </CardActions>
                                        </Box>
                                    })
                                    : <CardContent>
                                        Tool information not found, please create.
                                    </CardContent>
                            }
                        </Card>
                    </TabPanel>

                    <TabPanel value="3"
                        sx={{
                            p: 0
                        }}
                    >

                        <Card
                            variant="outlined"
                            square
                        >
                            <CardHeader
                                title="Tool Details"
                                subheader="Update"
                            />
                            {
                                updateId !== ""
                                    ? <form onSubmit={onUpdateHandler}>
                                        <CardContent>
                                            <center>
                                                {
                                                    selectedImage
                                                        ? <Paper variant="outlined" sx={{ mb: 1, p: 1, width: "100px" }}>
                                                            <img src={selectedImage} alt="software-tool" width="100%" />
                                                        </Paper>
                                                        : <Paper variant="outlined" sx={{ mb: 1, p: 1, width: "100px" }}>
                                                            <Typography variant="caption" color="text.secondary">Set Tool Icon</Typography>
                                                            <BuildCircleIcon fontSize="large" />
                                                        </Paper>
                                                }
                                            </center>

                                            <Stack spacing={1}>

                                                <TextField size="small" color="secondary" variant="outlined" type="text" label="Tool Name"
                                                    name="name"
                                                    value={name}
                                                    onChange={(e) => setName(e.target.value)}
                                                />
                                                <TextField size="small" color="secondary" variant="outlined" type="text" label="Type"
                                                    name="type"
                                                    value={type}
                                                    onChange={(e) => setType(e.target.value)}
                                                />
                                                <TextField size="small" color="secondary" variant="outlined" type="text" label="Description"
                                                    name="description"
                                                    multiline
                                                    maxRows={4}
                                                    value={description}
                                                    onChange={(e) => setDescription(e.target.value)}
                                                />
                                                <TextField size="small" color="secondary" variant="outlined" type="text" label="Link"
                                                    name="link"
                                                    value={link}
                                                    onChange={(e) => setLink(e.target.value)}
                                                />

                                            </Stack>
                                        </CardContent>
                                        <CardActions>
                                            <Stack direction="row" spacing={1}>
                                                <IconButton color="primary" component="label">
                                                    <Input accept="image/*" multiple={false} type="file"
                                                        onChange={handleFileChange}
                                                    />
                                                    <BuildCircleIcon />
                                                </IconButton>

                                                <LoadingButton
                                                    variant="contained"
                                                    color="success"
                                                    disableElevation
                                                    type="submit"
                                                    loading={false}
                                                >
                                                    Update
                                                </LoadingButton>
                                            </Stack>
                                        </CardActions>
                                    </form>
                                    : <CardContent>
                                        What do you want to update?
                                    </CardContent>
                            }
                        </Card>
                    </TabPanel>

                    <TabPanel value="4"
                        sx={{
                            p: 0
                        }}
                    >

                        <Card
                            variant="outlined"
                            square
                        >
                            <CardHeader
                                title="Tool Details"
                                subheader="Delete"
                            />
                            {
                                deleteId !== ""
                                    ? <>
                                        <CardContent>
                                            <center>
                                                <Paper variant="outlined" sx={{ mb: 1, p: 1, width: "100px" }}>
                                                    <img src={selectedImage} alt="software-tool" width="100%" />
                                                </Paper>
                                            </center>
                                            <Typography color="text.secondary">Tool</Typography>
                                            <Typography variant="h6">{name}</Typography>
                                            <Typography color="text.secondary">Type</Typography>
                                            <Typography variant="h6">{type}</Typography>
                                            <Typography color="text.secondary">Description</Typography>
                                            <Typography variant="h6">{description}</Typography>
                                            <Typography color="text.secondary">Link</Typography>
                                            <Typography variant="h6" noWrap>{link}</Typography>
                                        </CardContent>

                                        <CardActions>
                                            <Button
                                                variant="outlined"
                                                color="error"
                                                fullWidth
                                                onClick={deleteToolInfo}
                                            >
                                                Delete
                                            </Button>
                                        </CardActions>
                                    </>
                                    : <CardContent>
                                        What do you want to delete?
                                    </CardContent>
                            }
                        </Card>
                    </TabPanel>

                </TabContext>

            </CardContent>
        </Card>
    )
}

export default ToolDetails;