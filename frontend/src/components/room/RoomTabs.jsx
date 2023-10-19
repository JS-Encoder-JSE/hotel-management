import React from "react";
import { Tabs, TabList, TabPanel, Tab } from "react-tabs";

const RoomTabs = () => {
  return (
    <Tabs>
      <TabList className="tabs w-fit mb-4">
        <Tab
          className="tab tab-bordered"
          selectedClassName="tab-active text-green-slimy !border-b-green-slimy"
        >
          Description
        </Tab>
      </TabList>
      <TabPanel>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsa maxime
          quis quod. Assumenda consequuntur cum eaque exercitationem nemo quae,
          quaerat qui quidem. Commodi consectetur eos maiores nemo odit quia
          recusandae reprehenderit suscipit veniam! Asperiores atque neque,
          obcaecati quibusdam quidem quis sapiente soluta? Animi cum dolor
          doloremque impedit incidunt iste minima minus modi nihil quis quod
          saepe totam, voluptatum. Consectetur dolor facere minima natus
          ratione? Blanditiis cum dolore ex illum inventore maiores nam
          necessitatibus perspiciatis praesentium repellat. Animi fugiat
          provident rem totam? Architecto esse laboriosam, laborum libero
          officiis omnis porro quibusdam quod voluptate! Doloremque incidunt
          labore laborum officia reiciendis? Minus, similique?
        </p>
      </TabPanel>
    </Tabs>
  );
};

export default RoomTabs;
