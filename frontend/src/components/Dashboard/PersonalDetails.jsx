import { useState } from "react";

import { Tab, Card, CardHeader, CardContent } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import CreateTwoToneIcon from "@mui/icons-material/CreateTwoTone";
import StorageTwoToneIcon from "@mui/icons-material/StorageTwoTone";
import UpdateTwoToneIcon from "@mui/icons-material/UpdateTwoTone";
import DeleteTwoToneIcon from "@mui/icons-material/DeleteTwoTone";

import { useAdmin } from "../../contexts/adminContext";

import PersonalCreate from "./Personal/PersonalCreate";
import PersonalRead from "./Personal/PersonalRead";
import PersonalUpdate from "./Personal/PersonalUpdate";
import PersonalDelete from "./Personal/PersonalDelete";

function PersonalDetails() {
  // Context
  const { token } = useAdmin();

  // State
  const [selectedPersonal, setSelectedPersonal] = useState(null);

  // MUI - Tabs
  const [tabIndex, setTabIndex] = useState("1");
  const handleChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  // =========================================================================================== RENDER
  return (
    <Card>
      <CardHeader title="Personal Information" subheader="Manager" />

      <CardContent>
        <TabContext value={tabIndex}>
          <TabList
            onChange={handleChange}
            textColor="primary"
            indicatorColor="primary"
            variant="scrollable"
          >
            <Tab
              label="Create"
              value="1"
              icon={<CreateTwoToneIcon />}
              iconPosition="start"
            />
            <Tab
              label="Read"
              value="2"
              icon={<StorageTwoToneIcon />}
              iconPosition="start"
            />
            <Tab
              label="Update"
              value="3"
              icon={<UpdateTwoToneIcon />}
              iconPosition="start"
            />
            <Tab
              label="Delete"
              value="4"
              icon={<DeleteTwoToneIcon />}
              iconPosition="start"
            />
          </TabList>

          <TabPanel
            value="1"
            sx={{
              p: 0,
            }}
          >
            <PersonalCreate token={token} setTabIndex={setTabIndex} />
          </TabPanel>

          <TabPanel
            value="2"
            sx={{
              p: 0,
            }}
          >
            <PersonalRead
              setSelectedPersonal={setSelectedPersonal}
              setTabIndex={setTabIndex}
            />
          </TabPanel>

          <TabPanel
            value="3"
            sx={{
              p: 0,
            }}
          >
            <PersonalUpdate
              token={token}
              selectedPersonal={selectedPersonal}
              setTabIndex={setTabIndex}
            />
          </TabPanel>

          <TabPanel
            value="4"
            sx={{
              p: 0,
            }}
          >
            <PersonalDelete
              token={token}
              selectedPersonal={selectedPersonal}
              setTabIndex={setTabIndex}
            />
          </TabPanel>
        </TabContext>
      </CardContent>
    </Card>
  );
}

export default PersonalDetails;
