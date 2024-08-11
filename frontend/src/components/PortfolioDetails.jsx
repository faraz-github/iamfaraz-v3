import { useState } from "react";

import axios from "axios";
import { toast } from "react-toastify";


import { LoadingButton, TabContext, TabList, TabPanel } from "@mui/lab";
import { Box, Button, ButtonGroup, Card, CardActions, CardContent, CardHeader, IconButton, List, ListItem, ListItemText, ListSubheader, Paper, Stack, styled, Tab, TextField, Typography } from "@mui/material";
import CreateTwoToneIcon from '@mui/icons-material/CreateTwoTone';
import StorageTwoToneIcon from '@mui/icons-material/StorageTwoTone';
import UpdateTwoToneIcon from '@mui/icons-material/UpdateTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import WebIcon from '@mui/icons-material/Web';

import { useAdmin } from "../contexts/adminContext";
import { useLoading } from "../contexts/loadingContext";

const Input = styled('input')({
    display: 'none',
});

function PortfolioDetails() {

    const { token } = useAdmin();
    const { setOpenLoading } = useLoading();

    // =========================================================================================== MUI - Tabs
    const [value, setValue] = useState("1");
    const handleChange = (event, newValue) => {
        if (newValue === "1" || newValue === "3") {
            setName("");
            setType("");
            setDescription("");
            setStack([]);
            setLink("");
            setSource("");
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

    const [inputStack, setInputStack] = useState("");
    const [stack, setStack] = useState([]);

    const [link, setLink] = useState("");
    const [source, setSource] = useState("");

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

    const handleStack = () => {
        if (!inputStack) {
            return;
        } else {
            setStack((prevState) => [...prevState, inputStack]);
            setInputStack("");
        }
    }

    const deleteStack = (id) => {
        const filteredResult = stack.filter((item, index) => index !== id);
        setStack(filteredResult);
    }

    //-------------------------------------------------------------------------------------------
    const onSubmitHandler = async (event) => {
        event.preventDefault();
        if (!name || !type || !description || stack.length === 0 || !link || !source) {
            console.log("Please provide all the details"); // Debug Log
            toast.info("Please provide all the details");
        } else {
            // Upload Profile Picture
            if (!selectedImage) {
                console.log("Please select a project picture"); // Debug Log
                toast.info("Please select a project picture");
            } else {
                const pictureURL = await uploadPortfolioPicture(selectedImage);
                // Create Portfolio Info
                const portfolioData = {
                    name: name,
                    type: type,
                    description: description,
                    stack: stack,
                    link: link,
                    source: source,
                    picture: pictureURL
                }
                const response = await createToolInfo(portfolioData);
                if (response) {
                    setName("");
                    setType("");
                    setDescription("");
                    setStack([]);
                    setLink("");
                    setSource("");
                    setSelectedImage("");
                    console.log(response); // Debug Log
                }
            }

        }
    }

    //------------------------------------------------------------------------------------------- API
    const uploadPortfolioPicture = async (base64EncodedImage) => {
        setOpenLoading(true);
        try {
            const response = await axios.post("/api/upload/portfolio/picture", { imageString: base64EncodedImage });
            if (response) {
                setOpenLoading(false);
                return response.data.url;
            }
        } catch (error) {
            setOpenLoading(false);
            console.log(error);
        }
    }

    const createToolInfo = async (portfolioData) => {
        setOpenLoading(true);
        try {
            const response = await axios.post("/api/info/portfolio", portfolioData, {
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
    const [portfolio, setPortfolio] = useState([]);
    //------------------------------------------------------------------------------------------- API
    const readPortfolioInfo = async () => {
        setOpenLoading(true);
        try {
            const response = await axios.get("/api/info/portfolio");
            if (response) {
                setOpenLoading(false);
                setPortfolio(response.data);
                return response;
            }
        } catch (error) {
            console.log(error); // Debug Log
            setPortfolio([]);
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
        setStack(info.stack);
        setLink(info.link);
        setSource(info.source);
        setSelectedImage(info.picture);
        setUpdateId(info._id);
    }

    const onUpdateHandler = async (event) => {
        event.preventDefault();
        if (!name || !type || !description || stack.length === 0 || !link || !source) {
            console.log("Please provide all the details"); // Debug Log
            toast.info("Please provide all the details");
        } else {
            // Upload Profile Picture
            if (!selectedImage) {
                console.log("Please select a project picture"); // Debug Log
                toast.info("Please select a project picture");
            } else {
                const pictureURL = await uploadPortfolioPicture(selectedImage);
                // Update Personal Info
                const id = updateId;
                // Create Portfolio Info
                const portfolioData = {
                    name: name,
                    type: type,
                    description: description,
                    stack: stack,
                    link: link,
                    source: source,
                    picture: pictureURL
                }
                const response = await updatePortfolioInfo(id, portfolioData);
                if (response) {
                    setUpdateId("");
                    console.log(response); // Debug Log
                }
            }
        }
    }
    //------------------------------------------------------------------------------------------- API
    const updatePortfolioInfo = async (id, portfolioData) => {
        setOpenLoading(true);
        try {
            const response = await axios.patch(`/api/info/portfolio/${id}`, portfolioData, {
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
        setStack(info.stack);
        setLink(info.link);
        setSource(info.source);
        setSelectedImage(info.picture);
        setDeleteId(info._id);
    }

    //------------------------------------------------------------------------------------------- API
    const deletePortfolioInfo = async () => {
        setOpenLoading(true);
        try {
            const response = await axios.delete(`/api/info/portfolio/${deleteId}`, {
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
                title="Portfolio Information"
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
                        <Tab label="Read" value="2" icon={<StorageTwoToneIcon />} iconPosition="start" onClick={readPortfolioInfo} />
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
                                title="Portfolio Details"
                                subheader="Create"
                            />
                            <form onSubmit={onSubmitHandler}>
                                <CardContent>

                                    <center>
                                        {
                                            selectedImage
                                                ? <Paper variant="outlined" sx={{ mb: 1, p: 1, width: "150px" }}>
                                                    <img src={selectedImage} alt="project" width="100%" />
                                                </Paper>
                                                : <Paper variant="outlined" sx={{ mb: 1, p: 1, width: "150px" }}>
                                                    <Typography variant="caption" color="text.secondary">Set Project Picture</Typography>
                                                    <WebIcon fontSize="large" />
                                                </Paper>
                                        }
                                    </center>

                                    <Stack spacing={1}>
                                        <TextField size="small" color="secondary" variant="outlined" type="text" label="Project Name"
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
                                        <TextField size="small" color="secondary" variant="outlined" type="text" label="Source Code"
                                            name="source"
                                            value={source}
                                            onChange={(e) => setSource(e.target.value)}
                                        />

                                        <Typography color="text.secondary">Stack</Typography>
                                        {
                                            stack.length
                                                ? <List>
                                                    {
                                                        stack.map((item, index) => {
                                                            return <ListItem
                                                                key={index}
                                                                disablePadding
                                                                secondaryAction={
                                                                    <IconButton edge="end" onClick={() => deleteStack(index)}>
                                                                        <DeleteTwoToneIcon />
                                                                    </IconButton>
                                                                }
                                                            >
                                                                <ListItemText
                                                                    primary={item}
                                                                />

                                                            </ListItem>

                                                        })
                                                    }
                                                </List>
                                                : null
                                        }
                                        <TextField size="small" color="secondary" variant="outlined" type="text" label="Stack"
                                            name="inputStack"
                                            value={inputStack}
                                            onChange={(e) => setInputStack(e.target.value)}
                                        />

                                    </Stack>
                                </CardContent>
                                <CardActions>
                                    <Stack direction="row" spacing={1}>
                                        <IconButton color="primary" component="label">
                                            <Input accept="image/*" multiple={false} type="file"
                                                onChange={handleFileChange}
                                            />
                                            <WebIcon />
                                        </IconButton>
                                        <Button
                                            variant="outlined"
                                            onClick={handleStack}
                                        >
                                            Add Stack
                                        </Button>
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
                                title="Portfolio Details"
                                subheader="Read"
                            />
                            {
                                portfolio.length
                                    ? portfolio.map((info, index) => {
                                        return <Box key={index}>
                                            <CardContent>
                                                <center>
                                                    <Paper variant="outlined" sx={{ mb: 1, p: 1, width: "150px" }}>
                                                        <img src={info.picture} alt="project" width="100%" />
                                                    </Paper>
                                                </center>
                                                <Typography color="text.secondary">Project Name</Typography>
                                                <Typography variant="h6">{info.name}</Typography>
                                                <Typography color="text.secondary">Type</Typography>
                                                <Typography variant="h6">{info.type}</Typography>
                                                <Typography color="text.secondary">Description</Typography>
                                                <Typography variant="h6">{info.description}</Typography>
                                                <Typography color="text.secondary">Deployed Link</Typography>
                                                <Typography variant="h6" noWrap>{info.link}</Typography>
                                                <Typography color="text.secondary">Source Code</Typography>
                                                <Typography variant="h6" noWrap>{info.source}</Typography>
                                                {
                                                    info.stack
                                                        ? <List dense sx={{ border: "1px solid lightgray" }}>
                                                            <ListSubheader disableSticky>
                                                                Stack
                                                            </ListSubheader>
                                                            {
                                                                info.stack.map((item, index) => {
                                                                    return <ListItem
                                                                        key={index}
                                                                    >
                                                                        <ListItemText
                                                                            primary={item}
                                                                        />

                                                                    </ListItem>
                                                                })

                                                            }
                                                        </List>
                                                        : null

                                                }
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
                                        Portfolio information not found, please create.
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
                                title="Portfolio Details"
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
                                                            <img src={selectedImage} alt="project" width="100%" />
                                                        </Paper>
                                                        : <Paper variant="outlined" sx={{ mb: 1, p: 1, width: "100px" }}>
                                                            <Typography variant="caption" color="text.secondary">Set Project Picture</Typography>
                                                            <WebIcon fontSize="large" />
                                                        </Paper>
                                                }
                                            </center>

                                            <Stack spacing={1}>

                                                <TextField size="small" color="secondary" variant="outlined" type="text" label="Project Name"
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
                                                <TextField size="small" color="secondary" variant="outlined" type="text" label="Source Code"
                                                    name="source"
                                                    value={source}
                                                    onChange={(e) => setSource(e.target.value)}
                                                />
                                                <Typography color="text.secondary">Stack</Typography>
                                                {
                                                    stack.length
                                                        ? <List>
                                                            {
                                                                stack.map((item, index) => {
                                                                    return <ListItem
                                                                        key={index}
                                                                        disablePadding
                                                                        secondaryAction={
                                                                            <IconButton edge="end" onClick={() => deleteStack(index)}>
                                                                                <DeleteTwoToneIcon />
                                                                            </IconButton>
                                                                        }
                                                                    >
                                                                        <ListItemText
                                                                            primary={item}
                                                                        />

                                                                    </ListItem>

                                                                })
                                                            }
                                                        </List>
                                                        : null
                                                }
                                                <TextField size="small" color="secondary" variant="outlined" type="text" label="Stack"
                                                    name="inputStack"
                                                    value={inputStack}
                                                    onChange={(e) => setInputStack(e.target.value)}
                                                />

                                            </Stack>
                                        </CardContent>
                                        <CardActions>
                                            <Stack direction="row" spacing={1}>
                                                <IconButton color="primary" component="label">
                                                    <Input accept="image/*" multiple={false} type="file"
                                                        onChange={handleFileChange}
                                                    />
                                                    <WebIcon />
                                                </IconButton>
                                                <Button
                                                    variant="outlined"
                                                    onClick={handleStack}
                                                >
                                                    Add Stack
                                                </Button>
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
                                title="Portfolio Details"
                                subheader="Delete"
                            />
                            {
                                deleteId !== ""
                                    ? <>
                                        <CardContent>
                                            <center>
                                                <Paper variant="outlined" sx={{ mb: 1, p: 1, width: "150px" }}>
                                                    <img src={selectedImage} alt="project" width="100%" />
                                                </Paper>
                                            </center>
                                            <Typography color="text.secondary">Project Name</Typography>
                                            <Typography variant="h6">{name}</Typography>
                                            <Typography color="text.secondary">Type</Typography>
                                            <Typography variant="h6">{type}</Typography>
                                            <Typography color="text.secondary">Description</Typography>
                                            <Typography variant="h6">{description}</Typography>
                                            <Typography color="text.secondary">Deployed Link</Typography>
                                            <Typography variant="h6" noWrap>{link}</Typography>
                                            <Typography color="text.secondary">Source Code</Typography>
                                            <Typography variant="h6" noWrap>{source}</Typography>
                                            {
                                                stack
                                                    ? <List dense sx={{ border: "1px solid lightgray" }}>
                                                        <ListSubheader disableSticky>
                                                            Stack
                                                        </ListSubheader>
                                                        {
                                                            stack.map((item, index) => {
                                                                return <ListItem
                                                                    key={index}
                                                                >
                                                                    <ListItemText
                                                                        primary={item}
                                                                    />

                                                                </ListItem>
                                                            })

                                                        }
                                                    </List>
                                                    : null

                                            }
                                        </CardContent>

                                        <CardActions>
                                            <Button
                                                variant="outlined"
                                                color="error"
                                                fullWidth
                                                onClick={deletePortfolioInfo}
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

export default PortfolioDetails;