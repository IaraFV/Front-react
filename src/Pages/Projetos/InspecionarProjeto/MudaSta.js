import React, { useState } from 'react';
import 'antd/dist/antd.css';
import './index.css';
import { Button, Drawer } from 'antd';


const App = () => {
  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button type="primary" onClick={showDrawer}>
        Open
      </Button>
      <Drawer title="Basic Drawer" placement="right" onClose={onClose} open={open}>
        <p>Some contents...</p>
      </Drawer>
    </>
  );
};

export default App;