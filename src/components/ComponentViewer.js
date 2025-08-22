import React, { useState, useEffect } from 'react';
import { Box, Drawer, List, ListItemButton, ListItemText, Typography } from '@mui/material';
import componentRegistry from './componentRegistry';
import PropEditor from './PropEditor';

const drawerWidth = 240;

const ComponentViewer = () => {
  const [selectedComponentKey, setSelectedComponentKey] = useState(null);
  const [propValues, setPropValues] = useState({});

  useEffect(() => {
    if (selectedComponentKey) {
      const { defaultProps } = componentRegistry[selectedComponentKey];
      setPropValues(defaultProps || {});
    }
  }, [selectedComponentKey]);

  const handleComponentSelect = (componentKey) => {
    setSelectedComponentKey(componentKey);
  };

  const handlePropChange = (propName, propValue) => {
    setPropValues((prevValues) => ({
      ...prevValues,
      [propName]: propValue,
    }));
  };

  const components = Object.keys(componentRegistry);
  const selectedComponentData = selectedComponentKey ? componentRegistry[selectedComponentKey] : null;
  const SelectedComponent = selectedComponentData ? selectedComponentData.component : null;

  return (
    <Box sx={{ display: 'flex' }}>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
        }}
      >
        <Box sx={{ overflow: 'auto' }}>
          <List>
            {components.map((componentKey) => (
              <ListItemButton
                key={componentKey}
                selected={selectedComponentKey === componentKey}
                onClick={() => handleComponentSelect(componentKey)}
              >
                <ListItemText primary={componentRegistry[componentKey].name} />
              </ListItemButton>
            ))}
          </List>
        </Box>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        {SelectedComponent ? (
          <>
            <SelectedComponent {...propValues}>
                Click Me!
            </SelectedComponent>
            <PropEditor
              propTypes={selectedComponentData.propTypes}
              propValues={propValues}
              onPropChange={handlePropChange}
            />
          </>
        ) : (
          <Typography paragraph>
            Select a component from the sidebar to view it here.
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default ComponentViewer;
