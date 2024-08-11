import { useState } from "react";

import axios from "axios";
import { toast } from "react-toastify";

import { LoadingButton, TabContext, TabList, TabPanel } from "@mui/lab";
import { Box, Button, ButtonGroup, Card, CardActions, CardContent, CardHeader, Stack, Tab, TextField, Typography } from "@mui/material";
import CreateTwoToneIcon from '@mui/icons-material/CreateTwoTone';
import StorageTwoToneIcon from '@mui/icons-material/StorageTwoTone';
import UpdateTwoToneIcon from '@mui/icons-material/UpdateTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';

import { useAdmin } from "../contexts/adminContext";
import { useLoading } from "../contexts/loadingContext";

function PlatformDetails() {

    const { token } = useAdmin();
    const { setOpenLoading } = useLoading();

    // =========================================================================================== MUI - Tabs
    const [value, setValue] = useState("1");
    const handleChange = (event, newValue) => {
        if (newValue === "1" || newValue === "3") {
            setPlatformName("");
            setValue(newValue);
        }
        setUpdateId("");
        setDeleteId("");
        setValue(newValue);
    }
    // =========================================================================================== CREATE TAB
    const [platformName, setPlatformName] = useState("");

    const onSubmitHandler = async (event) => {
        event.preventDefault();
        const platformData = {
            platformName
        }
        const response = await createPlatformInfo(platformData);
        if (response) {
            setPlatformName("");
            console.log(response);
        }
    }
    //------------------------------------------------------------------------------------------- API
    const createPlatformInfo = async (platformData) => {
        setOpenLoading(true);
        try {
            const response = await axios.post("/api/info/platform", platformData, {
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
    const [platforms, setPlatforms] = useState([]);
    //------------------------------------------------------------------------------------------- API
    const readPlatformInfo = async () => {
        setOpenLoading(true);
        try {
            const response = await axios.get("/api/info/platform");
            if (response) {
                setOpenLoading(false);
                setPlatforms(response.data);
                return response
            }
        } catch (error) {
            console.log(error); // Debug Log
            setPlatforms([]);
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
        setPlatformName(info.platformName);
        setUpdateId(info._id);
    }

    const onUpdateHandler = async (event) => {
        event.preventDefault();

        const platformData = {
            platformName
        }
        const response = await updatePlatformInfo(platformData);
        if (response) {
            setUpdateId("");
            console.log(response); // Debug Log
        }
    }

    //------------------------------------------------------------------------------------------- API
    const updatePlatformInfo = async (platformData) => {
        setOpenLoading(true);
        try {
            const response = await axios.patch(`/api/info/platform/${updateId}`, platformData, {
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
        setPlatformName(info.platformName);
        setDeleteId(info._id);
    }
    //------------------------------------------------------------------------------------------- API
    const deletePlatformInfo = async () => {
        setOpenLoading(true);
        try {
            const response = await axios.delete(`/api/info/platform/${deleteId}`, {
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
                title="Platform Information"
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
                        <Tab label="Read" value="2" icon={<StorageTwoToneIcon />} iconPosition="start" onClick={readPlatformInfo} />
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
                                title="Platform Details"
                                subheader="Create"
                            />
                            <form onSubmit={onSubmitHandler}>
                                <CardContent>
                                    <Stack spacing={1}>
                                        <TextField size="small" color="secondary" variant="outlined" type="text" label="Platform"
                                            name="platformName"
                                            value={platformName}
                                            required
                                            onChange={(e) => setPlatformName(e.target.value)}
                                        />

                                    </Stack>
                                </CardContent>
                                <CardActions>
                                    <Stack direction="row" spacing={1}>
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
                                title="Platform Details"
                                subheader="Read"
                            />
                            {
                                platforms.length
                                    ? platforms.map((info, index) => {
                                        return <Box key={index}>
                                            <CardContent>
                                                <Typography color="text.secondary">Platform</Typography>
                                                <Typography variant="h6">{info.platformName}</Typography>
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
                                        Platform information not found, please create.
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
                                title="Platform Details"
                                subheader="Update"
                            />
                            {
                                updateId !== ""
                                    ? <form onSubmit={onUpdateHandler}>
                                        <CardContent>
                                            <Stack spacing={1}>
                                                <TextField size="small" color="secondary" variant="outlined" type="text" label="Platform"
                                                    name="platformName"
                                                    value={platformName}
                                                    required
                                                    onChange={(e) => setPlatformName(e.target.value)}
                                                />
                                            </Stack>
                                        </CardContent>

                                        <CardActions>
                                            <Stack direction="row" spacing={1}>
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
                                title="Platform Details"
                                subheader="Delete"
                            />
                            {
                                deleteId !== ""
                                    ? <>
                                        <CardContent>

                                            <Typography color="text.secondary">Platform</Typography>
                                            <Typography variant="h6">{platformName}</Typography>


                                        </CardContent>
                                        <CardActions>
                                            <Button
                                                variant="outlined"
                                                color="error"
                                                fullWidth
                                                onClick={deletePlatformInfo}
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

export default PlatformDetails;