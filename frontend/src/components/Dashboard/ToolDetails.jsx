import { useState } from "react";

import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Card, CardContent, CardHeader, Tab } from "@mui/material";
import CreateTwoToneIcon from "@mui/icons-material/CreateTwoTone";
import StorageTwoToneIcon from "@mui/icons-material/StorageTwoTone";
import UpdateTwoToneIcon from "@mui/icons-material/UpdateTwoTone";
import DeleteTwoToneIcon from "@mui/icons-material/DeleteTwoTone";

import { useAdmin } from "../../contexts/adminContext";

import ToolCreate from "./Tool/ToolCreate";
import ToolRead from "./Tool/ToolRead";
import ToolUpdate from "./Tool/ToolUpdate";
import ToolDelete from "./Tool/ToolDelete";

function ToolDetails() {
  // Context
  const { token } = useAdmin();

  // State
  const [tabIndex, setTabIndex] = useState("1");
  const [selectedTool, setSelectedTool] = useState(null);

  //  MUI - Tabs
  const handleChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  // =========================================================================================== RENDER
  return (
    <Card>
      <CardHeader title="Tool Information" subheader="Manager" />
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
            <ToolCreate token={token} setTabIndex={setTabIndex} />
          </TabPanel>

          <TabPanel
            value="2"
            sx={{
              p: 0,
            }}
          >
            <ToolRead
              setSelectedTool={setSelectedTool}
              setTabIndex={setTabIndex}
            />
          </TabPanel>

          <TabPanel
            value="3"
            sx={{
              p: 0,
            }}
          >
            <ToolUpdate
              token={token}
              selectedTool={selectedTool}
              setTabIndex={setTabIndex}
            />
          </TabPanel>

          <TabPanel
            value="4"
            sx={{
              p: 0,
            }}
          >
            <ToolDelete
              token={token}
              selectedTool={selectedTool}
              setTabIndex={setTabIndex}
            />
          </TabPanel>
        </TabContext>
      </CardContent>
    </Card>
  );
}

export default ToolDetails;
