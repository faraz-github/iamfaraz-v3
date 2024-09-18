import { useState } from "react";

import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Card, CardContent, CardHeader, Tab } from "@mui/material";
import CreateTwoToneIcon from "@mui/icons-material/CreateTwoTone";
import StorageTwoToneIcon from "@mui/icons-material/StorageTwoTone";
import UpdateTwoToneIcon from "@mui/icons-material/UpdateTwoTone";
import DeleteTwoToneIcon from "@mui/icons-material/DeleteTwoTone";

import { useAdmin } from "../../contexts/adminContext";

import ClientCreate from "./Client/ClientCreate";
import ClientRead from "./Client/ClientRead";
import ClientUpdate from "./Client/ClientUpdate";
import ClientDelete from "./Client/ClientDelete";

function ClientDetails() {
  // context
  const { token } = useAdmin();

  // state
  const [tabIndex, setTabIndex] = useState("1");
  const [selectedClient, setSelectedClient] = useState(null);

  // MUI - Tabs
  const handleChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  // =========================================================================================== RENDER
  return (
    <Card>
      <CardHeader
        title="Client Information"
        subheader="Manager - Super Admin Only"
      />
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
            <ClientCreate token={token} setTabIndex={setTabIndex} />
          </TabPanel>

          <TabPanel
            value="2"
            sx={{
              p: 0,
            }}
          >
            <ClientRead
              setSelectedClient={setSelectedClient}
              setTabIndex={setTabIndex}
            />
          </TabPanel>

          <TabPanel
            value="3"
            sx={{
              p: 0,
            }}
          >
            <ClientUpdate
              token={token}
              selectedClient={selectedClient}
              setTabIndex={setTabIndex}
            />
          </TabPanel>

          <TabPanel
            value="4"
            sx={{
              p: 0,
            }}
          >
            <ClientDelete
              token={token}
              selectedClient={selectedClient}
              setTabIndex={setTabIndex}
            />
          </TabPanel>
        </TabContext>
      </CardContent>
    </Card>
  );
}

export default ClientDetails;
