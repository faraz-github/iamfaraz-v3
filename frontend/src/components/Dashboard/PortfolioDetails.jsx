import { useState } from "react";

import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Card, CardContent, CardHeader, Tab } from "@mui/material";
import CreateTwoToneIcon from "@mui/icons-material/CreateTwoTone";
import StorageTwoToneIcon from "@mui/icons-material/StorageTwoTone";
import UpdateTwoToneIcon from "@mui/icons-material/UpdateTwoTone";
import DeleteTwoToneIcon from "@mui/icons-material/DeleteTwoTone";

import { useAdmin } from "../../contexts/adminContext";

import PortfolioCreate from "./Portfolio/PortfolioCreate";
import PortfolioRead from "./Portfolio/PortfolioRead";
import PortfolioUpdate from "./Portfolio/PortfolioUpdate";
import PortfolioDelete from "./Portfolio/PortfolioDelete";

function PortfolioDetails() {
  // context
  const { token } = useAdmin();

  // state
  const [tabIndex, setTabIndex] = useState("1");
  const [selectedPortfolio, setSelectedPortfolio] = useState(null);

  // MUI - Tabs
  const handleChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  // =========================================================================================== RENDER
  return (
    <Card>
      <CardHeader title="Portfolio Information" subheader="Manager" />
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
            <PortfolioCreate token={token} setTabIndex={setTabIndex} />
          </TabPanel>

          <TabPanel
            value="2"
            sx={{
              p: 0,
            }}
          >
            <PortfolioRead
              token={token}
              setSelectedPortfolio={setSelectedPortfolio}
              setTabIndex={setTabIndex}
            />
          </TabPanel>

          <TabPanel
            value="3"
            sx={{
              p: 0,
            }}
          >
            <PortfolioUpdate
              token={token}
              selectedPortfolio={selectedPortfolio}
              setTabIndex={setTabIndex}
            />
          </TabPanel>

          <TabPanel
            value="4"
            sx={{
              p: 0,
            }}
          >
            <PortfolioDelete
              token={token}
              selectedPortfolio={selectedPortfolio}
              setTabIndex={setTabIndex}
            />
          </TabPanel>
        </TabContext>
      </CardContent>
    </Card>
  );
}

export default PortfolioDetails;
